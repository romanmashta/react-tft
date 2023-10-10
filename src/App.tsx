import {useEffect, useRef, useState} from 'react'
import './App.css'

import {useTftEspi, Font, TFTSpi, TFTSprite, TFT_BLACK, TFT_WHITE} from 'tft-espi-wasm'
import {NotoSansBold36} from "./notoSansBold36.ts";
import {NotoSansMonoSCB20} from "./notoSansMonoSCB20.ts";

function App() {
  const [count, setCount] = useState(0)
  const [tft, setTft] = useState<TFTSpi | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useTftEspi((module) => {
    //const tft = new module.TFTSpi(240, 536);
    const tft = new module.TFTSprite();
    // tft.setSwapBytes(1);
    //tft.init();
    tft.fillSprite(0xFFFF);
    setTft(tft);

    return () => {
      tft.delete();
    }
  }, canvasRef);


  useEffect(() => {
    if (!tft) return;
    const sprite = tft;
    const fromTop = 38;

    sprite.fillSprite(TFT_BLACK);
    sprite.setTextDatum(0);
    sprite.loadFont(NotoSansBold36);
    sprite.setTextColor(TFT_WHITE, TFT_BLACK);
    sprite.drawString("GeoLocation",0,4);
    sprite.unloadFont();

    sprite.drawLine(0,30+fromTop,240,30+fromTop,0x8410);
    sprite.drawLine(0,90+fromTop,240,90+fromTop,0x8410);
    sprite.drawLine(0,150+fromTop,240,150+fromTop,0x8410);
    sprite.drawLine(0,210+fromTop,180,210+fromTop,0x8410);
    sprite.drawLine(0,390+fromTop,240,390+fromTop,0x8410);
    sprite.drawLine(0,450+fromTop,240,450+fromTop,0x8410);

    sprite.loadFont(NotoSansMonoSCB20);
    sprite.setTextColor(0x5E9E, TFT_BLACK);
    sprite.drawString("PUBLIC IP",0,10+fromTop);
    sprite.drawString("COUNTRY",0,70+fromTop);
    sprite.drawString("TIMEZONE",0,130+fromTop);
    sprite.drawString("T0WN",0,190+fromTop);
    sprite.drawString("REGION",0,370+fromTop);
    sprite.drawString("PROVIDER",0,430+fromTop);

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
