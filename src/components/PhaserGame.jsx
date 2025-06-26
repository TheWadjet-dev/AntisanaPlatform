import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'

export default function PhaserGame() {
  const gameRef = useRef(null)
  const [showIntro, setShowIntro] = useState(true)
  const [showGameOver, setShowGameOver] = useState(false)
  const [lastScore, setLastScore] = useState(0)
  const [highScore, setHighScore] = useState(
    typeof window !== 'undefined' ? Number(localStorage.getItem('highScore')) || 0 : 0
  )

  const startGame = () => {
    setShowIntro(false)
    setShowGameOver(false)
    if (gameRef.current) gameRef.current.innerHTML = ''
  }

  useEffect(() => {
    if (!gameRef.current) return
    if (showIntro || showGameOver) return

    // Obtener dimensiones responsivas
    const getGameDimensions = () => {
      const container = gameRef.current
      if (!container) return { width: 800, height: 600 }
      
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      
      // Mantener ratio 4:3
      let gameWidth = Math.min(containerWidth, 800)
      let gameHeight = Math.min(containerHeight, 600)
      
      // Ajustar para mantener el ratio
      if (gameWidth / gameHeight > 4/3) {
        gameWidth = gameHeight * (4/3)
      } else {
        gameHeight = gameWidth * (3/4)
      }
      
      return { width: Math.floor(gameWidth), height: Math.floor(gameHeight) }
    }

    const { width: gameWidth, height: gameHeight } = getGameDimensions()

    const config = {
      type: Phaser.AUTO,
      width: gameWidth,
      height: gameHeight,
      parent: gameRef.current,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload,
        create,
        update
      }
    }

    let condor, cursors, scoreText, livesText, gameOverText
    let drops = [], clouds = []
    let score = 0
    let lives = 3
    let collectSound, hitSound, gameOverSound
    let game = new Phaser.Game(config)

    function preload() {
      this.load.spritesheet('condor', '/sprites/bird_condor.png', {
        frameWidth: 32,
        frameHeight: 32
      })

      this.load.spritesheet('drop', '/sprites/water_drop.png', {
        frameWidth: 64,
        frameHeight: 64
      })

      this.load.spritesheet('cloud', '/sprites/smoke_loop.png', {
        frameWidth: 256,
        frameHeight: 256
      })

      this.load.audio('collect', '/sounds/collect.wav')
      this.load.audio('hit', '/sounds/hit.mp3')
      this.load.audio('gameover', '/sounds/game_over.wav')
    }

    function create() {
      // Obtener dimensiones del juego
      const gameWidth = this.cameras.main.width
      const gameHeight = this.cameras.main.height
      
      this.add.rectangle(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 0xcceeff)

      collectSound = this.sound.add('collect')
      hitSound = this.sound.add('hit')
      gameOverSound = this.sound.add('gameover')

      // Izquierda (volando)
this.anims.create({
  key: 'fly-left',
  frames: this.anims.generateFrameNumbers('condor', { start: 0, end: 2 }),
  frameRate: 8,
  repeat: -1
})

// Derecha (volando)
this.anims.create({
  key: 'fly-right',
  frames: this.anims.generateFrameNumbers('condor', { start: 9, end: 11 }),
  frameRate: 8,
  repeat: -1
})

// Abajo (volando)
this.anims.create({
  key: 'fly-down',
  frames: this.anims.generateFrameNumbers('condor', { start: 6, end: 8 }),
  frameRate: 8,
  repeat: -1
})

// Arriba (volando)
      this.anims.create({
        key: 'fly-up',
        frames: this.anims.generateFrameNumbers('condor', { start: 3, end: 5 }),
        frameRate: 8,
        repeat: -1
      })


      this.anims.create({
        key: 'drip',
        frames: this.anims.generateFrameNumbers('drop', { start: 0, end: 11 }),
        frameRate: 8,
        repeat: -1
      })

      this.anims.create({
        key: 'cloudLoop',
        frames: this.anims.generateFrameNumbers('cloud', { start: 0, end: 29 }),
        frameRate: 8,
        repeat: -1
      })

      condor = this.physics.add.sprite(gameWidth/2, gameHeight * 0.8, 'condor', 0).play('fly')
      
      // Escalar según el tamaño de la pantalla
      const condorScale = Math.min(gameWidth / 800, gameHeight / 600) * 3
      condor.setScale(condorScale)
      condor.setCollideWorldBounds(true)

      cursors = this.input.keyboard.createCursorKeys()

      for (let i = 0; i < 6; i++) {
        const drop = this.physics.add.sprite(
          Phaser.Math.Between(gameWidth * 0.1, gameWidth * 0.9), 
          Phaser.Math.Between(-gameHeight * 0.5, 0), 
          'drop'
        )
        const dropScale = Math.min(gameWidth / 800, gameHeight / 600) * 0.8
        drop.setScale(dropScale)
        drop.play('drip')
        drop.setVelocityY(Phaser.Math.Between(80, 120))
        drops.push(drop)
        this.physics.add.overlap(condor, drop, () => collectDrop(this, drop))
      }

      for (let i = 0; i < 4; i++) {
        const cloud = this.physics.add.sprite(
          Phaser.Math.Between(gameWidth * 0.1, gameWidth * 0.9), 
          Phaser.Math.Between(-gameHeight * 0.5, 0), 
          'cloud'
        )
        const cloudScale = Math.min(gameWidth / 800, gameHeight / 600) * 0.6
        cloud.setScale(cloudScale)
        cloud.play('cloudLoop')
        cloud.setVelocityY(Phaser.Math.Between(40, 70))
        clouds.push(cloud)
        this.physics.add.overlap(condor, cloud, () => hitCloud(this, cloud))
      }

      // Ajustar tamaño de texto según pantalla
      const fontSize = Math.max(16, Math.min(gameWidth / 40, 20))
      scoreText = this.add.text(20, 20, 'Puntos: 0', { fontSize: `${fontSize}px`, fontFamily: 'Arial', fill: '#000' })
      livesText = this.add.text(20, 50, 'Vidas: 3', { fontSize: `${fontSize}px`, fontFamily: 'Arial', fill: '#000' })
      gameOverText = this.add.text(gameWidth/2, gameHeight/2, '', { 
        fontSize: `${Math.max(24, Math.min(gameWidth / 25, 32))}px`, 
        fontFamily: 'Arial', 
        fill: 'red' 
      }).setOrigin(0.5)
    }

    function update() {
      if (lives <= 0) return
      
      const gameWidth = this.cameras.main.width
      const gameHeight = this.cameras.main.height

      let moving = false

if (cursors.left.isDown) {
  condor.setVelocityX(-200)
  condor.setVelocityY(0)
  condor.anims.play('fly-left', true)
  moving = true
} else if (cursors.right.isDown) {
  condor.setVelocityX(200)
  condor.setVelocityY(0)
  condor.anims.play('fly-right', true)
  moving = true
} else if (cursors.up.isDown) {
  condor.setVelocityY(-200)
  condor.setVelocityX(0)
  condor.anims.play('fly-up', true)
  moving = true
} else if (cursors.down.isDown) {
  condor.setVelocityY(200)
  condor.setVelocityX(0)
  condor.anims.play('fly-down', true)
  moving = true
} else {
  condor.setVelocity(0)
  condor.anims.stop()
}

      drops.forEach((drop) => {
        if (drop.y > gameHeight) {
          drop.y = -50
          drop.x = Phaser.Math.Between(gameWidth * 0.1, gameWidth * 0.9)
        }
      })

      clouds.forEach((cloud) => {
        if (cloud.y > gameHeight) {
          cloud.y = -50
          cloud.x = Phaser.Math.Between(gameWidth * 0.1, gameWidth * 0.9)
        }
      })
    }

    function collectDrop(scene, drop) {
      const gameWidth = scene.cameras.main.width
      score++
      collectSound.play()
      scoreText.setText('Puntos: ' + score)
      drop.y = -50
      drop.x = Phaser.Math.Between(gameWidth * 0.1, gameWidth * 0.9)
    }

    function hitCloud(scene, cloud) {
  if (lives <= 0) return
  
  const gameWidth = scene.cameras.main.width

  // Evitar múltiples colisiones seguidas
  cloud.disableBody(true, true)

  hitSound.play()
  lives--
  livesText.setText('Vidas: ' + lives)

  if (lives <= 0) {
  condor.setTint(0xff0000)
  condor.setVelocity(0)
  gameOverText.setText('¡Juego Terminado!')
  gameOverSound.play() // ⬅️ aquí está el nuevo sonido

  setTimeout(() => {
    if (score > highScore) {
      localStorage.setItem('highScore', score.toString())
      setHighScore(score)
    }
    setLastScore(score)
    setShowGameOver(true)
  }, 1500)
} else {
    // Reaparecer la nube después de 1.5 segundos
    scene.time.delayedCall(1500, () => {
      cloud.enableBody(true, Phaser.Math.Between(gameWidth * 0.1, gameWidth * 0.9), -50, true, true)
      cloud.setVelocityY(Phaser.Math.Between(40, 70))
    })
  }
    }


    return () => {
      game.destroy(true)
    }
  }, [showIntro, showGameOver])

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      {showIntro && (
        <div className="absolute inset-0 z-20 bg-white bg-opacity-95 flex flex-col justify-center items-center text-center p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bienvenido al juego Cóndor Guardián</h2>
          <p className="mb-2 text-sm md:text-base">🕹️ Usa las flechas del teclado o los controles táctiles para mover al cóndor.</p>
          <p className="mb-2 text-sm md:text-base">💧 Atrapa gotas de agua para sumar puntos.</p>
          <p className="mb-4 text-sm md:text-base">☁️ Evita las nubes contaminantes, ¡pierdes vidas!</p>
          <button
            onClick={startGame}
            className="px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition text-sm md:text-base"
          >
            Jugar
          </button>
        </div>
      )}

      {showGameOver && (
        <div className="absolute inset-0 z-20 bg-black bg-opacity-80 text-white flex flex-col justify-center items-center text-center p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">🎮 Fin del juego</h2>
          <p className="mb-2 text-sm md:text-base">Puntaje: {lastScore}</p>
          <p className="mb-4 text-sm md:text-base">Puntaje máximo: {highScore}</p>
          <button
            onClick={startGame}
            className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition text-sm md:text-base"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Canvas del juego */}
      <div
        ref={gameRef}
        className="w-full max-w-full mx-auto bg-gray-100 rounded-lg overflow-hidden"
        style={{
          aspectRatio: '4/3',
          maxWidth: '800px',
          maxHeight: '600px',
          opacity: showIntro || showGameOver ? 0.3 : 1,
          pointerEvents: showIntro || showGameOver ? 'none' : 'auto'
        }}
      />

      {/* Controles táctiles para móviles */}
      {!showIntro && !showGameOver && (
        <div className="mt-4 block md:hidden">
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <div></div>
            <button
              onTouchStart={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' })) }}
              onTouchEnd={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowUp' })) }}
              className="bg-blue-500 text-white p-3 rounded-lg active:bg-blue-600 text-xl font-bold"
              style={{ touchAction: 'manipulation' }}
            >
              ↑
            </button>
            <div></div>
            <button
              onTouchStart={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' })) }}
              onTouchEnd={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' })) }}
              className="bg-blue-500 text-white p-3 rounded-lg active:bg-blue-600 text-xl font-bold"
              style={{ touchAction: 'manipulation' }}
            >
              ←
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })) }}
              onTouchEnd={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' })) }}
              className="bg-blue-500 text-white p-3 rounded-lg active:bg-blue-600 text-xl font-bold"
              style={{ touchAction: 'manipulation' }}
            >
              ↓
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' })) }}
              onTouchEnd={(e) => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' })) }}
              className="bg-blue-500 text-white p-3 rounded-lg active:bg-blue-600 text-xl font-bold"
              style={{ touchAction: 'manipulation' }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
