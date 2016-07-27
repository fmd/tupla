import PIXI from 'pixi.js'
import { AssetLoader } from './asset_loader'
import { Camera } from './camera'

export class Scene extends PIXI.Container {
  constructor(window) {
    super()
    this.window = window
    this.paused = false
    this.assets = []
    this.camera = new Camera(0, 0, this.window.resolutionWidth, this.window.resolutionHeight)
  }

  initializeLoadingDisplay() {
    this.loaded = false
    this.loadingContainer = new PIXI.Container()
    this.loadingText = false

    PIXI.loader.reset()
    PIXI.loader
      .add('resources/assets/fonts/little_league.fnt')
      .once('complete', function(loader, resources) {
        this.loadingText = new PIXI.extras.BitmapText('Loading...', { font: '10pt Little-League' })
        this.loadingText.position.x = this.window.resolutionWidth / 2 - this.loadingText.width / 2;
        this.loadingText.position.y = this.window.resolutionHeight / 2 - this.loadingText.height / 2;

        this.loadingContainer.addChild(this.loadingText)
        this.addChild(this.loadingContainer)

        let assetLoader = new AssetLoader()

        assetLoader.load(this.assets,
                         this.loadingProgress.bind(this),
                         this.loadingDone.bind(this))
      }.bind(this))
      .load()
  }

  loadingProgress(loader, resource) {
    // noop
  }

  loadingDone(loader, resources) {
    this.loaded = true

    if (this.assets.length > 0) {
      this.loadingContainer.removeChild(this.loadingText)
      this.removeChild(this.loadingContainer)
    }
  }

  load() {
    if (this.assets.length > 0) {
      this.initializeLoadingDisplay()
    } else {
      this.loadingDone()
    }
  }

  update() {
    this.camera.update(this)
  }

  pause() {
    this.paused = true
  }

  resume() {
    this.paused = false
  }
}

Scene.deltaTime = 0
