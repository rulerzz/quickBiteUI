import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Image} from "@rneui/themed";

const BestSellerItemComponent = () => {
    return (
            <Card containerStyle={styles.card}>
                <View style={styles.innerView}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={require("../assets/images/Quick.png")}
                    />
                </View>
                <Text style={styles.heading}>Best Seller</Text>
                <Text style={styles.text}>100GBP</Text>
            </Card>
    );
};

const styles = StyleSheet.create({
    innerView: {
    },
    card: {
        borderRadius: 10,
        padding: 0,
    },
    image: {
        aspectRatio: 16/9,
        borderRadius: 10,
        width: '100%',
        height: 80,
    },
    text:{
        color: 'black',
        paddingLeft: 20,
        marginBottom: 15,
    },
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 5,
        fontWeight: "bold"
    }
});

export default BestSellerItemComponent;
