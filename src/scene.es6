import PIXI from 'pixi.js'
import { AssetLoader } from './asset_loader'

export class Scene extends PIXI.Container {
  constructor(window) {
    super()
    this.window = window
    this.paused = false
    this.assets = []
  }

  initializeLoadingDisplay() {
    this.loaded = false
    this.loadingContainer = new PIXI.Container()
    this.loadingText = false

    PIXI.loader.reset()
    PIXI.loader
      .add('./resources/fonts/classified.fnt')
      .once('complete', function(loader, resources) {
        this.loadingText = new PIXI.extras.BitmapText('Loading...', { font: '16pt Classified' })
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

  }

  loadingDone(loader, resources) {
    this.loaded = true
    this.removeChild(this.loadingContainer)
  }

  load() {
    this.initializeLoadingDisplay()
  }

  update() {

  }

  pause() {
    this.paused = true
  }

  resume() {
    this.paused = false
  }
}
