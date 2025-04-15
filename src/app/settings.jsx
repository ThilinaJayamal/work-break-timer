import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { TimeContext } from '../context/TimerContext';

const ringtones = ['beep', 'alarm', 'ding'];

const Settings = () => {
  const { selectedSound, setSelectedSound } = useContext(TimeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Ringtone</Text>
      {ringtones.map((tone) => (
        <Pressable
          key={tone}
          style={[
            styles.button,
            selectedSound === tone && { backgroundColor: 'royalblue' }
          ]}
          onPress={() => setSelectedSound(tone)}
        >
          <Text style={styles.text}>{tone}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
