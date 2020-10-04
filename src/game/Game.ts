import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { SpinDataGenerator } from "../utils/SpinDataGenerator";
import { TextureLoader } from "../utils/TextureLoader";
import { ReelConfig, TextureMap } from "./models";
import { ReelContainer } from "./reels/ReelContainer";

export class Game extends Container {
  private initialized: boolean = false
  private textures: TextureMap

  private reelContainer: ReelContainer
  private spinButton: Text
  private spinDataGenerator: SpinDataGenerator


  constructor() {
    super()
    this.textures = {}
    this.init()
  }

  private init() {
    this.spinDataGenerator = new SpinDataGenerator(['1','2','3','4','5','6','7'])

    const textureLoader = new TextureLoader({
      '1': './assets/1.png',
      '2': './assets/2.png',
      '3': './assets/3.png',
      '4': './assets/4.png',
      '5': './assets/5.png',
      '6': './assets/6.png',
      '7': './assets/7.png',
      'bg': './assets/background.jpg',
      'reelContainer': './assets/reelcontainer.png'
    })

    textureLoader.onComplete.add((loader, resources) => {
      this.textures = {
        1: resources['1'].texture,
        2: resources['2'].texture,
        3: resources['3'].texture,
        4: resources['4'].texture,
        5: resources['5'].texture,
        6: resources['6'].texture,
        7: resources['7'].texture,
        bg: resources['bg'].texture,
        reelContainer: resources['reelContainer'].texture
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
      symbolHeight: 144,
      swingOnSymbols: 1,
      swingOffSymbols: 1
    }

    this.spinButton = new Text('Spin', {
      fontFamily: 'sans-serif',
      fontSize: 25,
      fill: 'white',
      align: 'center'
    } as TextStyle)
    this.spinButton.interactive = true
    this.spinButton.buttonMode = true

    this.spinButton.on('pointerdown', this.onPressSpin)
    this.spinButton.on('pointerover', () => {
      this.spinButton.text = "<Spin>"
    })

    this.spinButton.on('pointerout', () => {
      this.spinButton.text = " Spin "
    })

    this.spinButton.position.set(
      (640 - this.spinButton.width) / 2,
      350
    )


    this.reelContainer = new ReelContainer(reelConfig, this.textures,this.onSpinStart, this.onSpinDone)

    const background = new Sprite(this.textures['bg'])
    const reelFrame = new Sprite(this.textures['reelContainer'])

    const containerX = (640 - this.reelContainer.getWidth()) / 2
    const containerY = (480 - this.reelContainer.getHeight()) / 2

    reelFrame.position.set(
      containerX,
      containerY
    )

    this.reelContainer.position.set(
      containerX,
      containerY
    )

    this.reelContainer.setInitalData({
      1: this.spinDataGenerator.generateResult(0, 1)
    })

    this.addChild(background)
    this.addChild(this.reelContainer)
    this.addChild(reelFrame)
    this.addChild(this.spinButton)

    this.initialized = true
  }

  private onPressSpin = () => {
    let spinDuration = 3000
    let symbolCount = 25

    const inputSpinDuration = document.querySelector('#spinDuration')
    if (inputSpinDuration) {
      spinDuration = parseFloat((inputSpinDuration as HTMLInputElement).value) * 1000
    }

    const inputSymbolCount = document.querySelector('#symbolPadding')
    if (inputSymbolCount) {
      symbolCount = parseInt((inputSymbolCount as HTMLInputElement).value)
    }

    const data = this.spinDataGenerator.generateResult(symbolCount, 1)
    this.reelContainer.spinDuration = spinDuration
    this.reelContainer?.setSpinData({
      1: data
    })
  }

  private onSpinStart = () => {
    this.spinButton.interactive = false
  }

  private onSpinDone = () => {
    this.spinButton.interactive = true
  }

  public update(delta: number) {
    if (this.initialized) {
      this.reelContainer?.update(delta)
    }
  }

}
