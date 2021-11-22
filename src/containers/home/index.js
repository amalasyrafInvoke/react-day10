import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import tw from 'twrnc';
import { wrapScrollView } from 'react-native-scroll-into-view';
import { useGetMoviesByNameQuery } from '../../reducers/apiReducer';
import Movie from '../../components/movie';
import { useSelector } from 'react-redux';

const CustomScrollView = wrapScrollView(ScrollView);

export default function Home({ navigation }) {
  const searchValue = useSelector((state) => state.movies.searchValue);
  const { data, isLoading } = useGetMoviesByNameQuery(searchValue);

  return (
    <SafeAreaView>
      <CustomScrollView
        style={tw`min-h-full w-full`}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {!isLoading ? (
            data.Response === 'True' ? (
              <>
                <View
                  style={tw`w-full flex items-center justify-center flex-wrap`}
                >
                  {data.Search.map((item) => (
                    <Movie
                      data={item}
                      key={item.imdbID}
                      navigation={navigation}
                    />
                  ))}
                </View>
              </>
            ) : (
              <Text>Error: {data.Error}</Text>
            )
          ) : (
            <Text>Loading data..</Text>
          )}
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
}
