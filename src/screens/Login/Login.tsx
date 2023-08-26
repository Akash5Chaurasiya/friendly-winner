import React, { useContext, useState } from 'react';

import {

  Button,

  Text,

  TextInput,

  TouchableOpacity,

  View,

  StyleSheet,

} from 'react-native';


// import Feather from 'react-native-vector-icons/Feather';
import login from './fetch/services/login';
import { useAuthContext } from '../../auth/AuthGuard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuthContext();
  const togglePasswordVisibility = () => {

    setShowPassword(!showPassword);

  };

  const handleLogin = async () => {
    let data;
    const verdict =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      );
    if (!verdict) {
      data = { phone: +email, password }
    } else { data = { email, password } };
    console.log("I am data",data);
    const res = await login(data)
    console.log("78941796525", res.data.user);
    console.log("I am Calling Auth", auth.actions.login(res.data.user));
  };


  return (

    <View style={styles.container}>

      <View style={styles.wrapper}>

        <View style={{ justifyContent: 'center' }}>

          <Text

            style={{

              color: 'black',

              fontFamily: 'Inter',

              fontWeight: '700',

              paddingVertical: 30,

              fontSize: 25,

            }}

          >

            Employee Login

          </Text>

          <View style={{ paddingBottom: 15 }}>

            <Text style={styles.labelTxt}>Email or Phone Number</Text>

            <TextInput

              style={styles.input}

              value={email}

              onChangeText={text => setEmail(text)}

            />

          </View>

          <View style={{ paddingBottom: 15 }}>

            <Text style={styles.labelTxt}>Password</Text>

            <View style={styles.passwordInputWrapper}>

              <TextInput

                style={styles.passwordInput}

                value={password}

                onChangeText={text => setPassword(text)}

                secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state

              />

              <TouchableOpacity

                style={styles.eyeButton}

                onPress={togglePasswordVisibility}

              >

              </TouchableOpacity>

            </View>

            <View style={{ marginTop: 12 }}>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>

                <View style={{ flexDirection: 'row' }}>

                  {/* <Feather name="log-in" size={18} color={'white'} /> */}

                  <Text style={styles.buttonText}>Login</Text>

                </View>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </View>

    </View>

  );

};

const styles = StyleSheet.create({

  container: {

    // flex: 1,

    paddingTop: 20,

    alignItems: 'center',

    justifyContent: 'center',

  },

  wrapper: {

    width: '90%',

  },

  labelTxt: {

    color: 'black',

    fontWeight: '400',

    fontFamily: 'Inter',

    paddingBottom: 10,

    marginRight: 12,

    paddingTop: 12,

  },

  input: {

    marginBottom: 12,

    borderWidth: 1,

    borderColor: '#666666',

    borderRadius: 5,

    paddingHorizontal: 14,

  },

  button: {

    backgroundColor: '#283093',

    // padding: 5,

    justifyContent: 'center',

    alignItems: 'center',

    // width:102,

    height: 45,

    // padding: 10,

    borderRadius: 5,

    marginTop: 10,

    width: '30%',

    paddingHorizontal: 5,

    paddingVertical: 3,

    // height: '20%',

  },

  buttonText: {

    color: 'white',

    paddingLeft: 10,

    // textAlign: 'center',

  },

  link: {

    backgroundColor: '#283093',

    color: 'white',

    padding: 10,

    borderRadius: 10,

  },

  eyeButton: {

    padding: 8,

  },

  passwordInputWrapper: {

    flexDirection: 'row',

    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#666666',

    borderRadius: 5,

    paddingHorizontal: 10,

  },

  passwordInput: {

    flex: 1,

    paddingVertical: 8,

    color: 'black',

  },

});

export default Login;

