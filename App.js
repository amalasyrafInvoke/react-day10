import React from 'react';
import { useDeviceContext } from 'twrnc';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';

// Component Import
import Login from './src/containers/login';
import Register from './src/containers/register';
import Home from './src/containers/home';
import MovieModal from './src/components/movieModal';
import MovieSearch, { SearchButton } from './src/components/movieSearch';
import About from './src/containers/about';
import Contact from './src/containers/contact';
import CartModal, { CartButton } from './src/components/cartButton';
import Profile from './src/containers/profile';

// Icon Import
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: `white`,
        tabBarInactiveTintColor: 'gray',
        headerStyle: tw`bg-blue-900`,
        headerTitleStyle: tw`text-white text-xl`,
        // headerShown: false,
        tabBarStyle: tw`bg-blue-900`,
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = focused ? 'home-sharp' : 'home-outline';
            return <Ionicons name={iconName} size={24} color='white' />;
          },
          title: 'Movie List',
          headerRight: () => <SearchButton navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name='About'
        component={About}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = focused ? 'info' : 'info';
            return <Feather name={iconName} size={24} color='white' />;
          },
        }}
      />
      <Tab.Screen
        name='Contact'
        component={Contact}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = focused ? 'contact-page' : 'contact-page';
            return <MaterialIcons name={iconName} size={24} color='white' />;
          },
          headerRight: () => <CartButton navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = focused ? 'account-details' : 'account-details';
            return (
              <MaterialCommunityIcons name={iconName} size={24} color='white' />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  useDeviceContext(tw);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
              headerStyle: tw`bg-blue-900`,
              headerTitleStyle: tw`text-white text-xl`,
            }}
          >
            <Stack.Group>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen
                name='Registration'
                component={Register}
                options={{ headerBackVisible: false }}
              />
              <Stack.Screen
                name='TabNav'
                component={TabNav}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Group>

            <Stack.Group
              screenOptions={{ presentation: 'containedTransparentModal' }}
            >
              <Stack.Screen
                name='MovieModal'
                options={{ title: 'Movie Details' }}
                component={MovieModal}
              />
              <Stack.Screen
                name='SearchModal'
                options={{ headerShown: false }}
                component={MovieSearch}
              />
              <Stack.Screen
                name='CartModal'
                options={{ headerShown: false }}
                component={CartModal}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
