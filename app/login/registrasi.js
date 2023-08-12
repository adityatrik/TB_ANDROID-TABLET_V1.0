import React, { useState } from 'react';
import  { View, StyleSheet, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';

export function Registrasi() {
  const navigation = useNavigation();
  const [keterangan, setKeterangan] = useState();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [msg, setMsg] = useState('');
  const [data, setData] = useState({
    email: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
});

const textInputChange = (val) => {
    if( val.trim().length >= 4 ) {
        setData({
            ...data,
            email: val,
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            email: val,
            check_textInputChange: false,
            isValidUser: false
        });
    }
}

const handleValidUser = (val) => {
    if( val.trim().length >= 4 ) {
        setData({
            ...data,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            isValidUser: false
        });
    }
}

const Forgot = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/GantiPassword', {
            email: data.email
        });
        setKeterangan('Reset password berhasil!! silahkan periksa email anda');
        onToggleSnackBar();
    } catch (error) {
        if (error.response) {
            setMsg('email tidak terdaftar');
        }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Lupa Password</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer} >
        <Text style={styles.judul}>LUPA PASSWORD</Text>
        <View style={styles.formLogin}>
          {msg ? (<Text style={{color: 'red'}}>{msg}</Text>):(null)}
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
              <MaterialCommunityIcons name="email-outline" color="black" size={20} />
              <TextInput 
                  placeholder="Email"
                  placeholderTextColor="#666666"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? 
              <Animatable.View animation="bounceIn" >
                <Feather name="check-circle" color="black" size={20} />
              </Animatable.View>
              : null}
          </View>
          { data.isValidUser ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Masukkan Email dengan benar</Text>
          </Animatable.View>
          }

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{marginTop:15}}>Sudah Punya Akun? Login Disini</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity onPress={Forgot} style={styles.signIn} >
              <Text style={styles.textSign}>Kirim</Text>
            </TouchableOpacity>
          </View>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Tutup',
              onPress: () => {onToggleSnackBar},
            }}>{keterangan}</Snackbar>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E3E'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  logo: {
    width: 80,
    height: 80
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: "center"
  },
  judul: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: "center",
  },
  text_footer: {
    color: '#000',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    paddingBottom: 5,
    padding: 15,
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 30
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: "#08d4c4",
    backgroundColor: '#EA1F1F',
    marginTop: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
      color: "#fff"
  },
  formLogin: {
    marginTop: 15,
  }
});