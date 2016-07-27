import { TileLayer } from './tile_layer'
import { map } from 'lodash'

export class TileMap extends PIXI.Container {
  constructor(resources, file) {
    super()
    let resource = resources[file].data
    this.palette = resource.palette
    this.tileSize = resource.tileSize
    this.layers = map(resource.layers, this.createTileLayer.bind(this))
  }

  createTileLayer(layer) {
    return new TileLayer(this, this.tileSize, this.palette, layer.tiles)
  }
}
