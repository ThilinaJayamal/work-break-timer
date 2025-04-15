import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import { timeCalculate } from '../utils/timeCalculate';

const TimerCard = ({ title, totalSeconds }) => {

    // get the time from total seconds
    const [h, m, s] = timeCalculate(totalSeconds);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="alarm-outline" size={20} color="dimgray" />
                <Text style={styles.title}>{title}</Text>
            </View>

            <Text style={styles.time}>{h + ":" + m + ":" + s}</Text>

            <Link href={`/timer/${totalSeconds}`} asChild>
                <Pressable style={styles.button}>
                    <FontAwesome6 name="play-circle" size={18} color="#fff" />
                    <Text style={styles.buttonText}>start</Text>
                </Pressable>
            </Link>

            <View style={{ position: 'absolute', right: 10, top: 10 }}>
                <FontAwesome5 name="edit" size={24} color="black" />
            </View>

        </View>
    )
}

export default TimerCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        width: '100%',
        gap: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        color: 'dimgray'
    },
    time: {
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'royalblue',
        padding: 10,
        borderRadius: 30,
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'semibold'
    }
})