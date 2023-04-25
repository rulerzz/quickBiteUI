import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    EventEmitter,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import {Button, Card, Icon, Image} from "@rneui/themed";
import {storage} from "./AppComponent";
import {CartItem, Item} from "../models/Restraunt";
const CartScreen = (props) => {
    const [cart, setCart] = useState([]);
    const event = new EventEmitter();

    useEffect(() => {
        setCart(props.route.params.cart);
    }, [props.route.params.cart])

    const removeItemFromCart = (item: CartItem) => {
        try{
            // let cart = props.route.params.cart.filter((e) => e.item._id != item.item._id);
            // props.route.params.setCart(cart);
            // setCart(cart);
        }catch(e){
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading2}>These are your cart items</Text>
            <ScrollView style={styles.scrollView}>
                <View style={styles.view}>
                    {
                        cart.map((item: CartItem, key) => {
                            return <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper} key={key}>
                                <View style={styles.innerView1}>
                                    <Text style={styles.heading}>{item.item.name}</Text>
                                    <View style={{flexDirection: "row", paddingLeft: 20,}}>
                                        <Icon type="ionicon" name="fast-food-sharp" style={styles.icon}/>
                                        <Text style={styles.icontext}> {item.selectedConfig?.name}</Text>
                                    </View>
                                    <View style={{flexDirection: "row", paddingLeft: 20,}}>
                                        <Icon type="font-awesome-5" name="money-bill" style={styles.icon}/>
                                        <Text style={styles.icontext}>₹ {item.selectedConfig?.price}</Text>
                                    </View>
                                    <View style={{flexDirection: "row", paddingLeft: 20,}}>
                                        <Icon type="octicon" name="number" style={styles.icon}/>
                                        <Text style={styles.icontext}>{item.quantity}</Text>
                                    </View>
                                    <Button title="Remove" buttonStyle={styles.button} onPress={() => {removeItemFromCart(item)}}></Button>
                                </View>
                                <View style={styles.innerView2}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        containerStyle={styles.imageContainer}
                                        source={{ uri : item.item.image}}
                                        PlaceholderContent={<ActivityIndicator />}
                                    />
                                </View>
                            </Card>
                        })
                    }
                </View>
            </ScrollView>
            <View>
                <Button buttonStyle={styles.buttonLarge} containerStyle={styles.buttonContainer} onPress={() => {}}>
                        <Icon type='evil-icon' name="check" color="white"/>
                        <Text style={styles.conText}>Place Order</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    conText:{ color: 'white' , marginLeft: 10},
    buttonContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    buttonLarge: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center"
    },
    icon:{
    marginRight: 10
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        flex: 1,
    },
    view: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 20
    },
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        height: 200
    },
    imageContainer: {
    },
    text:{
        color: 'black',
        paddingLeft: 20,
        marginBottom: 15,
    },
    icontext:{
        color: 'black',
        paddingLeft: 20,
        marginBottom: 15,
        position: "relative",
        top: 5
    },
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 5,
        fontWeight: "bold"
    },
    heading2:{
        color: 'black',
        paddingLeft: 20,
        fontWeight: "bold",
        marginBottom:20
    }
});

export default CartScreen;
