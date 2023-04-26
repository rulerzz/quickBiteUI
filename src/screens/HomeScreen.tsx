import {ActivityIndicator, Alert, Modal, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import OrderTypeComponent from "../components/OrderTypeComponent";
import BestSellerComponent from "../components/BestSellerComponent";
import CategoryChooseComponent from "../components/CategoryChooseComponent";
import ItemViewerComponent from "../components/ItemViewerComponent";
import CartComponent from "../components/CartComponent";
import React, {useState} from "react";
import axios, {AxiosResponse} from 'axios';
import {CartItem, Category, Config, Item} from "../models/Restraunt";
import {storage} from "./AppComponent";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import {config} from "../config/config";

const HomeScreen = ({ route, navigation }) => {
    const { url } = route.params;
    const isFocused = useIsFocused();
    const [cart, setCart] = useState([]);
    const [orderType, setOrderType] = useState('pickup');

    const addToCart = (item: Item, selectedConfig: Config, quantity: number) => {
        console.log(selectedConfig)
        try{
            let cartItem: CartItem = {
                item: item,
                quantity: quantity,
                selectedConfig: selectedConfig
            };
            setCart( [...cart, cartItem]);
        }
        catch(e){
            console.log('error loading cart', e)
        }
    };

    const [bestSellers, setBestSellers] = React.useState<Item[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [categorySelected, setActiveCategory] = React.useState<Category>(null);
    const [itemSelected, setItemSelected] = React.useState<Item>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        console.log(`refreshed`)
        setRefreshing(true);
        try {
            loadData(storage.getString('url')).then((response: AxiosResponse) => processData(response));
        } catch (error) {
            console.log(`error loading urldata while refreshing`)
        }
    }, []);

    const processData = (response: AxiosResponse) => {
        console.log(`process data called`)
        setRefreshing(false);
        let filteredItems: Item[] = [];
        let categories: Category[] = [];
        response.data.categories.forEach((category: Category) => {
            category.items.forEach((item: Item) => { item.quantity = 1; if(item.bestselling) filteredItems.push(item) });
            categories.push(category);
        });
        setCategories(categories);
        setBestSellers(filteredItems);
    };

    React.useEffect(() => {
        console.log(`use effect`)
        // normal load
        try {
            storage.set(
                'url',
                url,
            );

            if(!url.includes("quickBite.com")){
                navigation.navigate('qrScan', {message : 'QR Code does not match our system'});
            }

            loadData(storage.getString('url')).then((response: AxiosResponse) => processData(response));
        } catch (error) {
            console.log(`error saving cart in use effect with url ${url}`)
        }

        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                'Discard changes?',
                'Are you sure you want to go back to QR scanning?',
                [
                    { text: "Don't leave", style: 'cancel', onPress: () => {} },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        // If the user confirmed, then we dispatch the action we blocked earlier
                        // This will continue the action that had triggered the removal of the screen
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        });
        return unsubscribe;
    }, [navigation]);

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         const { fromItemPicker, item, selectedConfig, quantity } = route.params;
    //         console.log(`focus called with ${isFocused} ${fromItemPicker} ${selectedConfig} ${quantity}`);
    //         if(fromItemPicker){
    //             //coming from item viewing screen add to cart
    //             addToCart(item, selectedConfig, quantity);
    //         }
    //     });
    //     return unsubscribe;
    // }, [route.params]);

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                let { fromItemPicker, item, selectedConfig, quantity } = route.params;
                console.log(`focus called with ${isFocused} ${fromItemPicker} ${selectedConfig} ${quantity}`);
                if(item)
                addToCart(item, selectedConfig, quantity);
            });
            return () => unsubscribe();
        }, [route.params])
    );

    const loadData = (urlForLoad: any) => {
        console.log("load data ", urlForLoad)
        const explodedUrl = urlForLoad.split('/');

        if(!explodedUrl[3])
            navigation.navigate('qrScan', {message : 'Invalid qrCode'});

        return axios.get(
            `${config.SERVER_BASE_URL}/api/v1/users/menu/${explodedUrl[3]}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
    }

    const setActiveCategoryForHome = (category: Category) => {
        // console.log("set active category", category)
        setActiveCategory(category);
    };

    const setActiveItemForItemViewer = (item: Item) => {
        setItemSelected(item);
        // console.log("set active item", item)
        navigation.navigate('itemViewer', {item : item})
    };

    const setCartInStorageAndNavigateToCartScreen = () =>{
        try{
            storage.set('cart', JSON.stringify(cart));
            navigation.navigate('cartScreen', {cart : cart, updateCart: setCart});
        }catch(e){
            console.log("could not store cart and navigate to cart screen");
        }
    };

    const placeOrder = () =>{
      axios.post(config.SERVER_BASE_URL.concat("/api/v1/")).then((response) => {
          console.log(response.data)
      })
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <OrderTypeComponent navigation={navigation} orderType={orderType} setOrderType={setOrderType}></OrderTypeComponent>
                <BestSellerComponent bestSellers={bestSellers} setActiveItemForItemViewer={setActiveItemForItemViewer}></BestSellerComponent>
                <CategoryChooseComponent categories={categories} setActiveCategoryForHome={setActiveCategoryForHome} categorySelected={categorySelected}></CategoryChooseComponent>
                <ItemViewerComponent categories={categories} setActiveItemForItemViewer={setActiveItemForItemViewer} categorySelected={categorySelected}></ItemViewerComponent>
            </ScrollView>
            <CartComponent cart={cart} navigation={navigation} setCartInStorageAndNavigateToCartScreen={setCartInStorageAndNavigateToCartScreen}></CartComponent>
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
    scrollView:{},
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        marginBottom: 15,
    },
    heading:{
        color: 'black',
        paddingLeft: 20,
        marginTop: 5,
        marginBottom: 10,
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
        justifyContent: 'space-between'
    },
    quantityPicker:{
        marginTop: 20,
    },
    modal: {
        backgroundColor: 'red'
    }
});

export default HomeScreen;
