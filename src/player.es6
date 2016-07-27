import PIXI from 'pixi.js'
import { map, some, compact, filter } from 'lodash'

export class Player extends PIXI.Container {
  constructor(tileMap, tile) {
    super()
    this.tileMap = tileMap
    this.availableTileGraphics = []
    this.drawPlayer()
    this.tile = tile
    this.calculateAvailableTiles()
    this.moveTo(tile)
  }

  drawPlayer() {
    let graphic = new PIXI.Graphics()
    graphic.beginFill(this.toHex('#27ae60'))
    graphic.drawRect(0, 0, this.tileMap.tileSize, this.tileMap.tileSize)
    this.addChild(graphic)
  }

  drawAvailableTiles() {
    map(this.availableTileGraphics, (graphic) => { this.removeChild(graphic) })
    this.availableTileGraphics = []
    let available = this.availableTiles

    for (let key in available) {
      let tile = available[key]

      if (tile.x == this.tile.x && tile.y == this.tile.y) {
        continue
      }

      let graphic = new PIXI.Graphics()
      graphic.beginFill(this.toHex('#ffffff'))
      graphic.fillAlpha = 0.25
      graphic.drawRect((tile.x - this.tile.x) * this.tileMap.tileSize,
                       (tile.y - this.tile.y) * this.tileMap.tileSize,
                       this.tileMap.tileSize,
                       this.tileMap.tileSize)

      this.availableTileGraphics.push(graphic)
      this.addChild(graphic)
    }
  }

  toHex(str) {
    return parseInt(str.replace(/^#/, ''), 16)
  }

  moveTo(tile) {
    if (!some(this.availableTiles, (avail) => { return (avail.x == tile.x && avail.y == tile.y) })) {
      return
    }

    this.position.x = tile.x * this.tileMap.tileSize
    this.position.y = tile.y * this.tileMap.tileSize

    this.tile = tile
    this.calculateAvailableTiles()
    this.drawAvailableTiles()
  }

  calculateAvailableTiles() {
    let availableTiles = []

    availableTiles.push(new PIXI.Point(this.tile.x, this.tile.y))
    availableTiles.push(new PIXI.Point(this.tile.x - 1, this.tile.y))
    availableTiles.push(new PIXI.Point(this.tile.x + 1, this.tile.y))
    availableTiles.push(new PIXI.Point(this.tile.x, this.tile.y - 1))
    availableTiles.push(new PIXI.Point(this.tile.x, this.tile.y + 1))

    this.availableTiles = filter(availableTiles, (t) => { return !this.tileMap.anyLayersHaveTagAt(t, 'collides') })
    console.log('---')
    console.log(this.availableTiles)
  }
}
