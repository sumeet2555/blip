import { ScrollView, StyleSheet, View, } from "react-native";
import Slider from "@/components/Slider";
import TrendingCategories from "@/components/TrendingCategories";
import PopularCollections from "@/components/PopularCollection";
import { useState, useEffect } from "react";
import { auth, database } from '../../firebase-config';
import {  ref,  onValue, query, orderByChild, equalTo, get, } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Product {
    id: string;
    name: string;
    // image: any;
    price: string;
    cutstrikePrice: string;
    type: string;
    ratings: number;
    collection:string;
    key:string;
    quantity: string;
  }


export default function DetailsScreen(){
    const bannerImages = [require('@/assets/images/background_image/banner_2.png')];
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if(user){
            setUserId(user.uid);
        }
        const fetchCart = async () => {
        
          setLoading(true);
          try {
            
            const cartRef = ref(database, 'cart/' + userId);
            const snapshot = await get(cartRef);
            const cartItems : String[] = [];
            const cartKeys : String[] = [];
            if(snapshot.exists()){
              
              snapshot.forEach((childSnapshot) => {
              
              const childData = childSnapshot.val();
              cartKeys.push(childSnapshot.key);
              // Extract the values from the child data
              Object.values(childData).forEach((value) => {
                if (typeof value === 'string') { // Ensure the value is a string
                  cartItems.push(value);
              }
              });
              
            })
            }
            
            const items: Product[] = [];
            let i =0;
            for(const itemID of cartItems){
              
                const productRef = ref(database, 'products/' + itemID );
                const snapshot = await get(productRef);
                
                if(snapshot.exists()){
                    
                    items.push({
                      key: cartKeys[i],
                      id: snapshot.key,
                      ...snapshot.val(),
                    } as Product);
                 
                }
                i++;
            }
           
            await AsyncStorage.setItem('cart', JSON.stringify(items));
          } catch (error) {
            console.error("Error reading data: ", error);
          } 
        
      };
      const fetchFavorites = async () => {
    
        setLoading(true);
  
        try {
          // console.log(type);
          
          const favoriteRef = ref(database, 'favorites/' + userId );
          const snapshot = await get(favoriteRef);
          const favoriteItems : String[] = [];
          if(snapshot.exists()){
            
            snapshot.forEach((childSnapshot) => {
              favoriteItems.push(childSnapshot.val());
  
            })
          }
          
          const items: Product[] = [];
          for(const itemID of favoriteItems){
            
            let item_id; 
            if(typeof itemID === 'string'){
              item_id = itemID;
            } else {
              const values = Object.values(itemID);
  
              // Access the first key
              item_id = values[0];
  
            }
          
            
            const productRef = ref(database, 'products/' + item_id );
            const snapshot = await get(productRef);
            
            if(snapshot.exists()){
              
              
                items.push({
                  id: snapshot.key,
                  ...snapshot.val(),
                } as Product);
             
            }
            // setProducts(items);
            await AsyncStorage.setItem('favorite', JSON.stringify(items));
            
            
          }
        } catch (error) {
          console.error("Error reading data: ", error);
        } 
      
    };
      fetchCart();
      fetchFavorites();
      setLoading(false);
      },[]);
    
    return(
            <View style={{backgroundColor:"#f8f8ee" , flex:1,}}> 
                
                <ScrollView style={{backgroundColor: '#fefef4', flexDirection: 'row'}}>
                    <Slider/>

                    {/* </Slider> */}
                    {/* <SliderBox images={bannerImages} dotColor="red"
                        sliderBoxHeight={150}
                        ImageComponentStyle = {{borderRadius: 5, width:"98%", marginVertical: 20, paddingLeft: 20, paddingRight: 20, resizeMode: 'contain'}}/> */}
                    <TrendingCategories />
                    <PopularCollections /> 
                </ScrollView>
            </View>
        );
}

const style = StyleSheet.create(
    {
        
    }
)