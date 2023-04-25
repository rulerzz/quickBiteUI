import {Button, Card, Image} from "@rneui/themed";
import {StyleSheet, Text, View} from "react-native";
import React from "react";

const CategoryItemComponent = (props) => {
    if(props.categorySelected === props.item.name)
        return (
            <Button size="md" color="rgba(37, 211, 102, 1)" containerStyle={styles.buttonActive} title={props.item.name} onPress={() => {props.sendDataToParent(props.item.name)}}>
            </Button>
        );
    else
        return (
            <Button size="md" containerStyle={styles.button} title={props.item.name} onPress={() => {props.sendDataToParent(props.item.name)}}>
            </Button>
        );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    buttonActive: {
        backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 5,
        fontWeight: "bold"
    }
});

export default CategoryItemComponent;
