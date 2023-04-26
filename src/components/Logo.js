import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Lottie from "lottie-react-native";

export default function Logo() {
  return <Lottie style={styles.image} source={require('../assets/json/73208-jurupoles-login.json')} autoPlay loop />
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})
