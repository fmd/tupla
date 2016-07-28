import PIXI from 'pixi.js'

export class Movement {
  constructor(actor, tileMap) {
    this.actor = actor
    this.tileMap = tileMap
    this.actions = []
  }

  get upTags() {
    return this.tileMap.allTagsAt(new PIXI.Point(this.actor.tile.x, this.actor.tile.y - 1))
  }

  get downTags() {
    return this.tileMap.allTagsAt(new PIXI.Point(this.actor.tile.x, this.actor.tile.y + 1))
  }

  get leftTags() {
    return this.tileMap.allTagsAt(new PIXI.Point(this.actor.tile.x - 1, this.actor.tile.y))
  }

  get rightTags() {
    return this.tileMap.allTagsAt(new PIXI.Point(this.actor.tile.x + 1, this.actor.tile.y))
  }

  get statuses() {
    return this.upTags
  }
}
