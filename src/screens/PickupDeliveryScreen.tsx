import {ScrollView, StyleSheet, Text, View} from "react-native";
import ItemComponent from "../components/ItemComponent";
import React from "react";
import {Divider, Icon} from "@rneui/themed";

const PickupDeliveryScreen = () => {
    return (
        <ScrollView style={styles.scrollView}>{
            [1, 2,3,4,5,6,67,7,7,4,3,3,23,3,3,3,3,3,23,2,3,23,2,32,32,3,23,23,23,23,23,23,23,23,23,23,100].map((item, key) => {
                return <View style={styles.card}>
                            <Text style={styles.header}>Branch Name</Text>
                            <View style={styles.innerView}>
                                <Icon type="ionicon" name="time" style={styles.icon} containerStyle={styles.iconContainer} size={10} color="#2dd36f"></Icon>
                                <Text style={styles.time}>Open until</Text>
                            </View>
                            <View style={styles.innerView}>
                                <Icon type="ionicon" name="navigate-circle" style={styles.icon} containerStyle={styles.iconContainer} size={10} color="#5b5b5e"></Icon>
                                <Text style={styles.address}>Address</Text>
                                <Text style={styles.kilometers}>225KM</Text>
                            </View>
                    </View>
                }
            )
        }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    card: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#e9ecef'
    },
    header:{
        fontWeight: "bold",
        fontSize: 15,
        color: '#404346',
        marginBottom: 10
    },
    time: {
        fontWeight: "normal",
        fontSize: 12,
        color: '#9d8a9e'
    },
    address: {
        fontWeight: "normal",
        fontSize: 12,
        color: '#9d8a9e'
    },
    innerView:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    icon: {
        position: 'relative',
        top: 2,
        marginRight: 5
    },
    iconContainer: {
    },
    kilometers: {
        fontWeight: "normal",
        fontSize: 12,
        position: "absolute",
        right: 0,
        color: '#9d8a9e'
    }
});
export default PickupDeliveryScreen;
