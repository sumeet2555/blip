import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator, FlatList, ImageBackground} from "react-native";
import React, {useState, useEffect}  from "react";
import {  ref,  onValue, query, orderByChild, equalTo, get } from "firebase/database";
import { auth, database } from '../../firebase-config';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
interface RatingStarsProps {
  rating: number; // Rating value (0 to 5)
  starSize?: number; // Optional: size of the star images
}
interface favorite {
  key:string;
}
export default function FavoriteScreen (){
  
  const [loading, setLoading] = useState(true);
  const starFilled = require('@/assets/images/icon/star_full.png');
  const starEmpty = require('@/assets/images/icon/star_empty.png');
  const leftProductImage = require('@/assets/images/icon/product_left.png');
  const rightProductImage = require('@/assets/images/icon/product_right.png');
  const [PRODUCTS, setProducts] = useState<Product[]>([]);
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const itemWidth = (screenWidth - 30) / 2; // Calculate item width (including margins)
  const [id, setId] = useState('');

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
    const user = auth.currentUser;
    if(user){
      setId(user?.uid);
    } else {
      return;
    }
    
    const fetchFavorites = async () => {
    
      setLoading(true);

      try {
        const jsonValue = await AsyncStorage.getItem('favorite');
        console.log(jsonValue);
        console.log('inn favorite screen');
        setProducts(jsonValue != null ? JSON.parse(jsonValue) : []);
        // console.log(type);
        // console.log('asd');
        // const favoriteRef = ref(database, 'favorites/' + id );
        // const snapshot = await get(favoriteRef);
        // const favoriteItems : String[] = [];
        // if(snapshot.exists()){
        //   console.log(snapshot);
        //   snapshot.forEach((childSnapshot) => {
        //     favoriteItems.push(childSnapshot.val());
        //     console.log('chile');
        //     console.log(childSnapshot);

        //   })
        // }
        // console.log(favoriteItems);
        // const items: Product[] = [];
        // for(const itemID of favoriteItems){
          
        //   let item_id; 
        //   if(typeof itemID === 'string'){
        //     item_id = itemID;
        //   } else {
        //     const values = Object.values(itemID);

        //     // Access the first key
        //     item_id = values[0];

        //   }
        
        //   console.log(item_id);
        //   const productRef = ref(database, 'products/' + item_id );
        //   const snapshot = await get(productRef);
          
        //   if(snapshot.exists()){
            
            
        //       items.push({
        //         id: snapshot.key,
        //         ...snapshot.val(),
        //       } as Product);
           
        //   }
        //   setProducts(items);
        //   console.log(items);
        // }
      } catch (error) {
        console.error("Error reading data: ", error);
      } finally {
        setLoading(false);
      }
    
  };
  fetchFavorites();
  },[]);

  const router = useRouter();
  // Render item for FlatList
  const renderItem = ({ item, index }: { item: Product, index: number}) => (
    <TouchableOpacity style={[styles.card, { width: itemWidth }]} onPress={() => router.push((`/product?id=${item.id}`))}>
      {index%2===0?<ImageBackground source={leftProductImage} style={[styles.image,{ width: itemWidth, height:200 }]} ><AntDesign name="heart" size={26} color='red'  style={{margin:16}}/></ImageBackground>:
      <ImageBackground source={rightProductImage} style={[styles.image,{ width: itemWidth, height:190, marginBottom:10  }]} ><AntDesign name="heart" size={26} color='red'  style={{marginLeft:16, marginTop:20}}/></ImageBackground>}
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
      <Text style={{fontFamily:"Lemon_Juice", fontSize:32, marginLeft:15}}>Favorites</Text>
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
  star: {
    resizeMode: 'contain',
  },
  container_rating: {
    flexDirection: 'row',
  },
  card: {
    margin: 5, // Margin around each item
    overflow: 'hidden',
  },
  image: {
    // width: '100%', // Full width of the item
    // height: 150, // Set height as needed
},details: {
  padding: 10,
}, name: {
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
},loader: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},container: {
  flex: 1,
  padding: 10,
  backgroundColor: '#fefef4',
},list: {
  paddingBottom: 20,
},
});