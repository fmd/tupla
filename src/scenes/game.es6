import PIXI from 'pixi.js'
import { Scene } from '../scene'
import { TileMap } from '../tile_map'
import { Player } from '../player'
import { flatten } from 'lodash'

export class GameScene extends Scene {
  constructor(window, interaction) {
    super(window, interaction)
    this.assets = flatten(['resources/maps/game.json'])
    this.initializeInteractions()
  }

  initializeInteractions() {
    this.interaction.onMouseDown = function(e) {
      let p = new PIXI.Point(e.layerX, e.layerY)
      this.player.moveTo(this.tileMap.pointAtWorldPoint(this.screenPointToWorld(p)))
    }.bind(this)

    this.interaction.addEvents()
  }

  update() {
    super.update()
    if (!this.loaded) {
      return
    }
  }

  loadingDone(loader, resources) {
    super.loadingDone(loader, resources)

    this.tileMap = new TileMap(resources, 'resources/maps/game.json')
    this.player = new Player(this.tileMap, new PIXI.Point(2, 2))
    this.camera.lockArea(this.player, new PIXI.Rectangle(0, 0, 16, 12))

    this.addChild(this.tileMap)
    this.addChild(this.player)
  }
}
