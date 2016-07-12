export class Player extends PIXI.Container {
  constructor() {
    super()
    this.position = { x: 80, y: 60 }
    this.assets = ['./resources/detective_walk.json', './resources/detective_stand.png']
    this.direction = 'right'
    this.moving = false
    this.loaded = false
  }

  loadingDone() {
    this.walkFrames = []

    for (var i = 1; i <= 4; i++) {
      this.walkFrames.push(PIXI.Texture.fromFrame('detective_walk' + i + '.png'))
    }

    document.addEventListener('keydown', this.move.bind(this))
    document.addEventListener('keyup', this.stopMoving.bind(this))

    this.walk = new PIXI.extras.MovieClip(this.walkFrames);
    this.walk.anchor.set(0.5)
    this.walk.animationSpeed = 0.1

    this.stand = new PIXI.Sprite.fromImage('./resources/detective_stand.png')
    this.stand.anchor.set(0.5)
    this.addChild(this.stand)

    this.loaded = true
  }

  move(event) {
    if (!this.moving) {
      if (event.keyCode == 65) {
        this.direction = 'left'
        this.addChild(this.walk)
        this.removeChild(this.stand)
        this.walk.play()
        this.moving = true
      } else if (event.keyCode == 68) {
        this.direction = 'right'
        this.addChild(this.walk)
        this.removeChild(this.stand)
        this.walk.play()
        this.moving = true
      }
    }
  }

  update() {
      if (!this.loaded) {
        return
      }

      if (this.direction == 'right') {
        this.walk.scale.x = 1
        this.stand.scale.x = 1

        if (this.moving) {
          this.position.x += 0.2
        }
      } else if (this.direction == 'left') {
        this.walk.scale.x = -1
        this.stand.scale.x = -1

        if (this.moving) {
          this.position.x -= 0.2
        }
      }
  }

  stopMoving() {
    if (this.moving) {
      if (event.keyCode == 65) {
        this.removeChild(this.walk)
        this.addChild(this.stand)
        this.walk.stop()
        this.moving = false
      } else if (event.keyCode == 68) {
        this.removeChild(this.walk)
        this.addChild(this.stand)
        this.walk.stop()
        this.moving = false
      }
    }
  }
}
