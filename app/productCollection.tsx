import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {  ref, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from '../firebase-config';
import Product from './product';




// Define a type for your product
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

// Sample data for products
// const PRODUCTS: Product[] = [
//   {
//     id: '1',
//     name: 'Men Full Sleeve Yellow Cotton Solid Shirt',
//     // image: require('@/assets/images/icon/product_left.png'),
//     price: 'Rs. 1,190.00',
//     cutstrikePrice: "MRP 2000",
//     type:"shirt",
//     ratings: 4,
//     collection: "Crush"
//   },
//   {
//     id: '2',
//     name: 'Men Full Sleeve Yellow Cotton Solid Shirt',
//     // image: require('@/assets/images/icon/product_right.png'),
//     price: 'Rs. 1,190.00',
//     cutstrikePrice: "MRP 2000",
//     type:"shirt",
//     ratings: 4,
//     collection: "Crush"
//   },
//   {
//     id: '3',
//     name: 'Men Full Sleeve Yellow Cotton Solid Shirt',
//     // image: require('@/assets/images/icon/product_left.png'),
//     price: 'Rs. 1,190.00',
//     cutstrikePrice: "MRP 2000",
//     type:"shirt",
//     ratings: 4,
//     collection: "Boom"
//   },
//   {
//     id: '4',
//     name: 'Men Full Sleeve Yellow Cotton Solid Shirt',
//     // image: require('@/assets/images/icon/product_right.png'),
//     price: 'Rs. 1,190.00',
//     cutstrikePrice: "MRP 2000",
//     type:"shirt",
//     ratings: 4,
//     collection: "Boom"
//   },
//   // Add more products as needed
// ];



interface RatingStarsProps {
    rating: number; // Rating value (0 to 5)
    starSize?: number; // Optional: size of the star images
  }


  interface SearchParams {
    category?: string; // Optional if they may not be provided
    type?: string;     // Optional
  }
const ProductCollectionScreen: React.FC = () => {

  const { category= 'Shirts', type= 'type' }: SearchParams = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const starFilled = require('@/assets/images/icon/star_full.png');
  const starEmpty = require('@/assets/images/icon/star_empty.png');
  const leftProductImage = require('@/assets/images/icon/product_left.png');
  const rightProductImage = require('@/assets/images/icon/product_right.png');
  const [PRODUCTS, setProducts] = useState<Product[]>([]);
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const itemWidth = (screenWidth - 30) / 2; // Calculate item width (including margins)

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
  
  useEffect(() => {
 
    const fetchProducts = async () => {
    
      setLoading(true);

      try {
        // console.log(type);
        const productRef = ref(database, 'products' );
        const q = query(productRef, orderByChild(type), equalTo(category));
        const snapshot = await get(q);
        const items: Product[] = [];
        if(snapshot.exists()){
          snapshot.forEach((childSnapshot) => {
            items.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            } as Product);
          });
        }
        setProducts(items);
        console.log(items);
      } catch (error) {
        console.error("Error reading data: ", error);
      } finally {
        setLoading(false);
      }
    
  };
  fetchProducts();
  },[category, type]);

  const router = useRouter();
  // Render item for FlatList
  const renderItem = ({ item, index }: { item: Product, index: number}) => (
    <TouchableOpacity style={[styles.card, { width: itemWidth }]} onPress={() => router.push((`/product?id=${item.id}`))}>
      {index%2===0?<Image source={leftProductImage} style={[styles.image,{ width: itemWidth, height:200 }]} />:<Image source={rightProductImage} style={[styles.image,{ width: itemWidth, height:190, marginBottom:10  }]} />}
      <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
        <View style={styles.price_details}>
        
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.mrp}>{item.cutstrikePrice}</Text>
        
        </View>
        <View style ={{flexDirection:"row"}}>
        <RatingStars rating={item.ratings} starSize={15} />
        <Text style={{fontFamily: "Lemon_Juice", color:"#050403",marginLeft:10}}>{item.ratings}</Text>
        <Text style={{fontFamily: "Lemon_Juice", color:"#82827a", marginLeft:10}}>Ratings</Text>
        </View>
        

      </View>
    </TouchableOpacity>
  );

  const handleSubmit = async () => {
      
    try {
      // for(const product of PRODUCTS){
      //   await set(ref(database, 'products/' + product.id), {
      //   name:product.name,
      //   price:product.price,
      //   cutstrikePrice:product.cutstrikePrice,
      //   ratings:product.ratings,
      //   type:product.type,
      //   collection:product.collection 
      //   });
      // }
      
    
      alert('User details saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={{fontFamily:"Lemon_Juice", fontSize:32, marginLeft:15}}>{category}</Text>
      <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15, marginTop: 10}}/> 
      <FlatList
        data={PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set number of columns to 2
        contentContainerStyle={styles.list}
      />
      {/* <TouchableOpacity onPress={handleSubmit} ><Text>save data</Text></TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fefef4',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    margin: 5, // Margin around each item
    overflow: 'hidden',
  },
  image: {
    // width: '100%', // Full width of the item
    // height: 150, // Set height as needed
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
    fontFamily: "Lemon_Juice"
  },
  container_rating: {
    flexDirection: 'row',
  },
  star: {
    resizeMode: 'contain',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCollectionScreen;