import { some, keys, pick, pickBy, merge, values } from 'lodash'
import { AI } from './ai'
import { Vec2 } from '../vec2'
import { TileMap } from '../tile_map'
import { GuideRenderer } from '../guide_renderer'

export class PlayerAI extends AI {
  constructor(tileMap, actor) {
    super(tileMap, actor)
    this.guideRenderer = new GuideRenderer(tileMap, this.actor)
    this.actor.addChild(this.guideRenderer)
  }

  selectDirection(tilePosition) {
    super.selectDirection(tilePosition)
    this.guideRenderer.render(this.selectedDirection, '#27ae60')
  }

  beforeUpdate(nextTurn) {
    super.beforeUpdate(nextTurn)
  }

  afterUpdate(currentTurn) {
    super.afterUpdate(currentTurn)
    this.guideRenderer.clear()
    this.guideRenderer.render(this.availableDirections, '#cccccc')
  }
}
