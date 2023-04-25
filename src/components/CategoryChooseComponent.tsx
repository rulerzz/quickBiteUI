import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import BestSellerItemComponent from "./BestSellerItem";
import CategoryItemComponent from "./CategoryItemComponent";
import {Button} from "@rneui/themed";
import {Category} from "../models/Restraunt";

const CategoryChooseComponent = (props) => {

    const sendDataToParent = (category: Category) => {
        props.setActiveCategoryForHome(category);
    };

    const renderAllButton = () => {
        if(props.categorySelected){
            return <Button size="md" containerStyle={styles.button} title="All" onPress={() => {sendDataToParent(null)}}>
            </Button>
        }
        else{
            return <Button size="md" color="rgba(37, 211, 102, 1)" containerStyle={styles.button} title="All" onPress={() => {sendDataToParent(null)}}>
            </Button>
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Choose from Category</Text>
            <View style={styles.innerContainer}>
                <ScrollView style={styles.scrollView} horizontal={true} contentContainerStyle={{display: 'flex',
                    alignItems: 'flex-start'}} showsHorizontalScrollIndicator={false}>
                    {
                        props.categories.map((category: Category, key: number) => {
                            return <CategoryItemComponent item={category} key={key} sendDataToParent={sendDataToParent} categorySelected={props.categorySelected}></CategoryItemComponent>
                        })
                    }
                    {renderAllButton()}
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
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});
export default CategoryChooseComponent;
