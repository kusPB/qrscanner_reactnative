import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {color} from '../common/color';

const FormInput = props => {
  const { placeholder, label, error } = props;
  
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        {error ? (
          <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>
      <View style={styles.input_border}>
        <TextInput {...props} placeholder={placeholder} style={styles.input} />
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 35,
    fontSize: 16,
    paddingLeft: 10,
  },
  input_border: {
    padding: 5,
    borderWidth: 1,
    borderColor: color.color_primary,
    marginBottom: 20,
    borderRadius: 8,
  }
});

export default FormInput;
