import PIXI from 'pixi.js'
import { AI } from './ai/ai'
import { ActionState } from './action_state'

export class Actor {
  constructor(tileMap, initialState) {
    initialState = initialState || { point: new PIXI.Point(0, 0),
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

  get position() {
    return this.actionState.current.point
  }

  get directions() {
    const p = this.position
    return { center: p,
             up:     new PIXI.Point(p.x, p.y - 1),
             down:   new PIXI.Point(p.x, p.y + 1),
             left:   new PIXI.Point(p.x - 1, p.y),
             right:  new PIXI.Point(p.x + 1, p.y) }
  }

  addChild(child) {
    this.container.addChild(child)
  }

  beforeUpdate(nextTurn) {}

  afterUpdate(currentTurn) {}

  beforeUpdateTurn(nextTurn) {
    this.ai.beforeUpdate(nextTurn)
    this.beforeUpdate(nextTurn)
  }

  afterUpdateTurn(currentTurn) {
    this.container.position.x = this.position.x * this.tileMap.tileSize
    this.container.position.y = this.position.y * this.tileMap.tileSize

    this.afterUpdate(currentTurn)
    this.ai.afterUpdate(currentTurn)
  }
}
