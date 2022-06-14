import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';

export default function FlashCard(props){
  const [currentlyShowing, updateCurrentlyShowing] = React.useState(props.questionData);
  return (
    <TouchableWithoutFeedback onPress={()=>{
      if (currentlyShowing.type === 'Question'){
        updateCurrentlyShowing(props.answerData);
      }else{
        updateCurrentlyShowing(props.questionData);
      }
    }}>
    <View style={styles.flashCard}>
      <Text style={{textAlign: 'center', fontSize: 30, color: 'white'}}>{currentlyShowing.type}</Text>
      <View style= {{ justifyContent: 'center', alignItems: 'center', 'flex':1}}>
        <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>{currentlyShowing.text}</Text>

      </View>
    </View>
    </TouchableWithoutFeedback>
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

