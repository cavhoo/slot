import { Container } from "pixi.js";
import { ReelConfig, TextureMap } from "../models";
import { Reel } from "./Reel";

export class ReelContainer extends Container {
  private config: ReelConfig
  private reels: Reel[] = []
  private textures: TextureMap
  private lastSpinData: any

  private onSpinDone: () => void
  private onSpinStart: () => void

  constructor(reelConfig: any, textureMap: TextureMap, onSpinStart: () => void, onSpinDone: () => void) {
    super()
    this.reels = []
    this.textures =textureMap
    this.config = reelConfig

    this.onSpinDone = onSpinDone
    this.onSpinStart = onSpinStart

    this.init()
  }

  private init() {
    const {
      reelCount
    } = this.config
    for (let i = 0; i < reelCount; i++) {
      this.reels.push( new Reel(this.textures, this.config) )
    }
    this.addChild(...this.reels)
  }

  addReel(reel:any) {
    this.reels.push(reel)
  }

  getReel(id: number) {
    return this.reels[id] ?? null
  }

  setInitalData(data:any) {
    for(let i = 0; i < this.reels.length; i++) {
      this.reels[i].setInitialData(data[i + 1])
    }
  }

  setSpinData(data:any) {
    this.onSpinStart()
    this.lastSpinData = data
    for(let i = 0; i < this.reels.length; i++) {
      this.reels[i].setSpinData([...data[i + 1]])
    }
  }

  update(delta:number) {
    this.reels.forEach((reel) => reel.update(delta))

    const allDone = this.reels.every((reel) => reel.hasReachedEnd)
    if (allDone) {
      this.onSpinDone()
    }
  }

  getWidth(): number {
    return this.config.reelCount * 204
  }

  getHeight(): number {
    return this.config.visibleSymbols * this.config.symbolHeight
  }

  set spinDuration(value: number) {
    for (var i = 0; i < this.reels.length; i++) {
      this.reels[i].spinDuration = value
    }
  }
}
