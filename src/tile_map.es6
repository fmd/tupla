import PIXI from 'pixi.js'
import { TileLayer } from './tile_layer'
import { map, max, some, uniq, flatten } from 'lodash'

export class TileMap extends PIXI.Container {
  constructor(resources, file) {
    super()
    const resource = resources[file].data
    this.palette = resource.palette
    this.tileSize = resource.tileSize
    this.layers = map(resource.layers, (layer) => new TileLayer(this, layer.tiles))
  }

  hasTagAt(point, tag) {
    const collisions = map(this.layers, (layer) => layer.hasTagAt(point, tag))
    return some(collisions)
  }

  allTagsAt(point) {
    const tags = map(this.layers, (layer) => layer.tagsAt(point))
    return uniq(flatten(tags))
  }

  tilePointAt(point) {
    const x = (point.x - this.position.x) / this.tileSize
    const y = (point.y - this.position.y) / this.tileSize
    return new PIXI.Point(Math.floor(x), Math.floor(y))
  }
}
