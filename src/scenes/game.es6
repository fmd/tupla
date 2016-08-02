import PIXI from 'pixi.js'
import { Vec2 } from '../vec2'
import { Scene } from '../scene'
import { TileMap } from '../tile_map'
import { Player } from '../player'
import { flatten } from 'lodash'
import { TurnTicker } from '../turn_ticker'

export class GameScene extends Scene {
  constructor(window, interaction) {
    super(window, interaction)
    this.assets = flatten(['resources/maps/game.json'])
    this.initializeInteractions()

    this.actors = []
    this.turnTicker = new TurnTicker(1000)
  }

  initializeInteractions() {
    this.interaction.onMouseDown = function(e) {
      let p = Vec2.create(e.layerX, e.layerY)
      let t = this.tileMap.tilePointAt(this.screenPointToWorld(p))
      this.player.ai.select(t)
    }.bind(this)

    this.interaction.addEvents()
  }

  update() {
    super.update()
    if (!this.loaded) return
    this.turnTicker.update(this.actors)
  }

  loadingDone(loader, resources) {
    super.loadingDone(loader, resources)

    this.tileMap = new TileMap(resources, 'resources/maps/game.json')
    this.addChild(this.tileMap)

    this.player = new Player(this, this.tileMap, Vec2.create(1, 1))
    this.camera.update(this)
  }
}
