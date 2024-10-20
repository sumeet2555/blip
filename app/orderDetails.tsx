import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';


// Define a type for your product
interface Tracking {
  id: string;
  date: string;
  tracks : TrackingDay[];
}

interface TrackingDay {
    id: string;
    timestamp: string;
    description: string;
  }
// Sample data for products
const TRACKINGS: Tracking[] = [
  {
    id: '1',
    date: '11/02/24',
    tracks : [{
        timestamp: '10:32 AM',
        description: 'lorem dipsum',
        id: '1'
    },{
        timestamp: '2:20 PM',
        description: 'lorem dipsum',
        id: '2'
    }]
  },
  {
    id: '2',
    date: '21/02/24',
    tracks : [{
        timestamp: '10:32 AM',
        description: 'lorem dipsum',
        id: '1'
    },{
        timestamp: '2:20 PM',
        description: 'lorem dipsum',
        id: '2'
    }]
  },
  // Add more products as needed
];

const screenWidth = Dimensions.get('window').width; // Get screen width

const OrderDetails: React.FC = () => {
    const router = useRouter();
  // Render item for FlatList
  const renderItem = ({ item }: { item: Tracking }) => (
   
    <View style ={{marginHorizontal:30, marginVertical:15}}>
        <Text style={{fontFamily:"Lemon_Juice", fontSize:22, color:'#f78f1e'}}>{item.date}</Text>
        <FlatList
        data={item.tracks}
        renderItem={renderTrackings}
        keyExtractor={(item) => item.id}
        numColumns={1} // Set number of columns to 2
        contentContainerStyle={styles.list}
      />
    </View>
  );
const renderTrackings = ({item}: {item : TrackingDay}) => (
    <View style={{marginVertical:15, flexDirection: 'row'}}>
        <View style={{width: screenWidth / 3, flex:1}}><Text style={{fontFamily:"Lemon_Juice", fontSize:18}}>{item.timestamp}</Text></View>
        <View style={{flex:2, flexDirection: 'row'}}>
            
            <Text style={{fontSize:24}}>|</Text>
            <View style={{marginLeft:10}}>
                <Text style={{fontFamily:"Lemon_Juice", fontSize:18, color:'#7b7b73', }}>{item.description}</Text></View>
            </View>
            
        
    </View>
);
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'#f4f4ea'}}>
            <View style = {{margin:15}}>
            <Text style={{fontFamily:"Lemon_Juice", fontSize:32, marginLeft:15}}>Tracking Details</Text>
            </View>
        </View>
        <View style={{marginVertical:15}}>
        <Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30, paddingBottom:10}}> Courier Partner : DTDC</Text>
        <Text style={{fontFamily:"Lemon_Juice", fontSize:24, marginLeft:30}}> Tracking ID : 098737652</Text>
        
        </View>
        <Image source={require('@/assets/images/icon/line.png')} style={{ width: "90%", height: 5, marginLeft: 15,}}/> 
      
      
      <FlatList
        data={TRACKINGS}
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
    backgroundColor:'#fefef5',
  },
  list: {
    paddingBottom: 20,
  },
  
  image: {
    width: '100%', // Full width of the item
    height: 150, // Set height as needed
    resizeMode:"contain"
},
});

export default OrderDetails;