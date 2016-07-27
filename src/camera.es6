import PIXI from 'pixi.js'

export class Camera extends PIXI.Point {
  constructor(x, y, screenWidth, screenHeight) {
    super(x, y)
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.target = null
    this.lockRect = null
    this.lockMethod = null
  }

  offsetMousePosition(point) {
    return new PIXI.Point(this.x + point.x, this.y + point.y)
  }

  update(scene) {
    if (this.target && this.lockMethod) {
      this.lockMethod()
    }

    scene.position.x = -this.x
    scene.position.y = -this.y
  }

  lockOn(target) {
    this.target = target
    this.lockMethod = this._lockOn.bind(this)
  }

  lockArea(target, rect) {
    this.target = target
    this.lockRect = rect

    this._lockOn()
    this.lockMethod = this._lockArea.bind(this)
  }

  _lockOn() {
    this.x = this.lockX
    this.y = this.lockY
  }

  get lockX() {
    return this.target.position.x - (this.screenWidth - this.target.width) / 2
  }

  get lockY() {
    return this.target.position.y - (this.screenHeight - this.target.height) / 2
  }

  _lockArea() {
    let targetX = (this.target.x + this.target.width / 2)
    let targetY = (this.target.y + this.target.height / 2)

    let rectWidth = this.lockRect.width
    let rectHeight = this.lockRect.height

    let centeredX = this.x + this.screenWidth / 2
    let centeredY = this.y + this.screenHeight / 2

    if (centeredX < targetX - rectWidth / 2) {
      this.x = this.lockX - rectWidth / 2
    } else if (centeredX > targetX + rectWidth / 2) {
      this.x = this.lockX + rectWidth / 2
    }

    if (centeredY < targetY - rectHeight / 2) {
      this.y = this.lockY - rectHeight / 2
    } else if (centeredY > targetY + rectHeight / 2) {
      this.y = this.lockY + rectHeight / 2
    }
  }
}
