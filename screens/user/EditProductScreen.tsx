import React, { useReducer } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { CustomHeaderButtons } from '../../components/ui/HeaderButton';
import { Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { updateProduct, createProduct } from '../../store/actions/products';
import Input from '../../components/ui/Input';

const FORM_UPDATE = 'FORM_UPDATE';
type FormState = {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  inputIsTouched: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  formIsValid: boolean;
};
type FormAction = {
  type: typeof FORM_UPDATE;
  payload: {
    input: string;
    value: string;
    isValid: boolean;
    isTouched: boolean;
  };
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.payload.input]: action.payload.value
      };
      const updateValidities = {
        ...state.inputValidities,
        [action.payload.input]: action.payload.isValid
      };

      let updatedFormIsValid = true;
      for (const key in updateValidities) {
        updatedFormIsValid = updatedFormIsValid && updateValidities[key];
      }

      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updateValidities,
        formIsValid: updatedFormIsValid
      };
    default:
      return state;
  }
};

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

  const dispatch = useDispatch();

  const editedProduct = useSelector(({ products }: RootState) =>
    products.userProducts.find(prod => prod.id === params.productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    inputIsTouched: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: false
  });

  const textChangeHandler = (text: string, inputId: string, validation) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
  
    if (validation.required && text.trim().length === 0) {
      isValid = false;
    }
    if (validation.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (validation.min != null && +text < validation.min) {
      isValid = false;
    }
    if (validation.max != null && +text > validation.max) {
      isValid = false;
    }
    if (validation.minLength != null && text.length < validation.minLength) {
      isValid = false;
    }

    dispatchFormState({
      type: FORM_UPDATE,
      payload: {
        input: inputId,
        value: text,
        isValid,
        isTouched: true
      }
    });
  };

  const submitHandler = () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        { text: 'Okay' }
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          params.productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label='Title'
          errorMessage='Please enter a valid title!'
          inputConfig={{
            keyboardType: 'default',
            autoCapitalize: 'sentences',
            autoCorrect: true,
            returnKeyType: 'next'
          }}
          inputValue={formState.inputValues.title}
          onChangeText={input => textChangeHandler(input, 'title', {})}
          isValid={formState.inputValidities.title}
          isTouched={formState.inputIsTouched.title}
        />
        <Input
          label='Image URL'
          errorMessage='Please enter a valid image url!'
          inputConfig={{
            keyboardType: 'default',
            returnKeyType: 'next'
          }}
          inputValue={formState.inputValues.imageUrl}
          onChangeText={input => textChangeHandler(input, 'imageUrl', {})}
          isValid={formState.inputValidities.imageUrl}
          isTouched={formState.inputIsTouched.imageUrl}
        />
        {params.productId ? null : (
          <Input
            label='Price'
            errorMessage='Please enter a valid price!'
            inputConfig={{
              keyboardType: 'decimal-pad',
              returnKeyType: 'next'
            }}
            inputValue={formState.inputValues.price}
            onChangeText={input => textChangeHandler(input, 'price', {})}
            isValid={formState.inputValidities.price}
            isTouched={formState.inputIsTouched.price}
          />
        )}
        <Input
          label='Description'
          errorMessage='Please enter a valid description!'
          inputConfig={{
            keyboardType: 'default',
            autoCapitalize: 'sentences',
            autoCorrect: true,
            multiline: true,
            numberOfLines: 3
          }}
          inputValue={formState.inputValues.description}
          onChangeText={input => textChangeHandler(input, 'description', {})}
          isValid={formState.inputValidities.description}
          isTouched={formState.inputIsTouched.description}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  
});

export default EditProductScreen;
