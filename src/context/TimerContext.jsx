import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimeContext = createContext();

const TimerContextProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);
    const [selectedSound, setSelectedSound] = useState('beep'); // default sound

    useEffect(() => {
        const loadTimers = async () => {
            try {
                const stored = await AsyncStorage.getItem('reminders');
                if (stored) {
                    setTimers(JSON.parse(stored));
                }
            } catch (err) {
                console.error('Failed to load timers:', err);
            }
        };

        loadTimers();
    }, []);

    const updateTimer = async (updatedTimer) => {
        try {
            const updatedList = timers.map(timer =>
                timer.id === updatedTimer.id ? updatedTimer : timer
            );
            setTimers(updatedList);
            await AsyncStorage.setItem('reminders', JSON.stringify(updatedList));
        } catch (err) {
            console.error('Failed to update timer:', err);
        }
    };

    const deleteTimer = async (id) => {
        try {
            const filtered = timers.filter(timer => timer.id !== id);
            setTimers(filtered);
            await AsyncStorage.setItem('reminders', JSON.stringify(filtered));
        } catch (err) {
            console.error('Failed to delete timer:', err);
        }
    };

    const addTimer = async (newTimer) => {
        try {
            const stored = await AsyncStorage.getItem('reminders');
            const parsed = stored ? JSON.parse(stored) : [];
            const updatedList = [...parsed, newTimer];
            await AsyncStorage.setItem('reminders', JSON.stringify(updatedList));
            setTimers(updatedList);
        } catch (err) {
            console.error('Failed to add timer:', err);
        }
    };
    

    return (
        <TimeContext.Provider value={{ timers, 
        setTimers, 
        updateTimer, 
        deleteTimer,
        addTimer,
        selectedSound, 
        setSelectedSound
         }}>
            {children}
        </TimeContext.Provider>
    );
};

export default TimerContextProvider;
