import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import React, {Component, useEffect, useState}  from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {auth} from '../../firebase-config';

export default function SearchScreen(){
  const router = useRouter();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    console.log(user?.uid);
    if(user?.displayName)
    {
      setName(user?.displayName);
    }else if(user?.email){
      setName(user?.email);
    }
    if(user){
      setId(user.uid);
    }
    

  },[]);
      return (
      <View style={{backgroundColor:"#f8f8ee" , flex:1}}>
        <View style={{backgroundColor:"#f8f8ee" }}>
          <View style={{margin:20,}}>
          <Text style={{fontFamily: "Lemon_Juice", fontSize:36, color:"#f18c22", textDecorationLine: 'underline',}}>{name}</Text>
          </View>
          <Image source={require('@/assets/images/icon/line.png')} style={{ width: "90%", height: 10, marginHorizontal: 15, }}/> 
        </View>
        <View>
        {/* <View style={{margin:15, justifyContent: 'flex-end',}}> */}
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between',width: '100%', }}> */}
          {/* <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between',width: '100%', }} onPress={() => router.push("/Orders")}>
          <Text style={{fontFamily: "Lemon_Juice", fontSize:32,}}>My Profile</Text>
          <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity> */}
          {/* </View> */}
          {/* </View>
          <Image source={require('@/assets/images/icon/line.png')} style={{ width: "90%", height: 10, marginHorizontal: 15, }}/> 
        </View>
        <View> */}
        <View style={{margin:15, justifyContent: 'flex-end',}}>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between',width: '100%', }} onPress={() => router.push(`/Orders?id=${id}`)}>
          <Text style={{fontFamily: "Lemon_Juice", fontSize:32,}}>My Orders</Text>
          <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          </View>
          <Image source={require('@/assets/images/icon/line.png')} style={{ width: "90%", height: 10, marginHorizontal: 15, }}/> 
        </View>
        <View>
          <View style={{margin:15, justifyContent: 'flex-end',}}>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between',width: '100%', }} onPress={() => router.push(`/addressbook?id=${id}`)}>
          <Text style={{fontFamily: "Lemon_Juice", fontSize:32,}}>Address Book</Text>
          <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          </View>
          <Image source={require('@/assets/images/icon/line.png')} style={{ width: "90%", height: 10, marginHorizontal: 15, }}/> 
        </View>
      </View>
      )
    }


const style = StyleSheet.create({
    
});