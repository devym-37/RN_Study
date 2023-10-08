import { Canvas, Fill } from '@shopify/react-native-skia';
import { useTheme } from './Theme/Theme';
import { useContextBridge } from 'its-fine';

const MyDrawing = () => {
  const { primary } = useTheme();
  return <Fill color={primary} />;
};

const CanvasPractice = () => {
  const ContextBridge = useContextBridge();
  // Fill component 후 순위가 높은 컴포넌트를 렌더링하면 덮어씌워짐
  return (
    <Canvas style={{ flex: 1 }}>
      <ContextBridge>
        <Fill color="black" />
        <MyDrawing />
      </ContextBridge>
    </Canvas>
  );
};

export default CanvasPractice;
