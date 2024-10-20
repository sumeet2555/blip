import { Stack } from "expo-router";
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { View, Text } from "react-native";
import { useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import  { auth, }  from '../firebase-config';
import { useEffect, useState } from 'react';
import AppBarContainer from "@/components/AppBarContainer";
import AppBarContainerwithTitle from "@/components/AppBarContainerwithTitle";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';


export default function RootLayout() {
  
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const segments = useSegments();

  const handleBackPress = () => {
    router.back(); // Use router to navigate back
  };

  const [fontsLoaded] = useFonts({
    'Lemon_Juice': require('@/assets/fonts/Lemon_Juice.ttf'), // Adjust the path as necessary
  });

  
  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);    
    return subscriber;
  }, []);
  useEffect(() => {
  
    if(initializing) return;
  
    const navigate = async () => {
      if (user) {
        await router.replace('/(tabs)/home');
      } else {
        await router.replace('/');
      }
      await SplashScreen.hideAsync();
    };

    navigate();

  }, [user, initializing, router]);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="productCollection" options={{header: () => <AppBarContainer title="productCollection" onBackPress={handleBackPress} />}}/>
      <Stack.Screen name="product" options={{header: () => <AppBarContainer title="product" onBackPress={handleBackPress} />}}/>
      <Stack.Screen name="Orders" options={{header: () => <AppBarContainerwithTitle title="My Orders" onBackPress={handleBackPress} />}}/>
      <Stack.Screen name="orderDetails" options={{header: () => <AppBarContainerwithTitle title="Order Details" onBackPress={handleBackPress} />}}/>
      <Stack.Screen name="addressbook" options={{header: () => <AppBarContainerwithTitle title="My Addressbook" onBackPress={handleBackPress} />}}/>
      <Stack.Screen name="addNewAddress" options={{header: () => <AppBarContainerwithTitle title="Add New Address" onBackPress={handleBackPress} />}}/>
      <Stack.Screen name="cart" options={{header: () => <AppBarContainerwithTitle title="Your Shopping Cart" onBackPress={handleBackPress} />}}/>
    </Stack>
  );
}
