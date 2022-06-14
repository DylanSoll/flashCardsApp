import React from 'react';
import 'react-native-gesture-handler';

//NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
//Custom Components
import { CustomDrawer} from './components/navigation/drawer'

import ManageTopics from './components/screens/manageTopics';
import FlashCardsScreen from './components/screens/flashCards';
import Settings from './components/screens/settings'
//const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

navigationScreenOptions={
  headerShown: true,
  headerStyle: {
    backgroundColor: '#000000',
    borderBottomWidth: '0',
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerTitleStyle: {
    color: 'white'
  },
  drawerActiveBackgroundColor: '#0f0082',
  drawerActiveTintColor: '#fff',
  drawerInactiveTintColor: '#fff',
  drawerLabelStyle: {
    fontSize: 15,
  },
}

export default function App(){
  return (
    <NavigationContainer>
      
      <Drawer.Navigator  drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={navigationScreenOptions} initialRouteName="Topics"> 
        <Drawer.Screen name="Topics" component={ManageTopics} />
        <Drawer.Screen name="Flash Cards" component={FlashCardsScreen} />
        <Drawer.Screen name = "Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
    
    
  );
}

/*<Tab.Navigator tabBar={(props) => <MyTabBar {...props} initialRouteName = "Login"/>}>
        <Tab.Screen name = "Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />   
       </Tab.Navigator>*/