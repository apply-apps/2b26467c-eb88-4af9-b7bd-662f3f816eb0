// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: 'system', content: 'You are a creative writer who specializes in fairy tales.' },
                    { role: 'user', content: `Create a fairy tale with the hero ${hero}, villain ${villain}, and plot about ${plot}.` },
                ],
                model: 'gpt-4o'
            });
            const resultString = response.data.response;
            setStory(resultString);
        } catch (error) {
            console.error('Error generating story:', error);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hero"
                    value={hero}
                    onChangeText={setHero}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Villain"
                    value={villain}
                    onChangeText={setVillain}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Story" onPress={generateStory} />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    story ? <Text style={styles.story}>{story}</Text> : null
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20, // Ensures content does not overlap with the status bar
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    story: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
});