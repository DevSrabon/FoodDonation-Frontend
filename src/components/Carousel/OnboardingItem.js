import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.title} >{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    )
}

export default OnboardingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        color: "red",
        textAlign: 'center',
    },
    description: {
        fontWeight: "800",
        color: "green",
        textAlign: 'center',
        paddingHorizontal:64,
    }
})