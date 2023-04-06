import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Box, Center, VStack, View, Text } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {color} from '../common/color';
import { postData } from '../api/client';
import { useLogin } from '../context/LoginProvider';
import Dialog from "../components/Dialog";


export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isshow, setIsshow] = useState(false);
  const [detailInfo, setDetailInfo] = useState({
    content: '',
    id: 0, 
    date:''
  });
  const {location} = useLogin();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const closeDetail = () => {
    setIsshow(false);
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    let str = '';
    if(data.includes('kus_')){
      let arr = data.split('_');
      str = arr[1];
      postData('api/getqrinformation', {
        qrInfo: str,
        location: location
      }).then(result => {
        console.log(result.data)
        let data = result.data;
        if(data.state == 200){
          const d = new Date();
          let text = d.toISOString();
          let arr = text.split('.');
          setIsshow(true);
          setDetailInfo({
            content: data.msg,
            id: 0, 
            date:arr[0].replace('T', ' ')
          })
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
    
    <Box m={2} flex={1} >
      <Dialog isShow={isshow} data={detailInfo} onClose={closeDetail}></Dialog>
      <VStack>
        <View w={'100%'} borderRadius={19} borderColor='gray.300' borderWidth={1}  bg='white' m='auto'>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={[StyleSheet.absoluteFillObject, styles.barcode]}
            />
            <View width={'100%'} height={'100%'} borderWidth={2} borderRadius={15} bg='#0002' borderColor={'#fff5'} style={StyleSheet.absoluteFillObject}  ></View>
            <View style={styles.buttonlist}  h='100%' >
            {scanned && <Button title={'Tap to Scan Again'}  onPress={() => setScanned(false)} /> }
            </View>
        </View>
        <View w={'90%'} m='auto' >
          <Center>
            <Button title={'Go to History'}  onPress={() => navigation.navigate('HistoryScreen')} />
          </Center>
        </View>
      </VStack>
    </Box>
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
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  title: {
    fontSize:22,
    color: color.color_usersap,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  barcode:{
    borderRadius: 10,
    margin: 10
  }
});