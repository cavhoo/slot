import { Container } from "pixi.js";
import { ReelConfig } from "../models";
import { SymbolPool } from "../symbol/SymbolPool";
import { Reel } from "./Reel";

export class ReelContainer extends Container {
  private config: ReelConfig
  private reels: Reel[] = []
  private pool: SymbolPool
  private lastSpinData: any
  constructor(reelConfig: any, symbolPool: SymbolPool) {
    super()
    this.reels = []
    this.pool = symbolPool
    this.config = reelConfig
    this.init()
  }

  private init() {
    const {
      reelCount
    } = this.config
    for (let i = 0; i < reelCount; i++) {
      this.reels.push( new Reel(this.pool, this.config.symbolWidth, this.config.symbolHeight) )
    }
    this.addChild(...this.reels)
  }

  addReel(reel:any) {
    this.reels.push(reel)
  }

  getReel(id: number) {
    return this.reels[id] ?? null
  }

  setSpinData(data:any) {
    console.log(this.lastSpinData)
    this.lastSpinData = data
    for(let i = 0; i < this.reels.length; i++) {
      this.reels[i].setSpinData(data[i + 1])
      console.log(data[i + 1])
    }
  }

  update(delta:number) {
    this.reels.forEach((reel) => reel.update(delta))
  }

  getWidth(): number {
    return this.config.reelCount * 204
  }

  getHeight(): number {
    return this.config.visibleSymbols * this.config.symbolHeight
  }

}
