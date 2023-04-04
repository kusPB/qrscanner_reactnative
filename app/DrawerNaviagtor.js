import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Home from './screens/Home';
import Scanner from './screens/Scanner';
import { getData } from './api/client';
import HistoryScreen from './screens/HistoryScreen';
import { useLogin } from './context/LoginProvider';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const { setIsLoggedIn, profile } = useLogin();

  const logout = () => {
    getData('api/mobilelogout')
    .then(result => {
      console.log(result);
      let data = result.data;
      if(data.state == 200){
        setIsLoggedIn(false);
      }else {
        console.log(result);
      }
    })
  }
  
  
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#24a8ff',
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>{profile.name}</Text>
            <Text style={{color: 'white'}} >{profile.email}</Text>
          </View>
          <Image
            source={{
              uri:
                profile.avatar ||
                'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#d6d6d6',
          padding: 20,
        }}
        onPress={() => logout()}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  // const [showResultScreen, setShowResultScreen] = useState(false);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName='Home'
    >
      <Drawer.Screen component={Home} name='Home' />
      <Drawer.Screen component={Scanner} name='Scanner' />
      {/* <Drawer.Screen component={ResultScreen} name='ResultScreen' /> */}
      <Drawer.Screen component={HistoryScreen} name='HistoryScreen' />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
