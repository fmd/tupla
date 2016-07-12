export class Window {
  constructor(renderer, width, height) {
    this.renderer = renderer
    this.resolutionWidth = width
    this.resolutionHeight = height
    this.ratio = width / height
    this._scene = null
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

  get scene() {
    return this._scene
  }

  set scene(scene) {
    this._scene = scene
    this.resize()
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
    if (this.scene !== null) {
      this.scene.scale.x = w / this.resolutionWidth
      this.scene.scale.y = h / this.resolutionHeight
    }
  }
}
