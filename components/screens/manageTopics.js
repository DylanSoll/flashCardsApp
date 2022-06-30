import React from 'react'
import { StyleSheet, Text, View, Modal, SafeAreaView, FlatList, Keyboard, KeyboardAvoidingView,
  TextInput, Button, Dimensions, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//<Drawer.Screen name="Flash Cards" component={FlashCardsScreen} />
export default function ManageTopics({navigation}){
  
  const [currentFlashCardData, updateCurrentFlashCardData] = React.useState(undefined)
  const [showNewTopic, updateTopic] = React.useState(false);
  const [newTopicName, updateNewTopicName] = React.useState('');
  const [newTopicDescription, updateNewTopicDescription] = React.useState('');
  const [validName, updateValidName] = React.useState('grey');
  const [canCreate, updateCanCreate] = React.useState(false);

  const updateTopicsFromMemory = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      if (result === []){
        updateCurrentFlashCardData([]);
      }else{
        const mappedData = result.map(data =>{
          return JSON.parse(data[1])
        })
        updateCurrentFlashCardData(mappedData)
      }
      
      return 
    } catch (error) {
      console.error(error)
    }
  };

  try{
    currentFlashCardData.length
  }catch{
    updateTopicsFromMemory()
  }
  const validateCreation = async (topic, description) => {
    if (topic === ""){
      updateValidName('grey')
    }else{
      try {
        const value = await AsyncStorage.getItem(topic)
        updateCanCreate(false)
        if(value !== null) {
          updateValidName('red')
        }else{
          updateValidName('green')
          if (description !== ""){
            updateCanCreate(true)
          }
        }
      } catch(e) {
        console.log('error')
      }
    }
    
  }
  const createTopic = async () => {
    try {
      const key = newTopicName
      const value = {'topic': newTopicName, 'description': newTopicDescription, 'flashCards': []}
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <SafeAreaView style={{
      alignItems: 'center', // Centered horizontally
      flex:1,
      backgroundColor: 'black'
    }}>
        
        <Modal visible = {showNewTopic} >
          <TouchableWithoutFeedback  onPress = {Keyboard.dismiss}>

          
          <View animationType="slide" style={{
              justifyContent: 'center', //Centered vertically
              alignItems: 'center', // Centered horizontally
              flex:1,
            backgroundColor: 'black'
            }}>
            <TextInput onChangeText = {(text) => {
              updateNewTopicName(text);
              validateCreation(text, newTopicDescription)
            }} style={[styles.input, {fontSize:30, backgroundColor: validName}]} placeholder="Title..."/>
            <TextInput onChangeText = {(text) => {
              updateNewTopicDescription(text);
              validateCreation(newTopicName, text);
              if (text === ""){
                updateCanCreate(false)
              }
            }} style={[styles.input, {fontSize:20}]} placeholder="Description..." multiline={true}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Button title = "Cancel" onPress = {()=>{updateTopic(false)}}/>
              <Button title = "Create" onPress = {()=>{
                createTopic();
                updateTopicsFromMemory();
                updateTopic(false);
                
                }} disabled={! canCreate}/>
            </View>
            
          </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Button title = {"New Topic"} onPress = {()=>{updateTopic(true)}} />
          <FlatList data = {currentFlashCardData} extraData = {currentFlashCardData} renderItem = {
            ({item, index}) => {return (
              <TouchableWithoutFeedback onPress = {()=>{
                  window.currentCards = item.topic;

                  window.flashCards = []//item.flashCards;
                  
                  navigation.navigate('Flash Cards')
                }}>
              <View style={{backgroundColor: '#2e2e2e', marginBottom: 15,
              paddingTop: 10,borderRadius: 15, width: Dimensions.get('window').width * 0.7}}
              >
                <Text style={{color:'white', textAlign: 'center', fontSize: 30}}>{item.topic}</Text>
                <Text style={{color:'white', textAlign: 'center', fontSize: 20}}>{item.description}</Text>
                <Text style={{color:'white', textAlign: 'center', fontSize: 20}}>{item.flashCards.length} Flash Cards</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Button title='Delete' onPress={()=>{alert('Deleting')}}/>
                </View>
              </View>
              </TouchableWithoutFeedback>
              
            )} }/>
          
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  input: {
    backgroundColor: 'grey', width: '90%', fontSize: 30, margin: 5, borderRadius: 10, padding: 3 
  },
});

          