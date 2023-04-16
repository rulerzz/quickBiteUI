import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import {Button} from "@rneui/base";
import { getHeaderTitle } from '@react-navigation/elements';
import HeaderComponent from "../components/HeaderComponent";
import PickupDeliveryComponent from "./PickupDeliveryScreen";
import PickupDeliveryScreen from "./PickupDeliveryScreen";
const Stack = createNativeStackNavigator();

const AppComponent = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                            <HeaderComponent/>
                        );
                    },
                    gestureDirection: "horizontal"
                }}/>
                <Stack.Screen name="pickupDelivery" component={PickupDeliveryScreen} options={{}}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default AppComponent;
