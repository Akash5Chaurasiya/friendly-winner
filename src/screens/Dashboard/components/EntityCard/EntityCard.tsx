import { ImageIndex } from "../../../../assets/AssetIndex";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export interface RIEntityCard {
    id: number,
    title: string,
    userId: number

}

export namespace PIEntityCard { }

export default function EntityCard(props: RIEntityCard) {
    const { id, title, userId } = props;
    const truncateTitle = (text: string, numWords: number): any => {
        const words = text.split(' ');
        const truncatedWords = words.slice(0, numWords);
        return truncatedWords.join(' ');
    };
    const truncatedTitle = truncateTitle(title, 3);

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-between' }}>

                <Text style={styles.heading}>
                    #{id}
                </Text>
                <Text style={{ ...styles.heading, marginLeft: 12 }}>{truncatedTitle}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={styles.heading}>{userId}</Text>
                    <Image source={ImageIndex.msg} style={styles.image} />
                </View>


            </View>
            <View>
                <Text style={{ ...styles.heading, color: '#666666' }}>{id}Items</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // flexDirection: 'row',
        columnGap: 16,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    image: {
        width: 20,
        height: 20,
        marginLeft: 4

    },
    heading: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        flexGrow: 1,
        color: '#2E2E2E',
        fontWeight: '500',
    },

});
