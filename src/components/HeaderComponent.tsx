import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ImageBackground} from 'react-native';
import {Button, Icon, Image} from "@rneui/themed";

const HeaderComponent = ({navigation}) => {
    return (
        <View style={styles.view}>
            <View style={styles.leftView}>
            {/*<Button type="outline" style={styles.hamburgerButton} buttonStyle={{ borderRadius : 60, borderWidth: 1, marginRight: 10 }}>*/}
            {/*    <Icon name="menu" />*/}
            {/*</Button>*/}
            <Button type="solid" style={styles.loginButton}  buttonStyle={{ backgroundColor: 'rgba(37, 211, 102, 1)', borderRadius: 8 }} onPress={() => {navigation.navigate('login', {})}}>
                <Icon name="logo-whatsapp" type='ionicon' color="white" />
                <Text style={{color: "white"}}>  LOGIN</Text>
            </Button>
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
        width: 140,
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
