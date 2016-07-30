import PIXI from 'pixi.js'
import { Vec2 } from './vec2'
import { AssetLoader } from './asset_loader'
import { Camera } from './camera'

export class Scene extends PIXI.Container {
  constructor(window, interaction) {
    super()
    this.window = window
    this.interaction = interaction
    this.paused = false
    this.assets = []
    this.camera = new Camera(0, 0, this.window.resolutionWidth, this.window.resolutionHeight)
  }

  get mouse() {
    return this.screenPointToWorld(this.interaction.mouse.global)
  }

  screenPointToWorld(point) {
    let transformedPoint = Vec2.create()
    transformedPoint.x = point.x / this.window.renderTarget.scale.x
    transformedPoint.y = point.y / this.window.renderTarget.scale.y
    transformedPoint = this.camera.offsetMousePosition(transformedPoint)
    return transformedPoint
  }

  initializeLoadingDisplay() {
    this.loaded = false
    this.loadingContainer = new PIXI.Container()
    this.loadingText = false

    PIXI.loader.reset()
    PIXI.loader
      .add('resources/assets/fonts/little_league.fnt')
      .once('complete', function(loader, resources) {
        this.loadingText = new PIXI.extras.BitmapText('Loading...', { font: '5pt Little-League' })
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

  }

  pause() {
    this.paused = true
  }

  resume() {
    this.paused = false
  }
}

Scene.deltaTime = 0
Scene.interaction = null
