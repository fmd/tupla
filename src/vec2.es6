import Vec2D from 'vector2d'
import { clamp } from 'lodash'

export class Vec2 {
  static create(x, y) {
    if (x == undefined) x = 0
    if (y == undefined) y = 0
    return new Vec2D.ObjectVector(x, y)
  }

  static clamp(v, min, max) {
    v.x = clamp(v.x, min, max)
    v.y = clamp(v.y, min, max)
    return v
  }
}
