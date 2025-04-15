import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TimeContext } from '../../context/TimerContext';
import { timeCalculate } from '../../utils/timeCalculate';

const EditTimer = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { timers, updateTimer, deleteTimer } = useContext(TimeContext);

  // find the timer which want to update or delete
  const timer = timers.find(item => item.id === id);

  // set its values as default
  const [title, setTitle] = useState(timer?.title || '');

  const [h, m, s] = timeCalculate(timer.totalSeconds);
  const [hours, setHours] = useState(h || '0');
  const [minutes, setMinutes] = useState(m || '0');
  const [seconds, setSeconds] = useState(s || '0');

  const handleUpdate = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    const totalSeconds = h * 3600 + m * 60 + s;

    if (totalSeconds <= 0) {
      Alert.alert('Error', 'Time must be greater than 0');
      return;
    }

    const updatedTimer = {
      id,
      title: title.trim(),
      totalSeconds
    };

    updateTimer(updatedTimer);
    Alert.alert('Updated!', 'Reminder updated successfully');
    router.back();
  };

  const handleDelete = () => {
    deleteTimer(id);
    Alert.alert('Deleted!', 'Reminder deleted successfully');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Reminder</Text>

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

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>UPDATE</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: 'crimson', marginTop: 10 }]} onPress={handleDelete}>
        <Text style={styles.buttonText}>DELETE</Text>
      </Pressable>
    </View>
  );
};

export default EditTimer;

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
