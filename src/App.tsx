import {useRef, useState} from 'react'
import './App.css'

import {useTftEspi} from 'tft-espi-wasm'

function App() {
  const [count, setCount] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useTftEspi((module) => {
    const tft = new module.TFTSpi(240, 536, canvasRef.current?.id);
    tft.init();
    tft.drawLine(0, 100, 240, 100, 0xFFFF);
    tft.drawLine(0, 200, 240, 200, 0xFFFF);
    tft.draw();
  }, canvasRef);

  return (
    <>
      <div>
        <canvas id={'canvas'} ref={canvasRef}></canvas>
      </div>
    </>
  )
}

export default App
