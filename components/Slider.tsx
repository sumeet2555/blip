import { StyleSheet, View , Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 150; 

export const Slider = () =>{

    const bannerImages = [{id:'1', uri: require('@/assets/images/background_image/banner_2.png')}];

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
          <Image source={item.uri} style={styles.image} />
        </View>
      );
    return(
        <View>
            <FlatList data = {bannerImages} 
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

export default Slider;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5, width:"98%", marginVertical: 10, paddingLeft: 10, paddingRight: 20, resizeMode: 'contain'
    },
    image: {
        width,
        height: ITEM_HEIGHT, // Set the height of the image
        resizeMode: 'cover',
    },
  });