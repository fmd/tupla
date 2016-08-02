import PIXI from 'pixi.js'
import { Vec2 } from './vec2'
import { map, values, filter, some } from 'lodash'
import { Color } from './color'
import { Actor } from './actor'
import { TileRenderer } from './tile_renderer'
import { PlayerAI } from './ai/player'

export class Player extends Actor {
  constructor(scene, tileMap, position) {
    super(tileMap, { position,
                     potential: Vec2.create(),
                     speed: 1.0 })

    this.ai = new PlayerAI(tileMap, this)
    this._drawPlayer()
    this._addToScene(scene)
  }

  update() {
    this.updateCamera()
  }

  _addToScene(scene) {
    scene.addChild(this.container)
    scene.camera.lockOn(this.container, this.tileMap.tileSize, this.tileMap.tileSize)
    scene.actors.push(this)

    this.updateCamera = function() {
      scene.camera.update(scene)
    }.bind(scene)
  }

  _drawPlayer() {
    const player = TileRenderer.drawColor(this.tileMap.tileSize, { x: 0, y: 0, width: 1, height: 1 }, '#27ae60')
    this.addChild(player)
  }
}
