import PIXI from 'pixi.js'
import { map, includes, cloneDeep, reduce, flatten, slice, findIndex, range } from 'lodash'
import { Color } from './color'
import { TileRenderer } from './tile_renderer'

export class TileLayer extends PIXI.Container {

  // Public
  constructor(tileMap, tiles) {
    super()
    this._drawTiles(tileMap, tiles)
    tileMap.addChild(this)
  }

  tagsAt(point) {
    if (!this._withinBoundsAt(point)) return []
    const paletteKey = this.tiles[point.y][point.x].toString()
    return this.palette[paletteKey] && this.palette[paletteKey]['tags'] || []
  }

  hasTagAt(point, tag) {
    return includes(this.tagsAt(point), tag)
  }

  // Private
  _drawTiles(tileMap, tiles) {
    map(this._findRectangles(tiles), (rect) => {
      const color = tileMap.palette[rect.tileValue.toString()].color
      this.addChild(TileRenderer.drawColor(tileMap.tileSize, rect, color))
    })
  }

  _withinBoundsAt(point) {
    return (point.x >= 0 && point.x < this.tiles[0].length && point.y >= 0 && point.y < this.tiles.length)
  }

  _findRectangles(srcTiles) {
    let rects = []
    let tiles = cloneDeep(srcTiles)

    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        const tile = tiles[y][x]
        if (tile == 0) continue
        const width = this._rectWidth(tiles, x, y, tile)
        const height = this._rectHeight(tiles, x, y, width, tile)
        this._zeroRectangle(tiles, x, y, width, height)
        rects.push({ x, y, width, height, tileValue: tile })
      }
    }

    return rects
  }

  _zeroRectangle(tiles, x, y, width, height) {
    for (let fy = y; fy < y + height; fy++) {
      for (let fx = x; fx < x + width; fx++) {
        tiles[fy][fx] = 0
      }
    }
  }

  _rectWidth(tiles, x, y, tileValue) {
    const row = tiles[y]
    const end = findIndex(row, (t) => t != tileValue, x)
    return slice(row, x, end > 0 ? end : row.length).length
  }

  _rectHeight(tiles, x, y, width, tileValue) {
    const end = findIndex(range(tiles.length), (i) => width != this._rectWidth(tiles, x, i, tileValue), y)
    return slice(tiles, y, end > 0 ? end : tiles.length).length
  }
}
