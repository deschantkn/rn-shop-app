import React from 'react';
import {
  ScrollView,
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Button
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/colors';
import { addToCart } from '../../store/actions/cart';

const ProductDetailScreen = ({
  route: { params: { product } },
  navigation
}) => {
  navigation.setOptions({
    headerTitle: product.title
  });
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button title="Add to Cart" color={Colors.primary} onPress={() => dispatch(addToCart(product))} />
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  }
});

export default ProductDetailScreen;
