import { Text, View } from "react-native";
import {  TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { auth } from '../firebase-config'; // Adjust the path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {FirebaseError} from 'firebase/app';

// import { Link } from "expo-router";

export default function Index() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupProcess, setSignupProcess] = useState(false);
  const router = useRouter();

  const signIn = async () =>{
    setLoading(true);
    
    try{
      if(signupProcess){
        signUp();
      } else {
        console.log("sign in");
        await signInWithEmailAndPassword( auth, email, password.trim());
      }
      
  
    } catch (e: any){
      const err = e as FirebaseError;
      alert("Sign In Failed" + err.message)
    }
    finally{
    setLoading(false);
    }
  }
  const signUp = async () => {
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: any){
      const err = e as FirebaseError;
      alert('Registration failed' + err.message)
    }
    finally{
    setLoading(false);
    }
  }

  return (
    
  <ImageBackground source={require('@/assets/images/background_image/login_bg.png')} style={styles.backgroundImage}>
    <View style={styles.container} >
      <Image source={require('@/assets/images/icon/logo.png')} style={styles.logo}/>
      <ImageBackground source={require('@/assets/images/background_image/input.png')} style = {styles.input}>
        <TextInput style={styles.mobile} placeholder="Enter Email"  textAlign={'center'} onChangeText={setEmail}></TextInput>
      </ImageBackground>
      <ImageBackground source={require('@/assets/images/background_image/input.png')} style = {styles.input}>
        <TextInput style={styles.mobile} placeholder="Enter Password"  textAlign={'center'} onChangeText={setPassword}></TextInput>
      </ImageBackground>
      {signupProcess? 
      <ImageBackground source={require('@/assets/images/background_image/input.png')} style = {styles.input}>
        <TouchableOpacity style = {styles.mobile}  onPress={signUp}><Text  style={[styles.mobile, {textAlign: 'center', marginTop:15}]} >Sign Up</Text></TouchableOpacity>
      </ImageBackground>:
      <ImageBackground source={require('@/assets/images/button/login_btn.png')} style={styles.loginButtonImage}>
      <TouchableOpacity style = {styles.loginButton}  onPress={signIn}/>
     </ImageBackground> 
      }
      
      <Text style={{ marginTop: 20, fontSize: 32, fontFamily: 'Lemon_Juice'}}>Or</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Image source={require('@/assets/images/icon/google.png')} style={styles.fb_google}/>
        <Image source={require('@/assets/images//icon/fb.png')} style={styles.fb_google}/>
      </View>
      {signupProcess?
      <TouchableOpacity onPress={()=>setSignupProcess(false)}>
      <Text style={{ marginTop: 20, fontSize: 32, textDecorationLine: 'underline', fontFamily:'Lemon_Juice' }}>Sign In</Text>
      </TouchableOpacity>:
      <TouchableOpacity onPress={()=>setSignupProcess(true)}>
      <Text style={{ marginTop: 20, fontSize: 32, textDecorationLine: 'underline', fontFamily:'Lemon_Juice' }}>Create New Account</Text>
      </TouchableOpacity>
      }
      <StatusBar style="auto" />
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo : {
    marginTop: 50,
  },
  input: {
    resizeMode: 'cover',
    width: 300,
    height: 60,
    marginTop: 30,
  },
  fb_google: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  container: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobile: {
      width: 300,
      height: 60,
      backgroundColor : 'transparent',
      fontFamily: 'Lemon_Juice',
      fontSize: 24,
      
  },
  loginButton:{
      resizeMode:'contain',
      width:300,
      height: 60,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'transparent',
  },
 
  loginButtonImage: {
      resizeMode:'cover',
      marginTop:20,
      width:300,
      height: 52,
      justifyContent: 'center',
      alignContent: 'center',

  },
  backgroundImage :{
      flex: 1,
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
  }
  });
