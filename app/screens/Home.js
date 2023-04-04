import React from 'react';
import { StyleSheet, Image  } from 'react-native';
import { Box, VStack, Center, Text, View, Button } from 'native-base';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { color } from '../common/color';
import FormSubmitButton from '../components/FormSubmitButton';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Box p={5} m={3} borderWidth={1} borderRadius={8} borderColor={'gray.200'} backgroundColor={color.color_background} >
        <Center>
          <VStack>
            <Text color="coolGray.900" alignSelf="center" fontSize="lg" _dark={{ color: "warmGray.200" }} bold>
              {"Scan QR code!"}
            </Text>
            <Text fontSize="xs" _dark={{color: "warmGray.50" }} color="blue.500" alignSelf="flex-end">
              Find & Download the most popular Qr Code Scanning Vectors on Freepik 
              ✓ Free for commercial use 
              ✓ High Quality Images 
              ✓ Made for Creative Projects.
            </Text>
          </VStack>
        </Center>
      </Box>
      <Box >
        <Center>
          <Image style={{width: 240, resizeMode: 'contain',}} source={require('../../assets/qr.png')} />
        </Center>
      </Box>
      <Box p={3}>
        <Center>
          <FormSubmitButton onPress={()=>{
            navigation.navigate('Scanner');
          }}  title='Scan QR code!' />
        </Center>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Home;
