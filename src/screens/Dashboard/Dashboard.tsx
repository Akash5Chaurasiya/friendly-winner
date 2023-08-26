import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../auth/AuthGuard';

const Dashboard = () => {
    console.log("akash");
    const auth=useAuthContext()
    console.log(auth.authData?.name);
    return ( 
        <View>
            <Text>{auth.authData?.name}</Text>
            <TouchableOpacity onPress={()=>auth.actions.logout()}>
                <Text style={{color:"black"}}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})