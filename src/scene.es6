import PIXI from 'pixi.js'
import { AssetLoader } from './asset_loader'

export class Scene extends PIXI.Container {
  constructor(window) {
    super()
    this.window = window
    this.paused = false
    this.assets = []
    this.initializeLoadingDisplay()
    this.updateCallback = function() {  }
  }

  initializeLoadingDisplay() {
    this.loaded = false
    this.loadingProgress = 0
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
      }.bind(this))
      .load()
  }

  get loadingMessage() {
    if (this.loadingText != false) {
      this.loadingText.text = 'Loading: ' + Math.floor(this.loadingProgress) + '%'
      this.loadingText.position.x = this.window.resolutionWidth / 2 - this.loadingText.width / 2;
      this.loadingText.position.y = this.window.resolutionHeight / 2 - this.loadingText.height / 2;
    }

    return this.loadingContainer
  }

  load() {
    let assetLoader = new AssetLoader()
    let progress = function(loader, resources) {
      this.loadingProgress = loader.progress
    }.bind(this)

    let done = function() {
      this.loaded = true
      this.loadingProgress = 100
     }.bind(this)
    assetLoader.load(this.assets, progress, done)
  }

  onUpdate(callback) {
    this.updateCallback = callback
  }

  update() {
    this.updateCallback()
  }

  pause() {
    this.paused = true
  }

  resume() {
    this.paused = false
  }
}
