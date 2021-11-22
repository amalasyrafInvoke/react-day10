import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../reducers/movieReducer';

import { MaterialIcons } from '@expo/vector-icons';

export default function MovieSearch({ navigation }) {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={tw`bg-blue-900 flex-1`}>
          <View style={tw`flex items-center justify-center min-h-full w-full`}>
            <Image
              source={require('../../../assets/logo3.png')}
              style={tw`my-6 h-[120px] w-[120px] opacity-70`}
            />
            <TextInput
              placeholder='Search Movie By Name'
              keyboardType='default'
              onChangeText={(value) => setSearchInput(value)}
              placeholderTextColor='white'
              style={tw`w-3/4 p-2 border border-white rounded-md my-3 text-center text-white`}
            />
            <Pressable
              style={tw`w-1/4 p-2 border border-white bg-white rounded-md my-3`}
              onPress={() => {
                dispatch(setSearchValue(searchInput));
                navigation.goBack();
              } 
            }
            >
              <Text style={tw`text-center text-blue-900`}>Search</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export const SearchButton = ({ navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('SearchModal');
      }}
    >
      <MaterialIcons style={tw`mr-4`} name='search' size={24} color='white' />
    </Pressable>
  );
};
