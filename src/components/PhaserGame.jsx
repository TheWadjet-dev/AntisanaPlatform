import { useEffect, useRef } from 'react'
import Phaser from 'phaser'

class GameScene extends Phaser.Scene {
  constructor() {
    super('main')
  }

  preload() {
    this.load.image('condor', 'https://upload.wikimedia.org/wikipedia/commons/0/06/Andean_condor_flight.jpg')
    this.load.image('gotita', 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Water_drop_icon.png')
    this.load.image('nube', 'https://upload.wikimedia.org/wikipedia/commons/8/84/Gray_cloud_icon.png')
  }

  create() {
    this.score = 0
    this.condor = this.physics.add.image(400, 500, 'condor').setScale(0.1).setCollideWorldBounds(true)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.gotas = this.physics.add.group()
    this.nubes = this.physics.add.group()

    this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '20px', fill: '#2f855a' })

    this.physics.add.overlap(this.condor, this.gotas, this.collect, null, this)
    this.physics.add.overlap(this.condor, this.nubes, this.hit, null, this)

    this.time.addEvent({ delay: 1000, callback: this.spawnDrop, callbackScope: this, loop: true })
    this.time.addEvent({ delay: 1500, callback: this.spawnCloud, callbackScope: this, loop: true })
  }

  update() {
    if (this.cursors.left.isDown) this.condor.setVelocityX(-200)
    else if (this.cursors.right.isDown) this.condor.setVelocityX(200)
    else this.condor.setVelocityX(0)
  }

  spawnDrop() {
    const x = Phaser.Math.Between(50, 750)
    const drop = this.gotas.create(x, 0, 'gotita').setScale(0.05)
    drop.setVelocityY(200)
  }

  spawnCloud() {
    const x = Phaser.Math.Between(50, 750)
    const nube = this.nubes.create(x, 0, 'nube').setScale(0.07)
    nube.setVelocityY(150)
  }

  collect(condor, gota) {
    gota.destroy()
    this.score += 10
    this.scoreText.setText('Puntaje: ' + this.score)
  }

  hit(condor, nube) {
    this.scene.restart()
  }
}

export default function PhaserGame() {
  const containerRef = useRef()

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#e6fffa',
      parent: containerRef.current,
      physics: { default: 'arcade' },
      scene: [GameScene],
    }
    const game = new Phaser.Game(config)
    return () => game.destroy(true)
  }, [])

  return <div ref={containerRef} />
}