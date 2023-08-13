import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import TitleBarContent from '../template/titleBar';


export function Beranda({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    setContainerWidth(width);
    setContainerHeight(height);

    // Di sini Anda dapat mengatur ulang lebar dan tinggi sesuai orientasi landscape
  }, []);
  return (
    <ScrollView style={[styles.container,{width: containerWidth,height: containerHeight}]}>
      <TitleBarContent></TitleBarContent>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.textHeader}><Feather name="list" size={20} color="black" /> Daftar Mesin Roaster:</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.containerPencarian}>
              <TextInput
                style={styles.input}
                placeholder="Cari..."
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textPutih}>Cari Data</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoGelap}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.keterangan}>ID : TB0819</Text>
                  <Text style={styles.keterangan}>TIPE MESIN: Electric</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.statusOnline}>Online</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.buttonMerah} >
                <Text style={styles.textPutih}>Mulai Roasting</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGray} >
                <Text style={styles.textPutih}>Profile Mesin</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonAbu} >
              <Text style={styles.textPutih}><AntDesign name="plussquare" size={16} /> Tambah Mesin</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.textHeader}>Profile Mesin:</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.infoTerang}>
              <Text style={styles.keterangan}>ID : TB0819</Text>
              <Text style={styles.keterangan}>Nama: Mesin Roaster 1 Kg</Text>
              <Text style={styles.keterangan}>Tipe: Electric</Text>
              <Text style={styles.keterangan}>Serial Number: Electric</Text>
              <Text style={styles.keterangan}>Protokol: Modbus</Text>
              <Text style={styles.keterangan}>Host: 192.168.0.101</Text>
              <Text style={styles.keterangan}>Port: 1883</Text>
              <TouchableOpacity style={styles.buttonMerah} onPress={() => setModalVisible(true)} >
                <Text style={styles.textPutih}><FontAwesome name="edit" size={16} /> Ubah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styleModal.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styleModal.centeredViewModal}>
            <View style={styles.modalView}>
              <View style={[FormOption.UserViewImg]}>
                <Text style={[styles.textHeader, { alignSelf: 'center', margin: 15 }]}>Edit Profile</Text>

                <Text style={FormOption.FormLabel}>ID</Text>
                <View style={styles.action}>
                  <TextInput placeholder="ID" placeholderTextColor="#666666" style={styles.textInput} autoCapitalize="none" />
                </View>

                <Text style={FormOption.FormLabel}>Nama</Text>
                <View style={styles.action}>
                  <TextInput placeholder="Nama" placeholderTextColor="#666666" style={styles.textInput} autoCapitalize="none" />
                </View>

                <Text style={FormOption.FormLabel}>Tipe</Text>
                <View style={styles.action}>
                  <TextInput placeholder="Tipe" placeholderTextColor="#666666" style={styles.textInput} autoCapitalize="none" />
                </View>

                <Text style={FormOption.FormLabel}>Serial Number</Text>
                <View style={styles.action}>
                  <TextInput placeholder="Serial Number" placeholderTextColor="#666666" style={styles.textInput} autoCapitalize="none" />
                </View>

                <Text style={FormOption.FormLabel}>Protokol</Text>
                <View style={styles.action}>
                  <TextInput placeholder="Protokol" placeholderTextColor="#666666" style={styles.textInput} autoCapitalize="none" />
                </View>

                <Text style={FormOption.FormLabel}>Host</Text>
                <View style={styles.action}>
                  <TextInput placeholder="Host" placeholderTextColor="#666666" style={styles.textInput} autoCapitalize="none" />
                </View>

                <Text style={FormOption.FormLabel}>Port</Text>
                <View style={styles.action}>
                  <TextInput placeholder="Port" placeholderTextColor="#666666" style={styles.textInput} autoCapitalize="none" />
                </View>

                <View style={[FormOption.ButtonPos]}>
                  <TouchableOpacity style={[ButtonStyles.button, ButtonStyles.ButtonTampilkan]}>
                    <Text style={[ButtonStyles.buttonText,]}>Simpan</Text>
                  </TouchableOpacity>
                </View>
                <View style={[FormOption.ButtonPos]}>
                  <TouchableOpacity style={[ButtonStyles.buttonAbu, ButtonStyles.ButtonTampilkan]} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={[ButtonStyles.buttonText,]}>Batal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  line: {
    borderBottomColor: '#EA1F1F',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 8,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20
  },
  infoGelap: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 8,
  },
  infoTerang: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  textItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonMerah: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: "#08d4c4",
    backgroundColor: '#EA1F1F',
    marginTop: 10
  },
  buttonGray: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: "#08d4c4",
    backgroundColor: '#272323',
    marginTop: 10
  },
  action: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1
  },
  buttonAbu: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: "#08d4c4",
    backgroundColor: '#666262',
    marginTop: 20
  },
  keterangan: {
    fontSize: 14,
    margin: 3,
  },
  textPutih: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#fff"
  },
  containerPencarian: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    marginVertical: 20
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: '#EA1F1F',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  statusOnline: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#24CF15',
    borderRadius: 30,
    color: '#fff',
  },
});

const styleModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


const FormOption = StyleSheet.create({
  input: {
    height: 60,
    marginTop: 7,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#4287f5',
    borderRadius: 8,
  },
  UserViewImg: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 30,
  },
  ButtonPos: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormLabel: {
    fontWeight: 'bold',
  }

})


const ButtonStyles = StyleSheet.create({
  button: {
    marginTop: 15,
    backgroundColor: 'red',
    paddingVertical: 13,
    paddingHorizontal: 15,
    width: 320,
    borderRadius: 15,
  },
  buttonAbu: {
    marginTop: 15,
    backgroundColor: '#666262',
    paddingVertical: 13,
    paddingHorizontal: 15,
    width: 320,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextTDiagram: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

})