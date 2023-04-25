import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Pressable} from 'react-native';
import {Card, Image} from "@rneui/themed";

const BestSellerItemComponent = (props) => {
    return (
        <Pressable onPress={() => props.sendDataToParent(props.item)}>
            <Card containerStyle={styles.card}>
                <View style={styles.innerView}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{uri: props.item.image}}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <Text style={styles.heading} ellipsizeMode='tail' numberOfLines={1}>{props.item.name}</Text>
                <Text style={styles.text}>₹ {props.item.price}</Text>
            </Card>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    innerView: {
    },
    card: {
        borderRadius: 10,
        padding: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        paddingHorizontal: 20,
        marginTop: 5,
        overflow: 'hidden',
        maxWidth: 160,
        fontWeight: "bold"
    }
});

export default BestSellerItemComponent;
