import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import {  ref,  onValue, query, orderByChild, equalTo, get, set, remove } from "firebase/database";
import { auth, database } from '../firebase-config';
import { useRouter, useLocalSearchParams } from 'expo-router';




// Define a type for your product
interface address {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address_line1: string;
  address_line2: string;
  landmark: string;
  city: string;
  pin: string;
  current: boolean
}
// // Sample data for products
// const ADDRESSES: address[] = [
//   {
//     id: '1',
//     name: 'Thekraj',
//     address: '5625, lorem dipsum, lorem dipsum,',
//     pin:'123123',
//     current: true
//   },
//   {
//     id: '2',
//     name: 'Thekraj',
//     address: '5625, lorem dipsum, lorem dipsum,',
//     pin:'123123',
//     current: false
//   },
//   // Add more products as needed
// ];

const screenWidth = Dimensions.get('window').width; 
const itemWidth = screenWidth; // Get screen width

const addressbook: React.FC = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [ADDRESSES, setAddresses] = useState<address[]>([]);
    const [currentAddress, setCurrentAddress] = useState<address>();
    const [selected, setSelected] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
 
      const fetchAddresses = async () => {
      
        setLoading(true);
  
        try {
          // console.log(type);
          console.log(id);
          const addressRef = ref(database, 'addresses/' + id );
          const snapshot = await get(addressRef);
          const items: address[] = [];
          if(snapshot.exists()){
            console.log(snapshot);
            snapshot.forEach((childSnapshot) => {
              items.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
              } as address);
            });
          }
          const otherAddresses : address[] = [];
          for( const item of items){
            console.log(item);
            if(item.current){
              setCurrentAddress(item);
            } else {
              otherAddresses.push(item);
            }
          }
          setAddresses(otherAddresses);
          if(currentAddress){
            setSelected(currentAddress?.id);
          }
          
          // console.log(items);
          // console.log(currentAddress);
        } catch (error) {
          console.error("Error reading data: ", error);
        } finally {
          setLoading(false);
        }
      
    };
    fetchAddresses();
    },[id]);
  

  // Render item for FlatList
  const renderItem = ({ item }: { item: address }) => (
   <><View style={{}}>
    <View style={{ marginHorizontal: 30, marginVertical: 15, flexDirection:'row', flex:1 }}>
      <View style={{ flexDirection: 'column', flex:2}}>
        <Text style={{fontFamily:"Lemon_Juice", fontSize:24}}>{item.name}</Text>
        {item.address_line1?  <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:"Lemon_Juice", fontSize:20}}>{item.address_line1}</Text>
        </View>:<></>}
        {item.address_line2? <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:"Lemon_Juice", fontSize:20}}>{item.address_line2}</Text>
        </View> : <></>}
        {item.landmark?
        <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:"Lemon_Juice", fontSize:20}}>{item.landmark}</Text>
        </View>:<></>}
        {item.city?
        <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:"Lemon_Juice", fontSize:20}}>{item.city}</Text>
        </View>:<></>}
        {item.pin?
        <Text style={{fontFamily:"Lemon_Juice", fontSize:20}}>{item.pin}</Text>:<></>}
        
       
      </View>
      <View style={{flex:1}}>
      {selected===item.id?
      
              (<Image source={require('@/assets/images/icon/circle_with_tick.png')} style={{ width: '60%', resizeMode:'contain', height:'80%', }}/>)  :
              (<><TouchableOpacity onPress={() => setSelected(item.id)}>
              <Image source={require('@/assets/images/icon/circle_with_no_tick.png')} style={{ width: '60%', resizeMode: 'cover', height: '80%', }} /></TouchableOpacity></>)}
      
      
      </View>
      
      {/* <Image source={require('@/assets/images/icon/line.png')} style={{ width: "80%", height: 5, marginLeft:-100}} /> */}
    </View>
    {selected===item.id? 
    <View style={{flexDirection:'row', }}>
    
                <TouchableOpacity onPress={() => router.push(`/addNewAddress?id=${id}&addressId=${item?.id}`)}>
                <Image source={require('@/assets/images/button/edit_address.png')} style={{}}/>
                </TouchableOpacity>
                {item?<TouchableOpacity onPress={() => deleteAddress(item?.id)}>
                <Image source={require('@/assets/images/button/delete_address.png')}  style={{}}/>
                </TouchableOpacity> :<></>}
                
    </View>:<></>}
    <View style={{width:screenWidth -20,  }}>
           <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 5, paddingLeft:10}} />
      </View>
    </View>
    </>
  );
  const deleteAddress = (itemId: string) => {
    const deleteAddress = async () => {
      try {
        const itemRef = ref(database, 'addresses/' + id + '/' + itemId);
        await remove(itemRef); // Delete the item at the specified reference
        console.log('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting item: ', error);
      }
    };
    deleteAddress();
  };
  if(loading){
    return(<View></View>);
  } else{
    return (
      <View style={styles.container}>
          <View style={{backgroundColor:'white',borderBottomColor:'#a6a69e'}}>
              <TouchableOpacity style = {{justifyContent:'center', alignItems:'center', margin:10}} onPress={() => router.push(`/addNewAddress?id=${id}`)}>
              <AntDesign name="plus" size={32} color="orange" />
              <Text style={{fontFamily:"Lemon_Juice", fontSize:32, marginLeft:15}}>Add New Address</Text>
              </TouchableOpacity>
          </View>
          {currentAddress?<>
          <View style={{marginVertical:15, flexDirection:'row'}}>
              <View style={{width: itemWidth, flex:2, flexDirection:'column'}}>
              <Text style={{fontFamily:"Lemon_Juice", fontSize:32, marginLeft:30, paddingBottom:10, color:'#f78f1e'}}> Delivering To</Text>
          <Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30}}> {currentAddress?.name}</Text>
          {currentAddress?.address_line1?<Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30}}> {currentAddress?.address_line1}</Text>:<></> }
          {currentAddress?.address_line2?<Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30}}> {currentAddress?.address_line2}</Text>:<></>}
          {currentAddress?.landmark?<Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30}}> {currentAddress?.landmark}</Text>:<></>}
          {currentAddress?.city?<Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30}}> {currentAddress?.city}</Text>:<></>}
          {currentAddress?.pin?<Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30}}> PIN {currentAddress?.pin}</Text>:<></>}
              </View>
              
              <View style={{flex:1, marginTop:-200}}>
              {selected===currentAddress.id? 
              <Image source={require('@/assets/images/icon/circle_with_tick.png')} style={{ width: '60%', resizeMode:'contain', height:'80%', }}/> :
              <Image source={require('@/assets/images/icon/circle_with_no_tick.png')} style={{ width: '60%', resizeMode: 'cover', height: '80%', }} />}
              </View>
         
          
          </View>
          {selected===currentAddress.id? 
          <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => router.push(`/addNewAddress?id=${id}&addressId=${currentAddress?.id}`)}>
                <Image source={require('@/assets/images/button/edit_address.png')} style={{marginTop:-350}}/>
                </TouchableOpacity>
                {currentAddress?<TouchableOpacity onPress={() => deleteAddress(currentAddress?.id)}>
                <Image source={require('@/assets/images/button/delete_address.png')}  style={{marginTop:-350}}/>
                </TouchableOpacity> :<></>}
                
          </View>:<></>}
          
          <Image source={require('@/assets/images/icon/line.png')} style={{ width: "90%", height: 5, marginLeft: 15, marginTop:-280}}/> 
          </>:<></>}
          <Text style={{fontFamily:"Lemon_Juice", fontSize:32, marginLeft:30, paddingBottom:10, color:'#f78f1e', marginTop:15}}> Other Addresses</Text>
        
        <FlatList
          data={ADDRESSES}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1} // Set number of columns to 2
          contentContainerStyle={styles.list}
        />
        {/* <TouchableOpacity onPress={handleSubmit} ><Text>save data</Text></TouchableOpacity> */}
      </View>
    );

  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fefef5',
  },
  list: {
    paddingBottom: 20,
  },
  
  image: {
    width: '100%', // Full width of the item
    height: 150, // Set height as needed
    resizeMode:"contain"
},
});

export default addressbook;