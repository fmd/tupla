import PIXI from 'pixi.js'

export class Player extends PIXI.Container {
  constructor(tileMap, tile) {
    super()
    this.tileMap = tileMap
    this.tile = tile

    let graphic = new PIXI.Graphics()
    graphic.beginFill(this.toHex('#27ae60'))
    graphic.drawRect(0, 0, this.tileMap.tileSize, this.tileMap.tileSize)
    this.addChild(graphic)

    this.moveTo(tile)
  }

  toHex(str) {
    return parseInt(str.replace(/^#/, ''), 16)
  }

  moveTo(tile) {
    this.position.x = tile.x * this.tileMap.tileSize
    this.position.y = tile.y * this.tileMap.tileSize
  }
}
