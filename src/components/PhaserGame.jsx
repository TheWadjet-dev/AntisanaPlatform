import { useEffect, useRef } from 'react'
import Phaser from 'phaser'

export default function PhaserGame() {
  const gameRef = useRef(null)

  useEffect(() => {
    if (gameRef.current.innerHTML !== '') return

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

    let condor
    let clouds = []
    let drops = []

    const game = new Phaser.Game(config)

    function preload() {
      this.load.spritesheet('condor', '/sprites/bird_condor.png', {
        frameWidth: 128,
        frameHeight: 128
      })
      this.load.spritesheet('drop', '/sprites/water_drop.png', {
        frameWidth: 64,
        frameHeight: 64
      })
      this.load.spritesheet('cloud', '/sprites/smoke_loop.png', {
        frameWidth: 128,
        frameHeight: 128
      })
    }

    function create() {
      this.add.rectangle(400, 300, 800, 600, 0xcceeff)

      this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('condor', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
      })

      this.anims.create({
        key: 'drip',
        frames: this.anims.generateFrameNumbers('drop', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1
      })

      this.anims.create({
        key: 'cloudLoop',
        frames: this.anims.generateFrameNumbers('cloud', { start: 0, end: 14 }),
        frameRate: 6,
        repeat: -1
      })

      condor = this.physics.add.sprite(400, 500, 'condor').play('fly')
      condor.setCollideWorldBounds(true)

      for (let i = 0; i < 3; i++) {
        const cloud = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(50, 150), 'cloud')
        cloud.play('cloudLoop')
        cloud.setVelocityX(Phaser.Math.Between(-40, 40))
        clouds.push(cloud)
      }

      for (let i = 0; i < 5; i++) {
        const drop = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(-300, 0), 'drop')
        drop.play('drip')
        drop.setVelocityY(Phaser.Math.Between(50, 100))
        drops.push(drop)
      }

      this.cursors = this.input.keyboard.createCursorKeys()
    }

    function update() {
      if (this.cursors.left.isDown) condor.setVelocityX(-200)
      else if (this.cursors.right.isDown) condor.setVelocityX(200)
      else condor.setVelocityX(0)

      if (this.cursors.up.isDown) condor.setVelocityY(-200)
      else if (this.cursors.down.isDown) condor.setVelocityY(200)
      else condor.setVelocityY(0)

      drops.forEach((drop) => {
        if (drop.y > 600) {
          drop.y = -50
          drop.x = Phaser.Math.Between(100, 700)
        }
      })

      clouds.forEach((cloud) => {
        if (cloud.x < 0 || cloud.x > 800) {
          cloud.setVelocityX(-cloud.body.velocity.x)
        }
      })
    }

    return () => {
      game.destroy(true)
    }
  }, [])

  return <div ref={gameRef} style={{ width: '800px', height: '600px', margin: '0 auto' }} />
}
