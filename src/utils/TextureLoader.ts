import { Loader } from "pixi.js";

export class TextureLoader {
  private texturesToLoad: {[key:string]: string}
  private loader: Loader
  private loaded: boolean = false


  constructor(textures: {[key:string]:string}) {
    this.texturesToLoad = textures
    this.loader = new Loader()
    this.loader.onComplete.add(this.onLoadComplete)
  }

  private onLoadComplete = () => {
    this.loaded = true
  }

  public loadTextures() {
    if (!this.loaded) {
      for (let key in this.texturesToLoad) {
        this.loader.add(key, this.texturesToLoad[key])
      }
      this.loader.load()
    }
  }

  get onComplete() {
    return this.loader.onComplete
  }

  get onProgress() {
    return this.loader.onProgress
  }

  get onStart() {
    return this.loader.onStart
  }

  get onError() {
    return this.loader.onError
  }
}
