import React from 'react';
import { StyleSheet, View} from "react-native";
import {Button, Icon, Text} from "@rneui/themed";

const CartComponent = () => {
    return (
            <Button buttonStyle={styles.button} containerStyle={styles.buttonContainer}>
                <View style={styles.cartBox}>
                    <Icon type='font-awesome' name="opencart" color="white" style={styles.cartButton}/>
                    <View style={styles.cartItems}><Text style={{color: 'white'}}>2</Text></View>
                </View>
                <Text style={styles.cartText}>CART</Text>
                <Text style={styles.currency}>GBP 33</Text>
            </Button>
    );
};

const styles = StyleSheet.create({
    cartBox: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "space-between"
    },
    buttonContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    cartButton:{
        alignSelf: 'flex-start'
    },
    cartText:{ color: 'white' },
    currency: { color: 'white'},
    cartItems: { color: 'white', position: 'relative', top: -8, left: 8, backgroundColor: 'gray', height: 22, width: 22, display: 'flex',alignItems: 'center', justifyContent: 'center', borderRadius: 22}
});

export default CartComponent;
