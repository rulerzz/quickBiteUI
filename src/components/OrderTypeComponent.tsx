import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from "@rneui/themed";

const OrderTypeComponent = ({navigation}) => {
    return (
        <View
            style={styles.view}>
            <View style={styles.inner}>
                <Text>Order Type</Text>
                <Button type="solid" size="lg" buttonStyle={styles.Button} title="Pickup" onPress={() => navigation.navigate('pickupDelivery')}>
                </Button>
                <Button type="solid" size="lg" buttonStyle={styles.Button} title="Dine - In" onPress={() => navigation.navigate('pickupDelivery')}>
                </Button>
                <Button type="solid" size="lg" buttonStyle={styles.Button} title="Delivery" onPress={() => navigation.navigate('pickupDelivery')}>
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
