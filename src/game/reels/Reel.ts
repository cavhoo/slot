import { Container, Graphics } from "pixi.js";
import { EasingFunctions } from "../../utils/Easing";
import { ReelConfig, TextureMap, ReelState } from "../models";
import { Symbol } from "../symbol/Symbol";
import { SimpleTween } from "../tween/SimpleTween";

export class Reel extends Container {
  private reelConfig: ReelConfig
  private textures: TextureMap
  private state: ReelState = ReelState.IDLE
  private currentPosition: number = 0
  private symbols: Symbol[] = []
  private lastSpinData: string[]
  private reelTween: SimpleTween

  public spinDuration: number = 3000

  constructor(textureMap: TextureMap, config: ReelConfig) {
    super()
    this.textures = textureMap
    this.reelConfig = config
    this.reelTween = new SimpleTween({
      begin: 0,
      target: 0,
      time: 0,
      onComplete: () => {
        this.state = ReelState.IDLE
      },
      easingFunction: EasingFunctions.easeInOutBack
    })

    this.createSymbols()
    this.createReelMask()
  }

  private createSymbols() {
    const {
      visibleSymbols,
      swingOffSymbols,
      swingOnSymbols,
      symbolHeight
    } = this.reelConfig

    const totalSymbols = visibleSymbols + swingOffSymbols + swingOnSymbols + 1

    for (let i = 0; i < totalSymbols; i++) {
      const symbol = new Symbol('1', this.textures[1])
      this.symbols.push(symbol)
      symbol.y = (i * symbolHeight * -1) + symbolHeight
      this.addChild(symbol)
    }
  }


  private createReelMask() {
    const reelMask = new Graphics()
    reelMask.beginFill(0x000000);
    reelMask.drawRect(0, 0, this.reelConfig.symbolWidth, this.reelConfig.symbolHeight)
    reelMask.endFill()
    this.addChild(reelMask)
    this.mask = reelMask
  }

  get hasReachedEnd():boolean {
    return this.state === ReelState.IDLE
  }

  setInitialData(data: string[]) {
    for (let i = 1; i < this.symbols.length; i++) {
      const texture = this.textures[data[i-1]]
      this.symbols[i].texture = texture
    }
  }

  setSpinData(data:string[]) {
    this.lastSpinData = data
    this.reelTween.start = this.currentPosition
    this.reelTween.target = this.currentPosition + data.length - 1
    this.reelTween.time = this.spinDuration
    this.reelTween.easingFunction = EasingFunctions.easeInOutBack
    this.startSpin()
  }

  startSpin() {
    this.state = ReelState.STARTING
  }

  update(delta: number) {
    switch(this.state) {
        case ReelState.STARTING: {
          this.reelTween.play()
          this.state = ReelState.SPINNING
          break;
        }
        case ReelState.SPINNING: {
          this.reelTween.update(delta)
          this.currentPosition = this.reelTween.currentValue
          for (let i = 0; i < this.symbols.length; i++) {
            const currentSymbol = this.symbols[i]
            const oldY = currentSymbol.y

            currentSymbol.y = (((this.currentPosition + i) % this.symbols.length) * this.reelConfig.symbolHeight) - this.reelConfig.symbolHeight

            if (currentSymbol.y < 0 && oldY > this.reelConfig.symbolHeight) {
              const nextSymbol = this.lastSpinData.pop()
              currentSymbol.texture = this.textures[nextSymbol]
            }

          }
          break;
        }
        default: {
          this.state = ReelState.IDLE
        }
    }
  }

}
