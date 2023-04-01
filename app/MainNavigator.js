import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppForm from './screens/AppForm';
import VerifyEmail from './screens/VerifyEmail';
import ImageUpload from './components/ImageUpload';
import WellDone from './screens/WellDone';
import { useLogin } from './context/LoginProvider';
import DrawerNavigator from './DrawerNaviagtor';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
      <Stack.Screen component={VerifyEmail} name='VerifyEmail' />
      <Stack.Screen component={WellDone} name='WellDone' />
      <Stack.Screen component={ImageUpload} name='ImageUpload' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;
