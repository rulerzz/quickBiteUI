import React from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import ItemComponent from "./ItemComponent";
import {Category, Item} from "../models/Restraunt";

const ItemViewerComponent = (props) => {
    const sendDataToParent = (item: Item) => {
        props.setActiveItemForItemViewer(item);
    };
    if(props.categories){
        return (
            <View style={styles.view}>{
                (props.categorySelected ? props.categories.filter(el => el.name === props.categorySelected) : props.categories).map((category: Category, key1: number) => {
                        if (key1 === 0) {
                                return <View key={key1}>
                                    <Text style={styles.text}>{category?.name}</Text>
                                    {
                                        category.items.map((item: Item, key2: number) => {
                                            return <ItemComponent item={item} key={key2} sendDataToParent={sendDataToParent}></ItemComponent>
                                        })
                                    }
                                </View>
                        } else {
                                return <View key={key1} style={styles.textMarginTop}>
                                    <Text style={styles.text}>{category?.name}</Text>
                                    {
                                        category.items.map((item: Item, key2: number) => {
                                            return <ItemComponent item={item} key={key2} sendDataToParent={sendDataToParent}></ItemComponent>
                                        })
                                    }
                                </View>
                                }
                    }
                )
            }

            </View>
        );
    }else{
        return (<></>)
    }

};

const styles = StyleSheet.create({
    view: {
        marginBottom: 0
    },
    text: {
        paddingLeft: 20
    },
    textMarginTop:{
        marginTop: 15
    }
});

export default ItemViewerComponent;
