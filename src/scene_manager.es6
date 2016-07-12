import { MenuScene } from './scenes/menu'
import { GameScene } from './scenes/game'

export class SceneManager {
  constructor(window, renderer) {
    this.window = window
    this.renderer = renderer
    this.scenes = { menu: new MenuScene(window),
                    game: new GameScene(window) }

    this.scene = this.scenes['game']
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    if (!this.scene || this.scene.paused) {
      return
    }

    this.scene.update()
    this.renderer.render(this.scene)
  }

  set scene(scene) {
    scene.load()
    this._scene = scene
    this.window.scene = scene
  }

  get scene() {
    return this._scene
  }
}
