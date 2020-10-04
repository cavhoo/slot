export interface TweenConfig {
  begin: number
  target: number
  time: number
  easingFunction: (time: number) => number
  onComplete?: () => void
  onStart?: () => void
}

export enum SimpleTweenState {
  IDLE = 'idle',
  RUNNING = 'running',
  STOPPED = 'stopped'
}

const lerpFunction = (start: number, target: number, time: number) => start * ( 1 - time) + target * time

export class SimpleTween {
  private _currentValue: number = 0
  private state: SimpleTweenState
  private config: TweenConfig

  private timeStart: number

  constructor(config:TweenConfig) {
    this.config = config
  }

  play() {
    this.timeStart = Date.now()
    this.state = SimpleTweenState.RUNNING
  }

  reset() {
    this.state = SimpleTweenState.IDLE;
    this._currentValue = 0
  }

  set start(value: number) {
    this.config.begin = value
  }

  set time(value: number) {
    this.config.time = value
  }

  set target(value: number) {
    this.config.target = value
  }

  set easingFunction(func: (time: number) => number) {
    this.config.easingFunction = func
  }

  get currentValue():number {
    return this._currentValue
  }

  update(deltaTime: number) {
    const {
      target,
      begin,
      easingFunction,
      time,
      onComplete
    } = this.config

    // console.log(this.config)


    switch(this.state) {
        case SimpleTweenState.RUNNING: {
          const now = Date.now()
          const currentProgress = Math.min(1, (now - this.timeStart) / time)
          this._currentValue = lerpFunction(begin, target, easingFunction(currentProgress))
          if (currentProgress === 1) {
            this._currentValue = this.config.target
            this.state = SimpleTweenState.STOPPED
            onComplete()
          }
        }
        default: {

        }
    }
  }

}
