import {ScrollView, StyleSheet, View} from "react-native";
import OrderTypeComponent from "../components/OrderTypeComponent";
import BestSellerComponent from "../components/BestSellerComponent";
import CategoryChooseComponent from "../components/CategoryChooseComponent";
import ItemViewerComponent from "../components/ItemViewerComponent";
import CartComponent from "../components/CartComponent";
import React from "react";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <OrderTypeComponent navigation={navigation}></OrderTypeComponent>
                <BestSellerComponent></BestSellerComponent>
                <CategoryChooseComponent></CategoryChooseComponent>
                <ItemViewerComponent></ItemViewerComponent>
            </ScrollView>
            <CartComponent></CartComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        display: 'flex',
        width: '100%',
        flex: 1
    },
    scrollView:{}
});

export default HomeScreen;
