import PIXI from 'pixi.js'
import { Scene } from './scene'
import { MenuScene } from './scenes/menu'
import { GameScene } from './scenes/game'

export class SceneManager {
  constructor(win, renderer) {
    this.window = win
    this.renderer = renderer

    this.scenes = { game: new GameScene(win, renderer.plugins.interaction) }

    this.sceneWrapper = new PIXI.Container()
    this.scene = this.scenes['game']

    this.lastTimestamp = null
  }

  loop(timestamp) {
    if (this.lastTimestamp !== null) {
      Scene.deltaTime = timestamp - this.lastTimestamp
    }

    requestAnimationFrame(this.loop.bind(this));

    if (!this.scene) {
      return
    }

    this.scene.update()
    this.window.render(this.sceneWrapper)
    this.lastTimestamp = timestamp
  }

  set scene(scene) {
    scene.load()
    this.sceneWrapper.removeChild(this.scene)
    this.sceneWrapper.addChild(scene)
    this._scene = scene
  }

  get scene() {
    return this._scene
  }
}
