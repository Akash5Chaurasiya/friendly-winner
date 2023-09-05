import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native'; // Import useRoute from react-navigation

const CurrentSlipsCard = () => {
    // Access the route parameters
    const route = useRoute();

    // Get the data from route.params
    const { name, fieldname, passcode, time, entity, status } = route.params;
    console.log('valllllue', name, fieldname, passcode, time, entity, status)
    return (
        <View>
            <View key={name} style={styles.card}>
                <Text style={styles.cardTitle}>{name}</Text>
                <View style={styles.cardContent}>
                    <View style={styles.leftColumn}>
                        <Text>{fieldname}</Text>
                        <Text>{passcode}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text>{time}</Text>
                        <Text>{entity}</Text>
                        <Text>{status}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CurrentSlipsCard;

const styles = StyleSheet.create({
    card: {
        marginLeft: '5%',
        marginRight: '5%',
        borderWidth: 0.1,
        borderColor: '#ccc',
        borderRadius: 2,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
    },
    entityRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
