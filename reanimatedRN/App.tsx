import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";
import StickyShapes from "./src/StickyShapes";
import Wave from "./src/Wave";
import Swiper from "./src/Swiper";
import Pinch from "./src/Pinch";
import Worklets from "./src/Worklets";
import Transitions from "./src/Transitions";
import FlatList from "./src/FlatList";

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
        <Stack.Screen
            name='Swiper'
            component={Swiper}
            options={{
                title: "Swiper",
            }}
        />
        <Stack.Screen
            name='Pinch'
            component={Pinch}
            options={{
                title: "Pinch",
            }}
        />
        <Stack.Screen
            name='Worklets'
            component={Worklets}
            options={{
                title: "Worklets",
            }}
        />
        <Stack.Screen
            name='Transitions'
            component={Transitions}
            options={{
                title: "Transitions",
            }}
        />

        <Stack.Screen
            name='FlatList'
            component={FlatList}
            options={{
                title: "FlatList",
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
