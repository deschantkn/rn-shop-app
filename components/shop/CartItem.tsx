import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ onRemove, quantity, title, amount, deletable }) => {
  return (
    <View style={styles.cardItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${amount.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    padding: 10, 
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
