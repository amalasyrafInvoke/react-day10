import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import { useGetMovieDetailQuery } from '../../reducers/apiReducer';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function MovieModal({ route, navigation }) {
  const { data, isLoading } = useGetMovieDetailQuery(route.params.id);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    if (data) {
      setActors(data.Actors.split(', '));
    }
  }, [data]);

  return (
    <View style={tw`h-full w-full flex bg-gray-300 opacity-95 `}>
      <Pressable
        style={tw`mt-4 p-2 mx-4 flex flex-row items-center justify-start`}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Feather
          style={tw`mr-2`}
          name='arrow-left-circle'
          size={24}
          color='black'
        />
        <Text style={tw`text-lg`}>Back to Movie List</Text>
      </Pressable>
      <View style={tw`w-[70%] mx-auto`}>
        {isLoading ? (
          <Text>isLoading...</Text>
        ) : (
          <View style={tw`w-full px-4`}>
            <Text style={tw`text-2xl font-semibold`}>
              {data.Title ? data.Title : 'N/'}
            </Text>
            <Text style={tw`text-lg font-semibold`}>{data.Year}</Text>
            <Text style={tw`mt-1.5`}>Rated: {data.Rated}</Text>
            <Text style={tw`mt-1.5`}>Released: {data.Released}</Text>
            <Text style={tw`mt-1.5`}>Runtime: {data.Runtime}</Text>
            <Text style={tw`mt-1.5`}>Director: {data.Director}</Text>
            <Text style={tw`mt-1.5`}>Writer: {data.Writer}</Text>
            <View style={tw`mt-1.5`}>
              <Text style={tw`font-semibold`}>Actors:</Text>
              {actors.map((actor) => (
                <View key={actor} style={tw`flex flex-row items-center`}>
                  <MaterialIcons name='emoji-people' size={24} color='black' />
                  <Text style={tw`ml-2 mt-1`}>{actor}</Text>
                </View>
              ))}
            </View>
            <Text style={tw`mt-1.5`}>Plot: {data.Plot}</Text>
            <Text style={tw`mt-1.5`}>Language: {data.Language}</Text>
            <Text style={tw`mt-1.5`}>Box Office: {data.BoxOffice}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
