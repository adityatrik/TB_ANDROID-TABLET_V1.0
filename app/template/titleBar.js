
import * as React from 'react';
import { StyleSheet, Text,SafeAreaView ,ScrollView,TouchableOpacity, View,Image   } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, Foundation, MaterialCommunityIcons,Entypo } from '@expo/vector-icons';


// Section
const TitleMenu = () => {
  return (
    <View 
    style={[
      styles.containerNotifikasi,
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5, 
        marginBottom: 15   
      },
    ]}>
    <Image
    style={styles.tinyLogo}
    source={require('../../assets/image/logo.jpg')}
    />
    <Text  style={[ styles.NotifikasiTitle,]} > TAN & BLACK </Text>
  </View >

  );
};



export default function TitleBarContent({ navigation }) {
    return (
      <SafeAreaView >
   
      <TitleMenu></TitleMenu>
     
    </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    
    containerNotifikasi: {
      flex: 1,
      paddingTop:23, //TODO: Ganti biar full tapi icon notifikasi berubah putih
      elevation:13,
      zIndex:100
    },
    NotifikasiTitle:{
        height:60,
        color:'black',
        textAlign: 'center',
        color:'white',
        fontWeight: 'bold',
        fontSize: 38,
        textAlignVertical:'center'
     },
     UserViewImg:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white',
      padding:23,
      elevation:1,
     },
     UserImg: {
      width: 100,
      height: 100,
      borderRadius: 90,
      marginTop:100,
      alignItems: 'center',
      
    },
    UserTitle:{
      fontWeight: 'bold',
      fontSize: 18,
      marginTop:4
    },
    UserTextSub:{
      fontSize: 14,
    },
    ButtonUbahProfile:{
      marginTop:23,
    },tinyLogo: {
        width: 50,
        height:50,
        borderRadius:15
      },
      logo: {
        width: 66,
        height: 58,
      },

  
});
