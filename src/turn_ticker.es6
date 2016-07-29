import { Scene } from './scene'
import { map, clamp } from 'lodash'

export class TurnTicker {
  constructor(turnTime) {
    this.turnTime = turnTime
    this.currentTime = turnTime
  }

  update(actors) {
    this.currentTime += Scene.deltaTime
    if (this.currentTime >= this.turnTime) {
      const turn = clamp(TurnTicker.currentTurn + 1, 0, Number.MAX_SAFE_INTEGER)
      map(actors, (a) => a.beforeUpdateTurn(turn))
      this._flipTurn(turn)
      map(actors, (a) => a.afterUpdateTurn(turn))
    }
  }

  _flipTurn(turn) {
    this.currentTime = 0.0
    TurnTicker.currentTurn = turn
    TurnTicker.totalTurns += 1
  }
}

TurnTicker.totalTurns = 0
TurnTicker.currentTurn = 0
