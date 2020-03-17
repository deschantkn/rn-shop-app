import React from 'react';
import { StyleSheet, FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/types';
import ProductItem from '../../components/shop/ProductItem';
import { CustomHeaderButtons, Item } from '../../components/ui/HeaderButton';
import Colors from '../../constants/colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({ navigation }) => {
  navigation.setOptions({
    headerTitle: 'Your Products',
    headerLeft: () => (
      <CustomHeaderButtons>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </CustomHeaderButtons>
    ),
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navigation.navigate('EditProduct', {})}
        />
      </CustomHeaderButtons>
    )
  });

  const userProducts = useSelector(
    ({ products }: RootState) => products.userProducts
  );
  const dispatch = useDispatch();

  const deleteHandler = (itemId) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {text: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(itemId))}
    ])
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => navigation.navigate('EditProduct', { productId: item.id })}
        >
          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate('EditProduct', { productId: item.id })
            }
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => deleteHandler(item.id)}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
