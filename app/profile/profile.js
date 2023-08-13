
import * as React from 'react';
import { StyleSheet, Text,SafeAreaView ,ScrollView,TouchableOpacity, View,Image,  } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, Foundation, MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import TitleBar  from '../template/titleBar';

const DATA = [
  {
    user_id: '1',
    user_username: 'admin',
    user_nama: 'Adit',
    user_email: 'adityatrik1@gmail.com',
    user_nomor: '088970186806',
    user_alamat: 'Jl. Kaliurang, Sleman, Yogyakarta',
    user_hak_akses: 'admin',
  },
   
];


const ProfileButton = ({ onPress, title }) => (
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



const UserImageContainer = () => {
  return (
   <View >
    <Text style={[styles.userContainerTitle]}> Profile Pengguna </Text>
      <View style={styles.userContainerImage} >
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/image/foto.jpg')}
        />
        <View>
          <Text  style={[styles.userTitleName]}>
           Aditya Tri Kurniawan
          </Text>
          <Text  style={[styles.userRole]}>
          Admin
          </Text>
        </View>
        
      </View>
  </View >

  );
};


const ProfileUserContainer = ({data,navigation}) => {

  return (
  <View style={[styles.profileContiner]}>
    
    {/* <Image style={styles.UserImg} source={require('../../assets/default_pict.png')} /> */}
  
     <Text style={[styles.UserTextSub]} >Nama : {data[0].user_nama}</Text>
     <Text style={[styles.UserTextSub, { marginTop: 12 }]} >Role : {data[0].user_hak_akses}</Text>
     <Text style={[styles.UserTextSub, { marginTop: 12 }]} >Nomor : {data[0].user_nomor}</Text>
     <Text style={[styles.UserTextSub, { marginTop: 12 }]} >Email : {data[0].user_email}</Text>
     <ProfileButton onPress={() => navigation.navigate('Ubah')}  title="Ubah" />
   

 </View>

  );
};


export function Profile({ navigation }) {
    return (
    <ScrollView style={[styles.container]}  >
      <View style={{marginBottom:50}}>
        <TitleBar ></TitleBar>
        <UserImageContainer></UserImageContainer>
        <ProfileUserContainer data={DATA} navigation={navigation} ></ProfileUserContainer>
        <ButtonLogout title="Keluar" onPress={() => navigation.navigate('Login')} />
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
        backgroundColor: '#0c1b32',
        height:60,
        color:'black',
        textAlign: 'center',
        color:'white',
        fontWeight: 'bold',
        fontSize: 17,
        textAlignVertical:'center'
     },

     profileContiner:{
      marginTop: 10,
      borderRadius:15,
      backgroundColor:'#4e4e4e',
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
      color:'white'
    },
    ButtonUbahProfile:{
      marginTop:23,
    },
    userContainerTitle:{
      fontSize:24,
      marginTop:10,
      marginBottom: 20,
      fontWeight: 'bold',
      color:'red'
    },
    userTitleName:{
      fontSize:18,
      fontWeight: 'bold',
      color:'white',
      marginLeft:10,
      
    },
    userRole:{
      fontSize:16,
      color:'#d9d9d9',
      marginTop:3,
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
      marginTop:38,
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
