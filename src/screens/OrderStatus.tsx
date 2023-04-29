import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator, Alert, ScrollView,
    StatusBar,
    StyleSheet, Text, View,
} from "react-native";
import StepIndicator from 'react-native-step-indicator';
import axios from "axios";
import {config} from "../config/config";
import {CartItem, Order} from "../models/Restraunt";
import {Button, Icon, Image} from "@rneui/themed";
import Lottie from 'lottie-react-native';
import {useInterval} from "usehooks-ts";

const OrderStatus = ({ route, navigation }) => {
    const labels = ["Cart", "Placed", "In Progress", "Closed", "Rejected"];
    const [currentPosition, setcurrentPosition ] = useState(0);
    const [order, setOrder] = useState<Order>(null)
    const [delay, setDelay] = useState<any>(10000)
    useEffect(() => {
        axios.get(`${config.SERVER_BASE_URL}/api/v1/customer-order/orderinfo/${route.params.orderId}`).then((response) => {
            if(response.data.data[0].status === 'Placed')
                setcurrentPosition(1);
            if(response.data.data[0].status === 'Billed')
                setcurrentPosition(2);
            if(response.data.data[0].status === 'Closed')
                setcurrentPosition(3);
            if(response.data.data[0].status === 'Rejected')
                setcurrentPosition(4);
            setOrder(response.data.data[0])
        }).catch(e => console.log(e))
    }, [])
    useInterval(
        () => {
            // Your custom logic here
            console.log("fetching order status")
            axios.get(`${config.SERVER_BASE_URL}/api/v1/customer-order/orderinfo/${route.params.orderId}`).then((response) => {
                if(response.data.data[0].status === 'Placed')
                    setcurrentPosition(1);
                if(response.data.data[0].status === 'Billed')
                    setcurrentPosition(2);
                if(response.data.data[0].status === 'Closed')
                    setcurrentPosition(3);
                if(response.data.data[0].status === 'Rejected')
                    setcurrentPosition(4);
                setOrder(response.data.data[0])
            }).catch(e => console.log(e))
        },
        // Delay in milliseconds or null to stop it
        delay
    )

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
               // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Create new order?',
                    'You are viewing status of this order, Are you sure you want to leave the screen? This will refresh all cart items.',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => {} },
                        {
                            text: 'Discard',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => {
                                    setDelay(null);
                                    route.params.refreshApp(e.data.action);
                                },
                        },
                    ]
                );
            }),
        [navigation]
    );

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize:30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013'
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Order Status</Text>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
            />
            <Text style={styles.heading3}>Order Type {order?.orderType}</Text>
            <ScrollView style={styles.scrollView}>
                { order?.items ? order?.items.map((item: CartItem, key) =>
                    <View style={styles.card} key={key}>
                        <View style={styles.innerView1}>
                            <Text style={styles.heading}>{item.item.name}</Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.icontext}> {item.selectedConfig?.name}</Text>
                                <Text style={styles.icontext}>x{item.quantity}</Text>
                            </View>
                            <Text style={styles.icontext}>₹ {item.selectedConfig?.price}</Text>
                        </View>
                        <View style={styles.innerView2}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                containerStyle={styles.imageContainer}
                                source={{ uri : item.item.image}}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        </View>
                    </View>
                ) : <></>}
            </ScrollView>
            <View style={{alignItems: "center", justifyContent:"flex-start", flex:1}}>
                <Text style={styles.heading}>Please wait for your order to be processed</Text>
                {
                    currentPosition < 2 ? <Lottie style={{marginTop: 0, height: 200, width: 200}} source={require('../assets/json/100858-success.json')} autoPlay loop /> : <></>
                }
                {
                    currentPosition === 2 ? <Lottie style={{marginTop: 0, height: 200, width: 200}} source={require('../assets/json/21581-inserte-billetes.json')} autoPlay loop /> : <></>
                }
                {
                    currentPosition === 3 ? <Lottie style={{marginTop: 0, height: 200, width: 200}} source={require('../assets/json/18579-loading-complete.json')} autoPlay loop /> : <></>
                }
                {
                    currentPosition === 4 ? <Lottie style={{marginTop: 0, height: 200, width: 200}} source={require('../assets/json/136192-rejected.json')} autoPlay loop /> : <></>
                }
            </View>
            <View>
                <Button buttonStyle={styles.buttonLarge} containerStyle={styles.buttonContainer} onPress={() => {}}>
                    <Icon type='ionicon' name="arrow-back" color="white"/>
                    <Text style={styles.conText}>New Order</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    conText:{ color: 'white' , marginLeft: 10},
    buttonContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    buttonLarge: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center"
    },
    icon:{
        marginRight: 10
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20
    },
    view: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 20
    },
    innerView1: {
        flex: 2,
        padding: 10,
    },
    innerView2: {
        flex: 1,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 10,
        justifyContent: "space-between",
        marginBottom: 10,
        borderRadius: 10
    },
    cardWrapper:{
        display: 'flex',
        flexDirection: 'row',
    },
    button:{
        width: 80,
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 10
    },
    image: {
        aspectRatio: 16/9,
        borderRadius: 20,
        width: 100,
        height: 100
    },
    imageContainer: {
    },
    text:{
        color: 'black',
        paddingLeft: 20,
        marginBottom: 15,
    },
    icontext:{
        color: 'black',
        paddingLeft: 20,
        position: "relative",
        top: 5
    },
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 0,
        fontWeight: "bold"
    },
    heading3:{
        color: 'black',
        paddingLeft: 20,
        marginVertical: 15,
        fontWeight: "bold"
    },
    heading2:{
        color: 'black',
        paddingLeft: 20,
        fontWeight: "bold",
    }
});

export default OrderStatus;
