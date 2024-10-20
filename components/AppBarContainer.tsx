import React, { useState, useEffect } from "react";
import { Image , View , StyleSheet , ImageBackground, TouchableOpacity, GestureResponderEvent } from "react-native";
import DrawerMenu from "./DrawerMenu";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { auth, database } from '../firebase-config';
import {  ref,  onValue, query, orderByChild, equalTo, get } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


const style = StyleSheet.create(
    {
        appBarContainer: {
            backgroundColor: '#f78f1e',
            height: 80,
            elevation: 5
        },
        appBar: {
            marginTop:40,
            marginHorizontal: 20,
            flexDirection: 'row'
        },
        menu:{
            width: 20,
            marginTop:5,
            height:20,
            resizeMode: 'contain',
        },
        back_btn_img : {
            marginTop: 10,
            width: 15,
            height:15,
            resizeMode: 'contain',
        },
        logo: {
            width: 100,
            height:40,
            resizeMode: 'contain',
        },
        search_btn: {
            width: 30,
            height:40,
            resizeMode: 'contain',
            marginRight: 20,
        },
        favourite: {
            width: 30,
            height:40,
            resizeMode: 'contain',
            marginRight: 20,
        },
        bag_btn: {
            // position: 'absolute',
            // right: 0,
            // marginLeft: 'auto' ,
            width: 30,
            height:40,
            resizeMode: 'contain',
        },
        back_btn: {
            resizeMode:'contain', 
            backgroundColor: 'transparent', 
            width: 40, 
            height: 30,
        }

    }
)
// export default AppBarContainer;

// components/CustomAppBar.tsx

interface CustomAppBarProps {
  title: string;
  onBackPress?: (event: GestureResponderEvent) => void;
}

const AppBarContainer: React.FC<CustomAppBarProps> = ({ title, onBackPress }) => {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [emptyCart, setEmptyCart] = useState(true);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  useEffect(() => {
    // const user = auth.currentUser;
    // if(user){
    //     setUserId(user.uid);
    // }
    const fetchProducts = async () => {
    
      try {
        
        // const cartRef = ref(database, 'cart/' + userId);
        // const snapshot = await get(cartRef);
        // if(snapshot.exists()){
        //     console.log(snapshot);
        //     setEmptyCart(false);
        // } 
        const existingCart = await AsyncStorage.getItem('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        if (cart.length === 0) {
          setEmptyCart(true);
        } else {
          setEmptyCart(false);
        }

        
      } catch (error) {
        console.error("Error reading data: ", error);
      } 
    
  };
  fetchProducts();
  },[]);

  return (
    <View style={style.appBarContainer}>
        <View style={style.appBar}>
        {onBackPress && (
         <ImageBackground source ={require('@/assets/images/icon/back_btn_header.png')} style={style.back_btn_img}>
         <TouchableOpacity style={style.back_btn} onPress={onBackPress}></TouchableOpacity> 
        </ImageBackground>
      )}
         {!onBackPress && (<ImageBackground source ={require('@/assets/images/icon/menu.png')} style={style.menu}>
         <TouchableOpacity style={style.back_btn} onPress={toggleDrawer}></TouchableOpacity> 
          </ImageBackground>
          )}
         
      
         {/* <DrawerMenu isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} /> */}
        <Image source={require('@/assets/images/icon/logo_hdr.png')} style={style.logo}/>
        <View style={{flexDirection: 'row', alignContent:'flex-end',marginLeft: 'auto' , marginTop:5}}>
        <TouchableOpacity onPress={() => router.push((`/cart`))} >
        {emptyCart?<Ionicons name="cart-outline" size={24} color="white" />:
        <Ionicons name="cart" size={24} color="white" />}
        </TouchableOpacity>
        </View>  
        </View>
      
    </View>
  );
};


export default AppBarContainer;
