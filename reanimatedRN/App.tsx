import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";
import StickyShapes from "./src/StickyShapes";
import Wave from "./src/Wave";

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name='Main'
            component={Main}
            options={{
                title: "Main",
            }}
        />

        <Stack.Screen
            name='Wave'
            component={Wave}
            options={{
                title: "Wave",
            }}
        />
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
