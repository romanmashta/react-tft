import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {useTftEspi} from 'tft-espi-wasm'

function App() {
  const [count, setCount] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useTftEspi((module) => {
    const tft = new module.TFTSpi(536, 240, canvasRef.current?.id);
    tft.init();
    tft.draw();
  }, canvasRef);

  return (
    <>
      <div>
        <canvas id={'canvas'} ref={canvasRef}></canvas>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
