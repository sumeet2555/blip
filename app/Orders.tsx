import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from "@expo/vector-icons";

interface indiviOrder {
    name: string;
    image: string;
    status: string;
    customerRating: number;
    itemId : string;
 }

// Define a type for your product
interface Order {
  id: string;
  orderId: string;
  date: string;
  orderList : indiviOrder[];
}
const starFilled = require('@/assets/images/icon/star_full.png');
const starEmpty = require('@/assets/images/icon/star_empty.png');
// Sample data for products
const orderArray: Order[] = [
  {
    id: '1',
    orderId: '09783402',
    date: '11 Jan 2024',
    orderList: [
        {
            name: 'Men Full Sleeve Yellow Cotton Solid Shirt',
            image: require('@/assets/images/icon/product_new.png'),
            status: 'Delivered',
            customerRating: 0,
            itemId:'1',
        },
    ],
  },
  {
    id: '2',
    orderId: '09783402',
    date: '12 Jan 2024',
    orderList: [
        {
            name: 'Men Full Sleeve Yellow Cotton Solid Shirt',
            image: require('@/assets/images/icon/product_new.png'),
            status: 'Cancelled',
            customerRating: 0,
            itemId:'1',
        },
    ],
  },
  // Add more products as needed
];

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
const Orders: React.FC = () => {
    const router = useRouter();
    const leftProductImage = require('@/assets/images/icon/product_left.png');
    const renderOrder = ( {item} : {item : indiviOrder}) => (
        <TouchableOpacity style={{flexDirection: 'row', }} onPress={() => router.push(('/orderDetails'))}>
            <View style={{width: screenWidth / 3, flex:1}}>
            <Image source={leftProductImage} style={styles.image} />
            </View>
            <View style={{flexDirection:'column', marginLeft:10, marginTop:10, flex:2}}>
            <Text style={{overflow: 'hidden', fontFamily:"Lemon_Juice", fontSize:24}}>{item.name}</Text>
            <View style={{flexDirection: 'row', }}>
                {item.status==='Delivered'? <FontAwesome name="circle" size={24} color="green" />: <FontAwesome name="circle" size={24} color="red" />}
                <View style={{marginLeft:10}}>
                <Text style={{overflow: 'hidden', fontFamily:"Lemon_Juice", fontSize:20}}>{item.status}</Text>
                </View>
                <View style={{marginLeft:100}}>
                <AntDesign name="right" size={24} color="black" />
                </View>
                
            </View>
            
            <Text style={{overflow: 'hidden', fontFamily:"Lemon_Juice", fontSize:20}}>Rate this Product</Text>
            <View style={{flexDirection: 'row', }}>
            <RatingStars rating={item.customerRating} starSize={15} />
            <View style={{marginLeft:50}}>
            <Text style={{overflow: 'hidden', fontFamily:"Lemon_Juice", fontSize:20, textDecorationLine:'underline'}}>Write Review</Text>
            </View>
            
            </View>
            
            </View>
        </TouchableOpacity>
    );
  // Render item for FlatList
  const renderItem = ({ item }: { item:  Order}) => (
    // <TouchableOpacity style={[styles.card, { width: itemWidth }]} onPress={() => router.push(('/product'))}>
      <View style={{flex:1 , width:'100%'}}>
        <View style={{justifyContent: 'flex-end', }}>
            <View style={{backgroundColor:'#f4f4ea', width:'100%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',width: '90%', marginVertical:10, marginHorizontal:10 }}>
                <Text style={{fontFamily:"Lemon_Juice", fontSize:16, color:'#6d6d65'}}>Order ID: {item.orderId}</Text>
                <Text style={{fontFamily:"Lemon_Juice", fontSize:16, color:'#6d6d65'}}>{item.date}
                    <View style={{paddingLeft:5}}>
                     <Text style={{fontFamily:"Lemon_Juice", fontSize:16, color:'#db9a4a', textDecorationLine:'underline' }}>Invoice</Text>
                     </View></Text>
            </View>
            </View>
    
            <FlatList
            data={item.orderList}
            renderItem={renderOrder}
            keyExtractor={(item) => item.itemId}/>
        </View>
      </View>
     
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orderArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1} // Set number of columns to 2
        contentContainerStyle={styles.list}
      />
    </View>
  );
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
    margin: 5, // Margin around each item
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
    fontFamily: "Lemon_Juice"
  },
  container_rating: {
    flexDirection: 'row',
  },
  star: {
    resizeMode: 'contain',
  },
});

export default Orders;