import { Container, Graphics } from "pixi.js";
import { ReelState } from "../models/ReelState.model";
import { Symbol } from "../symbol/Symbol";
import { SymbolPool } from "../symbol/SymbolPool";

export class Reel extends Container {
  private pool: SymbolPool
  private state: ReelState = ReelState.IDLE
  private stripe: Symbol[] = []
  private container: Container
  private symbolData: {width: number, height: number}

  constructor(symbolPool: SymbolPool, symbolWidth: number, symbolHeight: number) {
    super()
    this.pool = symbolPool
    this.container = new Container()
    this.symbolData = {
      width: symbolWidth,
      height: symbolHeight
    }
    this.createReelMask()
    this.addChild(this.container)
  }


  private createReelMask() {
    const reelMask = new Graphics()
    reelMask.beginFill(0x000000);
    reelMask.drawRect(0, 0, this.symbolData.width, this.symbolData.height)
    reelMask.endFill()
    this.addChild(reelMask)
    this.container.mask = reelMask
  }

  get currentState() {
    return this.state
  }

  setSpinData(data:string[]) {
    let nextY = 0
    for(let i = 0; i < data.length; i++) {
      const symbol = this.pool.getSymbol(data[i])
      symbol.position.set(0, nextY)
      this.container.addChild(symbol)
      nextY -= symbol.height
    }
  }

  startSpin() {
    this.state = ReelState.SPINNING
  }

  update(delta: number) {
    //this.container.position.y += 1 * delta
  }

}
