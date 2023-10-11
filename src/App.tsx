import './App.css'
import {GeoIp} from "./GeoIp.tsx";
import {Display} from "./Display.tsx";
import {Cat} from "./Cat.tsx";

function App() {
  return <>
    <Display width={240} height={536} screen={GeoIp}/>
    {/*<Display width={320} height={170} screen={Cat}/>*/}
  </>
}

export default App
