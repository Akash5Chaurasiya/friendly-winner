import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAuthContext } from '../../auth/AuthGuard';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getTodoSuccessAction, todoFailureAction, todoRequestAction } from '../../reducer/postReducer/action';
import axios from 'axios';
import useSWR from 'swr';
import { fetchTodos } from '../../reducer/postReducer/api';
import { ImageIndex } from '../../assets/AssetIndex';
import { showMessage } from 'react-native-flash-message';

const Dashboard = ({navigation}:any) => {
    const auth = useAuthContext();
    console.log(auth.authData);
    const dispatch = useDispatch();
    const { data: todos, error } = useSWR('todos', fetchTodos);
    useEffect(() => {
        if (error != undefined) {
            dispatch(todoFailureAction());
        } else if (todos) {
            dispatch(getTodoSuccessAction(todos));
        }
    }, [dispatch, todos, error]);

    const todo = useSelector((state: any) => state.todos);
    console.log("9936562451",todo);
    // const checkCameraPermission = async () => {
    //     let status = await Camera.getCameraPermissionStatus();
    //     if (status !== 'authorized') {
    //         await Camera.requestCameraPermission();
    //         status = await Camera.getCameraPermissionStatus();
    //         if (status === 'denied') {
    //             showMessage({
    //                 message: "You will not be able to scan if you do not allow camera access",
    //                 type: "success",
    //                 duration: 5000,
    //                 floating: true
    //             });
    //         }
    //     }
    // };
    // useEffect(() => {
    //     checkCameraPermission();
    // }, []);

    const handleLoginPress = () => {
        // Place your navigation or action logic here
        // For example, navigation.navigate('SomeScreen') or dispatch(someAction())
        navigation.navigate('Camera')
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Navbar />
            <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '10%', }}>
                    <View style={{ backgroundColor: '#ECEDFE', width: 150, height: 65, borderRadius: 5 }} >
                        <TouchableOpacity >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '13%' }}>
                                <View><Image style={{ width: 30, height: 20 }} source={ImageIndex.emp} /></View>
                                <View><Text style={{ color: '#283093' }} >Employees</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#ECEDFE', width: 150, height: 65, borderRadius: 5 }} >
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '12%' }}>
                                <View><Image style={{ width: 30, height: 30 }} source={ImageIndex.gear} /></View>
                                <View><Text style={{ color: '#283093' }}>Machines</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <FlatList
                    data={todo}
                    renderItem={e => <View><Text>{e.item.title}</Text></View>}
                />
                <TouchableOpacity style={styles.loginButton} onPress={() => handleLoginPress()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: 18, height: 18 }} source={ImageIndex.scan} />
                        <Text style={styles.buttonText}>Scan Slip</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: '#283093',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        borderRadius: 14,
        marginTop: '130%',
        width: 136,
        position: 'absolute',
        marginLeft: '55%',
    },
    buttonText: {
        color: 'white',
        paddingLeft: 10,
    },
});
