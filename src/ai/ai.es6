import PIXI from 'pixi.js'

export class AI {
  constructor(tileMap, actor) {
    this.tileMap = tileMap
    this.actor = actor
  }

  beforeUpdate(nextTurn) {

  }

  afterUpdate(currentTurn) {
    if (this.hasTagAt('center', 'collides')) {
      
    }
  }

  hasTagAt(direction, tag) {
    return this.tileMap.hasTagAt(this.actor.direction[direction], tag)
  }

  tagsAt(direction) {
    return this.tileMap.allTagsAt(this.actor.direction[direction])
  }
}
