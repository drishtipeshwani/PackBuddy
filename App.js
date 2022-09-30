import React from 'react';
import { StatusBar, StyleSheet, View,Text } from 'react-native';
import {Amplify} from '@aws-amplify/core';
import awsconfig from './src/aws-exports';
import Home from './src/components/Home';
import Activities from './src/components/Activities';
import Dashboard from './src/components/Dashboard';
import List from './src/components/List';
import PlacesList from './src/components/PlacesList';
import SavedList from './src/components/SavedList';
import { NativeBaseProvider, Box, Center } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

Amplify.configure(awsconfig);


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
    <NativeBaseProvider>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="SavedList" component={SavedList} />
      <Stack.Screen name="PlacesList" component={PlacesList} />
    </Stack.Navigator>
    </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;