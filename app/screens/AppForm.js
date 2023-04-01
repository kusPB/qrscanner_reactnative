import React, { useRef, useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location';

import FormHeader from '../components/FormHeader';
import FormSelectorBtn from '../components/FormSelectorBtn';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import {color} from '../common/color';
import { useLogin } from '../context/LoginProvider';

const { width } = Dimensions.get('window');

export default function AppForm({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  const { setLocation } = useLogin();

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 0],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 80],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: [color.color_primary, color.color_gray],
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: [color.color_gray, color.color_primary],
  });

  

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  
const GetCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert(
      'Permission not granted',
      'Allow the app to use location service.',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  }

  let { coords } = await Location.getCurrentPositionAsync();

  if (coords) {
    const { latitude, longitude } = coords;
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });

    for (let item of response) {
      let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
      console.log(address);
      setLocation(address);
      setDisplayCurrentAddress(address);
    }
  }
};

  return (
    <View style={{ flex: 1, paddingTop: 80 }}>
      <View style={{ height: 80 }}>
        <FormHeader
          leftHeading='Welcome '
          rightHeading=''
          subHeading='QR scanner!'
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTranslateY={rightHeaderTranslateY}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <FormSelectorBtn
          style={styles.borderLeft}
          backgroundColor={loginColorInterpolate}
          title='Login'
          onPress={() => scrollView.current.scrollTo({ x: 0 })}
        />
        <FormSelectorBtn
          style={styles.borderRight}
          backgroundColor={signupColorInterpolate}
          title='Sign up'
          onPress={() => scrollView.current.scrollTo({ x: width })}
        />
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
      >
        <LoginForm navigation={navigation} />
        <ScrollView>
          <SignupForm navigation={navigation} />
        </ScrollView>
      </ScrollView>
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
