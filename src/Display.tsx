import React, {useRef, useState} from "react";
import {useTftEspi} from "tft-espi-wasm";
import Module from "tft-espi-wasm/src/tft-espi-wasm";
import TFT_eSprite = Module.TFT_eSprite;
import DisplayContext = Module.DisplayContext;

export type ScreenProps = {
  width: number,
  height: number,
  sprite?: TFT_eSprite,
  display?: DisplayContext,
}

type DisplayProps = {
  width: number;
  height: number;
  screen: (props: ScreenProps) => React.ReactElement;
};

export const Display = ({width, height, screen}: DisplayProps) => {
  const [sprite, setSprite] = useState<TFT_eSprite | undefined>(undefined);
  const [display, setDisplay] = useState<DisplayContext | undefined>(undefined);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useTftEspi((module) => {
    const display = new module.DisplayContext(width, height);
    setDisplay(display);

    const tft = new module.TFT_eSPI(width, height);

    const sprite: TFT_eSprite = new module.TFT_eSprite(tft);
    sprite.createSprite(width, height);
    sprite.fillSprite(0);
    setSprite(sprite);
    return () => {
      module.destroy(tft);
      module.destroy(sprite);
      module.destroy(display);
    }
  }, canvasRef);

  return (
    <>
      <div>
        <canvas style={{backgroundColor: "black", padding: 8, imageRendering: "pixelated",}} id={'canvas'} ref={canvasRef}></canvas>
      </div>
      {screen({width, height, sprite, display})}
    </>
  )
}
