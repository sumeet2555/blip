import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import React from "react";
import { useRouter } from 'expo-router';


export default function PopularCollections(){
    const router = useRouter();

    return (

        <View style = {{marginVertical: 20, marginHorizontal:10}}>
            <Image source={require('@/assets/images/icon/popularcollection_header.png')} style={{width: "85%", resizeMode:'contain'}}/>
            <ScrollView horizontal={true} style={{ paddingTop: 0}}>
                <ImageBackground source={require('@/assets/images/icon/crush.png')} style={{height: 120, width: 120, }}>
                <TouchableOpacity style ={[styles.card]} onPress={() => router.push(('/productCollection?category=Crush&type=collection'))}>
                </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={require('@/assets/images/icon/boom.png')} style={{height: 120, width: 120, marginLeft: 20, }}>
                <TouchableOpacity style ={[styles.card,]} onPress={() => router.push(('/productCollection?category=Boom&type=collection'))}>
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