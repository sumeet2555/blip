import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import { auth, database } from '@/firebase-config';
import {  ref,  onValue, query, orderByChild, equalTo, get, remove } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

 interface Product {
    key:string;
    id: string;
    name: string;
    // image: any;
    price: string;
    cutstrikePrice: string;
    type: string;
    ratings: number;
    collection:string;
    quantity : string
  }

// Define a type for your product

const starFilled = require('@/assets/images/icon/star_full.png');
const starEmpty = require('@/assets/images/icon/star_empty.png');
// Sample data for products


const screenWidth = Dimensions.get('window').width; // Get screen width
const itemWidth = (screenWidth - 30) / 2; // Calculate item width (including margins)


interface RatingStarsProps {
    rating: number; // Rating value (0 to 5)
    starSize?: number; // Optional: size of the star images
  }

const RatingStars: React.FC<RatingStarsProps> = ({ rating, starSize = 24 }) => {
    const stars = [];
    
    // Determine the number of full, half, and empty stars
    const fullStars = Math.floor(rating);
  
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Image key={i} source={starFilled} style={[styles.star, { width: starSize, height: starSize }]} />);
      } else {
        stars.push(<Image key={i} source={starEmpty} style={[styles.star, { width: starSize, height: starSize }]} />);
      }
    }
  
    return <View style={styles.container_rating}>{stars}</View>;
  };
  
const Cart: React.FC = () => {
    const router = useRouter();
    const leftProductImage = require('@/assets/images/icon/product_left.png');
    const rightProductImage = require('@/assets/images/icon/product_right.png');
    const [PRODUCTS, setProducts] = useState<Product[]>([]);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [carts, setCarts] = useState([]);
    
    const removeCart = (itemKey : string, itemID : string) => {
      const removeCart = async (itemKey : string, itemID : string) => {
        try {
          const itemRef = ref(database, 'cart/' + userId + '/' + itemKey);
          await remove(itemRef); // Delete the item at the specified reference
          alert('Item has been removed from cart');

          const existingCart = await AsyncStorage.getItem('cart');
          const cart = existingCart ? JSON.parse(existingCart) : [];
      
          // Filter out the item to be removed
          
          const updatedCart = cart.filter( (item:Product)  => item.key !== itemKey);
          setProducts(updatedCart);
          
          // Save the updated cart
          await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
          console.error('Error deleting item: ', error);
        }
      };
      removeCart(itemKey, itemID);
      setRefresh((prev) => !prev);
    };
    useEffect(() => {
        const user = auth.currentUser;
        if(user){
            setUserId(user.uid);
        }
        // console.log('cart');
        const fetchProducts = async () => {
        
          setLoading(true);
          const jsonValue = await AsyncStorage.getItem('cart');
          setProducts(jsonValue != null ? JSON.parse(jsonValue) : []);
          console.log('sadsdsdssass');
          console.log(jsonValue);
          try {
            
          //   const cartRef = ref(database, 'cart/' + userId);
          //   const snapshot = await get(cartRef);
          //   const cartItems : String[] = [];
          //   const cartKeys : String[] = [];
          //   if(snapshot.exists()){
          //     console.log(snapshot);
          //     snapshot.forEach((childSnapshot) => {
              
          //     const childData = childSnapshot.val();
          //     cartKeys.push(childSnapshot.key);
          //     // Extract the values from the child data
          //     Object.values(childData).forEach((value) => {
          //       if (typeof value === 'string') { // Ensure the value is a string
          //         cartItems.push(value);
          //     }
          //     });
              
          //   })
          //   }
          //   console.log(cartKeys);
          //   const items: Product[] = [];
          //   let i =0;
          //   for(const itemID of cartItems){
          //     console.log(itemID);
          //       const productRef = ref(database, 'products/' + itemID );
          //       const snapshot = await get(productRef);
          //       if(snapshot.exists()){
                    
          //           items.push({
          //             key: cartKeys[i],
          //             id: snapshot.key,
          //             ...snapshot.val(),
          //           } as Product);
                 
          //       }
          //       i++;
          //   }
          //   setProducts(items);
          //   console.log(items);
          } catch (error) {
            console.error("Error reading data: ", error);
          } finally {
            setLoading(false);
          }
        
      };
      fetchProducts();
      },[refresh]);
    
    const renderCart = ( { item, index }: { item: Product, index: number}) => (
    <View style={styles.card} >
    <View style={{flexDirection:"row"}}>
      <View style={{width: screenWidth / 2, flex:1}}>      
      <Image source={leftProductImage} style={[styles.image,{  height:200 , marginBottom:10}]} />
      </View>
      <View style={{flexDirection:'column', marginLeft:10, marginTop:30, flex:2, width:screenWidth / 2}}>    
      <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
        <View style={styles.price_details}>
        
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.mrp}>{item.cutstrikePrice}</Text>
        
        </View>
        <View style ={{flexDirection:"row"}}>
        <RatingStars rating={item.ratings} starSize={15} />
        <Text style={{fontFamily: "Lemon_Juice", color:"#050403",marginLeft:10, fontSize:18}}>{item.ratings}</Text>
        <Text style={{fontFamily: "Lemon_Juice", color:"#82827a", marginLeft:10, fontSize:18}}>Ratings</Text>
        </View>
        <TouchableOpacity style={{marginTop:10, flexDirection:"row"}} onPress={()=>removeCart(item.key , item.id)}>
        <AntDesign name="delete" size={24} color="black" />
        <Text style={{fontFamily: "Lemon_Juice", marginLeft:10, fontSize:18}}>Delete this item</Text>
        </TouchableOpacity>

      </View>
      </View>
      </View>
      <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15,}}/> 
    </View>
    );
  // Render item for FlatList
//   const renderItem = ({ item }: { item:  Order}) => (
//     // <TouchableOpacity style={[styles.card, { width: itemWidth }]} onPress={() => router.push(('/product'))}>
//       <View style={{flex:1 , width:'100%'}}>
//         <View style={{justifyContent: 'flex-end', }}>
            
//             <FlatList
//             data={item.orderList}
//             renderItem={renderOrder}
//             keyExtractor={(item) => item.itemId}/>
//         </View>
//       </View>
     
//   );
if(loading){
  return <View></View>
} else {
  return (
    <View style={styles.container}>
    {PRODUCTS.length===0?<View style={{flex: 1,                  // Take up full height of the screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    }}><Text style={{textAlign:"center", }}>Your Cart is empty</Text></View>:<></>}
     <FlatList
            data={PRODUCTS}
            renderItem={renderCart}
            keyExtractor={(item) => item.id}/>
    </View>
  );
}
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefef4',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
     // Margin around each item
    overflow: 'hidden',
  },
  image: {
    width: '100%', // Full width of the item
    height: 150, // Set height as needed
    resizeMode:"contain"
},
  details: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: "Lemon_Juice"
  },
  price: {
    fontSize: 24,
    color: '#e9722d',
    fontFamily: "Lemon_Juice"
  },
  price_details:{
    flexDirection: 'row',
  },
  mrp:{
    textDecorationLine: 'line-through',
    color: '#818277',
    paddingLeft:5,
    paddingTop:5,
    fontFamily: "Lemon_Juice",
    fontSize:18
  },
  container_rating: {
    flexDirection: 'row',
  },
  star: {
    resizeMode: 'contain',
  },
});

export default Cart;