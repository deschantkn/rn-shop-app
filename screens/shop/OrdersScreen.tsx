import React from 'react'
import { FlatList, Text, Platform } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { CustomHeaderButtons, Item } from '../../components/ui/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = ({ navigation }) => {
  navigation.setOptions({
    headerTitle: 'Your Orders',
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

  const orders = useSelector(({ orders }: RootState) => orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.getReadableDate()}
          items={item.items}
        />
      )}
    />
  );
}

export default OrdersScreen;
