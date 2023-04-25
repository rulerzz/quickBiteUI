import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Button, CheckBox, Divider, Icon, Image} from "@rneui/themed";
import NumericInput from "react-native-numeric-input";
import {Config} from "../models/Restraunt";

const ItemViewerScreen = ({route, navigation}) => {

    const [selConfig, setConfig] = React.useState<Config>(null);
    const [quantity, setQuantity] = React.useState(1);

    const addToCart = () =>{
        navigation.navigate('home', {fromItemPicker: true, item: route.params.item, selectedConfig: selConfig, quantity: quantity})
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    containerStyle={styles.imageContainer}
                    source={{ uri : route.params.item.image}}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text style={styles.heading}>{route.params.item.name}</Text>
                <Text style={styles.text}>{route.params.item.description}</Text>
                <Text style={styles.text}>₹ {selConfig ? selConfig.price : route.params.item.price}</Text>
                <View style={styles.config}>
                    {
                        route.params.item.config.map((config:Config, key: number) => {
                            return  <View key={key+1} style={styles.innerConfig}>
                                        <CheckBox
                                                checked={selConfig && selConfig._id === config._id}
                                                onPress={() => setConfig(config)}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                key={key}
                                        />
                                        <Text style={styles.configText}>{config.name}</Text>
                                        <Text style={styles.configText}>₹ {config.price}</Text>
                                    </View>
                        })
                    }

                </View>
                <View style={styles.innerContainer}>
                    <NumericInput type='plus-minus'
                                  value={quantity}
                                  onChange={(value) => {
                                      setQuantity(value)
                                  }}
                                  minValue={1}
                                  maxValue={10}
                                  rightButtonBackgroundColor='rgb(78, 116, 255)'
                                  valueType='integer'
                                  leftButtonBackgroundColor='rgb(78, 116, 255)'
                                  inputStyle={{borderWidth: 0}}
                                  totalHeight={35}
                                  totalWidth={100}
                                  iconStyle={{ color: 'white' }}
                                  containerStyle={styles.quantityPicker}/>
                    <Button title="Add To Cart" buttonStyle={styles.modalButton} onPress={() => {addToCart()}}></Button>
                </View>
            </View>
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
    config:{
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    innerConfig:{
        margin: 20,
    },
    configText:{
        marginLeft: 15
    },
    scrollView:{},
    centeredView: {
        flex: 1
    },
    modalView: {
        margin: 0,
        flex: 1,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
        maxHeight: 250,
        aspectRatio: 16/9,
    },
    imageContainer: {
    },
    text:{
        color: 'black',
        paddingLeft: 20,
        marginBottom: 25,
        fontSize: 16
    },
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 25,
        marginBottom: 25,
        fontSize: 25,
        fontWeight: "bold"
    },
    heading2:{
        color: 'black',
        fontSize: 25,
        fontWeight: "bold"
    },
    button:{
        width: 80,
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 10
    },
    modalButton:{
        width: 120,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 10,
    },
    innerContainer:{
        flexDirection:"row",
        position: "absolute",
        bottom: 20,
        width: '100%',
        justifyContent: 'space-between'
    },
    quantityPicker:{
        marginTop: 20,
    },
    modal: {
        backgroundColor: 'red'
    }
});
export default ItemViewerScreen;
