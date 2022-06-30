import React from 'react'
import { SafeAreaView,  Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings(){
  const clearSettings = async () => {
    try{
        await AsyncStorage.clear()
    }catch(error){
        error
    }
   
  }
  return (
    <SafeAreaView style={{
      alignItems: 'center', // Centered horizontally
      flex:1,
      backgroundColor: 'black'
    }}>
      <Text style={{color:'white', fontSize: 25}}>SETTINGS</Text>
        <Button title='Clear All Data' onPress={clearSettings} />
    </SafeAreaView>
  );
}

