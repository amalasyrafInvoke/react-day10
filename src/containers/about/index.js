import React from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';

const ABOUTDATA = [
  {
    title: 'Title One',
    content: 'This is content for section one in about page',
  },
  {
    title: 'Title Two',
    content: 'This is content for section Two in about page',
  },
  {
    title: 'Title Three',
    content: 'This is content for section Three in about page',
  },
  {
    title: 'Title Four',
    content: 'This is content for section Four in about page',
  },
  {
    title: 'Title Five',
    content: 'This is content for section Five in about page',
  },
];

export default function About() {
  const _renderFlatList = ({ item, index }) => {
    return (
      <View
        key={index}
        style={tw`flex items-center justify-center w-full h-screen`}
      >
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  };

  const _renderEmptyList = () => {
    return (
      <View
        style={tw`flex items-center justify-center w-full min-h-full`}
      >
        <Text>no data</Text>
      </View>
    );
  };
  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={ABOUTDATA}
        renderItem={({ item, index }) => (
          <_renderFlatList item={item} key={index} />
        )}
        ListEmptyComponent={() => <_renderEmptyList />}
      />
    </View>
  );
}
