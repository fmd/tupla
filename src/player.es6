import PIXI from 'pixi.js'
import { map, values, filter } from 'lodash'
import { Color } from './color'
import { Actor } from './actor'
import { TileRenderer } from './tile_renderer'
import { TurnTicker } from './turn_ticker'
import { PlayerAI } from './ai/player'

export class Player extends Actor {
  constructor(scene, tileMap, position) {
    super(tileMap, { position, acceleration: new PIXI.Point(0,0), velocity: new PIXI.Point(0,0) })
    this.ai = new PlayerAI(tileMap, this)
    this._drawPlayer()
    this._addToScene(scene)
    this._drawSuggestionTiles()
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

  _drawSuggestionTiles() {
    if (this.suggestionsContainer) this.removeChild(this.suggestionsContainer)
    this.suggestionsContainer = new PIXI.Container()
    const tiles = filter(values(this.ai.availableMoves), (p) => !p.equals(this.position))
    map(tiles, this._drawSuggestionTile.bind(this))
    this.addChild(this.suggestionsContainer)
  }

  _drawSuggestionTile(position) {
    const rect = { x: position.x - this.position.x, y: position.y - this.position.y, width: 1, height: 1 }
    const tile = TileRenderer.drawColor(this.tileMap.tileSize, rect, '#ffffff', 0.5)
    this.suggestionsContainer.addChild(tile)
  }

  beforeUpdate() {}

  afterUpdate() {
    this.updateCamera()
    this._drawSuggestionTiles()
  }
}
