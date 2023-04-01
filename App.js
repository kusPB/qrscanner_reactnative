import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NativeBaseProvider } from "native-base";

import MainNavigator from './app/MainNavigator';
import LoginProvider from './app/context/LoginProvider';

export default function App() {
  return (
    <LoginProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootSiblingParent>
            <MainNavigator />
          </RootSiblingParent>
        </NavigationContainer>
      </NativeBaseProvider>
        
    </LoginProvider>
  );
}
