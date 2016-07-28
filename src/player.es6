import PIXI from 'pixi.js'
import { map, some, filter, concat, uniqWith, isEqual } from 'lodash'
import { Color } from './color'
import { Movement } from './movement'
import { TileRenderer } from './tile_renderer'

export class Player extends PIXI.Container {
  constructor(tileMap, tile) {
    super()
    this.tileMap = tileMap
    this.addChild(TileRenderer.drawColor(tileMap.tileSize, { x: 0, y: 0, width: 1, height: 1 }, '#27ae60'))
  }

  // drawSuggestionTiles(color, tiles) {
  //   if (!this.availableTileGraphics[color]) {
  //     this.availableTileGraphics[color] = []
  //   } else {
  //     map(this.availableTileGraphics[color], (graphic) => { this.removeChild(graphic) })
  //   }
  //
  //   let suggestions = tiles
  //
  //   for (let key in suggestions) {
  //     let tile = suggestions[key]
  //
  //     if (tile.x == this.tile.x && tile.y == this.tile.y) {
  //       continue
  //     }
  //
  //     let graphic = new PIXI.Graphics()
  //     graphic.beginFill(Color.toHex(color))
  //     graphic.fillAlpha = 0.25
  //     graphic.drawRect((tile.x - this.tile.x) * this.tileMap.tileSize,
  //                      (tile.y - this.tile.y) * this.tileMap.tileSize,
  //                      this.tileMap.tileSize,
  //                      this.tileMap.tileSize)
  //
  //     this.availableTileGraphics[color].push(graphic)
  //     this.addChild(graphic)
  //   }
  // }

  // moveTo(tile) {
  //   if (!some(this.availableTiles, (avail) => { return (avail.x == tile.x && avail.y == tile.y) })) {
  //     return
  //   }
  //
  //   this.position.x = tile.x * this.tileMap.tileSize
  //   this.position.y = tile.y * this.tileMap.tileSize
  //
  //   this.tile = tile
  //   this.calculateJumpTiles()
  //   this.calculateAvailableTiles()
  //   this.drawSuggestionTiles('#ffffff', this.availableTiles)
  //   this.drawSuggestionTiles('#3498db', this.jumpTiles)
  // }

  // jumpFrom(tile) {
  //   if (!some(this.jumpTiles, (avail) => { return (avail.x == tile.x && avail.y == tile.y) })) {
  //     return
  //   }
  //
  //   this.jump = new Jump(2, this.tile)
  //   this.calculateAvailableTiles()
  //   this.drawSuggestionTiles('#ffffff', this.availableTiles)
  //   this.drawSuggestionTiles('#3498db', this.jumpTiles)
  // }

  // calculateJumpTiles() {
  //   let jumps = []
  //   jumps.push(new PIXI.Point(this.tile.x, this.tile.y + 1))
  //   jumps = filter(jumps, (t) => { return this.tileMap.anyLayersHaveTagAt(t, 'collides') })
  //
  //   if (this.jump) {
  //     this.jump.updatePosition(this.tile)
  //   }
  //
  //   this.jumpTiles = jumps
  // }

  // calculateAvailableTiles() {
  //   let availables = []
  //
  //   // if (this.jumpTiles.length == 0) {
  //   //   if (!this.jump) {
  //   //     this.jump = new Jump(-1, this.tile)
  //   //     availables = concat(availables, this.jump.availableTiles)
  //   //   }
  //   // } else if (this.jump && this.jump.power < this.jump.stage) {
  //   //   this.jump = null
  //   // }
  //
  //   if (this.jump) {
  //     availables = concat(availables, this.jump.availableTiles)
  //   } else {
  //     availables.push(new PIXI.Point(this.tile.x, this.tile.y))
  //     availables.push(new PIXI.Point(this.tile.x - 1, this.tile.y))
  //     availables.push(new PIXI.Point(this.tile.x + 1, this.tile.y))
  //   }
  //   console.log(availables)
  //   availables = filter(availables, (t) => { return !this.tileMap.anyLayersHaveTagAt(t, 'collides') })
  //   this.availableTiles = uniqWith(availables, (a, b) => { return a.x == b.x && a.y == b.y })
  // }
}
