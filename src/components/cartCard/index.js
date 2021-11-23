import React from 'react';
import { View, Text, Pressable, } from 'react-native';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addQuantity, minusQuantity } from '../../reducers/cartReducer';

export default function CartCard({ data }) {
  const dispatch = useDispatch();
  return (
    <View
      style={tw`flex flex-row items-center justify-between bg-white w-screen p-4 my-2 h-28`}
    >
      <View>
        <View></View>
        <View style={tw`flex items-center`}>
          <Text style={tw`text-lg font-bold`}>{data.title}</Text>
          <Text>{data.contactNum}</Text>
        </View>
      </View>

      <View style={tw`flex items-center justify-center`}>
        <Text>Quantity:</Text>
        <View style={tw`flex flex-row items-center justify-center my-1`}>
          <Pressable
            onPress={() => dispatch(addQuantity(data.id))}
            style={tw`mx-1`}
          >
            <Feather name='plus-square' size={24} color='black' />
          </Pressable>
          <Text style={tw`mx-1`}>{data.quantity}</Text>
          <Pressable
            onPress={() => dispatch(minusQuantity(data.id))}
            style={tw`mx-1`}
          >
            <Feather name='minus-square' size={24} color='black' />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
