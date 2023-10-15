import './App.css'
import {Display} from "./Display.tsx";
import 'buffer'
import {View, YogaBox} from "./layout/YogaBox.tsx";
import {Align, FlexDirection} from "yoga-layout/sync";
import {useFont} from "tft-espi-wasm";
import segments from "/DSEG7.ttf";

function App() {
  const font42 = useFont(segments, 42, "0123456789:");

  return <div style={{display: "flex", alignItems: "flex-end"}}>
    {/*<Display width={240} height={536} Screen={GeoIp}/>*/}
    {/*<Display width={320} height={170} Screen={Cat}/>*/}
    <Display width={240} height={536} Screen={YogaBox}>
      <View style={{direction: FlexDirection.Row, alignItems: Align.Center}}>
        <View style={{w: 32, h: 32, m: 5}}></View>
        <View style={{m: 5, grow: 1, font: font42}}>12:45</View>
      </View>
    </Display>
  </div>
}

export default App
