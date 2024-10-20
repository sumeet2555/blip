import { ScrollView, StyleSheet, View, TouchableOpacity, ImageBackground, Image, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';

export default function TrendingCategories(){
    const router = useRouter();
    const ITEM_WIDTH = 90;
    const ITEM_HEIGHT = 90; 

    return (
        <View style = {{}}>
            <View style = {{marginLeft: 10, width: "110%"}}>
            <Image source={require('@/assets/images/icon/trendingcategories_header.png')} style={{width: "75%", resizeMode:'contain' ,}}/>
            </View>
            <View style={{}}>
            <ScrollView horizontal={true} style={{marginHorizontal: 10, }}>
        
                <ImageBackground source={require('@/assets/images/icon/t-shirts.png')} style={{width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    justifyContent: 'center',
                    }}>
                <TouchableOpacity style ={[styles.card, ]} onPress={() => router.push(('/productCollection?category=T-Shirts&type=type'))}>
                </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={require('@/assets/images/icon/shirts.png')} style={{width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    justifyContent: 'center',
                    }}>
                <TouchableOpacity style ={[styles.card, ]} onPress={() => router.push(('/productCollection?category=Shirts&type=type'))}>
                </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={require('@/assets/images/icon/shoes.png')} style={{width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    justifyContent: 'center',
                    }}>
                <TouchableOpacity style ={[styles.card, ]} onPress={() => router.push(('/productCollection?category=Shoes&type=type'))}>
                </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={require('@/assets/images/icon/caps.png')} style={{width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    justifyContent: 'center',
                    }}>
                <TouchableOpacity style ={[styles.card, ]} onPress={() => router.push(('/productCollection?category=Caps&type=type'))}>
                </TouchableOpacity>
                </ImageBackground> 
            </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    headingText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal:8,
        paddingLeft: 10,
    },
    card: {
        flex:1,
        alignItems: 'center',
        width: 100,
        height: 120,
        justifyContent: 'center',
        borderRadius: 4,
        margin: 8,
    },
    
    conatainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
    }
})