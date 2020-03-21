import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Input = ({
  label,
  errorMessage,
  inputConfig,
  inputValue,
  onChangeText,
  isValid,
  isTouched
}) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputConfig}
        style={styles.input}
        value={inputValue}
        onChangeText={onChangeText}
      />
      {!isValid && isTouched && <Text>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Input;
