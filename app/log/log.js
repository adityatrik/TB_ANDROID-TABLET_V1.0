
import * as React from 'react';
import { StyleSheet, Text,SafeAreaView ,ScrollView, View } from 'react-native';
import TitleBar  from '../template/titleBar';


export default function Log({ navigation }) {
    return (
    <ScrollView style={[styles.container]}  >
      <TitleBar ></TitleBar>
      <View style={[styles.ContainerLog]}>        
          <View style={[styles.CardContainer]}>

            <Text style={[styles.textPageTitle]} >Log</Text>
            
              <View style={[styles.AturContainer]}>
          <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.TextTitleLog}>1</Text>
                  </View>

                  <View style={styles.ContainerLogDeskripsi}>
                    <Text style={styles.TextTitleMain}>
                        Mei 2023 08:00{"\n"}
                        Robusta Temanggung{"\n"}
                        Berat:1000g{"\n"}
                        Kadar Air:10%{"\n"}
                        Densitas:0.49g/ml{"\n"}
                        Operator:Aditya{"\n"}
                    </Text>
                  </View>
                  <View style={styles.ContainerLogButton}>
                    <Text style={styles.tombolBerhasil}>
                       Berhasil
                    </Text>

                    <Text style={styles.TextMin}>12 MIN</Text>
                  
                  </View>

                  
          </View>

              </View>
          </View>
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
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 8,
  },
  item: {
    backgroundColor: '#dbdbdb',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  listContainer:{
    height:300
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#EA1F1F'
  },
  infoGelap: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 8,
  },
  infoTerang: {
    margin: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  textItem: {
      fontSize: 16,
      marginBottom: 8,
  },
  buttonMerah: {
    width: '100%',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: "#08d4c4",
    backgroundColor: '#EA1F1F',
    marginTop: 10
  },
  buttonGray: {
    width: '100%',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: "#08d4c4",
    backgroundColor: '#272323',
    marginTop: 10,
    marginHorizontal:15,
  },
  buttonAbu: {
    padding: 15,
    borderRadius: 15,
    color: "#08d4c4",
    backgroundColor: '#666262',
    marginHorizontal:15,
  },
  keterangan: {
    fontSize: 14,
    margin:3,
  },
  tombol: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#EA1F1F',
    borderRadius: 15,
    color: 'white'
  },
  tombolTerhubung: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 18,
    backgroundColor: '#EA1F1F',
    borderRadius: 15,
    color: 'white'
  },
  AturContainer:{
    borderRadius:15,
    marginTop:17,
    backgroundColor:'#b8b8ba',
    padding:2,
    elevation:1,
   },CardContainer:{
    borderRadius:10,
    marginTop:2,
    backgroundColor:'#d9d9d9',
    padding:27,
    elevation:1,
   },textPageTitle:{
    color:'red',
    fontSize:20,
    fontWeight:'bold',
}, 
ContainerLog:{
  padding:10,
},
TextTitleLog:{
  padding: 1,
  paddingTop:40,
  flex: 1,
  textAlign:'center',
  fontSize:25,
  fontWeight:'bold',
  color:'red',
  borderRightWidth:1
},
TextTitleMain:{
  marginLeft:15,
  marginTop:3,
  marginBottom:-10,
  fontSize:15,
  fontWeight:'bold'
},
ContainerLogDeskripsi:{
    flex:5,
},
ContainerLogButton:{
    flex:3
},
tombolBerhasil: {
  alignSelf: 'center',
  paddingHorizontal: 13,
  paddingVertical: 10,
  backgroundColor: '#24d015',
  borderRadius: 15,
  fontSize:12,
  color: 'white',
  marginTop:16,
},TextMin:{
  textAlign:'center',
  marginTop:14,
  fontSize:16,
  fontWeight:'bold'
},TextSelect:{
  color:'white',
  marginHorizontal:15,
  fontSize:16,
  paddingTop:13
},
formPicker:{
  flex:3,
  marginRight:20,
  backgroundColor:'#d9d9d9',
},
rowSearch: {
  flexDirection: 'row',
  padding:13
},

});