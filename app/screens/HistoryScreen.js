import React, { useEffect, useState} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  List,
  Spinner,
  Spacer,
  VStack,
  HStack,
  FlatList,
  Heading,
  Box
} from "native-base";

// import SQL from "../components/SQL";
import { getData } from '../api/client';
import { color } from '../common/color';
import { Message } from "../components/LoadingBar";

const HistoryScreen = (props)=> {
  
  const [qrs, setQrs] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await getData('api/getqrhistory', {});
        console.log(res.data);
        let data = res.data;
        if (data.state === 200) {
          // Do something with the data
          setFetching(false);
          setQrs(data.list);
        } else {
          if (data.msg) {
            alert(data.msg);
          } else {
            alert('unknown error!');
          }
          setFetching(false);
        }
      } catch (error) {
        console.log(error);
        alert('Can\'t find server!');
        setFetching(false);
      }
    }
    fetchData();
    return () => {

    }
  }, [])

  if (fetching) {
    return (
      <Message>
        <Spinner color="green" size="lg" />
      </Message>
    );
  } else if (qrs === null || qrs.length === 0) {
    return (
      <Message>
        <Text>No records</Text>
      </Message>
    );
  } else
    return (
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          History
        </Heading>
        <FlatList data={qrs} 
      renderItem={({item }) => 
          <Box borderBottomWidth="1" _dark={{borderColor: "muted.50" }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <MaterialCommunityIcons name="qrcode" size={48} color={color.color_primary} />
              <VStack>
                {/* <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                  {item.id}
                </Text> */}
                <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                  {item.content}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">
                {item.date}
              </Text>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
      </Box>
    );
  
}

export default HistoryScreen;
