import { Sprite, Texture } from "pixi.js"

export class Symbol extends Sprite {
  private _id: string
  constructor(id: string, texture: Texture) {
    super(texture)
    this._id = id
  }

  get id():string {
    return this._id
  }

}
