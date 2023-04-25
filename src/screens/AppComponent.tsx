import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import {Button} from "@rneui/base";
import { getHeaderTitle } from '@react-navigation/elements';
import HeaderComponent from "../components/HeaderComponent";
import PickupDeliveryComponent from "./PickupDeliveryScreen";
import PickupDeliveryScreen from "./PickupDeliveryScreen";
import QrScanScreen from "./QrScanScreen";
const Stack = createNativeStackNavigator();
import { MMKV } from 'react-native-mmkv';
import ItemViewerScreen from "./ItemViewerScreen";
import CartScreen from "./CartScreen";

const AppComponent = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="qrScan">
                <Stack.Screen name="home" component={HomeScreen} options={{
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                            <HeaderComponent/>
                        );
                    },
                    gestureDirection: "horizontal"
                }}/>
                <Stack.Screen name="pickupDelivery" component={PickupDeliveryScreen} options={{}}/>
                <Stack.Screen name="itemViewer" component={ItemViewerScreen} options={{
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                            <HeaderComponent/>
                        );
                    },
                    gestureDirection: "horizontal"}}/>
                <Stack.Screen name="cartScreen" component={CartScreen} options={{
                    title : "cart"
                }}/>
                <Stack.Screen name="qrScan" component={QrScanScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};


export const storage = new MMKV();
storage.set('cart', JSON.stringify('[]'));
export default AppComponent;
