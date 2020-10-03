import { Sprite } from "pixi.js";
import {
  TextureMap,
  SymbolMap
} from "../models";
import { Symbol } from "./Symbol";

export class SymbolPool {
  private pools: SymbolMap = {}
  private textures: TextureMap
  constructor(textureMap: TextureMap) {
    this.pools = {}
    this.textures = textureMap
  }

  getSymbol(symbolId: string) {
    return new Symbol(symbolId, this.textures[symbolId])
    //return new Sprite(this.textures[symbolId])
    // if (!this.pools[symbolId]) {
    //   this.pools[symbolId] = []
    //   return new Symbol(symbolId, this.textures[symbolId])
    // }
    console.log(this.textures[symbolId])
    // return
    //this.pools[symbolId].pop() ?? new Symbol(symbolId, this.textures[symbolId])
  }


  returnSymbol(symbol: Symbol) {
    if (!this.pools[symbol.id]) {
      this.pools[symbol.id] = [];
      this.pools[symbol.id].push(symbol)
    }
    this.pools[symbol.id].push(symbol)
  }


}
