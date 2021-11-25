import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from '../../reducers/userReducer';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('TabNav');
    }
  }, [isAuthenticated]);

  const handleSubmit = () => {
    const userData = {
      email: emailInput,
      password: passwordInput,
    };
    dispatch(submitLogin(userData));
  };

  return (
    <SafeAreaView
      style={tw`bg-blue-900 w-full h-full flex items-center justify-center`}
    >
      <Image
        source={require('../../../assets/logo3.png')}
        style={tw`my-6 h-[80px] w-[80px]`}
      />
      <Text style={tw`text-white text-2xl font-semibold`}>Login</Text>
      <TextInput
        placeholder='Email'
        keyboardType='default'
        onChangeText={(value) => setEmailInput(value)}
        placeholderTextColor='white'
        style={tw`w-[50vw] p-2 border border-white rounded-md my-4 text-center text-white`}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor='white'
        keyboardType='default'
        onChangeText={(value) => setPasswordInput(value)}
        secureTextEntry={true}
        style={tw`w-[50vw] p-2 border border-white rounded-md my-4 text-center`}
      />
      <View style={tw`flex flex-row items-center justify-evenly w-full`}>
        <Pressable
          style={tw`w-[25vw] p-2 border border-white rounded-md my-4 text-center`}
          onPress={() => handleSubmit()}
        >
          <Text style={tw`text-center text-white`}>Login Here</Text>
        </Pressable>
      </View>
      <View style={tw`flex flex-row items-center justify-evenly w-full`}>
        <Pressable
          style={tw`p-2 my-4`}
          onPress={() => navigation.navigate('Registration')}
        >
          <Text style={tw`text-center text-white`}>
            Or register now to get started!
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
