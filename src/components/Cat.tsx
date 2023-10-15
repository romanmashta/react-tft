import {ScreenProps} from "../Display.tsx";
import {useFrameCounter} from "../UseFrameCounter.tsx";
import {useEffect} from "react";
import {logo2, framesNumber, aniHeigth, aniWidth} from "./logo2.ts";

const xt=230;
const yt=8;

const gray=0x6B6D;
const blue=0x0AAD;
const orange=0xC260;
const purple=0x604D;
const green=0x1AE9;

export const Cat = ({display, sprite}: ScreenProps) => {
  const frame = useFrameCounter();

  useEffect(() => {
    if (!display || !sprite) return;

    const n = frame % framesNumber;
    const fromTop = 38;
    const TFT_BLACK = 0x0000;
    const TFT_WHITE = 0xFFFF;

    sprite.fillSprite(TFT_BLACK);
    sprite.setSwapBytes(true);
    sprite.pushImage(0, 0, aniWidth, aniHeigth, logo2[n]);

    sprite.setTextColor(purple,TFT_WHITE);
    sprite.fillRoundRect(xt,yt,80,26,3,TFT_WHITE);
    sprite.fillRoundRect(xt,yt+70,80,16,3,TFT_WHITE);

    display.DrawToScreen(sprite);

  }, [display, frame]);

  return <></>
}
