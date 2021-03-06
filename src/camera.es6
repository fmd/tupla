import PIXI from 'pixi.js'
import { Vec2 } from './vec2'

export class Camera extends Vec2 {
  constructor(x, y, screenWidth, screenHeight) {
    super(x, y)
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.target = null
    this.lockRect = null
    this.lockMethod = null
  }

  offsetMousePosition(point) {
    return Vec2.create(this.x + point.x, this.y + point.y)
  }

  update(scene) {
    if (this.target && this.lockMethod) {
      this.lockMethod()
    }

    scene.position.x = -this.x
    scene.position.y = -this.y
  }

  lockOn(target, fixedWidth, fixedHeight) {
    this.target = target
    this.targetWidth = fixedWidth || this.target.width
    this.targetHeight = fixedHeight || this.target.height
    this.lockMethod = this._lockOn.bind(this)
  }

  lockArea(target, rect, fixedWidth, fixedHeight) {
    this.target = target
    this.targetWidth = fixedWidth || this.target.width
    this.targetHeight = fixedHeight || this.target.height

    this.lockRect = rect

    this._lockOn()
    this.lockMethod = this._lockArea.bind(this)
  }

  _lockOn() {
    this.x = this.lockX
    this.y = this.lockY
  }

  get lockX() {
    return this.target.position.x - (this.screenWidth - this.targetWidth) / 2
  }

  get lockY() {
    return this.target.position.y - (this.screenHeight - this.targetHeight) / 2
  }

  _lockArea() {
    let targetX = (this.target.x + this.targetWidth / 2)
    let targetY = (this.target.y + this.targetHeight / 2)

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
