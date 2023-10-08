/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';

import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import CanvasPractice from './src/components/Canvas';

function App(): JSX.Element {
  const size = 256;
  const r = size * 0.33;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Canvas style={{ flex: 1 }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={size - r} cy={r} r={r} color="magenta" />
          <Circle cx={size / 2} cy={size - r} r={r} color="yellow" />
        </Group>
      </Canvas> */}
      <CanvasPractice />
    </SafeAreaView>
  );
}

export default App;
