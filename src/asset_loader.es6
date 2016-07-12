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
    console.log('Loading: ' + loader.progress + '%')
    callback(loader, resources)
  }
}
