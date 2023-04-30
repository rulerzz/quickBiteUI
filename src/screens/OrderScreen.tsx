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
import {CartItem, Item, RestrauntUser, User} from "../models/Restraunt";
import Lottie from 'lottie-react-native';
import axios from "axios";
import {config} from "../config/config";

const OrderScreen = ({route, navigation}) => {

    const [addr, setAddr] = useState('Park Avenue');
    const [orderType, setOrderType] = useState('Dine - In');
    const [deliveryTime, setDeliveryTime] = useState('25 - 30 mins');
    const [paymentType, setPaymentType] = useState('cash');
    const [sum, setSum] = useState(0.0);
    const [rInfo, setRinfo] = useState<RestrauntUser>(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        try{
            if(storage.getString('orderType'))
                setOrderType(storage.getString('orderType')!)
            else
                setOrderType(null)
            if(storage.getString('user'))
                setUser(JSON.parse(storage.getString('user')!))
            else
                setUser(null)
            if(storage.getString('rinfo'))
                setRinfo(JSON.parse(storage.getString('rinfo')!))
            else
                setRinfo(null)
        }catch(e){
            console.log("error getting orderType from storage")
        }
        let localSum = 0;
        route.params.cart.forEach(el => {
            localSum += el.selectedConfig.price * el.quantity
        })
        setSum(localSum)
    }, [route.params.cart])

    const listItems = route.params.cart.map((item: CartItem, key) =>
        <View style={styles.card} key={key}>
            <View style={styles.innerView1}>
                <Text style={styles.heading}>{item.item.name}</Text>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.icontext}> {item.selectedConfig?.name}</Text>
                    <Text style={styles.icontext}>x{item.quantity}</Text>
                </View>
                <Text style={styles.icontext}>₹ {item.selectedConfig?.price}</Text>
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
        </View>
    );

    const getAddr = () => {
      return <View style={styles.iconic}>
          <View style={{flexDirection: "row", padding: 5}}>
              <Icon type='entypo' name="location-pin" color="gray"/>
              <Text style={{marginLeft: 10, textTransform: "capitalize"}}>{rInfo?.address1},{rInfo?.address2} {rInfo?.city} {rInfo?.state}</Text>
          </View>
          {/*<Icon type='entypo' name="edit" color="gray"/>*/}
      </View>
    };

    const getDeliveryTime = () => {
        return <View style={styles.iconic}>
            <View style={{flexDirection: "row", padding: 5}}>
                <Icon type='font-awesome-5' name="clock" color="gray" style={{fontSize: 8}}/>
                <Text style={{marginLeft: 10, textTransform: "capitalize"}}>{deliveryTime}</Text>
            </View>
            {/*<Icon type='entypo' name="edit" color="gray"/>*/}
        </View>
    };

    const getPaymentType = () => {
        return <View style={styles.iconic}>
            <View style={{flexDirection: "row", padding: 5}}>
                <Icon type='material-icon' name="payments" color="gray" style={{fontSize: 8}}/>
                <Text style={{marginLeft: 10, textTransform: "capitalize"}}>{paymentType}</Text>
            </View>
            {/*<Icon type='entypo' name="edit" color="gray"/>*/}
        </View>
    };

    const getTotal = () => {
        return <View style={styles.total}>
            <Text style={{ color: "#000",fontSize: 24,fontWeight: "bold",textTransform: "capitalize"}}>Total</Text>
            <Text style={{ color: "#000",fontSize: 24,fontWeight: "bold",textTransform: "uppercase"}}>INR {sum}</Text>
        </View>
    };

    const getOrderType = () =>{
        switch (orderType){
            case 'pickup':
                return 'Take Home';
                break;
            case 'delivery':
                return 'Delivery';
                break;
            case 'dinein':
                return 'Dine In';
                break;
        }
    };

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const placeOrder = () => {
        try{
            const token = storage.getString("token")
            if(!token){
                showToast("Login to continue order...")
                navigation.navigate('login', {fromOrder: true});
            }else{
                // populate request object
                //user logged in call place order and navigate to order status
                    axios.post(`${config.SERVER_BASE_URL}/api/v1/customer-order/createorder`, {
                        orderType: getOrderType(),
                        status: "Placed",
                        price: sum,
                        user: rInfo._id,
                        items: route.params.cart,
                        placed_time: new Date(),
                        address: `${rInfo?.address1},${rInfo?.address2} ${rInfo?.city} ${rInfo?.state}`,
                        userId : user?._id
                    }, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    }).then((response) => {
                        // console.log(response.data.data._id)
                        // success take to order status page
                        try{
                            storage.delete("cart");
                            showToast("Order placed");
                            route.params.refreshCart();
                            route.params.gotToOrderStatusScreen(response.data.data._id);
                        }
                        catch(e){
                            console.log("Error clearing cart")
                        }

                    }).catch((error) => console.log(error))
            }
        }catch(e){
            console.log("cannot proceed with place order as some error came", e)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading2}>Confirm your {orderType.toUpperCase()} order</Text>
            <ScrollView style={styles.scrollView}>
                    {listItems}
            </ScrollView>
            <View style={styles.view}>
                {
                    getAddr()
                }
                {
                    getPaymentType()
                }
                {
                    getTotal()
                }
            </View>
            <View>
                <Button buttonStyle={styles.buttonLarge} containerStyle={styles.buttonContainer} onPress={() => {placeOrder()}}>
                    <Icon type='evil-icon' name="check" color="white"/>
                    <Text style={styles.conText}>Place Order</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    iconic: {
        flexDirection:"row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    total:{
        flexDirection:"row",
        justifyContent: "space-between",
        marginTop: 20
    },
    conText:{ color: 'white' , marginLeft: 10},
    buttonContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    buttonLarge: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 50
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
        paddingHorizontal: 20
    },
    view: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 20,
        paddingHorizontal: 40,
    },
    innerView1: {
        flex: 2,
        padding: 10,
    },
    innerView2: {
        flex: 1,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 10,
        justifyContent: "space-between",
        marginBottom: 10,
        borderRadius: 10
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
        borderRadius: 20,
        width: 100,
        height: 100
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

export default OrderScreen;
