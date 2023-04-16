import React from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import ItemComponent from "./ItemComponent";

const ItemViewerComponent = () => {
    return (
                <View style={styles.view}>{
                    [1,2,3,4,5].map((item, key) => {
                                if (key === 0) {
                                    return <View>
                                        <Text style={styles.text}>Starter</Text>
                                        <ItemComponent></ItemComponent>
                                        <ItemComponent></ItemComponent>
                                        <ItemComponent></ItemComponent>
                                    </View>
                                }
                                else{
                                    return <View>
                                        <Text style={styles.textMarginTop}>Starter</Text>
                                        <ItemComponent></ItemComponent>
                                        <ItemComponent></ItemComponent>
                                        <ItemComponent></ItemComponent>
                                    </View>
                                }
                            }
                        )
                    }

                </View>
    );
};

const styles = StyleSheet.create({
    view: {
        marginBottom: 0
    },
    text: {
        paddingLeft: 20
    },
    textMarginTop:{
        paddingLeft: 20,
        marginTop: 15
    }
});

export default ItemViewerComponent;
