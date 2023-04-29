import {Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {Image} from "@rneui/themed";

let scanner;
const onSuccess = (e: any, navigation: any) => {
    navigation.navigate('home', { url : e.data});
};
const onRedirect = (message: string) => {
    scanner.reactivate();
};

const QrScanScreen = ({ route, navigation }) => {
    React.useEffect(() => {
        // Uncomment this line if running in android emulator comment if running on phone
        navigation.navigate('home', { url : `http://www.quickBite.com/6415f8c5eaa19250bc8e3b0c`})
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            scanner.reactivate();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    if(route.params?.message){
        onRedirect(route.params.message)
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="cover"
                containerStyle={styles.contImage}
                source={require("../assets/images/scan.jpg")}
            />
            <QRCodeScanner
                onRead={(e) => onSuccess(e, navigation)}
                // flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text style={styles.centerText}>
                        Go to{' '}
                        <Text style={styles.textBold}>your restraunt</Text> and scan the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>Scan QR!</Text>
                    </TouchableOpacity>
                }
                showMarker={true}
                ref={(node) => { scanner = node }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        display: 'flex',
        width: '100%',
        flex: 1,
        justifyContent: "center"
    },
    scrollView:{},
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 10,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 10,
        marginTop: 30
    },
    image: {
        height: 80,
        width: 200,
    },
    contImage:{
        display: "flex",
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5
    }
});

export default QrScanScreen;
