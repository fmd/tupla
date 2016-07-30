import PIXI from 'pixi.js'
import { AI } from './ai/ai'
import { ActionState } from './action_state'

export class Actor {
  constructor(tileMap, initialState) {
    initialState = initialState || { position: new PIXI.Point(0, 0),
                                     velocity: new PIXI.Point(0, 0),
                                     acceleration: new PIXI.Point(0, 0) }

    this.initializeState(tileMap, initialState)
  }

  initializeState(tileMap, initialState) {
    this.tileMap = tileMap
    this.actionState = new ActionState(initialState)
    this.ai = new AI(tileMap, this)
    this.container = new PIXI.Container()
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

  get position() {
    return this.state.position
  }

  beforeUpdate(nextTurn) {}

  afterUpdate(currentTurn) {}

  beforeUpdateTurn(nextTurn) {
    this.ai.beforeUpdate(nextTurn)
    this.beforeUpdate(nextTurn)
  }

  afterUpdateTurn(currentTurn) {
    this.container.position.x = this.state.position.x * this.tileMap.tileSize
    this.container.position.y = this.state.position.y * this.tileMap.tileSize

    this.afterUpdate(currentTurn)
    this.ai.afterUpdate(currentTurn)
  }
}
