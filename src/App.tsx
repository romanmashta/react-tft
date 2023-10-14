import './App.css'
import {GeoIp} from "./GeoIp.tsx";
import {Display} from "./Display.tsx";
import {Cat} from "./Cat.tsx";
import 'buffer'

function App() {
  return <div style={{display: "flex", alignItems: "flex-end"}}>
    <Display width={240} height={536} Screen={GeoIp}/>
    {/*<Display width={320} height={170} Screen={Cat}/>*/}
  </div>
}

export default App
