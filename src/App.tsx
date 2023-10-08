import {useEffect, useRef, useState} from 'react'
import './App.css'

import {useTftEspi, Font, TFTSpi} from 'tft-espi-wasm'

function App() {
  const [count, setCount] = useState(0)
  const [tft, setTft] = useState<TFTSpi | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useTftEspi((module) => {
    const tft = new module.TFTSpi(240, 536, canvasRef.current?.id);
    tft.init();
    setTft(tft);
  }, canvasRef);

  useEffect(() => {
    if (!tft) return;
    tft.drawString("Hello World!", 15, 10, Font.FONT2);
    tft.drawString(`${count}`, 20, 50, Font.FONT4);
    tft.drawSmoothRoundRect(10, 45, 50, 30, 3, 0xFFFF);
    tft.drawLine(0, 100, 240, 100, 0x1F4F);
    tft.drawLine(0, 200, 240, 200, 0x9F00);
    tft.draw();
  }, [tft, count]);

  return (
    <>
      <div>
        <canvas id={'canvas'} ref={canvasRef}></canvas>
      </div>
      <div>
        <button onClick={() => setCount(count + 1)}>Count Up</button>
      </div>
    </>
  )
}

export default App
