import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Dimensions,
     TouchableWithoutFeedback, Modal, FlatList} from 'react-native';

     import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FlashCardsScreen({navigation}){
    let allFlashCards = window.flashCards;
    if (allFlashCards === undefined){
        allFlashCards = [];
    }
    let toggleForwardAllowed = true;

    if (allFlashCards.length === 1){
        toggleForwardAllowed = false;
    }
    
    const [canToggleBack, changeToggleBackStatus] = React.useState(false);
    const [cancanToggleForward, changeCanToggleForwardStatus] = React.useState(toggleForwardAllowed);
    const [currentFlashCardPostion, updateCurrentFlashCardPostion] = React.useState(0);
    const [currentFlashCard, updateCurrentFlashCard] = React.useState(allFlashCards[0]);
    const [currentlyShowingType, updateCurrentlyShowingType] = React.useState(currentFlashCard.questionData.type);
    const [currentlyShowingText, updateCurrentlyShowingText] = React.useState(currentFlashCard.questionData.text);
    const [allowNewCard, updateAllowNewCard] = React.useState(true)
    const [showEditing, updateShowEditings] = React.useState(true)
    const addNewCard = () => {
        alert('adding new card to here')
    }
    const [flashCardsInEditing, updateEditing] = React.useState(undefined)

    const updateTopicsFromMemory = async () => {
        try {
        const resultData = JSON.parse(await AsyncStorage.getItem(window.currentCards));
        const result = resultData.flashCards;
        
        if (result !== undefined){
            updateEditing(result)
        }else{
            updateEditing([])
        }
        
        return 
        } catch (error) {
        console.error(error)
        }
    };
    try{
        flashCardsInEditing.length;
        
    }catch{
        updateTopicsFromMemory();
        console.log('hitting')
    }

    const moveCardForward = () =>{
        if (allFlashCards.length === currentFlashCardPostion + 2){
            updateCurrentFlashCardPostion(currentFlashCardPostion + 1);
            changeCanToggleForwardStatus(false)
        }else{
            updateCurrentFlashCardPostion(currentFlashCardPostion + 1);
        }
        updateCurrentFlashCard(allFlashCards[currentFlashCardPostion + 1]);
        updateCurrentlyShowingType('Question');
        updateCurrentlyShowingText(allFlashCards[currentFlashCardPostion + 1].questionData.text);

        
        changeToggleBackStatus(true);
    }
    const moveCardBack = () =>{
        if (currentFlashCardPostion - 1 === 0){
            updateCurrentFlashCardPostion(currentFlashCardPostion - 1);
            changeToggleBackStatus(false)
        }else{
            updateCurrentFlashCardPostion(currentFlashCardPostion - 1);
        }
        updateCurrentFlashCard(allFlashCards[currentFlashCardPostion - 1]);
        updateCurrentlyShowingType('Question');
        updateCurrentlyShowingText(allFlashCards[currentFlashCardPostion - 1].questionData.text);
        changeCanToggleForwardStatus(true);
    }
    
    return (
        <SafeAreaView style={{backgroundColor:'black', height: '100%'}}>
            <Modal visible = {showEditing} >
                <SafeAreaView style={{backgroundColor: 'black', width: '100%', height: '100%'}}>
                    <View style = {{ flexDirection: 'row',justifyContent: 'center',width: '100%', marginBottom: 15}}>
                        <TouchableOpacity onPress={
                            ()=>{
                                //updateShowEditings(false)
                            }
                        }
                        style={{backgroundColor: 'green', borderRadius: 15, padding: 5, width: Dimensions.get('screen').width*.4}}>
                            <Text style={{textAlign:'center', color: 'white', fontSize: 25}}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                            ()=>{
                                updateShowEditings(false)
                            }
                        }
                        style={{backgroundColor: 'red', borderRadius: 15, padding: 5, width: Dimensions.get('screen').width*.4, marginLeft: Dimensions.get('screen').width*.1}}>
                            <Text style={{textAlign:'center', color: 'white', fontSize: 25}}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                <FlatList data = {flashCardsInEditing} extraData = {flashCardsInEditing} renderItem = {
                    ({item, index}) => {return (
                        
                        <View style={styles.flashCard}>
                            <Text style={{color:'white', textAlign: 'center', fontSize: 30}}>Question</Text>
                            <TextInput style={styles.input} multiline={true} placeholder="Question..." value={item.questionData.text}/>
                            <Text style={{color:'white', textAlign: 'center', fontSize: 30}}>Answer</Text>
                            <TextInput style={styles.input} multiline={true} placeholder="Answer..." value={item.answerData.text}/>
                        </View>
              
            )} }/>
                    <TouchableOpacity onPress={()=>{
                        let currentCardsInEditing = flashCardsInEditing;

                        currentCardsInEditing.push({
                            'questionData': {'type':'Questiom', 'text': ''}, 
                            'answerData': {'type':'Answer', 'text': ''}
                        });
                        console.log(flashCardsInEditing.length)
                        updateEditing(currentCardsInEditing);
                    }}
                    style={{backgroundColor: '#4d82ff', borderRadius: 15, padding: 5, width: '40%', alignSelf: 'center'}}
                    disabled={! allowNewCard}>
                        <Text style={{textAlign:'center', color: 'white', fontSize: 25}}>Add New</Text>
                    </TouchableOpacity>
                    
                </SafeAreaView>
                
        </Modal>
            <Text style={{color:'white', fontSize: 30, textAlign: 'center'}}>{window.currentCards}</Text>
            <View style={{alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Button title='<' disabled={! canToggleBack} onPress = {moveCardBack}/>
                <TouchableWithoutFeedback onPress={()=>{
                    if (currentlyShowingType === 'Question'){
                        updateCurrentlyShowingType('Answer');
                        updateCurrentlyShowingText(currentFlashCard.answerData.text)

                    }else{
                        updateCurrentlyShowingType('Question');
                        updateCurrentlyShowingText(currentFlashCard.questionData.text)
                    }

                    }}>
                    <View style={styles.flashCard}>
                    <Text style={{textAlign: 'center', fontSize: 30, color: 'white'}}>{currentlyShowingType}</Text>
                    <View style= {{ justifyContent: 'center', alignItems: 'center', 'flex':1}}>
                        <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>{currentlyShowingText}</Text>

                    </View>
                    </View>
                    </TouchableWithoutFeedback>
                <Button title='>' disabled= {! cancanToggleForward} onPress = {moveCardForward}/>
            </View>
            
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    flashCard: {
      alignSelf: 'center',
      backgroundColor: '#1E1E1E',
      width: Dimensions.get('screen').width * 0.8,
      minHeight: Dimensions.get('screen').height *0.3,
      maxHeight: Dimensions.get('screen').height *0.7,
      borderRadius: 25,
      padding: 10
    },
    input: {
        backgroundColor: 'grey', width: '90%', fontSize: 30, margin: 5, borderRadius: 10, padding: 3 
      },
  });
  
  
     