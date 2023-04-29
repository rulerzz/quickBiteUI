import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    EventEmitter,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, ToastAndroid,
    View
} from "react-native";
import {Button, Card, Icon, Image} from "@rneui/themed";
import {storage} from "./AppComponent";
import {CartItem, Item} from "../models/Restraunt";
import Lottie from 'lottie-react-native';

const CartScreen = ({ route, navigation}) => {
    const [localCart, setLocalCart] = useState([]);
    const [sum, setSum] = useState(0.0);

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    useEffect(() => {
        setLocalCart(route.params.cart);
        let localSum = 0;
        route.params.cart.forEach(el => {
            localSum += el.selectedConfig.price * el.quantity
        })
        setSum(localSum)
    }, [route.params.cart])



    const removeItemFromCart = (item: CartItem) => {
        try{
            let cart = localCart.filter((e) => e.item._id != item.item._id);
            route.params.updateCart(cart);
            setLocalCart(cart);
            showToast(`Removed ${item.item.name} from cart`)
        }catch(e){
            console.log(e)
        }
    }
    const listItems = localCart.map((item: CartItem, key) =>
            <Card containerStyle={styles.card} wrapperStyle={styles.cardWrapper} key={key}>
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
    );
    return (
        <SafeAreaView style={styles.container}>
            {
                listItems.length > 0 ? <Text style={styles.heading2}>These are your cart items</Text> : <Text style={styles.heading2}>Cart doesn't seem to have anything meow~</Text>
            }
            <ScrollView style={styles.scrollView}>
                <View style={styles.view}>
                    {
                        listItems.length > 0 ? listItems : <Lottie style={{height: '100%', width: '100%'}} source={require('../assets/json/11646-no-activity-animation.json')} autoPlay loop />
                    }
                </View>
            </ScrollView>
            <View>
                {
                    listItems.length > 0 ?
                        <Button buttonStyle={styles.buttonLarge} containerStyle={styles.buttonContainer} onPress={() => route.params.gotToOrderScreen()}>
                            <Icon type='evil-icon' name="check" color="white"/>
                            <Text style={styles.conText}>Continue Order for INR {sum}</Text>
                        </Button> :
                        <Button buttonStyle={styles.buttonLarge} containerStyle={styles.buttonContainer} onPress={() => {navigation.navigate('home', {})}}>
                            <Icon type='ionicon' name="arrow-back" color="white"/>
                            <Text style={styles.conText}>Go Back</Text>
                        </Button>
                }

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
