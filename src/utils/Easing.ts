// Taken from: https://easings.net#easeInOutBack

export const EasingFunctions = {
  easeInOutBack(x: number): number {
    const c1 = .9; // Swing on Strength
    const c2 = c1 * .9; // Swing off strength

    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
}
