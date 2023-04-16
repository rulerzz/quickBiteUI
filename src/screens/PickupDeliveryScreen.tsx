import {ScrollView, StyleSheet, Text, View} from "react-native";
import ItemComponent from "../components/ItemComponent";
import React from "react";
import {Divider} from "@rneui/themed";

const PickupDeliveryScreen = () => {
    return (
        <ScrollView style={styles.scrollView}>{
            [1, 2,3,4,5,6,67,7,7,4,3,3,23,3,3,3,3,3,23,2,3,23,2,32,32,3,23,23,23,23,23,23,23,23,23,23,100].map((item, key) => {
                return <View style={styles.card}>
                            <Text>Branch Name</Text>
                            <Text>Open until</Text>
                            <Text>Address</Text>
                        <Divider />
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
        backgroundColor: 'red',
        flexDirection: 'column',
        paddingTop:50
    },
    card: {
        height: 80
    }
});
export default PickupDeliveryScreen;
