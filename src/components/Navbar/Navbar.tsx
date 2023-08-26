import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,

} from 'react-native';
import React from 'react'

export default function Navbar() {
    return (
        <View >
            <View style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Image
                        style={styles.logoIcon}
                        resizeMode="cover"
                        source={require('../../assets/companylogo.png')}
                    />
                    <View style={styles.companyNameWrapper}>
                        <Text style={styles.companyName}>Chawla Ispat</Text>
                    </View>
                </View>
                <Image
                    source={{
                        uri: 'https://avatars.githubusercontent.com/u/94738352?v=4',
                    }}
                    style={styles.profilePicture}
                />
            </View>
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