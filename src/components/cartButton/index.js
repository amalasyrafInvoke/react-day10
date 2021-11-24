import React, { useRef } from 'react';
import {
  Pressable,
  View,
  Image,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import tw from 'twrnc';
import { Fontisto } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, removeBySwiping } from '../../reducers/cartReducer';
import CartCard from '../cartCard';

const rowTranslateAnimatedValues = {};

export default function CartModal({ navigation }) {
  const dispatch = useDispatch();
  const animationIsRunning = useRef(false);
  const cartItems = useSelector((state) => state.cart.items);
  const lastUpdated = useSelector((state) => state.cart.lastUpdated);

  new Array(cartItems.length).fill('').forEach((_, i) => {
    rowTranslateAnimatedValues[i] = new Animated.Value(50);
  });
  // console.log(rowTranslateAnimatedValues);

  const onSwipeValueChange = (swipeData) => {
    // console.log(-Dimensions.get('window').width);
    // console.log(swipeData);
    const { key, value } = swipeData;
    // console.log(key);
    // console.log(value);
    // console.log(animationIsRunning.current);
    if (
      value < -Dimensions.get('window').width + 50 &&
      !animationIsRunning.current
    ) {
      console.log(animationIsRunning.current);

      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...cartItems];
        const prevIndex = cartItems.findIndex((item, index) => index === key);
        newData.splice(prevIndex, 1);
        dispatch(removeBySwiping(newData));
        animationIsRunning.current = false;

      });
    }
  };

  return (
    <View style={tw`bg-blue-900 flex-1`}>
      <View style={tw`flex items-center justify-center min-h-full w-full h-full`}>
        <Image
          source={require('../../../assets/logo3.png')}
          style={tw`my-12 h-[60px] w-[60px] opacity-70`}
        />
        <Text style={tw`text-white text-3xl font-bold`}>Cart Items</Text>
        <Pressable
          style={tw`w-1/4 p-4 my-4 rounded-xl bg-white`}
          onPress={() => navigation.goBack()}
        >
          <Text style={tw`text-center`}>Close</Text>
        </Pressable>
        <View style={tw`flex items-center justify-center my-4`}>
          <Text style={tw`text-white font-bold text-center`}>
            Last Updated At:
          </Text>
          <Text style={tw`text-white text-center`}>{lastUpdated}</Text>
        </View>
        <SwipeListView
          disableRightSwipe
          contentContainerStyle={tw`min-h-screen`}
          data={cartItems}
          onSwipeValueChange={onSwipeValueChange}
          keyExtractor={(item, index) => index}
          renderItem={({ item, rowMap }) => (
            <CartCard data={item} rowAnimate={rowTranslateAnimatedValues} />
          )}
          renderHiddenItem={(item, rowMap) => {
            return (
              <View
                style={tw`flex flex-row items-center justify-between flex-1 h-28`}
              >
                <Text style={tw`pl-2`}></Text>
                <Pressable
                  style={tw`px-2 w-[75px] bg-red-900 h-28 flex items-center justify-center`}
                  onPress={() => dispatch(removeFromCart(item.item.id))}
                >
                  <Text>Delete</Text>
                </Pressable>
              </View>
            );
          }}
          rightOpenValue={-75}
        />
      </View>
    </View>
  );
}

export const CartButton = ({ navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('CartModal');
      }}
    >
      <Fontisto
        style={tw`mr-4`}
        name='shopping-basket'
        size={20}
        color='white'
      />
    </Pressable>
  );
};
