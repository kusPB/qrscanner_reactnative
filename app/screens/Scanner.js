import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StackActions } from '@react-navigation/native';
import {color} from '../common/color';
import { postData } from '../api/client';
import { useLogin } from '../context/LoginProvider';


export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {location} = useLogin();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let str = '';
    if(data.includes('kus_')){
      let arr = data.split('_');
      str = arr[1];
      postData('api/getqrinformation', {
        qrInfo: str,
        location: location
      }).then(result => {
        let data = result.data;
        if(data.state == 200){
          navigation.navigate('ResultScreen', {qr: data.msg});
        }else {
          alert(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        alert('Can\'t find server!');
      })
    }else{
      alert('Invalid QR!');
    }
    
  };

  const goHistory = () => {

  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[StyleSheet.absoluteFillObject, {paddingTop:15} ]}>
        <Text style={styles.title}>
            QR Scanner
        </Text>
      </View>
      {scanned && 
      <>
        <View style={styles.buttonlist}>
            <Button title={'Tap to Scan Again'}  onPress={() => setScanned(false)} />
        </View>
        {/* <View style={{margin:15}} /> 
        <View style={styles.buttonlist}>
            <Button title={'QR History'} onPress={() => goHistory} />
        </View> */}
        
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.color_bgyellow,
  },
  buttonlist: {
    borderColor: 'white',
    borderWidth: 2,
  },
  title: {
    fontSize:22,
    color: color.color_usersap,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});