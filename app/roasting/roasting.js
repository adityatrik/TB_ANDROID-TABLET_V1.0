import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, ScrollView, Text, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
// import { LineChart } from 'react-native-svg-charts';
import { LineChart } from 'react-native-chart-kit';
import TitleBarContent from '../template/titleBar';

const windowWidth = Dimensions.get('window').width;

export function Roasting({ navigation }) {

  const totalColumnsRow1 = 4;
  const totalColumnsRow2 = 3;
  const totalColumnsRow3 = 6;

  // Menghitung lebar dan tinggi sel berdasarkan perbandingan 3:5:2
  const cellSizeRow1 = windowWidth / totalColumnsRow1 - 22;
  const cellSizeRow3 = windowWidth / totalColumnsRow3 - 18;
  const cellSizeRow2_1 = (windowWidth * 2) / 10 - 10; // 2/10 dari lebar layar
  const cellSizeRow2_2 = (windowWidth * 6) / 10 - 10; // 7/10 dari lebar layar
  const cellSizeRow2_3 = (windowWidth * 1.55) / 10 - 10; // 1/10 dari lebar layar
  // Menghitung tinggi baris berdasarkan perbandingan 1:8:1
  const totalHeight = windowWidth * 0.38; // Total tinggi sel pada baris 1-3
  const row1Height = (totalHeight * 1.25) / 10;
  const row2Height = (totalHeight * 7.5) / 10;
  const row3Height = (totalHeight * 1.25) / 10;

  const lineChartData = {
    labels: ['1Min', '2Min', '3Min', '4Min', '5Min', '6Min'],
    datasets: [
      {
        data: [50,100,150,200,250],
        color: (opacity = 1) => `rgba(255, 255, 255, 255)`, // Warna garis
      },
    ],
  };

  const [air, setAir] = useState(0);
  const [burner, setBurner] = useState(0);
  const [drum, setDrum] = useState(0);

  const changeAir = (newValue) => {
    setAir(newValue);
  };
  const changeBurner = (newValue) => {
    setBurner(newValue);
  };
  const changeDrum = (newValue) => {
    setDrum(newValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TitleBarContent></TitleBarContent>
        <View style={[styles.row, { height: row1Height }]}>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow1, marginLeft: 5, marginRight: 5, backgroundColor: '#cc0f51', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textItem, { color: '#FFF' }]}>TERHUBUNG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow1, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textItem, { color: '#FFF' }]}>MULAI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow1, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textItem, { color: '#FFF' }]}>RESET</Text>
          </TouchableOpacity>
          <View style={[styles.cell, { width: cellSizeRow1, marginLeft: 5, marginRight: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.textItem}>00:00</Text>
          </View>
        </View>
        <View style={[styles.row, { height: row2Height }]}>
          <View style={[styles.cell, { width: cellSizeRow2_1, marginLeft: 5, marginRight: 5, backgroundColor: 'white' }]}>
            {/* <View style={[styles.rowSlider, styles.boxSlider, { transform: [{ rotate: '-90deg' }], height: cellSizeRow2_1/4,width: row2Height-20}]}>
              <Text style={styles.titleText}>Drum</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={drum}
                onValueChange={changeDrum}
                minimumTrackTintColor="#FF0000"
                maximumTrackTintColor="#FF0000"
                thumbTintColor="#FF0000"
              />
              <Text style={styles.valueText}>{drum}</Text>
            </View> */}
            <View style={[styles.innerCol, { height: row2Height }]}>
              <View style={styles.col}>
                <Text style={styles.valueText}>{drum}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={drum}
                  onValueChange={changeDrum}
                  minimumTrackTintColor="#FF0000"
                  maximumTrackTintColor="#FF0000"
                  thumbTintColor="#FF0000"
                />
                <Text style={styles.titleText}>Drum</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.valueText}>{air}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={air}
                  onValueChange={changeAir}
                  minimumTrackTintColor="#FF0000"
                  maximumTrackTintColor="#FF0000"
                  thumbTintColor="#FF0000"
                />
                <Text style={styles.titleText}>Air</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.valueText}>{burner}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={burner}
                  onValueChange={changeBurner}
                  minimumTrackTintColor="#FF0000"
                  maximumTrackTintColor="#FF0000"
                  thumbTintColor="#FF0000"
                />
                <Text style={styles.titleText}>Burner</Text>
              </View>
            </View>
          </View>
          <View style={[styles.cell, { width: cellSizeRow2_2, marginLeft: 5, marginRight: 5, backgroundColor: 'white' }]}>
            <LineChart
              data={lineChartData}
              width={cellSizeRow2_2 - 4}
              height={row2Height - 5}
              withDots={false}
              chartConfig={{
                backgroundGradientFrom: "#000",
                backgroundGradientTo: "#000",
                decimalPlaces: 0,
                // backgroundGradientFrom: 'white',
                // backgroundGradientFromOpacity: 0, // Set nilai 0
                // backgroundGradientTo: 'white',
                // backgroundGradientToOpacity: 0, // Set nilai 0
                // color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                // yAxisInterval: 50,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#2c17e6"
                }
              }}
              // bezier
              style={{
                borderRadius: 18,
                margin: 2
              }}
            />
          </View>
          <View style={[styles.cell, { width: cellSizeRow2_3, marginLeft: 5, marginRight: 5, backgroundColor: 'white' }]}>
            <View style={[styles.innerColMonitor, { height: row2Height }]}>
              <View style={[styles.colMonitor, { borderColor: '#cc0f51', backgroundColor: '#cc0f51', }]}>
                <Text style={[styles.textItem, { color: '#fff' }]}>BT: 00</Text>
              </View>
              <View style={[styles.colMonitor, { borderColor: '#6014fa', backgroundColor: '#6014fa', }]}>
                <Text style={[styles.textItem, { color: '#fff' }]}>ET: 00</Text>
              </View>
              <View style={[styles.colMonitor, { borderColor: '#cc0f51', backgroundColor: '#fff', }]}>
                <Text style={[styles.textItem, { color: '#cc0f51' }]}>△BT: 00</Text>
              </View>
              <TouchableOpacity style={[styles.colMonitor, { borderColor: '#cc0f51', backgroundColor: '#cc0f51', }]}>
                <Text style={[styles.textItem, { color: '#FFF' }]}>IGNITION</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.colMonitor, { borderColor: '#6014fa', backgroundColor: '#6014fa', }]}>
                <Text style={[styles.textItem, { color: '#FFF' }]}>COOLING</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.row, { height: row3Height }]}>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textEvent, { color: '#FFF' }]}>CHARGE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textEvent, { color: '#FFF' }]}>DRY END</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textEvent, { color: '#FFF' }]}>FC START</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textEvent, { color: '#FFF' }]}>FC END</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textEvent, { color: '#FFF' }]}>SC START</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#6014fa', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textEvent, { color: '#FFF' }]}>DROP</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rowSlider: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    borderWidth: 1,
    borderRadius: 16
  },
  textItem: {
    // marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  textEvent: {
    // marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
  },
  boxSlider: {
    // marginStart: -210,
    // marginEnd: -220,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    paddingEnd: 20,
  },
  slider: {
    width: '490%',
    height: '80%',
    // marginLeft: -15,
    transform: [{ rotate: '-90deg' }]
    // marginVertical:10
  },
  titleText: {
    color: '#000',
    // marginLeft: -10,
    // flex: 1,
    fontSize: 14,
    // marginStart: 10,
    // transform: [{ rotate: '90deg' }]
  },
  valueText: {
    color: '#000',
    fontWeight: 'bold',
    // marginLeft: -10,
    // flex: 1,
    fontSize: 14,
    // transform: [{ rotate: '90deg' }]
  },
  innerCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  innerColMonitor: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
  },
  col: {
    width: '30%', // Ubah lebar kolom sesuai kebutuhan
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  colMonitor: {
    width: '100%', // Ubah lebar kolom sesuai kebutuhan
    height: '15%',
    marginVertical: 6,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
