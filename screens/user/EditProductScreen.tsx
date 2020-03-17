import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform
} from 'react-native';
import { CustomHeaderButtons } from '../../components/ui/HeaderButton';
import { Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { updateProduct, createProduct } from '../../store/actions/products';

const EditProductScreen = ({ route: { params }, navigation }) => {
  navigation.setOptions({
    headerTitle: params.productId ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitHandler}
        />
      </CustomHeaderButtons>
    )
  });

  const editedProduct = useSelector(({ products }: RootState) =>
    products.userProducts.find(prod => prod.id === params.productId)
  );
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  );
  const dispatch = useDispatch();

  const submitHandler = () => {
    if (editedProduct) {
      dispatch(updateProduct(params.productId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={input => setTitle(input)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={input => setImageUrl(input)}
          />
        </View>
        {params.productId ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={input => setPrice(input)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={input => setDescription(input)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
