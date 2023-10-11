import {useEffect, useState} from "react";

const FRAME_RATE = 20;

export const useFrameCounter = (frameRate: number = FRAME_RATE) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const frameDuration = 1000 / frameRate;
    let animationFrameId = -1;

    const animate = () => {
      // Update progress or any other state
      setCount((prevProgress) => (prevProgress + 1));

      // Call animate again using setTimeout to control the frame rate
      animationFrameId = setTimeout(animate, frameDuration);
    };

    animate();

    return () => clearTimeout(animationFrameId);
  }, []);

  return count;
}