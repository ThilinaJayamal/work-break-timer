import React from 'react'
import { Link, Stack } from 'expo-router'
import { Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import TimerContextProvider from '../context/TimerContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RootLayout = () => {
    return (
        <>
            <TimerContextProvider>

                {/** Expo-Router stack navigation used to navigate*/}
                <Stack>
                    <Stack.Screen name='index'
                        options={{
                            title: "Home",
                            headerRight: () => (
                                <Link href="/settings" asChild>
                                    <Pressable
                                        hitSlop={20}
                                        style={{ paddingHorizontal: 10 }}
                                    >
                                        <MaterialIcons name="settings-suggest" size={30} color={"black"} />
                                    </Pressable>
                                </Link>
                            )
                        }} />
                    <Stack.Screen name='add' options={{ title: "Add" }} />
                    <Stack.Screen name='edit/[id]' options={{ title: "Edit" }} />
                    <Stack.Screen name='timer/[target]' options={{ title: "Timer" }} />
                    <Stack.Screen name='settings' options={{ title: "Settings" }} />
                </Stack>

            </TimerContextProvider>

            <StatusBar style={"dark"} />
        </>

    )
}

export default RootLayout