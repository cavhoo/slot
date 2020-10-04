/**
 * @jest-environment jsdom
 */

import { BaseTexture, Texture } from "pixi.js"
import { Symbol } from "../Symbol"

describe('Symbol Test Suite', () => {
  it('Should create a symbol class', () => {
    const texture = new Texture(new BaseTexture('../../../../assets/1.png'))
    const symbol = new Symbol('1', texture)
    expect(symbol.id).toBe('1')
    expect(symbol.texture).toStrictEqual(texture)
  })
})
