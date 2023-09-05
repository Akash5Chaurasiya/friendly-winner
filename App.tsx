import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import AuthGuard from './src/auth/AuthGuard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from './src/screens/Dashboard/Dashboard'
import FlashMessage from 'react-native-flash-message'
import Camera from './src/components/Camera/Camera'
import ChildListing from './src/screens/ChildListing/ChildListing'
import CurrentSlips from './src/screens/CurrentSlips/CurrentSlips'
import Logs from './src/screens/Logs/Logs'
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlashMessage position="top" />
      <NavigationContainer>
        <AuthGuard>
          <Stack.Navigator initialRouteName="dashboard">
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="dashboard"
              component={Dashboard}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Camera"
              component={Camera}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="childListing"
              component={ChildListing}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="CurrentSlips"
              component={CurrentSlips}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Logs"
              component={Logs}
            />

          </Stack.Navigator>
        </AuthGuard>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})