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

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
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
      this.add.rectangle(400, 300, 800, 600, 0xcceeff)

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

      condor = this.physics.add.sprite(400, 500, 'condor', 0).play('fly')
      condor.setScale(3)
      condor.setCollideWorldBounds(true)



      cursors = this.input.keyboard.createCursorKeys()

      for (let i = 0; i < 6; i++) {
        const drop = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(-300, 0), 'drop')
        drop.setScale(0.8)
        drop.play('drip')
        drop.setVelocityY(Phaser.Math.Between(80, 120))
        drops.push(drop)
        this.physics.add.overlap(condor, drop, () => collectDrop(this, drop))
      }

      for (let i = 0; i < 4; i++) {
        const cloud = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(-300, 0), 'cloud')
        cloud.setScale(0.6)
        cloud.play('cloudLoop')
        cloud.setVelocityY(Phaser.Math.Between(40, 70))
        clouds.push(cloud)
        this.physics.add.overlap(condor, cloud, () => hitCloud(this, cloud))
      }

      scoreText = this.add.text(20, 20, 'Puntos: 0', { font: '20px Arial', fill: '#000' })
      livesText = this.add.text(20, 50, 'Vidas: 3', { font: '20px Arial', fill: '#000' })
      gameOverText = this.add.text(400, 300, '', { font: '32px Arial', fill: 'red' }).setOrigin(0.5)
    }

    function update() {
      if (lives <= 0) return

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
        if (drop.y > 600) {
          drop.y = -50
          drop.x = Phaser.Math.Between(100, 700)
        }
      })

      clouds.forEach((cloud) => {
        if (cloud.y > 600) {
          cloud.y = -50
          cloud.x = Phaser.Math.Between(100, 700)
        }
      })
    }

    function collectDrop(scene, drop) {
      score++
      collectSound.play()
      scoreText.setText('Puntos: ' + score)
      drop.y = -50
      drop.x = Phaser.Math.Between(100, 700)
    }

    function hitCloud(scene, cloud) {
  if (lives <= 0) return

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
      cloud.enableBody(true, Phaser.Math.Between(100, 700), -50, true, true)
      cloud.setVelocityY(Phaser.Math.Between(40, 70))
    })
  }
    }


    return () => {
      game.destroy(true)
    }
  }, [showIntro, showGameOver])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {showIntro && (
        <div className="absolute inset-0 z-20 bg-white bg-opacity-95 flex flex-col justify-center items-center text-center p-8">
          <h2 className="text-3xl font-bold mb-4">Bienvenido al juego Cóndor Guardián</h2>
          <p className="mb-2">🕹️ Usa las flechas del teclado para mover al cóndor.</p>
          <p className="mb-2">💧 Atrapa gotas de agua para sumar puntos.</p>
          <p className="mb-4">☁️ Evita las nubes contaminantes, ¡pierdes vidas!</p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
          >
            Jugar
          </button>
        </div>
      )}

      {showGameOver && (
        <div className="absolute inset-0 z-20 bg-black bg-opacity-80 text-white flex flex-col justify-center items-center text-center p-8">
          <h2 className="text-3xl font-bold mb-4">🎮 Fin del juego</h2>
          <p className="mb-2">Puntaje: {lastScore}</p>
          <p className="mb-4">Puntaje máximo: {highScore}</p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      )}

      <div
        ref={gameRef}
        style={{
          width: '800px',
          height: '600px',
          margin: '0 auto',
          opacity: showIntro || showGameOver ? 0.3 : 1,
          pointerEvents: showIntro || showGameOver ? 'none' : 'auto'
        }}
      />
    </div>
  )
}
