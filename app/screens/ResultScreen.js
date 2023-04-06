import React from 'react';
import {useEffect, useState} from "react";
import { Dimensions, Clipboard, StyleSheet, View, Text, Button } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Grid, Row, Col } from "react-native-easy-grid";

import {color} from '../common/color';

const ResultScreen = ({route, navigation}) => {
  
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = content => {
    Clipboard.setString(content);
    setCopied(true)
  };
  
  const { qr } = route.params;

  return (
      <View style={styles.container}>
          <Grid>
            <Col style={styles.qrCard}>
              <Row>
                <MaterialCommunityIcons name="qrcode" size={70} color={color.color_primary} />
                <Text style={styles.qrTitle}>QR Result</Text>
              </Row>
              <Row style={styles.content}>
                <Text >{qr}</Text>
              </Row>
            </Col>
            <Row style={styles.copyButton}>
              <Button title={'Copy to Clipboar'} style={styles.buttonlist}  onPress={() => copyToClipboard(qr)} />
              <View style={{padding: 10}}></View>
              <Button title={'History'}  onPress={() => {navigation.navigate('HistoryScreen');}} />
            </Row>
          </Grid>
      </View>
  );
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
  },
  qrCard: {
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonlist: {
    borderRadius:5
  },
  content: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  qrTitle: { 
    paddingTop: 20,
    paddingLeft: 30,
    fontSize: 30,
    color: color.color_primary
  },
  copyButton: {
    justifyContent: 'center',
    marginTop: 20,
    height: 40,
  },
  copyButtonTitle: { color: "white" }
});

export default ResultScreen;