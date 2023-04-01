import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import FormInput from '../components/FormInput';
import FormSubmitButton from '../components/FormSubmitButton';
import { StackActions } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useLogin } from '../context/LoginProvider';

import {postData} from '../api/client';
import {color} from '../common/color';


export default function VerifyEmail({ navigation }) {
  const [err, setErr] = useState('');
  const [verifyCode, setVerifyCode] = useState(''); 

  const { setProfile } = useLogin();

  useEffect(() => {
    const onBackPress = () => {
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [navigation]);


  const handleSend = async() => {
    if(verifyCode.length == 6){
        const res = await postData('api/verifyEmail', {
            code: verifyCode
        }).then(result => {
            let data = result.data;
            if(data.state == 200){
                setProfile(data);
                navigation.dispatch(
                    StackActions.replace('WellDone')
                );
            }else {
              console.log(data);
              setErr(data.msg);
            }
        })
        .catch(error => {
            console.log(error);
            setErr('Can\'t find server!');
        })
        
    }else{
        setErr('Must be 6 numbers!');
    }
  }

  return (
    <View style={{ flex: 1, paddingTop: 80 }}>
      <View style={{ paddingBottom: 40, height: 90, justifyContent: 'center' }}>
        <View>
            <Text style={{textAlign:'center', fontSize: 25, color: color.color_primary}}> Verify your email to proceed</Text>
            <Text style={{textAlign:'center'}}> We just sent an verify code!</Text>
            <Text style={{textAlign:'center'}}> Please check your email and input it.</Text>
        </View>
            
      </View>
      <View
        style={{
          flexDirection: 'column',
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <View>
          <Text style={{color: 'red'}}>{err}</Text>
        </View>
        <View>
            <FormInput
                value={verifyCode}
                onChangeText={text=>{
                    if(text.length<7)
                        setVerifyCode(text)
                    console.log(text);
                }}
                // onBlur={}
                label='Verify code'
                keyboardType='phone-pad'
                placeholder='******'
            />
        </View>
        <View>
            <FormSubmitButton
                onPress={handleSend}
                title='Send'
            />
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderLeft: {
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  borderRight: {
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
  },
});
