import { Container } from "pixi.js";
import { TextureLoader } from "../utils/TextureLoader";
import { ReelConfig, TextureMap } from "./models";
import { ReelContainer } from "./reels/ReelContainer";
import { SymbolPool } from "./symbol/SymbolPool";

export class Game extends Container {
  private initialized: boolean = false
  private textures: TextureMap

  private reelContainer: ReelContainer | null = null
  private symbolPool: SymbolPool | null = null

  constructor() {
    super()
    this.textures = {}
    this.init()
  }

  private init() {
    const textureLoader = new TextureLoader({
      '1': './assets/1.png',
      '2': './assets/2.png',
      '3': './assets/3.png',
      '4': './assets/4.png',
      '5': './assets/5.png',
      '6': './assets/6.png',
      '7': './assets/7.png'
    })

    textureLoader.onComplete.add((loader, resources) => {
      this.textures = {
        1: resources['1'].texture,
        2: resources['2'].texture,
        3: resources['3'].texture,
        4: resources['4'].texture,
        5: resources['5'].texture,
        6: resources['6'].texture,
        7: resources['7'].texture
      }
      this.start()
    })
    textureLoader.loadTextures()

  }


  public start() {
    const reelConfig: ReelConfig = {
      reelCount: 1,
      visibleSymbols: 1,
      symbolWidth: 204,
      symbolHeight: 144
    }


    this.symbolPool = new SymbolPool(this.textures)
    this.reelContainer = new ReelContainer(reelConfig, this.symbolPool)

    this.reelContainer.position.set(
      (640 - this.reelContainer.getWidth()) / 2,
      (480 - this.reelContainer.getHeight()) / 2
    )


    this.addChild(this.reelContainer)

    this.reelContainer.setSpinData({
      1: [1,2,3,4,5]
    })

    this.initialized = true
  }

  public update(delta: number) {
    if (this.initialized) {
      this.reelContainer?.update(delta)
    }
  }

}
