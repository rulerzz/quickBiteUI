import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ImageBackground} from 'react-native';
import {Button, Icon, Image} from "@rneui/themed";
import {storage} from "../screens/AppComponent";
import {User} from "../models/Restraunt";
import {useInterval} from "usehooks-ts";

const HeaderComponent = (props: any) => {
    const [isLoggedIN, setIsLoggedIN] = useState(false);
    // @ts-ignore
    const [user, setUser] = useState<User>(null);

    useInterval(
        () => {
            try{
                let token = storage.getString('token')
                let userD = storage.getString('user')
                if(token){
                    setIsLoggedIN(true)
                }
                else{
                    setIsLoggedIN(false)
                }
                if(userD){
                    setUser(JSON.parse(userD!)[0])
                }else{
                    // @ts-ignore
                    setUser(null)
                }
            }catch(e){
                console.log("error reading storage from header", e)
            }
        },
        // Delay in milliseconds or null to stop it
        1000
    )

    return (
        <View style={styles.view}>
            <View style={styles.leftView}>{
                !isLoggedIN ?
                    <Button type="solid" style={styles.loginButton}  buttonStyle={{ backgroundColor: 'rgba(37, 211, 102, 1)', borderRadius: 8 }} onPress={() => {props.goToLoginScreen()}}>
                        <Icon name="logo-whatsapp" type='ionicon' color="white" />
                        <Text style={{color: "white"}}>  LOGIN</Text>
                    </Button> :
                    <View style={{flexDirection: "column"}}><Text style={{color: 'black', fontWeight: "bold", fontSize: 20 }}>Hi! {user?.firstName} {user?.lastName}</Text><Text>{user?.email}</Text></View>
            }
            </View>
            <Image source={require('../assets/images/logo.png' )} style={styles.image} PlaceholderContent={<ActivityIndicator />}>
            </Image>
        </View>
    );
};
const styles = StyleSheet.create({
    leftView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 180,
        padding: 0,
        margin: 0
    },
    hamburgerButton: {
        height: 60,
        width: 60
    },
    loginButton: {
        height: 50,
        width: 80,
        backgroundColor: '#25D366'
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    imageContainer:{
        height: 50,
        backgroundColor: 'yellow'
    },
    image:{
        aspectRatio: 16/9,
        width: '100%',
        height: 50,
        resizeMode: 'cover',
        alignSelf: 'flex-end',
        borderRadius: 10
    }

});

export default HeaderComponent;
