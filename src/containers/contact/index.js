import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, RefreshControl } from 'react-native';
import tw from 'twrnc';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, minusCount } from '../../reducers/countReducer';
import ContactList from '../../components/contactList';

const CONTACTDATA = [
  {
    id: 1,
    title: 'McDonalds',
    contactNum: '1-300-888-000',
    quantity: 0,
  },
  {
    id: 2,
    title: 'Dominos',
    contactNum: '1-333-888-333',
    quantity: 0,
  },
  {
    id: 3,
    title: 'KFC',
    contactNum: '1-888-23-24',
    quantity: 0,
  },
  {
    id: 4,
    title: 'Pizza Hut',
    contactNum: '1-300-888-2525',
    quantity: 0,
  },
];

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Contact() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.value);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Never');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toString());
    });
  }, []);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`w-full h-40 flex items-center justify-center`}>
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
      <View style={tw`flex items-center justify-center my-4`}>
        <Text>Last Updated:</Text>
        <Text>{lastUpdated}</Text>
      </View>
      <SwipeListView
        useFlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={CONTACTDATA}
        keyExtractor={(item, index) => index}
        renderItem={({ item, rowMap }) => <ContactList data={item} />}
        renderHiddenItem={(item, rowMap) => (
          <View
            style={tw`flex flex-row items-center justify-between p-4 flex-1`}
          >
            <Text style={tw`pl-2`}></Text>
            <Text style={tw`pr-2`}>Delete</Text>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
