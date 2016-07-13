export class Window {
  constructor(renderer, width, height) {
    this.renderer = renderer
    this.resolutionWidth = width
    this.resolutionHeight = height
    this.ratio = width / height

    this.renderTexture = new PIXI.RenderTexture(this.renderer,
                                                this.resolutionWidth,
                                                this.resolutionHeight)

    this.renderTarget = new PIXI.Sprite(this.renderTexture,
                                        this.resolutionWidth,
                                        this.resolutionHeight)

    this.resize()

    document.body.appendChild(this.renderer.view)
    window.onresize = this.resize.bind(this)
  }

  requestFullscreen() {
    if(document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if(document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if(document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if(document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }

  render(scene) {
    this.renderTexture.clear()
    this.renderTexture.render(scene)
    this.renderer.render(this.renderTarget)
  }

  resize() {
    let newWidth, newHeight

    if (document.body.clientWidth / document.body.clientHeight >= this.ratio) {
      newWidth = document.body.clientHeight * this.ratio
      newHeight = document.body.clientHeight
    } else {
      newWidth = document.body.clientWidth
      newHeight = document.body.clientWidth / this.ratio
    }

    this.resizeRenderer(newWidth, newHeight)
    this.resizeScene(newWidth, newHeight)
  }

  resizeRenderer(w, h) {
    this.renderer.view.style.width = w + 'px'
    this.renderer.view.style.height = h + 'px'
    this.renderer.view.style.position = 'absolute'
    this.renderer.view.style.left = ((document.body.clientWidth - w) >> 1) + 'px'
    this.renderer.view.style.top = ((document.body.clientHeight - h) >> 1) + 'px'

    this.renderer.resize(w, h)
  }

  resizeScene(w, h) {
    if (this.renderTarget !== null) {
      this.renderTarget.scale.x = w / this.resolutionWidth
      this.renderTarget.scale.y = h / this.resolutionHeight
    }
  }
}
