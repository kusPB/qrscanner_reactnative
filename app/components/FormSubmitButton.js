import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {color} from '../common/color';

const FormSubmitButton = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? color.color_gray
    : color.color_primary;

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={{ fontSize: 18, color: '#fff' }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default FormSubmitButton;
