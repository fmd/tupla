import PIXI from 'pixi.js'
import { map } from 'lodash'
import { Color } from './color'

export class TileRenderer {
  static drawColor(tileSize, rect, color) {
    let graphic = new PIXI.Graphics()
    graphic.beginFill(Color.toHex(color))
    graphic.drawRect(...map([rect.x, rect.y, rect.width, rect.height], (n) => n *= tileSize))
    return graphic
  }
}
