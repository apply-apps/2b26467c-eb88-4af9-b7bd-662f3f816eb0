// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Image, View } from 'react-native';

const images = [
    { id: '1', width: 200, height: 200 },
    { id: '2', width: 200, height: 200 },
    { id: '3', width: 200, height: 200 },
    { id: '4', width: 200, height: 200 },
    { id: '5', width: 200, height: 200 },
];

const ImageList = () => {
    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: `https://picsum.photos/${item.width}/${item.height}?random=${item.id}` }}
                style={styles.image}
            />
        </View>
    );

    return (
        <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
        />
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Picsum Photos</Text>
            <ImageList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: 20, // Ensures content does not overlap with the status bar
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        alignItems: 'center',
    },
    imageContainer: {
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});