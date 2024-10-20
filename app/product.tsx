import { View, Text, StyleSheet, Image , TouchableOpacity, ScrollView, ImageBackground, LayoutAnimation, Platform, UIManager, Dimensions} from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Avatar } from 'react-native-paper';
import RelatedProducts from "@/components/RelatedProducts";
import { useLocalSearchParams } from 'expo-router';
import {  ref,  get, push, set, remove } from "firebase/database";
import { auth, database } from '../firebase-config';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Product {
  key: string;
  id: string;
  name: string;
  // image: any;
  price: string;
  cutstrikePrice: string;
  type: string;
  ratings: string;
  collection:string
}

interface RatingStarsProps {
  rating: number; // Rating value (0 to 5)
  starSize?: number; // Optional: size of the star images
}

interface LocalSearchParams {
  id: string; // Assuming `id` is a string
}

export default function Product(){


  const params = useLocalSearchParams();
  const { id } = params;
  const [isFavorited, setIsFavorited] = useState(false);

  const [selectedSize, setSelectedSize] = useState('S');

  const [selectedColor, setSelectedColor] = useState('#3d74d9');

  const [name, setName] = useState('');
  const [cutstrikePrice, setCutstrikePrice] = useState('');
  const [price, setPrice] = useState('');
  const [ratings, setRatings] = useState('');
  const starFilled = require('@/assets/images/icon/star_full.png');
  const starEmpty = require('@/assets/images/icon/star_empty.png');
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');
  const [collection, setCollection] = useState('');

  const screenWidth = Dimensions.get('window').width; 

  // if (Platform.OS === 'android') {
  //   UIManager.setLayoutAnimationEnabledExperimental(true);
  // }
  useEffect(() => {
    
    const user = auth.currentUser;
    if(user){
      setUserId(user.uid);
    }
    const fetchProduct = async () => {
    
      const favorite = await AsyncStorage.getItem('favorite');
      const favoriteArray = favorite ? JSON.parse(favorite) : [];  
      
      const checkFavorite = favoriteArray.filter(( item : Product) => item.id == id);
      setIsFavorited(true);
      
      const productRef = ref(database, 'products/' + id );
      try {
      const snapshot = await get(productRef);
      if (snapshot.exists()) {
        const prod = snapshot.val();
        setName(prod.name);
        setCutstrikePrice(prod.cutstrikePrice);
        setPrice(prod.price);
        setRatings(prod.ratings);  
        setType(prod.type);
        setCollection(prod.collection);  
      }
      } catch (error) {
        console.error("Error reading data: ", error);
      } 
    
  };
  fetchProduct();
  },[]);
  const addToFavorite = async () => {
    
    const arrayRef = ref(database, 'favorites/' + userId); // Reference to the array path
    const favorite = await AsyncStorage.getItem('favorite');
    const favoriteArray = favorite ? JSON.parse(favorite) : [];      
    
    try {
      const newItemRef = push(arrayRef); // Create a unique key for the new item
      await set(newItemRef, id); // Set the new value at that key
      const productId: string = Array.isArray(id) ? id[0] : id;
      const key = newItemRef.key?.toString() || "";
      const productExample: Product = {
        id: productId,
        name: name,
        price: price,
        cutstrikePrice: cutstrikePrice,
        type: type,
        ratings: ratings,
        collection: collection, 
        key: key
      };
      console.log(productExample);
      favoriteArray.push(productExample);
      await AsyncStorage.setItem('favorite', JSON.stringify(favoriteArray));

      console.log('Value added to array!');
    } catch (error) {
      console.error('Error adding value: ', error);
    }
  };
  const addToCart = async () => {

    const arrayRef = ref(database, 'cart/' + userId); // Reference to the array path
    const existingCart = await AsyncStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    try {
      const newItemRef = push(arrayRef); // Create a unique key for the new item
      await set(newItemRef, id); // Set the new value at that key
      console.log('Value added to array!');

      const key = newItemRef.key?.toString() || "";
      const productId: string = Array.isArray(id) ? id[0] : id;
      const productExample: Product = {
        id: productId,
        name: name,
        price: price,
        cutstrikePrice: cutstrikePrice,
        type: type,
        ratings: ratings,
        collection: collection, 
        key: key
      };
      cart.push(productExample);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error adding value: ', error);
    }
    
  };
  const AccordionItem: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
  
    // Toggle the expanded state
    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    };
  
    return (
      <View >
        <TouchableOpacity onPress={toggleExpand} style={style.row} >
          <Text style={[style.title,]}>{title}</Text>
          <AntDesign name= {expanded? "up" :"down"} size={20} color="black"/>
        </TouchableOpacity>
        {expanded && (
          <View style={style.child}>
            <Text>{content}</Text>
          </View>
        )}
      </View>
    );
  };
  const ReviewItem: React.FC<{ title: string; content: string; user: string; date: string }> = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
  
    // Toggle the expanded state
    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    };
  
    return (
      <View >
        <TouchableOpacity style={style.row} onPress={toggleExpand}>
                <Text style={[style.title,]}>{title}</Text>
                <AntDesign name={expanded ? "up" :"down"} size={20} color={'black'} style={{marginLeft:'auto', marginRight: 0}} />
            </TouchableOpacity>
        {expanded && (
          <View style={style.child}>
          <View>
              <View>
                  <View style={{flexDirection: 'row'}}>
                      <Avatar.Image size={40} source={require("@/assets/images/icon/pf_1_review.png")} />
                      <View style={{flexDirection: 'column', marginLeft: 20}}>
                          <View style={{flexDirection: 'row'}}>
                              <Text style={{marginRight: 80, fontFamily: 'Lemon_Juice', fontSize: 24}}> User 1</Text>
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starEmpty} style={[style.star, { width: 24, height: 24 }]} />
                          </View>
                          <View style={{marginTop: 10}}>
                              <Text style = {{fontSize: 20, fontFamily:'Lemon_Juice'}}>asdasdasda</Text>
                              <Text style = {{fontSize: 15, color:'grey', fontFamily:'Lemon_Juice'}}>12 Oct 2023</Text>
                          </View>
                      </View>
                  </View>
              </View>
             
          </View>

          <View style={{marginTop: 20}}>
              <View>
                  <View style={{flexDirection: 'row'}}>
                      <Avatar.Image size={40} source={require("@/assets/images/icon/pf_2_review.png")} />
                      <View style={{flexDirection: 'column', marginLeft: 20}}>
                          <View style={{flexDirection: 'row'}}>
                              <Text style={{marginRight: 80, fontFamily: 'Lemon_Juice', fontSize: 24}}> User 2</Text>
                              {/* <Icon name="star" color={'gold'} size={18} />
                              <Icon name="star" color={'gold'} size={18}/>
                              <Icon name="star" color={'gold'} size={18}/>
                              <Icon name="star" color={'gold'} size={18}/>
                              <Icon name="star" color={'black'} size={18}/> */}
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starFilled} style={[style.star, { width: 24, height: 24 }]} />
                              <Image source={starEmpty} style={[style.star, { width: 24, height: 24 }]} />
                          </View>
                          <View style={{marginTop: 10}}>
                              <Text style = {{fontSize: 20, fontFamily:'Lemon_Juice'}}>asdasdasda</Text>
                              <Text style = {{fontSize: 15, color:'grey', fontFamily:'Lemon_Juice'}}>12 Oct 2023</Text>
                          </View>

                          <View style={{flexDirection: 'row', marginTop: 20}}>
                              <Text style={{textDecorationLine: 'underline', fontFamily:'Lemon_Juice', fontSize: 24}}>More Reviews</Text>
                              <Text style = {{marginLeft: 50, textDecorationLine: 'underline', fontFamily:'Lemon_Juice', fontSize: 24}}>Write a Review</Text>
                          </View>
                      </View>
                  </View>
              </View>
             
          </View>
      </View>
        )}
      </View>
    );
  };
  

// const renderReviews = () => {
//     const items = [];
//     for (item of state.reviews) {
//         items.push(
//             <Reviews 
//                 title = {item.title}
//                 data = {item.data}
//             />
//         );
//     }
//     return items;
// }

  const state = {
    sizeColor: ['black', 'white', 'white', 'white'],
    sizeTextColor:['white', 'black', 'black', 'black'],
    colorValue:['#3d74d9', '#a0d73b', '#f98609', '#ef6f6e', '#4d5c79'],
    colorIcon: [true, false, false, false, false],
    menu :[
        { 
          title: 'Description', 
          data: 'Lorem Dipsum',
          expanded: false,
        },
        { 
          title: 'Free Delivery & Returns',
          data: 'Lorem Dipsum',
          expanded: false,
        },
        { 
          title: 'Ratings',
          data: 'Lorem Dipsum',
          expanded: false,
        }
    ],
    reviews :[
        { 
          title: 'Reviews', 
          data: 'Lorem Dipsum',
          expanded: false,
        }
    ],
    bottomNavigation: 0,
  };
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Toggle the favorited state
    if(isFavorited){
      alert('Added to Favorites');
      addToFavorite();
    } else {
      alert('Removed from Favorites');
      removeFavorite();
    }
  };
  const removeFavorite = () => {
    const removeFavorite = async () => {
      try {
        const itemRef = ref(database, 'favorites/' + userId + '/' + id);
        await remove(itemRef); // Delete the item at the specified reference
        console.log('Item deleted successfully!');
        
        const existingfavorite = await AsyncStorage.getItem('favorite');
        const favorite = existingfavorite ? JSON.parse(existingfavorite) : [];

        // Filter out the item to be removed
        const updatedFavorites = favorite.filter(( item : Product) => item.id !== id);

        // Save the updated cart
        await AsyncStorage.setItem('favorite', JSON.stringify(updatedFavorites));

      } catch (error) {
        console.error('Error deleting item: ', error);
      }
    };
    removeFavorite();
  };

  const addCart = () => {
    
  
      alert('Added to Cart');
      addToCart();
    
  };

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
  // const setState = ({key : value}) => {
  //   state({ key : value });
  // }
  return (
      <View style={{flex: 1}}>
        <ScrollView style={{backgroundColor: '#fefef4', flex: 1}}>
          <Image source={require('@/assets/images/icon/product_snippet.png')} style={{ width:screenWidth , height: 300,  marginBottom:10}}/>
          <Text style={{ fontFamily:'Lemon_Juice', fontSize:30, marginHorizontal: 20, paddingTop:10,width:screenWidth/1.5, }}>{name}</Text>
          <View style={{flexDirection:"row"}}>
          <Text style={{ fontFamily:'Lemon_Juice', fontSize:24, marginHorizontal: 20, paddingTop:10, color: '#e9722d',}}>{price}</Text>
          <Text style={{ fontFamily:'Lemon_Juice', fontSize:24, marginHorizontal: 20, paddingTop:10,width:screenWidth/1.5,  textDecorationLine: 'line-through',textDecorationColor: '#e9722d',}}>{cutstrikePrice}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          <RatingStars rating={parseInt(ratings, 10)} starSize={20} />
          <Text style={{ fontFamily:'Lemon_Juice', fontSize:20, marginHorizontal: 20, paddingTop:10, }}>{ratings}.0 Ratings</Text>
          <Image source={require('@/assets/images/icon/product_right_rating.png')} style={{  marginBottom:10,marginLeft:0, height:40, width:100, }}/>
          </View>
          

          
            <View style={{marginHorizontal: 20, flexDirection: 'row', alignItems: 'center',}}>
                <Text style={{ fontFamily:'Lemon_Juice', fontSize:32, marginRight: 10, paddingTop:10}}>Color</Text>
               
               <TouchableOpacity style={[style.sizeButton, {backgroundColor: state.colorValue[0],}]} onPress={ () => { setSelectedColor(state.colorValue[0]) }}>
                   <Icon name="checkmark-outline" size={24} color={ selectedColor=== state.colorValue[0] ?'black' : state.colorValue[0]} ></Icon>
               </TouchableOpacity>
               <TouchableOpacity style={[style.sizeButton, {backgroundColor: state.colorValue[1],}]} onPress={ () => { setSelectedColor(state.colorValue[1])}}>
                    <Icon name="checkmark-outline" size={24} color={ selectedColor=== state.colorValue[1] ?'black' : state.colorValue[1]} ></Icon>
               </TouchableOpacity>
               <TouchableOpacity style={[style.sizeButton, {backgroundColor: state.colorValue[2],}]} onPress={ () => { setSelectedColor(state.colorValue[2])}}>
                    <Icon name="checkmark-outline" size={24} color={ selectedColor === state.colorValue[2] ?'black' : state.colorValue[2]} ></Icon>
               </TouchableOpacity>
               <TouchableOpacity style={[style.sizeButton, {backgroundColor: state.colorValue[3],}]} onPress={ () => { setSelectedColor(state.colorValue[3])}}>
                    <Icon name="checkmark-outline" size={24} color={ selectedColor === state.colorValue[3] ?'black' : state.colorValue[3]} ></Icon>
               </TouchableOpacity>
            </View>
            <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15, marginTop: 10}}/> 
            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                <Text style={{ fontFamily:'Lemon_Juice' , fontSize:32, marginRight: 10,}}>Size</Text>
               
                <TouchableOpacity style={[style.sizeButton, {backgroundColor: selectedSize ==='S'? 'black': 'white',}]} onPress={ () => {setSelectedSize("S")}}>
                    <Text style={[style.sizeText, {color: selectedSize ==='S'? 'white': 'black'}]}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.sizeButton, {backgroundColor: selectedSize ==='M'? 'black': 'white',}]} onPress={ () => {setSelectedSize("M")}}>
                    <Text style={[style.sizeText, {color: selectedSize ==='M'? 'white': 'black'}]}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.sizeButton, {backgroundColor: selectedSize ==='L'? 'black': 'white',}]} onPress={ () => {setSelectedSize("L")}}>
                    <Text style={[style.sizeText, {color: selectedSize ==='L'? 'white': 'black'}]}>L</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.sizeButton, {backgroundColor: selectedSize ==='XL'? 'black': 'white',}]} onPress={ () => {setSelectedSize("XL")}}>
                    <Text style={[style.sizeText, {color: selectedSize ==='XL'? 'white': 'black'}]}>XL</Text>
                </TouchableOpacity>
            </View>
            <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15, marginTop: 10}}/>
            <View style={{  marginHorizontal: 20}}>
            
            <AccordionItem
                title="Description"
                content="This is the content of the first accordion item."
            />
            <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15, marginTop: 10}}/> 
            <AccordionItem
                title="Free Delivery & Returns"
                content="This is the content of the first accordion item."
            />
            <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15, marginTop: 10}}/>    
            <AccordionItem
                title="Ratings"
                content="This is the content of the first accordion item."
            />
            <Image source={require('@/assets/images/icon/line.png')} style={{ width: "100%", height: 10, marginLeft: 15, marginTop: 10}}/>   
                
            </View>
            <View style={{  marginHorizontal: 20,}}>
                
            <ReviewItem
                title = "Reviews"
                content = ""
                user = ""
                date = ""
                />
            </View>

            <Image source={require('@/assets/images/icon/line.png')} style={{ width: 340, height: 10, marginLeft: 15}}/>
            <RelatedProducts/>
            <View style={{height:100}}></View>
        </ScrollView>
        <View style={{position: 'absolute', bottom:0, left: 0, right: 0, height: 60, backgroundColor: 'black', borderTopLeftRadius: 10, borderTopRightRadius:10, flexDirection: 'row'}}>
            <View style = {{}}>
               <ImageBackground source={require('@/assets/images/button/product_bottom_btn.png')} style={style.bottomButtonImage}>
                <View style= {{flexDirection: 'row',}}>
               <TouchableOpacity style = {style.favoriteButton}  onPress={toggleFavorite}><AntDesign name="heart" size={24} color={isFavorited ? 'red' : 'white'} style={{marginLeft:14}}/></TouchableOpacity>
               <TouchableOpacity style = {style.cartButton}  onPress={addCart}/>
               </View>
               </ImageBackground>
            </View>
        </View>
      </View>
      )
}


const style = StyleSheet.create({
    
  appBarContainer: {
      flexDirection: 'row',
      backgroundColor: '#f78f1e',
      height: 80,
      elevation: 5
  },
  sizeButton: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:32,
      height:32,
      borderRadius:16,
      marginRight: 46,
  },
  sizeText: {
  },
  bottomButtonImage: {
      resizeMode:'cover',
      width:360,
      height: 60,
      justifyContent: 'center',
      alignContent: 'center',

  },
  favoriteButton:{
      width:50,
      height: 60,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'transparent',
  },
  cartButton:{
      width:270,
      height: 60,
      justifyContent: 'center',
      alignContent: 'center',
      marginLeft: 30,
      backgroundColor: 'transparent',
  },
  title:{
    fontSize: 32,
    fontFamily: 'Lemon_Juice',
},
row:{
    flexDirection: 'row',
    justifyContent:'space-between',
    height:56,
    paddingRight:18,
    alignItems:'center',
},
parentHr:{
    height:1,
    color: 'white',
    width:'100%'
},
child:{
    padding:16,
},
star: {
  resizeMode: 'contain',
},
container_rating: {
  flexDirection: 'row',
  marginLeft:20,
  marginTop:10
},
});