import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StickyShapes from "./src/StickyShapes";

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name='StickyShapes'
            component={StickyShapes}
            options={{
                title: "Sticky Shapes",
                header: () => null,
            }}
        />
    </Stack.Navigator>
);

export default function App() {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
