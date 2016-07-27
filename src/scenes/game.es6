import { Scene } from '../scene'
import { TileMap } from '../tile_map'
import { flatten } from 'lodash'

export class GameScene extends Scene {
  constructor(window) {
    super(window)
    this.assets = flatten(['resources/maps/game.json'])
  }

  update() {
    super.update()
  }

  loadingDone(loader, resources) {
    super.loadingDone(loader, resources)
    let tile_map = new TileMap(resources, 'resources/maps/game.json')
    this.addChild(tile_map)
  }
}
