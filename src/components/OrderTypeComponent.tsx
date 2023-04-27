import React, {useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import {Button, Icon} from "@rneui/themed";
import {storage} from "../screens/AppComponent";

const OrderTypeComponent = (props) => {
    const [color, setColor] = useState('rgba(37, 211, 102, 1)');

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    return (
        <View
            style={styles.view}>
            <View style={styles.inner}>
                <Text>Order Type</Text>
                <Button type="solid" size="lg" buttonStyle={[styles.Button, { backgroundColor: props.orderType === 'pickup' ? color : 'rgba(78, 116, 289, 1)' }]} title="Pickup" onPress={() => {
                    try{ storage.set('orderType', 'pickup');  showToast(`Changed order type to Pickup`); }catch(e){ console.log("error setting orderType") }
                    props.setOrderType('pickup')
                }}>
                </Button>
                <Button type="solid" size="lg" buttonStyle={[styles.Button, { backgroundColor: props.orderType === 'dinein' ? color : 'rgba(78, 116, 289, 1)' }]} title="Dine - In" onPress={() => {
                    try{ storage.set('orderType', 'dinein'); showToast(`Changed order type to Dine In`);}catch(e){ console.log("error setting orderType") }
                    props.setOrderType('dinein')
                }}>
                </Button>
                <Button type="solid" size="lg" buttonStyle={[styles.Button, { backgroundColor: props.orderType === 'delivery' ? color : 'rgba(78, 116, 289, 1)' }]} title="Delivery" onPress={() => {
                    try{ storage.set('orderType', 'delivery'); showToast(`Changed order type to Delivery`);}catch(e){ console.log("error setting orderType") }
                    props.setOrderType('delivery')
                }}>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Button: {
        borderRadius: 10
    },
    view: {
        backgroundColor: 'transparent',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
        marginBottom: 20
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        borderStyle: 'dashed',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 10
    }
});

export default OrderTypeComponent;
