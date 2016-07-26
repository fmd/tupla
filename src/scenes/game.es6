import { Scene } from '../scene'
import { flatten } from 'lodash'

export class GameScene extends Scene {
  constructor(window) {
    super(window)
    this.assets = flatten([])
    this.sprites = {}
  }

  update() {
    super.update()
  }

  loadingDone(loader, resources) {
    super.loadingDone(loader, resources)
  }
}
