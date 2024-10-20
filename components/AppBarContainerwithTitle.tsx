import React, { useState } from "react";
import { Image , View , StyleSheet , ImageBackground, TouchableOpacity, GestureResponderEvent, Text } from "react-native";
import DrawerMenu from "./DrawerMenu";

const style = StyleSheet.create(
    {
        title_text :{
            fontFamily:"Lemon_Juice",
            color:"#fffbff",
            fontSize:24,
            textAlign: 'center',
        },
        appBarContainer: {
            backgroundColor: '#f78f1e',
            height: 80,
            elevation: 5
        },
        appBar: {
            marginTop:40,
            marginHorizontal: 20,
            flexDirection: 'row'
        },
        back_btn_img : {
            marginTop: 10,
            width: 15,
            height:15,
            resizeMode: 'contain',
        },
    
        back_btn: {
            resizeMode:'contain', 
            backgroundColor: 'transparent', 
            width: 40, 
            height: 30,
        }

    }
)
// export default AppBarContainer;

// components/CustomAppBar.tsx

interface CustomAppBarProps {
  title: string;
  onBackPress?: (event: GestureResponderEvent) => void;
}

const AppBarContainer: React.FC<CustomAppBarProps> = ({ title, onBackPress }) => {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  return (
    <View style={style.appBarContainer}>
        <View style={style.appBar}>

         <ImageBackground source ={require('@/assets/images/icon/back_btn_header.png')} style={style.back_btn_img}>
         <TouchableOpacity style={style.back_btn} onPress={onBackPress}></TouchableOpacity> 
        </ImageBackground>
        <View style={{alignItems:"center", marginLeft:10}}>
        <Text style={style.title_text}>{title}</Text>
        </View>
         
      
         {/* <DrawerMenu isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} /> */}
        <View style={{flexDirection: 'row', alignContent:'flex-end',marginLeft: 'auto' ,}}>
        
         </View>  
        </View>
      
    </View>
  );
};


export default AppBarContainer;
