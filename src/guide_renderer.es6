import PIXI from 'pixi.js'
import { TileMap } from './tile_map'
import { TileRenderer } from './tile_renderer'
import { map, keys, mapValues } from 'lodash'

export class GuideRenderer extends PIXI.Container {
  constructor(tileMap, actor) {
    super()
    this.onlyShowSelected = false
    this.tileMap = tileMap
    this.actor = actor
    this.clear()
  }

  clear() {
    map(this.tiles, (t) => this.removeChild(t))
    this.tiles = mapValues(TileMap.directions, (d) => d = null)
  }

  render(tiles, color) {
    map(keys(tiles), (d) => {
      this.removeChild(this.tiles[d])
      if (!this.onlyShowSelected) this.tiles[d] = this._renderTile(tiles[d], color)
    })
  }

  _renderTile(tile, color) {
    const rect = { x: tile.x, y: tile.y, width: 1, height: 1 }
    const renderedTile = TileRenderer.drawColor(this.tileMap.tileSize, rect, color, 0.5)
    this.addChild(renderedTile)
    return renderedTile
  }
}
