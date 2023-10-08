import { useEffect } from 'react';
import {
  Canvas,
  Image,
  useCanvasRef,
  Circle,
} from '@shopify/react-native-skia';

const CanvasPractice = () => {
  const ref = useCanvasRef();
  useEffect(() => {
    setTimeout(() => {
      // you can pass an optional rectangle
      // to only save part of the image
      const image = ref.current?.makeImageSnapshot();
      if (image) {
        // you can use image in an <Image> component
        // Or save to file using encodeToBytes -> Uint8Array
        const bytes = image.encodeToBytes();
        console.log(bytes);
      }
    }, 1000);
  });
  return (
    <Canvas style={{ flex: 1 }} ref={ref}>
      <Circle r={128} cx={128} cy={128} color="red" />
    </Canvas>
  );
};

export default CanvasPractice;
