import PIXI from 'pixi.js'
import { map } from 'lodash'

export class Jump {
  constructor(power, playerTile) {
    this.power = power
    this.stage = 0
    this.playerTile = playerTile
  }

  updatePosition(playerTile) {
    this.stage += 1
    this.playerTile = playerTile
  }

  get availableTiles() {
    if (this.power > this.stage) {
      return this.createPoints([{ x: -1, y: -1 },
                                { x: 0, y: -1 },
                                { x: 1, y: -1 }])
    } else if (this.power == this.stage) {
      return this.createPoints([{ x: -1, y: 0 },
                                { x: 0, y: 0 },
                                { x: 1, y: 0 }])
    } else {
      return this.createPoints([{ x: -1, y: +1 },
                                { x: 0, y: +1 },
                                { x: 1, y: +1 }])
    }
  }

  createPoints(points) {
    return map(points, (p) => { return new PIXI.Point(this.playerTile.x + p.x, this.playerTile.y + p.y) })
  }
}
