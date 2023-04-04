import axios from 'axios';
// import CookieManager from 'react-native-cookies'
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({ baseURL: 'http://vipinpandey.com/adminpanel/' })
// const client = axios.create({ baseURL: 'http://10.10.18.66/Codeigniter-User-Panel-Management-master/' })
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "cookie": '',
};

const updateCookie = (response) => {
    let cookieData = response.headers.get("set-cookie");
    if(cookieData){
        AsyncStorage.setItem('cookie', cookieData);
    }
}



const getHeader = async() => {
    // await CookieManager.clearAll();
    const cookie = await AsyncStorage.getItem('cookie')
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "cookie": cookie?cookie:'',
    };
}

const headersData = {
    'Content-Type': 'application/json',
  };

export const postData = async(url, data) => {
    console.log(data);
    return client.post(url, data, {headers:headersData});
}

export const getData = async(url) => {
    console.log(url);
    return client.get(url);
}


