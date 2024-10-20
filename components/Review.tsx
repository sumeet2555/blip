// import React, {Component} from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { Avatar } from 'react-native-paper';

// export default function Review(){

//     // constructor(props) {
//     //     super(props);
//     //     this.state = { 
//     //       data: props.data,
//     //       expanded : false,
//     //     }

//     //     if (Platform.OS === 'android') {
//     //         UIManager.setLayoutAnimationEnabledExperimental(true);
//     //     }
//     // }
  


//     return (
//        <View>
//             <TouchableOpacity  style={styles.row} onPress={()=>this.toggleExpand()}>
//                 <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
//                 <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'black'} style={{marginLeft:'auto', marginRight: 0}} />
//             </TouchableOpacity>
//             <View style={styles.parentHr}/>
//             {
//                 this.state.expanded &&
//                 <View style={styles.child}>
//                     <View>
//                         <View>
//                             <View style={{flexDirection: 'row'}}>
//                                 <Avatar.Image size={40} source={require("../icon/pf_1_review.png")} />
//                                 <View style={{flexDirection: 'column', marginLeft: 20}}>
//                                     <View style={{flexDirection: 'row'}}>
//                                         <Text style={{marginRight: 80, fontFamily: 'Lemon_Juice', fontSize: 24}}> User 1</Text>
//                                         <Icon name="star" color={'gold'} size={18} />
//                                         <Icon name="star" color={'gold'} size={18}/>
//                                         <Icon name="star" color={'gold'} size={18}/>
//                                         <Icon name="star" color={'gold'} size={18}/>
//                                         <Icon name="star" color={'black'} size={18}/>
//                                     </View>
//                                     <View style={{marginTop: 10}}>
//                                         <Text style = {{fontSize: 20, fontFamily:'Lemon_Juice'}}>asdasdasda</Text>
//                                         <Text style = {{fontSize: 15, color:'grey', fontFamily:'Lemon_Juice'}}>12 Oct 2023</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
                       
//                     </View>

//                     <View style={{marginTop: 20}}>
//                         <View>
//                             <View style={{flexDirection: 'row'}}>
//                                 <Avatar.Image size={40} source={require("../icon/pf_2_review.png")} />
//                                 <View style={{flexDirection: 'column', marginLeft: 20}}>
//                                     <View style={{flexDirection: 'row'}}>
//                                         <Text style={{marginRight: 80, fontFamily: 'Lemon_Juice', fontSize: 24}}> User 2</Text>
//                                         <Icon name="star" color={'gold'} size={18} />
//                                         <Icon name="star" color={'gold'} size={18}/>
//                                         <Icon name="star" color={'gold'} size={18}/>
//                                         <Icon name="star" color={'gold'} size={18}/>
//                                         <Icon name="star" color={'black'} size={18}/>
//                                     </View>
//                                     <View style={{marginTop: 10}}>
//                                         <Text style = {{fontSize: 20, fontFamily:'Lemon_Juice'}}>asdasdasda</Text>
//                                         <Text style = {{fontSize: 15, color:'grey', fontFamily:'Lemon_Juice'}}>12 Oct 2023</Text>
//                                     </View>

//                                     <View style={{flexDirection: 'row', marginTop: 20}}>
//                                         <Text style={{textDecorationLine: 'underline', fontFamily:'Lemon_Juice', fontSize: 24}}>More Reviews</Text>
//                                         <Text style = {{marginLeft: 50, textDecorationLine: 'underline', fontFamily:'Lemon_Juice', fontSize: 24}}>Write a Review</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
                       
//                     </View>
//                 </View>
//             }
            
//        </View>
//     )
//   }

//   toggleExpand=()=>{
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     this.setState({expanded : !this.state.expanded})
//   }



// const styles = StyleSheet.create({
//     title:{
//         fontSize: 32,
//         fontFamily: 'Lemon_Juice',
//     },
//     row:{
//         flexDirection: 'row',
//         justifyContent:'space-between',
//         height:56,
//         paddingRight:18,
//         alignItems:'center',
//     },
//     parentHr:{
//         height:1,
//         color: 'white',
//         width:'100%'
//     },
//     child:{
//         paddingRight: 18,
//     }
    
// });