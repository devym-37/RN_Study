import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";
import StickyShapes from "./src/StickyShapes";
import Wave from "./src/Wave";
// import Swiper from "./src/Swiper";
import Pinch from "./src/Pinch";
import Worklets from "./src/Worklets";
import Transitions from "./src/Transitions";
import FlatList from "./src/FlatList";
import StickyFooter from "./src/StickyFooter";
import ProgressBar from "./src/ProgressBar";
import MaskedView from "./src/MaskedView";
import WaveView from "./src/WaveView";
import MomoHeader from "./src/MomoHeader";
import Chanel from "./src/ChanelScroll";
import { Headspace } from "./src/Headspace";
import { LoadAssets } from "./src/LoadAssets";
import { PathGradient } from "./src/PathGradient";
import SpreadCards from "./src/SpreadCards";
import Toolbar from "./src/Toolbar";

const Stack = createStackNavigator();
const fonts = {};
const assets: number[] = [];

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
        {/* <Stack.Screen
            name='Swiper'
            component={Swiper}
            options={{
                title: "Swiper",
            }}
        /> */}
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

        <Stack.Screen
            name='StickyFooter'
            component={StickyFooter}
            options={{
                title: "StickyFooter",
                header: () => null,
            }}
        />
        <Stack.Screen
            name='ProgressBar'
            component={ProgressBar}
            options={{
                title: "ProgressBar",
                header: () => null,
            }}
        />
        <Stack.Screen
            name='MaskedView'
            component={MaskedView}
            options={{
                title: "MaskedView",
                header: () => null,
            }}
        />

        <Stack.Screen
            name='WaveView'
            component={WaveView}
            options={{
                title: "WaveView",
                header: () => null,
            }}
        />

        <Stack.Screen
            name='MomoHeader'
            component={MomoHeader}
            options={{
                title: "MomoHeader",
                header: () => null,
            }}
        />
        <Stack.Screen
            name='Chanel'
            component={Chanel}
            options={{
                title: "Chanel",
                header: () => null,
            }}
        />
        <Stack.Screen
            name='Headspace'
            component={Headspace}
            options={{
                title: "Headspace",
                headerShown: false,
            }}
        />
        <Stack.Screen
            name='PathGradient'
            component={PathGradient}
            options={{
                title: "PathGradient",
                headerShown: false,
            }}
        />
        <Stack.Screen
            name='SpreadCards'
            component={SpreadCards}
            options={{
                title: "SpreadCards",
                headerShown: false,
            }}
        />
        <Stack.Screen
            name='Toolbar'
            component={Toolbar}
            options={{
                title: "Toolbar",
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);

export default function App() {
    return (
        <LoadAssets assets={assets} fonts={fonts}>
            <AppNavigator />
        </LoadAssets>
    );
}
