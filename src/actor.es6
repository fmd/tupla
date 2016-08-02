import PIXI from 'pixi.js'
import { Vec2 } from './vec2'
import { AI } from './ai/ai'
import { ActionState } from './action_state'
import { GuideRenderer } from './guide_renderer'

export class Actor {
  constructor(tileMap, initialState) {
    initialState = initialState || { position: Vec2.create(),
                                     potential: Vec2.create(),
                                     speed: 1.0 }

    this.initializeState(tileMap, initialState)
  }

  initializeState(tileMap, initialState) {
    this.tileMap = tileMap
    this.actionState = new ActionState(initialState)
    this.container = new PIXI.Container()

    this.guideRenderer = new GuideRenderer(tileMap, this)
    this.addChild(this.guideRenderer)
    this.ai = new AI(tileMap, this)
  }

  addChild(child) {
    this.container.addChild(child)
  }

  removeChild(child) {
    this.container.removeChild(child)
  }

  get state() {
    return this.actionState.current
  }

  get potential() {
    return this.state.potential
  }

  get position() {
    return this.state.position
  }

  beforeUpdate(nextTurn) {}

  afterUpdate(currentTurn) {}

  beforeUpdateTurn(nextTurn) {
    this.ai.beforeUpdate(nextTurn)
    this.beforeUpdate(nextTurn)

    this.actionState.updateState(nextTurn, this.ai.determineState(this.state))
  }

  afterUpdateTurn(currentTurn) {
    this.guideRenderer.clear()
    this.container.position.x = this.state.position.x * this.tileMap.tileSize
    this.container.position.y = this.state.position.y * this.tileMap.tileSize

    this.afterUpdate(currentTurn)
    this.ai.afterUpdate(currentTurn)
  }
}
