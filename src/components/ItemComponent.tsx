import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Card, Image} from "@rneui/themed";

const ItemComponent = () => {
    return (
        <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper}>
            <View style={styles.innerView1}>
                <Text style={styles.heading}>Best Seller</Text>
                <Text style={styles.text}>100GBP</Text>
                <Button title="VIEW" buttonStyle={styles.button}></Button>
            </View>
            <View style={styles.innerView2}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    containerStyle={styles.imageContainer}
                    source={require("../assets/images/Quick.png")}
                />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    innerView1: {
        flex: 1,
        padding: 10,
    },
    innerView2: {
        flex: 1,
    },
    card: {
        borderRadius: 10,
        padding: 0,
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
        borderRadius: 10,
        width: '100%',
        height: 140
    },
    imageContainer: {
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

export default ItemComponent;
