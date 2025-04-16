import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useState, useRef, useEffect, useContext } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Audio } from 'expo-av';
import { TimeContext } from '../../context/TimerContext';
import { useKeepAwake } from 'expo-keep-awake';

const Timer = () => {

  useKeepAwake(); // Prevents screen from sleeping while timer is active

  const { target } = useLocalSearchParams();

  const [remain, setRemain] = useState(Number(target));
  const [isDone, setIsDone] = useState(false);
  const [sound, setSound] = useState(null);

  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);

  const intervalRef = useRef(null);

  const {selectedSound} = useContext(TimeContext);

  const countDown = () => {
    intervalRef.current = setInterval(() => {
      setRemain(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsDone(true);
          playSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    const h = Math.floor(remain / 3600);
    const m = Math.floor((remain % 3600) / 60);
    const s = remain % 60;

    setHrs(h);
    setMins(m);
    setSec(s);
  }, [remain]);

  useFocusEffect(
    useCallback(() => {
      countDown();
      return () => clearInterval(intervalRef.current);
    }, [])
  );

  async function playSound() {
    try {
      const soundMap = {
        beep: require('../../../assets/sounds/beep.mp3'),
        alarm: require('../../../assets/sounds/alarm.mp3'),
        ding: require('../../../assets/sounds/ding.mp3'),
      };
  
      const { sound } = await Audio.Sound.createAsync(
        soundMap[selectedSound],
        { isLooping: true }
      );
  
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log(error?.message);
    }
  }
  

  useEffect(() => {
    // Cleanup sound on component unmount
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const handleStopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        router.back()
      }
    } catch (error) {
      console.log(error?.message);
    }
  }

  return (
    <View style={styles.container}>
      {
        !isDone ? (
          <AnimatedCircularProgress
            size={180}
            width={10}
            fill={(remain / Number(target)) * 100}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          >
            {
              () => (
                <Text style={{ fontSize: 24, fontWeight: '600' }}>
                  {`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
                </Text>
              )
            }
          </AnimatedCircularProgress>
        ) : (
          <View style={{ width: '100%', gap: 15 }}>
            <Text style={{ fontSize: 24, fontWeight: 'semibold', textAlign: 'center' }}>
              Your Time's Up, Take a break!
            </Text>
            <Pressable style={styles.button} onPress={handleStopSound}>
              <Text style={styles.buttonText}>STOP</Text>
            </Pressable>
          </View>
        )
      }
    </View>
  )
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
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
