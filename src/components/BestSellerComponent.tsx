import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import BestSellerItemComponent from "./BestSellerItem";
const items = [
    { name : 'item1', image: '../assets/images/1.jpeg'}
];
const BestSellerComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Best Sellers</Text>
            <View style={styles.innerContainer}>
                <ScrollView style={styles.scrollView} horizontal={true} contentContainerStyle={{display: 'flex',
                    alignItems: 'flex-start'}} showsHorizontalScrollIndicator={false}>
                    <BestSellerItemComponent></BestSellerItemComponent>
                    <BestSellerItemComponent></BestSellerItemComponent>
                    <BestSellerItemComponent></BestSellerItemComponent>
                </ScrollView>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container:{
    },
    innerContainer:{
        height: 170
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    text:{
        paddingLeft: 20
    }
});

export default BestSellerComponent;
