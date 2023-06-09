import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Button,
  BackHandler
} from 'react-native';
import React, {useEffect} from 'react';
import { useLogin } from '../context/LoginProvider';
import {color} from '../common/color';

const WellDone = ({navigation}) => {
  const { setIsLoggedIn, setProfile } = useLogin();



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.login}>Well Done!</Text>
        <Text
          style={styles.subtitle}>
          Yes, You registered!
        </Text>
        <View
          style={styles.content}>
        </View>
        <Button
          title="Let's start!"
          onPress={() => {
            // navigation.dispatch(
            //   StackActions.replace('AppForm')
            // );
            setIsLoggedIn(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  login: {
    fontSize: 35,
    color: color.color_black,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.color_primary
  },
  title: {
    marginTop: 80, 
    paddingHorizontal: 20, 
    flex: 1,
    marginBottom:20
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
    color: color.color_lightblack,
  },
  content: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
   
});

export default WellDone;
