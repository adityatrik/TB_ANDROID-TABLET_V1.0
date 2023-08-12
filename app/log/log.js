
import * as React from 'react';
import { StyleSheet, Text,SafeAreaView ,ScrollView,TouchableOpacity, View,Image   } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, Foundation, MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import TitleBar  from '../template/titleBar';


export default function Log({ navigation }) {
    return (
    <SafeAreaView style={[styles.container]}  >
   
      <TitleBar ></TitleBar>
      <View style={[styles.CardContainer]}>
        <Text style={[styles.textPageTitle]} >Log</Text>
          <View style={[styles.AturContainer]}>
            <Text style={[styles.UserTextSub]} >Alamar Server : 172.0.0.1</Text>
            <TouchableOpacity style={[ButtonStyles.button,styles.ButtonUbahProfile]}>
              <Text style={[ButtonStyles.buttonText,]}><FontAwesome name="edit" size={20} color="white" />Ubah</Text>
            </TouchableOpacity>
          </View>
       </View>
    </SafeAreaView >
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    backgroundColor: '#000'
  },
    containerNotifikasi: {
      paddingTop:23, //TODO: Ganti biar full tapi icon notifikasi berubah putih
      elevation:13,
      zIndex:100
    },
    textPageTitle:{
        color:'red',
        fontSize:20,
        fontWeight:'bold',
    },   
    CardContainer:{
      borderRadius:15,
      marginTop:55,
      backgroundColor:'#d9d9d9',
      padding:20,
      elevation:1,
     },
     AturContainer:{
      borderRadius:15,
      marginTop:17,
      backgroundColor:'#b8b8ba',
      padding:20,
      elevation:1,
     },

    UserTitle:{
      fontWeight: 'bold',
      fontSize: 18,
      marginTop:4
    },
    UserTextSub:{
      fontSize: 17,
      color:'black',
      fontWeight:'600'
    },
    ButtonUbahProfile:{
      marginTop:23,
    },
    userContainerTitle:{
      fontSize:20,
      marginTop:60,
      fontWeight: 'bold',
      color:'red'
    },
    userTitleName:{
      fontSize:18,
      fontWeight: 'bold',
      color:'white',
      marginLeft:10,
      
    },
  
    userContainerImage: {
      flexDirection: 'row',
      marginBottom:15,
      marginTop:15,
    },
    tinyLogo: {
      width: 55,
      height:55,
      borderRadius:15
    },
    logo: {
      width: 66,
      height: 58,
    },

  
});

const ButtonStyles  = StyleSheet.create({ 
    button: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 22,
      borderRadius: 8,

    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },

})

const ButtonSecondaryStyles  = StyleSheet.create({ 
    button: {
      marginTop:10,
      backgroundColor: '#ea1f1f',
      paddingVertical: 15,
      paddingHorizontal: 22,
      borderRadius:15,
    },
    buttonText: {
      color: '#fff',
      fontSize: 17,
   
      textAlign: 'center',
    },

})
