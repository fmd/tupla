import PIXI from 'pixi.js'
import { TileLayer } from './tile_layer'
import { map, max, some } from 'lodash'

export class TileMap extends PIXI.Container {
  constructor(resources, file) {
    super()
    let resource = resources[file].data
    this.palette = resource.palette
    this.tileSize = resource.tileSize
    this.layers = map(resource.layers, this.createTileLayer.bind(this))
  }

  get tilesX() {
    return max(map(this.layers, (layer) => { return layer.tiles[0].length }))
  }

  get tilesY() {
    return max(map(this.layers, (layer) => { return layer.tiles.length }))
  }

  anyLayersCollide(point) {
    let collisions = map(this.layers, (layer) => { return layer.tileCollides(point) })
    return some(collisions)
  }

  createTileLayer(layer) {
    return new TileLayer(this, this.tileSize, this.palette, layer.tiles)
  }

  tilesAtMouse(point) {
    return this.tilesAtPoint(this.pointAtWorldPoint(point))
  }

  pointAtWorldPoint(point) {
    let x = (point.x - this.position.x) / this.tileSize
    let y = (point.y - this.position.y) / this.tileSize
    return new PIXI.Point(Math.floor(x), Math.floor(y))
  }

  tilesAtPoint(point) {
    return map(this.layers, (layer) => { return layer.tileAtPoint(point) })
  }
}
