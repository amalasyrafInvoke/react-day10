import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import tw from 'twrnc';

export default function Login({ navigation }) {
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
        placeholder='Username / Email'
        keyboardType='default'
        placeholderTextColor='white'
        style={tw`w-[50vw] p-2 border border-white rounded-md my-4 text-center text-white`}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor='white'
        keyboardType='number-pad'
        secureTextEntry={true}
        style={tw`w-[50vw] p-2 border border-white rounded-md my-4 text-center`}
      />
      <View style={tw`flex flex-row items-center justify-evenly w-full`}>
        <Pressable
          style={tw`w-[25vw] p-2 border border-white rounded-md my-4 text-center`}
          onPress={() => navigation.navigate('TabNav')}
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
