import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { SpinDataGenerator } from "../utils/SpinDataGenerator";
import { TextureLoader } from "../utils/TextureLoader";
import { ReelConfig, TextureMap } from "./models";
import { ReelContainer } from "./reels/ReelContainer";

import * as manifest from './Config.json'

export class Game extends Container {
  private initialized: boolean = false
  private textures: TextureMap = {}

  private reelContainer: ReelContainer
  private spinButton: Text
  private spinDataGenerator: SpinDataGenerator

  private spinDurationInput: HTMLInputElement
  private symbolCountInput: HTMLInputElement

  constructor() {
    super()
    this.init()
    this.spinDurationInput = document.querySelector('#spinDuration')
    this.symbolCountInput = document.querySelector('#symbolCount')
  }

  private init() {



    this.spinDataGenerator = new SpinDataGenerator(manifest.symbolIds)
   
    const textureLoader = new TextureLoader({
      ...manifest.symbolGfx,
      ...manifest.commonGfx
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
    const background = new Sprite(this.textures['bg'])
    const reelFrame = new Sprite(this.textures['reelContainer'])

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

    const reelConfig: ReelConfig = manifest.reelConfig
    this.reelContainer = new ReelContainer(reelConfig, this.textures,this.onSpinStart, this.onSpinDone)

    const initialData = this.spinDataGenerator.generateResult(1, 1)
    this.reelContainer.setInitalData({
      1: initialData
    })

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


    this.addChild(background)
    this.addChild(this.reelContainer)
    this.addChild(reelFrame)
    this.addChild(this.spinButton)

    this.initialized = true
  }

  private onPressSpin = () => {
    let spinDuration = manifest.spinSettings.defaultDuration
    let symbolCount = manifest.spinSettings.symbolCount

    if (this.spinDurationInput) {
      const enteredSpinDuration = parseFloat(this.spinDurationInput.value) || 3
      spinDuration = enteredSpinDuration * 1000
    }

    if (this.symbolCountInput) {
      const enteredSymbolCount = parseInt(this.symbolCountInput.value) || 25
      symbolCount = enteredSymbolCount
    }

    const data = this.spinDataGenerator.generateResult(symbolCount, 1)
    this.reelContainer.spinDuration = spinDuration
    this.reelContainer.setSpinData({
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
