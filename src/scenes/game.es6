import PIXI from 'pixi.js'
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
    if (!this.loaded) {
      return
    }

    this.tileMap.position.x += 0.1
  }

  loadingDone(loader, resources) {
    super.loadingDone(loader, resources)

    this.tileMap = new TileMap(resources, 'resources/maps/game.json')
    this.camera.lockArea(this.tileMap, new PIXI.Rectangle(0, 0, 32, 32))

    this.tileMap2 = new TileMap(resources, 'resources/maps/game.json')
    this.tileMap2.position.x += 10

    this.addChild(this.tileMap)
    this.addChild(this.tileMap2)
  }
}
