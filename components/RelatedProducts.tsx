import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useRouter } from 'expo-router';

export default function RelatedProducts(){

    const products =["Product A", "Product B"];
    const router = useRouter();

    return (
        <View style = {{marginVertical: 10, marginHorizontal:20}}>
            <Text style={{fontFamily:'Lemon_Juice', fontSize: 32,}}>Related Products</Text>
            <ScrollView horizontal={true} style={{ marginTop: 10}}>
                <ImageBackground source={require('@/assets/images/icon/crash.png')} style={{height: 120, width: 120,}}>
                <TouchableOpacity style ={[styles.card]} onPress={() => router.push(('/product'))}>
                </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={require('@/assets/images/icon/pow.png')} style={{height: 120, width: 120, marginLeft: 20, }}>
                <TouchableOpacity style ={[styles.card]} onPress={() => router.push(('/product'))}>
                </TouchableOpacity>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        flex:1,
        alignItems: 'center',
        width: 100,
        height: 120,
        justifyContent: 'center',
        borderRadius: 4,
        margin: 8,
    },
})