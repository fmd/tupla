import PIXI from 'pixi.js'
import { map, some, filter, concat, uniqWith, isEqual } from 'lodash'
import { Color } from './color'
import { Actor } from './actor'
import { TileRenderer } from './tile_renderer'
import { TurnTicker } from './turn_ticker'
import { PlayerAI } from './ai/player'

export class Player extends Actor {
  constructor(scene, tileMap, point) {
    super(tileMap, { point, acceleration: new PIXI.Point(0,0), velocity: new PIXI.Point(0,0) })
    this.ai = new PlayerAI(tileMap, this)
    this.addToScene(scene)
    this.addChild(TileRenderer.drawColor(tileMap.tileSize, { x: 0, y: 0, width: 1, height: 1 }, '#27ae60'))
  }

  addToScene(scene) {
    scene.camera.lockOn(this.container)
    scene.addChild(this.container)
    scene.actors.push(this)

    this.updateCamera = function() {
      scene.camera.update(scene)
    }.bind(scene)
  }

  beforeUpdate() {}

  afterUpdate() {
    this.updateCamera()
  }
}
