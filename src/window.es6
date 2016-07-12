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

  get scene() {
    return this._scene
  }

  set scene(scene) {
    this._scene = scene
    this.resize()
  }

  resize() {
    let newWidth, newHeight

    if (window.innerWidth / window.innerHeight >= this.ratio) {
      newWidth = window.innerHeight * this.ratio
      newHeight = window.innerHeight
    } else {
      newWidth = window.innerWidth
      newHeight = window.innerWidth / this.ratio
    }
    this.resizeRenderer(newWidth, newHeight)
    this.resizeScene(newWidth, newHeight)
  }

  resizeRenderer(w, h) {
    this.renderer.view.style.width = w + 'px'
    this.renderer.view.style.height = h + 'px'
    this.renderer.view.style.position = 'absolute'
    this.renderer.view.style.left = ((window.innerWidth - w) >> 1) + 'px'
    this.renderer.view.style.top = ((window.innerHeight - h) >> 1) + 'px'

    this.renderer.resize(w, h)
  }

  resizeScene(w, h) {
    if (this.scene !== null) {
      this.scene.scale.x = w / this.resolutionWidth
      this.scene.scale.y = h / this.resolutionHeight
    }
  }
}
