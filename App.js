import * as React from 'react';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar,StyleSheet,Button, Text,TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import 'react-native-gesture-handler';

// Page
import {Beranda} from './app/beranda/beranda';
import { Login } from './app/login/login';
import { LupaPassword } from './app/login/lupaPassword';
import { Roasting } from './app/roasting/roasting';
import Setting from './app/setting/setting';
import Log from './app/log/log';
import { Profile } from './app/profile/profile';

function MenuD() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Beranda') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if(route.name === 'CreatePost'){
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        
      })}
      activeColor="#FF0000"
      barStyle={{ backgroundColor: '#000' }}
    >
       
      <Tab.Screen 
        name="Home" 
        component={Beranda} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={ color } />
          ),
        }}
      />
      <Tab.Screen 
      name="Roasting" 
      component={Roasting}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="toaster-oven" size={24} color={ color } />
          ),
        }}
       />
      <Tab.Screen 
      name="Log" 
      component={Log}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="note-edit-outline" size={24} color={ color } />
          ),
        }}
       />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="setting" size={24} color={ color } />
            ),
          }}
        />
      <Tab.Screen 
      name="Profile" 
      component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <AntDesign name="user" size={24} color={ color } />
        ),
      }}
       />
    </Tab.Navigator>
  );
}

// End Page
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export default function App() {
  const theme = useTheme();
  StatusBar.setHidden(true);
  theme.colors.secondaryContainer = "transperent"
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Log" component={Log} options={{ headerShown: false }} />
        <Stack.Screen name="LupaPassword" component={LupaPassword} options={{ headerShown: false }} />
         <Stack.Screen name="MenuD" component={MenuD} options={{ headerShown: false }} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButton:{
    margin:7,
    alignItems: 'left',
  },
  containerSetting: {
    flex: 1,
    paddingTop:40,
  },
  navigationTop:{
    marginTop:25,
  }
});
