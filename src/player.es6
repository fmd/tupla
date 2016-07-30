import PIXI from 'pixi.js'
import { Vec2 } from './vec2'
import { map, values, filter, some } from 'lodash'
import { Color } from './color'
import { Actor } from './actor'
import { TileRenderer } from './tile_renderer'
import { TurnTicker } from './turn_ticker'
import { PlayerAI } from './ai/player'

export class Player extends Actor {
  constructor(scene, tileMap, position) {
    super(tileMap, { position, acceleration: Vec2.create(0,0), velocity: Vec2.create(0,0) })
    this.ai = new PlayerAI(tileMap, this)
    this._drawPlayer()
    this._addToScene(scene)
  }

  requestMove(position) {
    this.ai.injectVelocity(position.clone().subtract(this.position))
    this._drawSelectedTile(position)
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

  _drawVelocityTile() {
    if (this.velocityTile) this.suggestionsContainer.removeChild(this.velocityTile)
    const inAvailableTiles = some(values(this.ai.availableMoves), (p) => p.equals(this.velocity.clone().add(this.position)))
    if (!inAvailableTiles) return
    const rect = { x: this.velocity.x, y: this.velocity.y, width: 1, height: 1 }
    this.velocityTile = TileRenderer.drawColor(this.tileMap.tileSize, rect, '#ffffff', 0.3)
    this.suggestionsContainer.addChild(this.velocityTile)
  }

  _drawSelectedTile(position) {
    if (this.selectedTile) this.suggestionsContainer.removeChild(this.selectedTile)
    const inAvailableTiles = some(values(this.ai.availableMoves), (p) => p.equals(position))
    if (!inAvailableTiles) return
    const placePosition = position.clone().subtract(this.position)
    const rect = { x: placePosition.x, y: placePosition.y, width: 1, height: 1 }
    this.selectedTile = TileRenderer.drawColor(this.tileMap.tileSize, rect, '#27ae60', 0.3)
    this.suggestionsContainer.addChild(this.selectedTile)
  }

  _drawSuggestionTile(position) {
    const rect = { x: position.x - this.position.x, y: position.y - this.position.y, width: 1, height: 1 }
    const tile = TileRenderer.drawColor(this.tileMap.tileSize, rect, '#ffffff', 0.3)
    this.suggestionsContainer.addChild(tile)
  }

  beforeUpdate() {}

  afterUpdate() {
    this.updateCamera()
    this._drawSuggestionTiles()
    this._drawVelocityTile()
  }
}
