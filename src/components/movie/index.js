import React, { useRef } from 'react';
import { Text, Pressable, View, Image } from 'react-native';
import tw from 'twrnc';
import { useScrollIntoView } from 'react-native-scroll-into-view';

export default function Movie({ data, navigation }) {
  const scrollIntoView = useScrollIntoView();
  const viewRef = useRef();
  return (
    <View
      style={tw`w-full h-[75vh] my-8 rounded-md flex items-center justify-evenly`}
      ref={viewRef}
    >
      <Pressable
        onPress={() => {
          navigation.navigate('MovieModal', {
            id: data.imdbID,
          });
          scrollIntoView(viewRef.current, {
            align: 'center'
          });
        }}
        style={tw`w-full h-full flex items-center justify-center`}
      >
        <View style={tw`w-4/5 flex items-center justify-center h-full`}>
          {data.Poster === 'N/A' ? (
            <View
              style={tw`bg-green-100 w-full min-h-full flex items-center justify-center`}
            >
              <Text>Image Not Available</Text>
            </View>
          ) : (
            <Image
              source={{
                uri: data.Poster,
              }}
              style={tw`w-full min-h-full`}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
}
