import { View, Text, TextInput, StyleSheet, Image, NativeSyntheticEvent, TextInputSubmitEditingEventData, Dimensions, TouchableOpacity } from "react-native";
import React  from "react";

import { useState } from "react";
import { FlatList } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth, database } from '../../firebase-config';
import {  ref,  onValue, query, orderByChild, equalTo, get, } from "firebase/database";
import { useRouter } from 'expo-router';

interface Product {
  id: string;
  name: string;
  // image: any;
  price: string;
  cutstrikePrice: string;
  type: string;
  ratings: number;
  collection:string
}

export default function SearchScreen(){
  
  const [searchQuery, setSearchQuery] = useState("");

  const[isLoading, setIsLoading] = useState(false);

  const[isVisible, setIsVisible] = useState(false);
  const leftProductImage = require('@/assets/images/icon/product_left.png');

  const [items, setItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const router = useRouter();

  const [data, setData] = useState([{id : 1, text: "Basic Jogging Shorts", category: "in All Categories" }, {id : 2, text: "Make Thing Happen T-Shirt", category: "in All Categories"}]);
 
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
        stars.push(<Image key={i} source={starFilled} style={[style.star, { width: starSize, height: starSize }]} />);
      } else {
        stars.push(<Image key={i} source={starEmpty} style={[style.star, { width: starSize, height: starSize }]} />);
      }
    }
  
    return <View style={style.container_rating}>{stars}</View>;
  };
  
  const handleSearch = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) =>{
    setIsVisible(true);
    setSearchQuery(event.nativeEvent.text);
    console.log(searchQuery);
    const productRef = ref(database, 'products' );
        get(productRef)
        .then((snapshot) => {
        if (snapshot.exists()) {
          const products  : Product[] = [];
          snapshot.forEach((childSnapshot) => {
            const product = childSnapshot.val();
            product.id = childSnapshot.key;
            products.push(product);
          });
          console.log(products);
          // Now filter products where the name contains the search query
          const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          console.log(filteredProducts);
          setFilteredItems(filteredProducts);
          console.log(filteredItems.length);
        } else {
          console.log("No products available.");
        }
      })
      .catch((error) => {
        console.error("Error getting products:", error);
      });
    
  }
  const renderItem = ({ item, index }: { item: Product, index: number}) => (
    <TouchableOpacity style={[style.card, { width: itemWidth }]} onPress={() => router.push((`/product?id=${item.id}`))}>
      <Image source={leftProductImage} style={[style.image,{ width: itemWidth, height:200 }]} />
      <View style={style.details}>
      <Text style={style.name}>{item.name}</Text>
        <View style={style.price_details}>
        
        <Text style={style.price}>{item.price}</Text>
        <Text style={style.mrp}>{item.cutstrikePrice}</Text>
        
        </View>
        <View style ={{flexDirection:"row"}}>
        <RatingStars rating={item.ratings} starSize={15} />
        <Text style={{fontFamily: "Lemon_Juice", color:"#050403",marginLeft:10}}>{item.ratings}</Text>
        <Text style={{fontFamily: "Lemon_Juice", color:"#82827a", marginLeft:10}}>Ratings</Text>
        </View>
        

      </View>
    </TouchableOpacity>
  );

      return (
        <View style={{flex:1, backgroundColor:'#fefef4',}}>
        <View style={{ paddingTop: 30, height:100, }}>
          <View style={{ backgroundColor:'white', marginHorizontal:40 , borderWidth:0.4, borderRadius:99 , flexDirection:"row"}}>
          <AntDesign name="search1" size={24} color="black" style={{margin:10}}/>
          <TextInput placeholder='Search Shoes, Bags, Shirts etc...' 
            clearButtonMode="always" 
            style={{ paddingVertical:10, borderColor:'#ccc', fontFamily: 'Lemon_Juice', fontSize:18}}
            value={searchQuery} 
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch} // Trigger search on Enter
            returnKeyType="search" // Change the return key to "search"
            />
          </View>
        </View>
        <Text style={{fontFamily:"Lemon_Juice", fontSize:32, marginLeft:15}}>Search Results</Text>
      <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15, marginTop: 10}}/> 
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set number of columns to 2
        contentContainerStyle={style.list}
      />
        {/* <View style={{ paddingLeft: 30, }}>
             {isVisible && (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item})=>(
                <View style={style.itemContainer}>
                  <View style={{flexDirection: "row"}}>
                    <Image source={require('@/assets/images/icon/back_in_time.png')} style={{height: 30, width: 30, resizeMode: 'contain'}}/>
                    <Text style={style.recommendation}>{item.text}</Text>
                    <Text style={style.category}>{item.category}</Text>
                    <Image source={require('@/assets/images/icon/cancel_search.png')} style={{height: 30, width: 30, resizeMode: 'contain'}}/>
                  
                  </View>
                  <Image source={require('@/assets/images/icon/line.png')} style={{ width: "90%", height: 10,  marginTop: 10}}/>
                </View>
              
                
      )}/>)}
      </View> */}
        </View>
      )
  
}

const style = StyleSheet.create({
    itemContainer: {
      paddingTop:20,
    },
    recommendation:{
      fontSize:24,
      fontFamily:'Lemon_Juice',
    },
    category:{
      fontSize: 14,
      fontFamily:'Lemon_Juice',
      paddingLeft:10,
      paddingTop:8,
      color: 'grey',
    },
    re_search_icon:{
      width:50,
      height:50,
    },container: {
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