import { Canvas, Circle, Group } from '@shopify/react-native-skia';

export const GroupV1 = () => {
  const r = 128;
  return (
    <Canvas style={{ flex: 1 }}>
      <Circle cx={r} cy={r} r={r} color="#51AFED" />
      {/* The paint is inherited by the following sibling and descendants. */}
      <Group color="lightblue" style="stroke" strokeWidth={10}>
        <Circle cx={r} cy={r} r={r / 2} />
        <Group color="lightblue" style="stroke" strokeWidth={15}>
          <Circle cx={r} cy={r} r={r / 3} color="white" />
        </Group>
      </Group>
    </Canvas>
  );
};
