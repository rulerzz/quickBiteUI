import {Button, Card, Image} from "@rneui/themed";
import {StyleSheet, Text, View} from "react-native";
import React from "react";

const CategoryItemComponent = (props: any) => {
    return (
        <Button size="md" containerStyle={styles.button} title={props.title}>
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
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 5,
        fontWeight: "bold"
    }
});

export default CategoryItemComponent;
