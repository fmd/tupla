import PIXI from 'pixi.js'
import { map } from 'lodash'

export class AssetLoader {
  constructor() {
    this.assets = {}
    this.loader = new PIXI.loaders.Loader()
  }

  load(assets, progressCallback, finishedCallback) {
    map(assets, this.loadAsset.bind(this))
    this.loader.once('progress', this.loadingProgress.bind(this, progressCallback))
    this.loader.once('complete', this.loadingComplete.bind(this, finishedCallback))
    this.loader.load()
  }

  loadAsset(asset) {
    this.loader.add(asset)
  }

  loadingProgress(callback, loader, resource) {
    console.log('Loading: ' + loader.progress + '%')
    callback(loader, resource)
  }

  loadingComplete(callback, loader, resources) {
    console.log('All assets loaded.')
    callback(loader, resources)
  }
}

// assetsLoaded(loader, resources) {
//   var frames = []
//
//   for (var i = 1; i <= 4; i++) {
//       frames.push(PIXI.Texture.fromFrame('detective_walk' + i + '.png'))
//   }
//
//   let movie = new PIXI.extras.MovieClip(frames);
//
//   movie.anchor.set(0.5)
//   movie.position.set(160, 120)
//   movie.animationSpeed = 0.1
//
//   movie.play()
//   this.stage.addChild(movie)
//
//   this.animate()
// }
