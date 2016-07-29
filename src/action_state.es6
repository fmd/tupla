import { map } from 'lodash'
import { TurnTicker } from './turn_ticker'

export class ActionState {
  constructor(state) {
    this.initialTurn = TurnTicker.currentTurn
    this.stateHistory = new Array()
    this.updateState(TurnTicker.currentTurn, state)
  }

  updateState(turn, state) {
    const index = turn - this.initialTurn
    if (this.stateHistory[index] == undefined) {
      this.stateHistory[index] = state
    }
  }

  stateAt(turn) {
    return this.stateHistory[turn - this.initialTurn] || this.stateHistory[this.stateHistory.length - 1]
  }

  get currentState() {
    return this.stateHistory[TurnTicker.currentTurn - this.initialTurn] || this.stateHistory[this.stateHistory.length - 1]
  }

  get lastState() {
    const index = clamp(TurnTicker.currentTurn - this.initialTurn - 1, 0, this.stateHistory.length - 1)
    return this.stateHistory[index]
  }
}
