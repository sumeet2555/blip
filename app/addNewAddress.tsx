import { Text, StyleSheet, View, ImageBackground, TextInput, Pressable, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { auth, database } from '../firebase-config';
import {  ref,  onValue, query, orderByChild, equalTo, get, set , push, update} from "firebase/database";
import { AntDesign } from "@expo/vector-icons";


interface address {
  id: string;
  name: string;
  address_line1 : string;
  pin: string;
  current : boolean;
  mobile: string;
  email: string;
  address_line2:string;
  landmark:string;
  city:string;
}

interface SearchParams {
  id?: string; // Optional if they may not be provided
  addressId?: string;     // Optional
}
export default function addNewAddress() {

    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address_line1, setAddressLine1] = useState('');
    const [address_line2, setAddressLine2] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [pin, setPin] = useState('');
    const [current, setCurrent] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id, addressId }: SearchParams = useLocalSearchParams();
    const iconName = isChecked ?
        "checkbox-marked" : "checkbox-blank-outline";
    const screenWidth = Dimensions.get('window').width; 
    const itemWidth = screenWidth - 30; // Get screen width
    const handleSubmit = async () => {
      
      try {
        console.log(id);
        const itemRef = ref(database, 'addresses/' + id );
        await push(itemRef, {
          name: name,
          mobile: mobile,
          email: email,
          address_line1: address_line1,
          address_line2: address_line2,
          landmark: landmark,
          city: city,
          pin:pin,
          current: current

        });

        if(current){
          const addressRef = ref(database, 'addresses/' + id );
          const snapshot = await get(addressRef);
          const items: address[] = [];
          if(snapshot.exists()){
            // console.log(snapshot);
            snapshot.forEach((childSnapshot) => {
              items.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
              } as address);
            });
          }
          let currentAddress;
          const otherAddresses : address[] = [];
            for( const item of items){
              console.log(item);
              if(item.current){
                currentAddress = item;
                break;
              } 
            }
          if(currentAddress){
            await update(ref(database, 'addresses/' + id + '/' + currentAddress.id), {
              current:false
              });
          }
        }
        
        
        // for(const address of ADDRESSES){
        //   await set(ref(database, 'addresses/' + id + '/' + address.id), {
        //   name:address.name,
        //   id:address.id,
        //   address:address.address,
        //   pin:address.pin,
    
        //   });
        // }
        
      
        alert('Address details saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    useEffect(() => {
 
      const fetchAddress = async () => {
      
      console.log(id);
        setLoading(true);
  
        try {
          // console.log(type);
          console.log(id);
          const addressRef = ref(database, 'addresses/' + id + '/' + addressId );
          const snapshot = await get(addressRef);
          
          if(snapshot.exists()){
          
            const address = snapshot.val();
            console.log(address);
            setName(address.name);
            setMobile(address.mobile);
            setEmail(address.setEmail);
            setAddressLine1(address.address_line1);
            setAddressLine2(address.address_line2);
            setLandmark(address.landmark);
            setCity(address.city);
            setPin(address.pin);
            setCurrent(address.current);
            setIsChecked(address.current);
          }
          
        } catch (error) {
          console.error("Error reading data: ", error);
        } finally {
          setLoading(false);
        }
      
    };
    fetchAddress();
    },[id, addressId]);

    if(loading){
      return(<View></View>);
    } else {
      return (
        <ScrollView style={{flex:1, backgroundColor:'#f8f8ee'}}>
          <View style = {{margin:15}}>
          <Text style = {{fontFamily:"Lemon_Juice", fontSize:24,}}>Name</Text>
          <View >
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style = {[styles.input, {width:itemWidth}]}>
          <TextInput style={styles.box} placeholder="Enter Your Name"  textAlign={'left'} onChangeText={setName} value={name}></TextInput>
          </ImageBackground>
          </View>
          
          <View style = {{margin:15}}>
          <Text style = {{fontFamily:"Lemon_Juice", fontSize:24,}}>Mobile</Text>
          </View>
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style = {[styles.input, {width:itemWidth}]}>
          <TextInput style={styles.box} placeholder="Enter Your Mobile"  textAlign={'left'} onChangeText={setMobile} value={mobile}></TextInput>
          </ImageBackground>
  
          <View style = {{margin:15}}>
          <Text style = {{fontFamily:"Lemon_Juice", fontSize:24,}}>Email</Text>
          </View>
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style = {[styles.input, {width:itemWidth}]}>
          <TextInput style={styles.box} placeholder="Enter Your Email"  textAlign={'left'} onChangeText={setEmail} value={email}></TextInput>
          </ImageBackground>
  
          <View style = {{margin:15, flexDirection:'row-reverse'}}>
          <View style={{paddingLeft:10}}>
          <Text style = {{fontFamily:"Lemon_Juice", fontSize:24, color:'#f78f1e', textDecorationLine:'underline'}}>Use my location</Text>
          </View>
          <FontAwesome6 name="location-crosshairs" size={24} color="black" />
          </View>
  
          <View style = {{margin:15}}>
          <Text style = {{fontFamily:"Lemon_Juice", fontSize:24,}}>Address</Text>
          </View>
  
          <View style={{marginBottom:15}}>
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style =  {[styles.input, {width:itemWidth,}]}>
          <TextInput style={styles.box} placeholder="Flat, House No, Building, Company"  textAlign={'left'} onChangeText={setAddressLine1} value={address_line1}></TextInput>
          </ImageBackground>
          </View>
  
          <View style={{marginBottom:15}}>
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style =  {[styles.input, {width:itemWidth}]}>
          <TextInput style={styles.box} placeholder="Street Name, Area"  textAlign={'left'} onChangeText={setAddressLine2} value={address_line2}></TextInput>
          </ImageBackground>
          </View>
  
          <View style={{marginBottom:15}}>
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style =  {[styles.input, {width:itemWidth}]}>
          <TextInput style={styles.box} placeholder="Landmark"  textAlign={'left'} onChangeText={setLandmark} value={landmark}></TextInput>
          </ImageBackground>
          </View>
          
          <View style={{marginBottom:15}}>
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style =  {[styles.input, {width:itemWidth}]}>
          <TextInput style={styles.box} placeholder="City, District"  textAlign={'left'} onChangeText={setCity} value={city}></TextInput>
          </ImageBackground>
          </View>
          
          <View style={{marginBottom:15}}>
          <ImageBackground source={require('@/assets/images/background_image/address_text_box.png')} style =  {[styles.input, {width:itemWidth}]}>
          <TextInput style={styles.box} placeholder="Pin Code"  textAlign={'left'} onChangeText={setPin} value={pin}></TextInput>
          </ImageBackground>
          </View>
  
          <View style={{flexDirection:'row-reverse'}}>
          <View style={{paddingLeft:10}}>
          <Text style = {{fontFamily:"Lemon_Juice", fontSize:24,}}>Make this address default address</Text>
          </View>
          <Pressable onPress={() => {setIsChecked(!isChecked); setCurrent(!current)}}>
                  <MaterialCommunityIcons 
                      name={iconName} size={24} color="#000" />
              </Pressable>
          
          </View>
          </View>
          <View style={{flexDirection:"row", alignContent:"center", alignItems:"center",justifyContent:"center"}}>
          <TouchableOpacity style={{backgroundColor:"orange", padding:20, marginBottom:20}} onPress={handleSubmit}>  
          <Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:15}}>Add New Address</Text>
          </TouchableOpacity>
          </View>
          
          </ScrollView>
      )
    }
    
  }


const styles = StyleSheet.create({
    box:{
      height: 40,
      marginHorizontal:10,
      backgroundColor : 'transparent',
      fontFamily: 'Lemon_Juice',
      fontSize: 24,
      resizeMode:'contain',
    },
    input:{

    }
})