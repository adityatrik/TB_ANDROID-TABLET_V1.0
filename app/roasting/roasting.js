import React, { useState, useEffect } from 'react';
import { Switch, FlatList, Modal, TouchableOpacity, View, StyleSheet, Dimensions, ScrollView, Text, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import RF from 'react-native-responsive-fontsize';
// import { LineChart } from 'react-native-svg-charts';
import { LineChart } from 'react-native-chart-kit';
import TitleBarContent from '../template/titleBar';
import { VictoryBar, VictoryChart, VictoryLine, VictoryLabel, VictoryTooltip, VictoryTheme, VictoryAxis } from "victory-native";

const DataMesin = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a02f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '586194a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const maxima = [250, 25];

const xOffsets = [50, 555];
const tickPadding = [0, -18];
const anchors = ["end", "start"];
const colors = ["#cc0f51", "#147CB3", "#ff6708","#FFFFFF"];

export function Roasting({ navigation }) {
  const data = [
    [{ x: 0, y: 30 }],
    [{ x: 0, y: 30 }],
    [{ x: 0, y: 0 }, { x: 0.5, y: 0 }, { x: 0.8, y: 0 }, { x: 0.9, y: 0 }, { x: 1, y: 0 }, { x: 1.5, y: 0 }, { x: 5, y: 0 }, { x: 7, y: 0 }, { x: 10, y: 0 }, { x: 12, y: 0 }, { x: 13, y: 0 }, { x: 14, y: 0 }],
  ];

  // const [count, setCount] = useState(50
  const [isWsConnected, setWsIsConnected] = useState(false);
  const [dataChart, setDataChart] = useState(data);
  const [et, setEt] = useState('');
  const [etInt, setEtInt] = useState(0);
  const [bt, setBt] = useState('');

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.100.232:81");

    const connectWebSocket = () => {
      const socket = new WebSocket("ws://192.168.100.232:81");
      // socket.on('open', () => {
      //   console.log('WebSocket connected');
      //   setWsIsConnected(true);
      // });
      socket.onopen = () => {
        console.log('WebSocket connected');
        setWsIsConnected(true);
        let count = 0;
        // const countingInterval = setInterval(() => {
        //   count += 0.017;
        //   setDataChart((prevDataChart) => {
        //     return prevDataChart.map((row, rowIndex) => {
        //       if (rowIndex === 0) {
        //         // Menambahkan kolom baru dengan nilai x dari perhitungan
        //         return [
        //           ...row,
        //           { x: count, y: etInt } // Nilai y tetap menggunakan nilai dari kolom pertama
        //         ];
        //       }
        //       return row;
        //     });
        //   });
        // }, 1000);
      }
      let count = 0;
      socket.onmessage = (event) => {
        socket.send('{"command": "getData", "id": 24762, "roasterID": 0}');
        // const data = event.data;
        const parsedData = JSON.parse(event.data);
        // Mengubah string menjadi float menggunakan parseFloat()
        const etValue = parseFloat(parsedData.data.ET);
        const btValue = parseFloat(parsedData.data.BT);
        setEt(parsedData.data.ET);
        setBt(parsedData.data.BT);
        setEtInt(etValue);
        // console.log(bt);
        console.log(parsedData.data);
        // Memulai perhitungan counting dan pengisian kolom baru

        // setDataChart((prevDataChart) => {
        //   const updatedData = prevDataChart.map((row, rowIndex) =>
        //     row.map((prevItem, columnIndex) => {
        //       if (rowIndex == 0 && columnIndex == 1) {
        //         return { x: 10, y: btValue };
        //       } else if (rowIndex == 1) {
        //         return { x: prevItem.x, y: etValue };
        //       }
        //       else {
        //         return prevItem;
        //       }
        //     })
        //   );
        count += 0.017;
        setDataChart((prevDataChart) => {
          return prevDataChart.map((row, rowIndex) => {
            if (rowIndex === 0) {
              // Menambahkan kolom baru dengan nilai x dari perhitungan
              return [
                ...row,
                { x: count, y: btValue } // Nilai y tetap menggunakan nilai dari kolom pertama
              ];
            }else if (rowIndex === 1) {
              return [
                ...row,
                { x: count, y: etValue } // Nilai y tetap menggunakan nilai dari kolom pertama
              ];
            }
            return row;
          });
        });


        socket.onclose = (code, reason) => {
          console.log('WebSocket disconnected:', reason);
          setWsIsConnected(false);

          // Coba hubungkan ulang setelah 2 detik
          setTimeout(() => {
            connectWebSocket();
          }, 2000);
        }
      };
    }
    connectWebSocket();
    return () => {
      socket.close();
    };
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

  const totalColumnsRow1 = 4;
  const totalColumnsRow2 = 3;
  const totalColumnsRow3 = 6;

  const portraitColumnsRow1 = 4;
  const portraitColumnsRow2 = 3;
  const portraitColumnsRow3 = 1;
  const portraitColumnsRow4 = 1;
  const portraitColumnsRow5 = 6;
  const portraitColumnsRow6 = 2;
  const portraitColumnsRow7 = 5;
  const totalHeight = windowHeight - 100; // Total tinggi sel pada baris 1-3

  const portraitCellSize1 = windowWidth / portraitColumnsRow1 - 10;
  const portraitCellSize2 = windowWidth / portraitColumnsRow2 - 10;
  const portraitCellSize3 = windowWidth / portraitColumnsRow3 - 10;
  const portraitCellSize4 = windowWidth / portraitColumnsRow4 - 10;
  const portraitCellSize5 = windowWidth / portraitColumnsRow5 - 10;
  const portraitCellSize6 = windowWidth / portraitColumnsRow6 - 10;
  const portraitCellSize7 = windowWidth / portraitColumnsRow7 - 10;

  const portraitRowHeight1 = (totalHeight * 0.5) / 10;
  const portraitRowHeight2 = (totalHeight * 3.5) / 10;
  const portraitRowHeight3 = (totalHeight * 0.3) / 10;
  const portraitRowHeight4 = (totalHeight * 0.7) / 10;


  // Menghitung lebar dan tinggi sel berdasarkan perbandingan 3:5:2
  const cellSizeRow1 = windowWidth / totalColumnsRow1 - 19;
  const cellSizeRow3 = windowWidth / totalColumnsRow3 - 18;
  const cellSizeRow2_1 = (windowWidth * 2) / 10 - 10; // 2/10 dari lebar layar
  const cellSizeRow2_2 = (windowWidth * 6) / 10 - 10; // 7/10 dari lebar layar
  const cellSizeRow2_3 = (windowWidth * 1.55) / 10 - 10; // 1/10 dari lebar layar
  const row1Height = (totalHeight * 1) / 10;
  const row2Height = (totalHeight * 6) / 10;
  const row3Height = (totalHeight * 1) / 10;

  const xOffsetsPortrait = [48, portraitCellSize4 - 50];
  const xOffsetsLandscape = [48, cellSizeRow2_2 - 50];
  const handleDimensionsChange = ({ window }) => {
    const { width, height } = window;
    setWindowWidth(width);
    setWindowHeight(height);
    // Lakukan sesuatu dengan dimensi yang baru.
  };

  Dimensions.addEventListener('change', handleDimensionsChange);

  const lineChartData = {
    labels: ['1Min', '2Min', '3Min', '4Min', '5Min', '6Min'],
    datasets: [
      {
        data: [50, 100, 150, 200, 250],
        color: (opacity = 1) => `rgba(255, 255, 255, 255)`, // Warna garis
      },
    ],
  };

  const [air, setAir] = useState(0);
  const [sv, setSv] = useState(0);
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
  const changeSv = (newValue) => {
    setSv(newValue);
  };
  const [orientation, setOrientation] = useState('portrait');


  const [stylesSelection, setStylesSelection] = useState([]);
  const styles = StyleSheet.create(stylesSelection);

  const Item = ({ title }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const [igniter, setIgniter] = useState(false);
  const [cooling, setCooling] = useState(false);
  const [agitator, setAgitator] = useState(false);
  const [lamp, setLamp] = useState(false);
  const [auto, setAuto] = useState(false);
  const toggleSwitchIgniter = () => setIgniter(previousState => !previousState);
  const toggleSwitchCooling = () => setCooling(previousState => !previousState);
  const toggleSwitchAgitator = () => setAgitator(previousState => !previousState);
  const toggleSwitchLamp = () => setLamp(previousState => !previousState);
  const toggleSwitchAuto = () => setAuto(previousState => !previousState);

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    if (width > height) {
      setOrientation('landscape');
      let newStyles = {
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#000',
        },
        text: {
          fontSize: Dimensions.get('window').width > 400 ? 24 : 18,
          color: '#fff'
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
          borderRadius: 16,
        },
        textItem: {
          // marginTop: 10,
          color: '#000',
          fontWeight: 'bold',
          fontSize: 20,
        },
        textEvent: {
          // marginTop: 10,
          color: '#000',
          fontWeight: 'bold',
          fontSize: 20,
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
          fontSize: 10,
          // marginStart: 10,
          // transform: [{ rotate: '90deg' }]
        },
        valueText: {
          color: '#000',
          fontWeight: 'bold',
          // marginLeft: -10,
          // flex: 1,
          fontSize: 10,
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
      };
      setStylesSelection(newStyles);
    } else {
      setOrientation('portrait');
      let newStyles = {
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
        listContainer: {
          height: 300
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
          marginHorizontal: 15,
        },
        buttonAbu: {
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          color: "#08d4c4",
          backgroundColor: '#666262',
          // marginHorizontal: 15,
          // marginTop: 11
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
          padding: 10,
          backgroundColor: '#EA1F1F',
          borderRadius: 30,
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
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: '#EA1F1F',
          borderRadius: 10,
          color: 'white',
          marginHorizontal: 10
        },
        AturContainer: {
          borderRadius: 15,
          marginTop: 17,
          backgroundColor: '#b8b8ba',
          padding: 2,
          elevation: 1,
        }, CardContainer: {
          borderRadius: 10,
          marginTop: 2,
          backgroundColor: '#d9d9d9',
          padding: 27,
          elevation: 1,
        }, textPageTitle: {
          color: 'red',
          fontSize: 20,
          fontWeight: 'bold',
        },
        ContainerLog: {
          padding: 10,
        },
        TextTitleLog: {
          padding: 1,
          paddingTop: 40,
          flex: 1,
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          color: 'red',
          borderRightWidth: 1
        },
        TextTitleMain: {
          marginLeft: 15,
          marginTop: 0,
          marginBottom: -10,
          fontSize: 15,
          fontWeight: 'bold'
        },
        ContainerLogDeskripsi: {
          flex: 5,
        },
        ContainerLogButton: {
          flex: 3
        },
        tombolBerhasil: {
          alignSelf: 'center',
          paddingHorizontal: 13,
          paddingVertical: 10,
          backgroundColor: '#24d015',
          borderRadius: 15,
          fontSize: 12,
          color: 'white',
          marginTop: 16,
        }, TextMin: {
          textAlign: 'center',
          marginTop: 14,
          fontSize: 16,
          fontWeight: 'bold'
        }, TextSelect: {
          color: 'white',
          marginHorizontal: 15,
          fontSize: 16,
        },
        formPicker: {
          flex: 3,
          marginRight: 20,
          backgroundColor: '#d9d9d9',
        },
        rowSearch: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 13
        },
      };
      setStylesSelection(newStyles);
    }

    const orientationChange = () => {
      const newWidth = Dimensions.get('window').width;
      const newHeight = Dimensions.get('window').height;
      if (newWidth > newHeight) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };

    Dimensions.addEventListener('change', orientationChange);

    // return () => {
    //   Dimensions.removeEventListener('change', orientationChange);
    // };
  }, []);

  const renderContent = () => {
    if (orientation === 'landscape') {
      return (
        <ScrollView>
          <TitleBarContent></TitleBarContent>
          <View style={[styles.row, { height: row1Height }]}>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow1, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textItem, { color: '#FFF' }]}>SETUP PROFILE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow1, marginLeft: 5, marginRight: 5, backgroundColor: '#24CF15', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textItem, { color: '#FFF' }]}>MULAI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow1, marginLeft: 5, marginRight: 5, backgroundColor: '#ff6708', justifyContent: 'center', alignItems: 'center' }]}>
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
                step={5}
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
                    step={5}
                    value={drum}
                    onValueChange={changeDrum}
                    minimumTrackTintColor="#51AE67"
                    maximumTrackTintColor="#51AE67"
                    thumbTintColor="#51AE67"
                  />
                  <Text style={styles.titleText}>Drum</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.valueText}>{air}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={5}
                    value={air}
                    onValueChange={changeAir}
                    minimumTrackTintColor="#6CB6D1"
                    maximumTrackTintColor="#6CB6D1"
                    thumbTintColor="#6CB6D1"
                  />
                  <Text style={styles.titleText}>Air</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.valueText}>{burner}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={5}
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
            <View style={[styles.cell, { width: cellSizeRow2_2, marginLeft: 5, marginRight: 5, backgroundColor: '#000', borderColor: '#fff' }]}>
              <VictoryChart
                theme={VictoryTheme.material}
                width={cellSizeRow2_2} height={row2Height}
                domain={{ y: [0, 1] }}
              >
                <VictoryAxis />
                {data.map((d, i) => (
                  <VictoryAxis dependentAxis
                    key={i}
                    offsetX={xOffsetsLandscape[i]}
                    style={{
                      axis: { stroke: 'white' },
                      ticks: { padding: tickPadding[i] },
                      tickLabels: { fill: 'white', textAnchor: anchors[i] }
                    }}
                    tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                    tickFormat={(t) => t * maxima[i]}
                  />
                ))}
                {data.map((d, i) => (
                  <VictoryLine
                    key={i}
                    data={d}
                    style={{ data: { stroke: colors[i] } }}
                    y={(datum) => datum.y / maxima[i]}
                  />
                ))}
              </VictoryChart>
              {/* <VictoryChart
                theme={VictoryTheme.material}
                width={cellSizeRow2_2} height={1000}
                domain={{ y: [0, 1] }}
              >
                <VictoryAxis />
                {data.map((d, i) => (
                  <VictoryAxis dependentAxis
                    key={i}
                    offsetX={xOffsets[i]}
                    style={{
                      axis: { stroke: 'white' },
                      ticks: { padding: tickPadding[i] },
                      tickLabels: { fill: 'white', textAnchor: anchors[i] }
                    }}
                    tickValues={[0.25, 0.5, 0.75, 1]}
                    tickFormat={(t) => t * maxima[i]}
                  />
                ))}
                {data.map((d, i) => (
                  <VictoryLine
                    key={i}
                    data={d}
                    style={{ data: { stroke: colors[i] } }}
                    y={(datum) => datum.y / maxima[i]}
                  />
                ))}
              </VictoryChart> */}
              {/* <LineChart
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
              /> */}
            </View>
            <View style={[styles.cell, { width: cellSizeRow2_3, marginLeft: 5, marginRight: 5, backgroundColor: 'white' }]}>
              <View style={[styles.innerColMonitor, { height: row2Height }]}>
                <View style={[styles.colMonitor, { borderColor: '#cc0f51', backgroundColor: '#cc0f51', }]}>
                  <Text style={[styles.textItem, { color: '#fff' }]}>BT: 00</Text>
                </View>
                <View style={[styles.colMonitor, { borderColor: '#147CB3', backgroundColor: '#147CB3', }]}>
                  <Text style={[styles.textItem, { color: '#fff' }]}>ET: 00</Text>
                </View>
                <View style={[styles.colMonitor, { borderColor: '#ff6708', backgroundColor: '#fff', }]}>
                  <Text style={[styles.textItem, { color: '#cc0f51' }]}>△BT: 00</Text>
                </View>
                <TouchableOpacity style={[styles.colMonitor, { borderColor: '#EA1F1F', backgroundColor: '#EA1F1F', }]}>
                  <Text style={[styles.textEvent, { color: '#FFF' }]}>IGNITER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.colMonitor, { borderColor: '#147CB3', backgroundColor: '#147CB3', }]}>
                  <Text style={[styles.textEvent, { color: '#FFF' }]}>COOLING</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.row, { height: row3Height }]}>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textEvent, { color: '#FFF' }]}>CHARGE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textEvent, { color: '#FFF' }]}>DRY END</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textEvent, { color: '#FFF' }]}>FC START</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textEvent, { color: '#FFF' }]}>FC END</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textEvent, { color: '#FFF' }]}>SC START</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, { width: cellSizeRow3, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.textEvent, { color: '#FFF' }]}>DROP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      const fontTitleMonitorSize = portraitCellSize1 * 0.08;
      const fontValueSliderSize = portraitCellSize1 * 0.09;
      const fontValueMonitorSize = portraitCellSize1 * 0.15;
      const fontEventSize = portraitCellSize1 * 0.10;
      const fontStatusSize = portraitCellSize1 * 0.08;
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <TitleBarContent></TitleBarContent>
          <View style={[stylesPortrait.row, { marginTop: 20 }]}>
            <View style={[stylesPortrait.cell, { width: portraitCellSize1, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, borderColor: '#FFF', backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]} >
              <Text style={[stylesPortrait.textTitleMonitor, { color: '#FFF', fontSize: fontTitleMonitorSize }]}>BT (C)</Text>
              <Text style={[stylesPortrait.textValueMonitor, { color: '#cc0f51', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>{bt}</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize1, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, borderColor: '#FFF', backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]} >
              <Text style={[stylesPortrait.textTitleMonitor, { color: '#FFF', fontSize: fontTitleMonitorSize }]}>ET (C)</Text>
              <Text style={[stylesPortrait.textValueMonitor, { color: '#147CB3', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>{et}</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize1, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, borderColor: '#FFF', backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]} >
              <Text style={[stylesPortrait.textTitleMonitor, { color: '#FFF', fontSize: fontTitleMonitorSize }]}>ROAST TIME</Text>
              <Text style={[stylesPortrait.textValueMonitor, { color: '#ffF', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>00:00</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize1, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, borderColor: '#FFF', backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]} >
              <Text style={[stylesPortrait.textTitleMonitor, { color: '#FFF', fontSize: fontTitleMonitorSize }]}>RoR (C/Min)</Text>
              <Text style={[stylesPortrait.textValueMonitor, { color: '#ff6708', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>{etInt}</Text>
            </View>
          </View>
          <View style={stylesPortrait.row}>
            <View style={[stylesPortrait.cell, { width: portraitCellSize2, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#24CF15', borderColor: '#24CF15' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>MULAI</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize2, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff6708', borderColor: '#ff6708' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>RESET</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize2, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EA1F1F', borderColor: '#EA1F1F' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>BERHENTI</Text>
            </View>
          </View>
          <View style={stylesPortrait.row}>
            <View style={[stylesPortrait.cell, { width: portraitCellSize3, height: portraitRowHeight3, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', borderColor: '#000' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontStatusSize }]}>Menunggu Koneksi Mesin ...</Text>
            </View>
          </View>
          <View style={stylesPortrait.row}>
            <View style={[stylesPortrait.cell, { width: portraitCellSize4, height: portraitRowHeight2, marginLeft: 5, marginRight: 5, }]} >
              <View style={[stylesPortrait.cell, { marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: -35, marginTop: 10, borderColor: '#000' }]}>
                <View style={[stylesPortrait.cell, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#000', marginHorizontal: 5 }]}>
                  <View style={[stylesPortrait.cell, { width: 12, height: 12, justifyContent: 'center', alignItems: 'center', borderColor: '#cc0f51', backgroundColor: '#cc0f51' }]} />
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize, marginLeft: 3 }]}>BT</Text>
                </View>
                <View style={[stylesPortrait.cell, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#000', marginHorizontal: 5 }]}>
                  <View style={[stylesPortrait.cell, { width: 12, height: 12, justifyContent: 'center', alignItems: 'center', borderColor: '#147CB3', backgroundColor: '#147CB3' }]} />
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize, marginLeft: 3 }]}>ET</Text>
                </View>
                <View style={[stylesPortrait.cell, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#000', marginHorizontal: 5 }]}>
                  <View style={[stylesPortrait.cell, { width: 12, height: 12, justifyContent: 'center', alignItems: 'center', borderColor: '#ff6708', backgroundColor: '#ff6708' }]} />
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize, marginLeft: 3 }]}>RoR</Text>
                </View>
                <View style={[stylesPortrait.cell, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#000', marginHorizontal: 5 }]}>
                  <View style={[stylesPortrait.cell, { width: 12, height: 12, justifyContent: 'center', alignItems: 'center', borderColor: '#FF0000', backgroundColor: '#FF0000' }]} />
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize, marginLeft: 3 }]}>Burner</Text>
                </View>
                <View style={[stylesPortrait.cell, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#000', marginHorizontal: 5 }]}>
                  <View style={[stylesPortrait.cell, { width: 12, height: 12, justifyContent: 'center', alignItems: 'center', borderColor: '#6CB6D1', backgroundColor: '#6CB6D1' }]} />
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize, marginLeft: 3 }]}>Air</Text>
                </View>
              </View>
              <VictoryChart
                theme={VictoryTheme.material}
                width={portraitCellSize4} height={portraitRowHeight2 + 20}
                domain={{ y: [0, 1] }}
              >
                <VictoryAxis />
                <VictoryAxis dependentAxis
                  key={0}
                  offsetX={xOffsetsPortrait[0]}
                  style={{
                    axis: { stroke: 'white' },
                    ticks: { padding: tickPadding[0] },
                    tickLabels: { fill: 'white', textAnchor: anchors[0] }
                  }}
                  tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                  tickFormat={(t) => t * maxima[0]}
                />
                <VictoryAxis dependentAxis
                  key={1}
                  offsetX={xOffsetsPortrait[1]}
                  style={{
                    axis: { stroke: 'white' },
                    ticks: { padding: tickPadding[1] },
                    tickLabels: { fill: 'white', textAnchor: anchors[1] }
                  }}
                  tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                  tickFormat={(t) => t * maxima[1]}
                />

                <VictoryLine
                  key={0}
                  data={dataChart[0]}
                  style={{ data: { stroke: colors[0] } }}
                  y={(datum) => datum.y / maxima[0]}
                />
                <VictoryLine
                  key={0}
                  data={dataChart[1]}
                  style={{ data: { stroke: colors[1] } }}
                  y={(datum) => datum.y / maxima[0]}
                />
                <VictoryLine
                  key={0}
                  data={dataChart[2]}
                  style={{ data: { stroke: colors[2] } }}
                  y={(datum) => datum.y / maxima[0]}
                />
                {/* <VictoryLine
                  key={0}
                  data={data[2]}
                  style={{ data: { stroke: colors[2] } }}
                  y={(datum) => datum.y / maxima[1]}
                /> */}
                {/* {data.map((d, i) => (
                  <VictoryLine
                    key={i}
                    data={d}
                    style={{ data: { stroke: colors[i] } }}
                    y={(datum) => datum.y / maxima[i]}
                  />
                ))} */}
              </VictoryChart>
            </View>
          </View>
          <View style={stylesPortrait.row}>
            <View style={[stylesPortrait.cell, { width: portraitCellSize5, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#666262', borderColor: '#666262' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>CHG</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize5, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#666262', borderColor: '#666262' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>DRY</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize5, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#666262', borderColor: '#666262' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>FC S</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize5, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#666262', borderColor: '#666262' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>FC E</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize5, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#666262', borderColor: '#666262' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>SC</Text>
            </View>
            <View style={[stylesPortrait.cell, { width: portraitCellSize5, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#666262', borderColor: '#666262' }]} >
              <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>DROP</Text>
            </View>
          </View>
          <ScrollView>
            <View style={stylesPortrait.row}>
              <View style={[stylesPortrait.cell, { width: portraitCellSize4, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }]} >
                <Text style={stylesPortrait.titleText}>SV       </Text>
                <Slider
                  style={stylesPortrait.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                  value={sv}
                  onValueChange={changeSv}
                  minimumTrackTintColor="#FF0000"
                  maximumTrackTintColor="#FF0000"
                  thumbTintColor="#FF0000"
                />
                <View style={[stylesPortrait.cell, { width: '10%', justifyContent: 'center', alignItems: 'center', borderColor: '#000' }]}>
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize }]}>{sv}</Text>
                </View>
              </View>
            </View>
            <View style={stylesPortrait.row}>
              <View style={[stylesPortrait.cell, { width: portraitCellSize4, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }]} >
                <Text style={stylesPortrait.titleText}>Burner</Text>
                <Slider
                  style={stylesPortrait.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                  value={burner}
                  onValueChange={changeBurner}
                  minimumTrackTintColor="#FF0000"
                  maximumTrackTintColor="#FF0000"
                  thumbTintColor="#FF0000"
                />
                <View style={[stylesPortrait.cell, { width: '10%', justifyContent: 'center', alignItems: 'center', borderColor: '#000' }]}>
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize }]}>{burner}</Text>
                </View>
              </View>
            </View>
            <View style={stylesPortrait.row}>
              <View style={[stylesPortrait.cell, { width: portraitCellSize4, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }]} >
                <Text style={stylesPortrait.titleText}>Air       </Text>
                <Slider
                  style={stylesPortrait.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                  value={air}
                  onValueChange={changeAir}
                  minimumTrackTintColor="#6CB6D1"
                  maximumTrackTintColor="#6CB6D1"
                  thumbTintColor="#6CB6D1"
                />
                <View style={[stylesPortrait.cell, { width: '10%', justifyContent: 'center', alignItems: 'center', borderColor: '#000' }]}>
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize }]}>{air}</Text>
                </View>
              </View>
            </View>
            <View style={stylesPortrait.row}>
              <View style={[stylesPortrait.cell, { width: portraitCellSize4, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }]} >
                <Text style={stylesPortrait.titleText}>Drum   </Text>
                <Slider
                  style={stylesPortrait.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                  value={drum}
                  onValueChange={changeDrum}
                  minimumTrackTintColor="#51AE67"
                  maximumTrackTintColor="#51AE67"
                  thumbTintColor="#51AE67"
                />
                <View style={[stylesPortrait.cell, { width: '10%', justifyContent: 'center', alignItems: 'center', borderColor: '#000' }]}>
                  <Text style={[stylesPortrait.valueText, { fontSize: fontValueSliderSize }]}>{drum}</Text>
                </View>
              </View>
            </View>
            <View style={stylesPortrait.row}>
              <View style={[stylesPortrait.cell, { width: portraitCellSize7, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }]} >
                <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontWeight: 'bold', color: '#fff', fontSize: fontEventSize, marginBottom: 0 }]}>IGINITER</Text>
                <Switch
                  // key={data.lampu_id}
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={igniter ? "#EA1F1F" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchIgniter}
                  value={igniter}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginBottom: -10 }}
                // thumbStyle={stylesPortrait.smallThumb} // Menggunakan properti thumbStyle
                />
              </View>
              <View style={[stylesPortrait.cell, { width: portraitCellSize7, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }]} >
                <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontWeight: 'bold', color: '#fff', fontSize: fontEventSize, marginBottom: 0 }]}>COOLING</Text>
                <Switch
                  // key={data.lampu_id}
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={cooling ? "#6CB6D1" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchCooling}
                  value={cooling}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginBottom: -10 }}
                // thumbStyle={stylesPortrait.smallThumb} // Menggunakan properti thumbStyle
                />
              </View>
              <View style={[stylesPortrait.cell, { width: portraitCellSize7, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }]} >
                <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontWeight: 'bold', color: '#fff', fontSize: fontEventSize, marginBottom: 0 }]}>AGITATOR</Text>
                <Switch
                  // key={data.lampu_id}
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={agitator ? "#6CB6D1" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchAgitator}
                  value={agitator}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginBottom: -10 }}
                // thumbStyle={stylesPortrait.smallThumb} // Menggunakan properti thumbStyle
                />
              </View>
              <View style={[stylesPortrait.cell, { width: portraitCellSize7, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }]} >
                <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontWeight: 'bold', color: '#fff', fontSize: fontEventSize, marginBottom: 0 }]}>LAMP</Text>
                <Switch
                  // key={data.lampu_id}
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={lamp ? "#6CB6D1" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchLamp}
                  value={lamp}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginBottom: -10 }}
                // thumbStyle={stylesPortrait.smallThumb} // Menggunakan properti thumbStyle
                />
              </View>
              <View style={[stylesPortrait.cell, { width: portraitCellSize7, height: portraitRowHeight4, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }]} >
                <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontWeight: 'bold', color: '#fff', fontSize: fontEventSize, marginBottom: 0 }]}>AUTO</Text>
                <Switch
                  // key={data.lampu_id}
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={auto ? "#6CB6D1" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchAuto}
                  value={auto}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginBottom: -10 }}
                // thumbStyle={stylesPortrait.smallThumb} // Menggunakan properti thumbStyle
                />
              </View>
              {/* <View style={[stylesPortrait.cell, { width: portraitCellSize6, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]} >
                <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontWeight: 'bold', color: '#fff' }]}>COOLING</Text>
                <Switch
                  // key={data.lampu_id}
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={cooling ? "#6CB6D1" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchCooling}
                  value={cooling}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                // thumbStyle={stylesPortrait.smallThumb} // Menggunakan properti thumbStyle
                />
              </View> */}
            </View>
            <View style={stylesPortrait.row}>
              <View style={[stylesPortrait.cell, { width: portraitCellSize4, height: portraitRowHeight1, marginLeft: 5, marginRight: 5, backgroundColor: '#666262', borderColor: '#666262', justifyContent: 'center', alignItems: 'center' }]} >
                <Text style={[stylesPortrait.textValueMonitor, { color: '#fff', fontSize: fontValueMonitorSize, fontWeight: 'bold' }]}>SETUP PROFILE</Text>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
};

const stylesPortrait = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  cell: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8
  },
  valueText: {
    color: '#fff',
    fontWeight: 'bold',
    // marginHorizontal: 10
    // marginLeft: -10,
    // flex: 1,
    // fontSize: 10,
    // transform: [{ rotate: '90deg' }]
  },
  slider: {
    width: '80%',
    height: '80%',
    // marginLeft: -15,
    // transform: [{ rotate: '-90deg' }]
    // marginVertical:10
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold'
    // marginLeft: -10,
    // flex: 1,
    // fontSize: 10,
    // marginStart: 10,
    // transform: [{ rotate: '90deg' }]
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: Dimensions.get('window').width > 400 ? 24 : 18,
//   },
// });
