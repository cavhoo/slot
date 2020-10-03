declare var PIXI:any
import {
  Application
} from 'pixi.js'
import { Game } from './game/Game'

const AppSettings = {
  width: 640,
  height: 480,
  antialias: true,
  transparent: false,
  resolution: 1 // TODO: Use device information at boot to set to 2 if on mobile
}

PIXI.WebGLRenderer = PIXI.Renderer;
(window as any)['__PIXI_INSPECTOR_GLOBAL_HOOK__'] &&
    (window as any)['__PIXI_INSPECTOR_GLOBAL_HOOK__'].register({ PIXI: PIXI });

function main () {
  const app = new Application(AppSettings)

  const appContainer = document.querySelector('#app')

  if (appContainer) {
    const game  = new Game()
    app.stage.addChild(game)

    app.ticker.add((delta:number) => {
      game.update(delta)
    })


    appContainer.appendChild(app.view)
  } else {
    console.error('Could not attach Pixi Canvas to document! Container not found!')
  }

}

main()
