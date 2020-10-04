export class SpinDataGenerator {
  private availableIds: string[] = []

  constructor(symbolIds: string[]) {
    this.availableIds = symbolIds
  }

  generateResult(paddingLength:number, visibleSymbols: number) {
    const totalLength = paddingLength + visibleSymbols
    let data = []
    for (let i = 0; i < totalLength; i++) {
      data.push(Math.floor(Math.random() * this.availableIds.length) + 1)
    }
    return data
  }
}
