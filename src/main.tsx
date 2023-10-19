import {Renderer} from "./core/renderer.ts";
import {useEffect} from "react";
import {useFrameCounter} from "./UseFrameCounter.tsx";

const App = () => {
  const frame = useFrameCounter(1);

  useEffect(() => {
    console.log("Hello from useEffect! " + frame);
  }, [frame]);

  return (
    <label text={frame}/>
  );
}

Renderer.render(<App/>)
