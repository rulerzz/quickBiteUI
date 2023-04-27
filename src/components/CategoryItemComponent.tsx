import {Button, Card, Image} from "@rneui/themed";
import {StyleSheet, Text, ToastAndroid, View} from "react-native";
import React from "react";

const CategoryItemComponent = (props) => {

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    if(props.categorySelected === props.item.name)
        return (
            <Button size="md" color="rgba(37, 211, 102, 1)" containerStyle={styles.buttonActive} title={props.item.name} onPress={() => {
                props.sendDataToParent(props.item.name)
                showToast(`Showing dishes with category ${props.item.name}`)
            }}>
            </Button>
        );
    else
        return (
            <Button size="md" containerStyle={styles.button} title={props.item.name} onPress={() => {
                props.sendDataToParent(props.item.name)
                showToast(`Showing dishes with category ${props.item.name}`)
            }}>
            </Button>
        );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonActive: {
        backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: 'rgba(37, 211, 102, 1)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 5,
        fontWeight: "bold"
    }
});

export default CategoryItemComponent;
