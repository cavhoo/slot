import { SpinDataGenerator } from "../SpinDataGenerator"

describe("SpinDataGenerator Test Suite", () => {
  let generator = new SpinDataGenerator(['1', '2', '3', '4'])


  it('Should generate an array of symbol ids when given padding and visible symbols', () => {
    const data = generator.generateResult(20, 1)
    expect(data.length).toBe(21)
  })

  it('Should generate a single length array if no padding has been given', () => {
    const data = generator.generateResult(20, 0)
    expect(data.length).toBe(20)
  })
})
