import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import uuid from 'react-native-uuid';
import { TimeContext } from '../context/TimerContext';

const AdReminder = () => {
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    const { addTimer } = useContext(TimeContext);

    const handleSubmit = async () => {
        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;
        const s = parseInt(seconds) || 0;

        // validation
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }

        //calculate total seconds
        const totalSeconds = h * 3600 + m * 60 + s;

        if (totalSeconds <= 0) {
            Alert.alert('Error', 'Time must be greater than 0');
            return;
        }

        const newReminder = {
            id: uuid.v4(), // asign unique Id for every timer
            title: title.trim(),
            totalSeconds
        };

        await addTimer(newReminder);

        Alert.alert('Reminder saved successfully!', `Title: ${newReminder.title}\nTime: ${h}h ${m}m ${s}s`);

        // Reset fields
        setTitle('');
        setHours('');
        setMinutes('');
        setSeconds('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Set a Reminder</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
                placeholder="Reminder title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />

            <Text style={styles.label}>Time (HH:MM:SS)</Text>
            <View style={styles.timeContainer}>
                <TextInput
                    placeholder="HH"
                    value={hours}
                    onChangeText={(val) => {
                        const num = parseInt(val) || 0;
                        setHours(num > 24 ? '24' : num.toString());
                    }}
                    keyboardType="numeric"
                    style={styles.timeInput}
                />
                <TextInput
                    placeholder="MM"
                    value={minutes}
                    onChangeText={(val) => {
                        const num = parseInt(val) || 0;
                        setMinutes(num > 59 ? '59' : num.toString());
                    }}
                    keyboardType="numeric"
                    style={styles.timeInput}
                />
                <TextInput
                    placeholder="SS"
                    value={seconds}
                    onChangeText={(val) => {
                        const num = parseInt(val) || 0;
                        setSeconds(num > 59 ? '59' : num.toString());
                    }}
                    keyboardType="numeric"
                    style={styles.timeInput}
                />
            </View>

            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>ADD</Text>
            </Pressable>
        </View>
    );
};

export default AdReminder;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        gap: 10,
    },
    timeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
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
        fontWeight: '600'
    }
});

