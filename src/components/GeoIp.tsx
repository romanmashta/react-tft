import {useEffect, useState} from "react";
import {ani} from "./ani.ts";
import {NotoSansBold36} from "./notoSansBold36.ts";
import {NotoSansMonoSCB20} from "./notoSansMonoSCB20.ts";
import {Latin_Hiragana_24} from "./latinHiragana24.ts";
import {ScreenProps} from "../Display.tsx";
import {useFrameCounter} from "../UseFrameCounter.tsx";

import segments from '/DSEG7.ttf';
import {useFont} from "tft-espi-wasm";

export const GeoIp = ({display, sprite}: ScreenProps) => {
  const [data, setData] = useState<any>(null);
  const frame = useFrameCounter(25);
  const font = useFont(segments, 42, "0123456789:");

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const ver = data?.version ?? "";
  const country = data?.country_code ?? "";
  const continent_code = data?.continent_code ?? "";
  const ip = data?.ip ?? "";
  const country_name = data?.country_name ?? "";
  const timezone = data?.timezone ?? "";
  const town = data?.city ?? "";
  const region = data?.region ?? "";
  const provider = (data?.org ?? "").substring(0, 21);
  const local_ip = "127.0.0.1";

  const dateMy = new Date().toLocaleDateString("uk-UA");
  const timeMy = new Date().toLocaleTimeString("uk-UA");
  const httpCode2 = 200;

  useEffect(() => {
    if (!display || !sprite || !font) return;

    const n = frame % 45;
    const fromTop = 38;
    const TFT_BLACK = 0x0000;
    const TFT_WHITE = 0xFFFF;

    sprite.fillSprite(TFT_BLACK);
    sprite.setSwapBytes(true);
    sprite.pushImage(150, 200 + fromTop, 102, 160, ani[n]);

    sprite.setTextDatum(0);
    sprite.loadFont(NotoSansBold36);
    sprite.setTextColor(TFT_WHITE, TFT_BLACK);
    sprite.drawString("GeoLocation", 0, 4);
    sprite.unloadFont();

    sprite.drawLine(0, 30 + fromTop, 240, 30 + fromTop, 0x8410);
    sprite.drawLine(0, 90 + fromTop, 240, 90 + fromTop, 0x8410);
    sprite.drawLine(0, 150 + fromTop, 240, 150 + fromTop, 0x8410);
    sprite.drawLine(0, 210 + fromTop, 180, 210 + fromTop, 0x8410);
    sprite.drawLine(0, 390 + fromTop, 240, 390 + fromTop, 0x8410);
    sprite.drawLine(0, 450 + fromTop, 240, 450 + fromTop, 0x8410);


    sprite.loadFont(NotoSansMonoSCB20);
    sprite.setTextColor(0x5E9E, TFT_BLACK);
    sprite.drawString("PUBLIC IP", 0, 10 + fromTop);
    sprite.drawString("COUNTRY", 0, 70 + fromTop);
    sprite.drawString("TIMEZONE", 0, 130 + fromTop);
    sprite.drawString("T0WN", 0, 190 + fromTop);
    sprite.drawString("REGION", 0, 370 + fromTop);
    sprite.drawString("PROVIDER", 0, 430 + fromTop);


    sprite.setTextDatum(2);

    sprite.drawString(ver, 240, 38 + fromTop);
    sprite.drawString(country, 240, 98 + fromTop);
    sprite.drawString(continent_code, 240, 158 + fromTop);

    sprite.unloadFont();

    sprite.setTextDatum(0);
    sprite.setTextColor(0xC618, TFT_BLACK);
    sprite.loadFont(Latin_Hiragana_24);

    sprite.drawString(ip, 0, 35 + fromTop);
    sprite.drawString(country_name, 0, 95 + fromTop);
    sprite.drawString(timezone, 0, 155 + fromTop);
    sprite.drawString(town, 0, 215 + fromTop);
    sprite.drawString(region, 0, 395 + fromTop);
    sprite.drawString(provider, 0, 455 + fromTop);


    sprite.unloadFont();

    sprite.setTextColor(0xEF5D, TFT_BLACK);
    sprite.drawString(dateMy, 0, 270 + fromTop, 4);

    // sprite.drawString(timeMy, 0, 296 + fromTop, 7);

    sprite.loadFont(font);
    sprite.drawString(timeMy, 0, 299 + fromTop);
    sprite.unloadFont();

    sprite.drawString(String(httpCode2), 0, 520, 2);
    sprite.setTextDatum(2);
    sprite.drawString(local_ip, 240, 520, 2);

    display.DrawToScreen(sprite);

  }, [display, frame, font]);

  return (
    <></>
  )
}
