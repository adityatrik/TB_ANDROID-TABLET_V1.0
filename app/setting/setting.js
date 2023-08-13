
import * as React from 'react';
import { StyleSheet, Text,SafeAreaView ,ScrollView,TouchableOpacity, View,Image   } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, Foundation, MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import TitleBar  from '../template/titleBar';


const UbahButton = ({ onPress, title }) => (
  <TouchableOpacity style={[ButtonStyles.button,styles.ButtonUbahProfile]} onPress={onPress}>
    <Text style={[ButtonStyles.buttonText,]}><FontAwesome name="edit" size={20} color="white" />  {title}</Text>
  </TouchableOpacity>


);
const ButtonLogout = ({ onPress, title }) => (
  <TouchableOpacity style={[ButtonSecondaryStyles.button,]} onPress={onPress}>
    <Text style={[ButtonSecondaryStyles.buttonText,]}>  {title}</Text>
  </TouchableOpacity>
);

const ButtonBantuan = ({ onPress, title }) => (
  <TouchableOpacity style={[ButtonSecondaryStyles.button,]} onPress={onPress}>
    <Text style={[ButtonSecondaryStyles.buttonText,]}> <Entypo name="help-with-circle" size={15} color="black" />  {title}</Text>
  </TouchableOpacity>
);

// Section
const TitleMenu = () => {
  return (
    <View 
    style={[
      styles.containerNotifikasi,
      {
        flexDirection: 'column',          
      },
    ]}>
    <Text  style={[ styles.NotifikasiTitle,]} > Setting </Text>
  </View >

  );
};


const CardContainer = ({navigation}) => {

  return (
    
      <View style={[styles.CardContainer]}>
      <ContainerAtur></ContainerAtur>
       </View>
     
  
  );
};


const ContainerAtur = ({navigation}) => {

  return (
    <>
    <Text style={{fontSize:22, color: '#EA1F1F', fontWeight: 'bold', marginBottom: 10}}>Pengaturan Software</Text>
      <View style={[styles.AturContainer]}>
        <Text style={[styles.UserTextSub]} >Alamar Server : 172.0.0.1</Text>
        <UbahButton onPress={() => navigation.navigate('Ubah Profile')}  title="Ubah" />
       </View>
      <View style={[styles.AturContainer]}>
        <Text style={[styles.UserTextSub]} >Komunikasi Data : <Text>Websocket</Text> </Text>
        <UbahButton onPress={() => navigation.navigate('Ubah Profile')}  title="Ubah" />
       </View>
    </>
  );
};


export default function Setting({ navigation }) {
    return (
    <ScrollView style={[styles.container]}  >
      <View style={{marginBottom:50}}>
        <TitleBar ></TitleBar>
        <CardContainer navigation={navigation} ></CardContainer>
      </View>
    </ScrollView >
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
    NotifikasiTitle:{
        backgroundColor: '#s',
        height:60,
        color:'black',
        textAlign: 'center',
        color:'white',
        fontWeight: 'bold',
        fontSize: 17,
        textAlignVertical:'center'
     },

    CardContainer:{
      borderRadius:15,
      marginTop:10,
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
