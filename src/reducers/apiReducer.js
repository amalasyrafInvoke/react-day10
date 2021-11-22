// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
  endpoints: (builder) => ({
    getMoviesByName: builder.query({
      query: (name) => ({
        url: '/',
        params: {
          apikey: 'fd7cf733',
          s: name,
        },
      }),
    }),
    getMovieDetail: builder.query({
      query: (id) => {
        if (id) {
          return {
            url: '/',
            params: {
              apikey: 'fd7cf733',
              i: id,
            },
          };
        }
      },
    }),
  }),
});

export const { useGetMoviesByNameQuery, useGetMovieDetailQuery } = moviesApi;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
