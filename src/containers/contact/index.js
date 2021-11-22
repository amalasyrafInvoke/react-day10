import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, minusCount } from '../../reducers/countReducer';

export default function Contact() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.value);

  return (
    <View>
      <View>
        <Text>Hello, this is CONTACT!!! Page</Text>
        <Text>We are putting a count counter</Text>
      </View>
      <View style={tw`w-full min-h-full flex items-center justify-center`}>
        <Text>Count: {count}</Text>
        <View style={tw`flex flex-row items-center justify-center`}>
          <Pressable onPress={() => dispatch(addCount(2))}>
            <Text>Add</Text>
          </Pressable>
          <Pressable onPress={() => dispatch(minusCount(4))}>
            <Text>Minus</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
