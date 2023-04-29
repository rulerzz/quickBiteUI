import React, { useState } from 'react'
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import axios from "axios";
import {config} from "../config/config";
import {storage} from "./AppComponent";

export default function RegisterScreen({ navigation }) {
  const [fname, setFName] = useState({ value: '', error: '' });
  const [lname, setLName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const showToast = (message: string) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const onSignUpPressed = () => {
    const fnameError = nameValidator(fname.value)
    const lnameError = nameValidator(lname.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || fnameError || lnameError) {
      setFName({ ...fname, error: fnameError })
      setLName({ ...lname, error: lnameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
      axios.post(`${config.SERVER_BASE_URL}/api/v1/userregister`, {
          firstName: fname.value,
          lastName: lname.value,
          email: email.value,
          password: password.value,
          ownerType: 'registered'
      }, {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
      }).then(response => {
          //success
          try{
              showToast("Account created, please login.")
              navigation.navigate('login', { fromLogin : false})
          }catch(e){
              console.log("error saving JWT token")
          }
      }).catch(error => {
          showToast("Incorrect user credentials")
      })
  }

  return (
    <Background>
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Firstname"
        returnKeyType="next"
        value={fname.value}
        onChangeText={(text) => setFName({ value: text, error: '' })}
        error={!!fname.error}
        errorText={fname.error}
      />
        <TextInput
            label="Lastname"
            returnKeyType="next"
            value={lname.value}
            onChangeText={(text) => setLName({ value: text, error: '' })}
            error={!!lname.error}
            errorText={lname.error}
        />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
