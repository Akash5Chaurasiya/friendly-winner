import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react'
import { ImageIndex } from '../../assets/AssetIndex';
import { useAuthContext } from '../../auth/AuthGuard';

export default function Navbar() {
    const [isModalVisible, setModalVisible] = useState(false);
    const auth = useAuthContext();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log('im clicked ');
    };
    return (
        <View >
            <View style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Image
                        style={styles.logoIcon}
                        resizeMode="cover"
                        source={ImageIndex.logo}
                    />
                    <View style={styles.companyNameWrapper}>
                        <Text style={styles.companyName}>Chawla Ispat</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ marginRight: 5 }}>
                        <Text>{auth.authData?.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                source={{
                                    uri: 'https://avatars.githubusercontent.com/u/94738352?v=4',
                                }}
                                style={styles.profilePicture}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <TouchableOpacity onPress={() => auth.actions.logout()}>
                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                <Text style={{ color: 'black' }}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        // backgroundColor: 'yellow',
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    logo: {
        height: 25,
        marginLeft: 2,
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: Dimensions.get('window').height * 0.04,
        height: Dimensions.get('window').height * 0.04,
    },
    companyNameWrapper: {
        paddingHorizontal: Dimensions.get('window').width * 0.02,
    },
    companyName: {
        fontSize: Dimensions.get('window').height * 0.025,
        color: '#283093',
        fontWeight: '500',
    },

    profilePicture: {
        width: Dimensions.get('window').height * 0.04,
        height: Dimensions.get('window').height * 0.04,
        borderRadius: Dimensions.get('window').height * 0.02,
    },
})