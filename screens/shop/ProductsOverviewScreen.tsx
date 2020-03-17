import React from 'react';
import { StyleSheet, FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/types';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { CustomHeaderButtons, Item } from '../../components/ui/HeaderButton';
import Colors from '../../constants/colors';
import Product from '../../models/Product';

const ProductsOverviewScreen = ({ navigation }) => {
  navigation.setOptions({
    headerTitle: 'All Products',
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navigation.navigate('Cart')}
        />
      </CustomHeaderButtons>
    ),
    headerLeft: () => (
      <CustomHeaderButtons>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </CustomHeaderButtons>
    )
  });

  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  const selectItemHandler = (item: Product) => {
    navigation.navigate('ProductsDetail', { product: item });
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => selectItemHandler(item)}
        >
          <Button
            title="View Details"
            onPress={() => selectItemHandler(item)}
            color={Colors.primary}
          />
          <Button
            title="To Cart"
            onPress={() => dispatch(addToCart(item))}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
