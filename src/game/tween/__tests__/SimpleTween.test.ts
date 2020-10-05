import { EasingFunctions } from "../../../utils/Easing"
import { SimpleTween } from "../SimpleTween"

describe('SimpleTween Test Suite', () => {
  it('Should provide a raising value if updated', () => {
    const testTween = new SimpleTween({begin: 0, target: 100, time: 5, easingFunction: EasingFunctions.easeInOutBack})

  })
})
