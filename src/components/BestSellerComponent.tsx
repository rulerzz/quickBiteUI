import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import BestSellerItemComponent from "./BestSellerItem";
import {Item} from "../models/Restraunt";

const BestSellerComponent = (props) => {
    const sendDataToParent = (item) => {
        props.setActiveItemForItemViewer(item);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Best Sellers</Text>
            <View style={styles.innerContainer}>
                <ScrollView style={styles.scrollView} horizontal={true} contentContainerStyle={{display: 'flex', alignItems: 'flex-start'}} showsHorizontalScrollIndicator={false}>
                    {
                        props.bestSellers?.map((item: Item, key: number) => {
                                    return <BestSellerItemComponent item={item} key={key} sendDataToParent={sendDataToParent}></BestSellerItemComponent>
                        })
                    }
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
