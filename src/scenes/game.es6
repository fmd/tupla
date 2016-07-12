import { Scene } from '../scene'
import { Player } from '../player'

export class GameScene extends Scene {
  constructor(window) {
    super(window)
    this.player = new Player()
    this.assets = this.player.assets
  }

  update() {
    super.update()
    this.player.update()
  }

  loadingDone() {
    super.loadingDone()
    this.player.loadingDone()
    this.addChild(this.player)
  }
}
