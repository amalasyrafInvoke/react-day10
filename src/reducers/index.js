// Root reducer
import { combineReducers } from 'redux';
import { pokemonApi, moviesApi } from './apiReducer';
import movies from './movieReducer';
import count from './countReducer';
import cart from './cartReducer';

export default combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
  movies,
  count,
  cart
});
