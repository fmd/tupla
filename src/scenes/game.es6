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
      let t = this.tileMap.pointAtWorldPoint(this.screenPointToWorld(p))
      this.player.moveTo(t)
      this.player.jumpFrom(t)
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
    this.player = new Player(this.tileMap, new PIXI.Point(1, 5))
    //this.camera.lockArea(this.player, new PIXI.Rectangle(0, 0, 16, 12))
    this.camera.lockOn(this.player)
    this.addChild(this.tileMap)
    this.addChild(this.player)
  }
}
