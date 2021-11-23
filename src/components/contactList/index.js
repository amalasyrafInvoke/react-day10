import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../reducers/cartReducer';

export default function ContactList({ data }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (data) => {
    const foundItem = cartItems.find((item) => item.id === data.id);
    if (foundItem) {
      dispatch(addToCart(foundItem));
    } else {
      const updatedItem = {
        ...data,
        quantity: 1,
      };
      dispatch(addToCart(updatedItem));
    }
  };

  return (
    <View
      style={tw`flex flex-row items-center justify-between border border-blue-300 p-4`}
    >
      <View>
        <View></View>
        <View style={tw`flex items-center`}>
          <Text style={tw`text-lg font-bold`}>{data.title}</Text>
          <Text>{data.contactNum}</Text>
        </View>
      </View>

      <Pressable
        style={tw`bg-blue-900 p-2.5 rounded-xl`}
        onPress={() => handleAddToCart(data)}
      >
        <Text style={tw`text-white text-center`}>Order Now</Text>
      </Pressable>
    </View>
  );
}
