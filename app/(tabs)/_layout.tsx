import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import AppBarContainer from '@/components/AppBarContainer';
import { useRouter } from 'expo-router';
import AppBarContainerwithTitle from '@/components/AppBarContainerwithTitle';


export default function TabLayout() {
  const router = useRouter();
  const handleBackPress = () => {
    router.back(); // Use router to navigate back
  };
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: '#ffffff',
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 5,
            paddingVertical: 5,
        },
        tabBarIconStyle: {
            marginHorizontal: 10, // Adjust horizontal margin between icons
        } }}>
      <Tabs.Screen
        name="home"
        options={{header: () => <AppBarContainer title="home" />, tabBarIcon: ({focused}) =>(focused? <Image source={require('@/assets/images/icon/home.png')} style ={{ width: 50, height: 50}}/> : <Image source={require('@/assets/images/icon/Group_540.png')} style ={{ width: 20, height: 20}}/>),}}
      />
      <Tabs.Screen
        name="favorite"
        options={{header: () => <AppBarContainer title="favorite" onBackPress={handleBackPress} />, tabBarIcon: ({focused}) =>(focused ? <Image source={require('@/assets/images/icon/Group_541.png')} style ={{ width: 40, height: 40}}/> : <Image source={require('@/assets/images/icon/favorite.png')} style ={{ width: 30, height: 30}}/>),}}
      />
       <Tabs.Screen
        name="search"
        options={{header: () => <AppBarContainer title="search" onBackPress={handleBackPress} />,tabBarIcon: ({focused}) =>(focused ? <Image source={require('@/assets/images/icon/Group_543.png')} style ={{ width: 40, height: 40}}/> : <Image source={require('@/assets/images/icon/search.png')} style ={{ width: 30, height: 30}}/>),}}
      />
       <Tabs.Screen
        name="profile"
        options={{ 
        //   headerStyle: {
        //   backgroundColor: '#f78f1e', // Red background for Settings screen
        // },
        // title: 'My Profile',
        // headerTintColor: '#fffbff',
        // headerTitleStyle: {
        //   textAlign: 'center',
        //   fontFamily:"Lemon_Juice",
        //   fontSize: 24,
        // },
        // headerTitleAlign: 'center',
        header: () => <AppBarContainerwithTitle title="My Profile" onBackPress={handleBackPress} />,
        tabBarIcon: ({focused}) =>(focused ? <Image source={require('@/assets/images/icon/Group_542.png')} style ={{ width: 40, height: 40}}/> : <Image source={require('@/assets/images/icon/profile.png')} style ={{ width: 30, height: 30}}/>),}}
      />
    </Tabs>
  );
}