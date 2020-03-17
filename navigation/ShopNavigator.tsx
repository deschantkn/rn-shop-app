import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans-bold'
  }
};

const OrdersNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="Orders" component={OrdersScreen} />
  </Stack.Navigator>
);

const ProductsNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="ProductsOverview" component={ProductsOverviewScreen} />
    <Stack.Screen name="ProductsDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

const UserProductsNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="UserProducts" component={UserProductsScreen} />
    <Stack.Screen name="EditProduct" component={EditProductScreen} />
  </Stack.Navigator>
);

const ShopNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: { fontFamily: 'open-sans-bold' }
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={UserProductsNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={color}
            />
          )
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default ShopNavigator;
