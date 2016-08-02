import PIXI from 'pixi.js'
import { Vec2 } from './vec2'
import { map, values, filter, some } from 'lodash'
import { Color } from './color'
import { Actor } from './actor'
import { TileRenderer } from './tile_renderer'
import { EnemyAI } from './ai/enemy'

export class Enemy extends Actor {
  constructor(scene, tileMap, position) {
    super(tileMap, { position,
                     potential: Vec2.create(),
                     speed: 1.0 })

    this.ai = new EnemyAI(tileMap, this)
    this._drawEnemy()
    this._addToScene(scene)
  }

  _addToScene(scene) {
    this.guideRenderer.onlyShowSelected = true
    scene.addChild(this.container)
    scene.actors.push(this)
  }

  _drawEnemy() {
    const enemy = TileRenderer.drawColor(this.tileMap.tileSize, { x: 0, y: 0, width: 1, height: 1 }, '#dc4534')
    this.addChild(enemy)
  }
}
