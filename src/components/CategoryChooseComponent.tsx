import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import BestSellerItemComponent from "./BestSellerItem";
import CategoryItemComponent from "./CategoryItemComponent";

const CategoryChooseComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Choose from Category</Text>
            <View style={styles.innerContainer}>
                <ScrollView style={styles.scrollView} horizontal={true} contentContainerStyle={{display: 'flex',
                    alignItems: 'flex-start'}} showsHorizontalScrollIndicator={false}>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                    <CategoryItemComponent title="itemname"></CategoryItemComponent>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
    },
    innerContainer:{
        height: 60
    },
    scrollView: {

    },
    text:{
        paddingLeft: 20
    }
});
export default CategoryChooseComponent;
