import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';

import Colors from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/ui/Card';

const CartScreen = ({ navigation }) => {
  navigation.setOptions({
    headerTitle: 'Your Cart'
  });

  const cartTotal = useSelector(({ cart }: RootState) => cart.totalAmount);
  const cartItems = useSelector(({ cart }: RootState) => {
    const transformedCartItems = [];
    for (const key in cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: cart.items[key].productTitle,
        quantity: cart.items[key].quantity,
        sum: cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(parseFloat(cartTotal.toFixed(2)) * 100) / 100}</Text>
        </Text>
        <Button
          title="Order Now" 
          color={Colors.accent} 
          onPress={() => dispatch(addOrder(cartItems, cartTotal))}
          disabled={cartItems.length === 0}
        />
      </Card>
      <FlatList
        data={cartItems} 
        keyExtractor={(item) => item.productId} 
        renderItem={({ item }) => (
          <CartItem
            onRemove={() => dispatch(removeFromCart(item.productId))} 
            quantity={item.quantity} 
            title={item.productTitle} 
            amount={item.sum}
            deletable
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
