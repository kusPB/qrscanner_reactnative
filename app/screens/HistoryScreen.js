import React, { useEffect, useState} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  Center,
  Spinner,
  Spacer,
  VStack,
  HStack,
  FlatList,
  Heading,
  Box
} from "native-base";
import { TouchableOpacity } from 'react-native'


// import SQL from "../components/SQL";
import Dialog from "../components/Dialog";
import { getData } from '../api/client';
import { color } from '../common/color';
import { Message } from "../components/LoadingBar";

const HistoryScreen = (props)=> {
  
  const [qrs, setQrs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isshow, setIsshow] = useState(false);
  const [detailInfo, setDetailInfo] = useState({
    content: '',
    id: 0, 
    date:''
  });

  useEffect(()=> {
    console.log('fetch');
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

  const openDetail = (id) => {
    let data = qrs[id];
    setDetailInfo({content: data.content, id: data.id, date:data.date});
    setIsshow(true);
  }

  const closeDetail = () => {
    setIsshow(false);
  }

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
        <Dialog isShow={isshow} data={detailInfo} onClose={closeDetail}></Dialog>
        <FlatList data={qrs} 
      renderItem={({item, index }) => 
          <TouchableOpacity onPress={()=>openDetail(index)}>
            <Box  bg={'#fff'} borderRadius="md" mx={2} my={1}  pl={["0", "4"]}  borderWidth={1} borderColor={"gray.300"} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Center><MaterialCommunityIcons name="qrcode" size={55} color={color.color_primary} /></Center>
              <VStack w={"80%"}>
                <HStack>
                  <Text color="coolGray.900" _dark={{ color: "warmGray.200" }} bold>
                    {"Content"}
                  </Text>
                  <Spacer></Spacer>
                  <Text fontSize="xs" _dark={{color: "warmGray.50" }} color="blue.500" alignSelf="flex-end">
                    {item.date}
                  </Text>
                </HStack>
                <Text color="coolGray.500" _dark={{ color: "warmGray.200" }}>
                  {(item.content).length>50?(item.content).substring(0,50).replace(/\n/g, ' ') + '...':(item.content).replace(/\n/g, ' ')}
                </Text>
              </VStack>
              <Spacer />
              
            </HStack>
          </Box>
          </TouchableOpacity>
          } keyExtractor={item => item.id} />
      </Box>
    );
  
}

export default HistoryScreen;
