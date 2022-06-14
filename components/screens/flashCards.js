import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Dimensions, TouchableWithoutFeedback} from 'react-native';
import FlashCard from '../custom/flashCard'

export default function FlashCardsScreen(){
    const allFlashCards = [
        {'questionData':
            {'type':'Question', 'text': 'firstQuestion'},
        'answerData':
        {'type':'Answer', 'text': 'First Answer'}},
        {'questionData':
            {'type':'Question', 'text': 'Second Question'},
        'answerData':
        {'type':'Answer', 'text': 'Second Answer'}},
        {'questionData':
            {'type':'Question', 'text': 'Third Question'},
        'answerData':
        {'type':'Answer', 'text': 'Third Answer'}}
];
    let toggleForwardAllowed = true;

    if (allFlashCards.length === 0){
        toggleForwardAllowed = false;
    }
    

    const [canToggleBack, changeToggleBackStatus] = React.useState(false);
    const [cancanToggleForward, changeCanToggleForwardStatus] = React.useState(toggleForwardAllowed);
    const [currentFlashCardPostion, updateCurrentFlashCardPostion] = React.useState(0);
    const [currentFlashCard, updateCurrentFlashCard] = React.useState(allFlashCards[0]);
    const [currentlyShowingType, updateCurrentlyShowingType] = React.useState(currentFlashCard.questionData.type);
    const [currentlyShowingText, updateCurrentlyShowingText] = React.useState(currentFlashCard.questionData.text);


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
            <Text style={{color:'white', fontSize: 30, textAlign: 'center'}}>Insert Code To Make Topic Appear Here</Text>
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
    }
  });
  
  