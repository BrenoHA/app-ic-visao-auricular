import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

import { MeasuredDistance } from './MeasuredDistance';
import { SoundTable } from './SoundTable';
import { returnFullURL } from '../services/defineWebPort';
import { defaultDistance } from '../utils/defaultDistances';

export const Home = () => {
  const [sensorLeft, setSensorLeft] = useState(0);
  const [sensorMiddle, setSensorMiddle] = useState(0);
  const [sensorRight, setSensorRight] = useState(0);
  const [sensorURL, setSensorURL] = useState();
  const [isOn, setIsOn] = useState(true);

  // ------- SOUND -------

  const [sound, setSound] = useState();

  const playSound = async () => {
    console.log('Loading Sound');
    // MAKE RELATIVE PATH HERE
    // const path = `../../assets/audios/HAudios/H${distance}_${orientation}.wav`;
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audios/HAudios/H2_C.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // ------- SOUND -------

  useEffect(() => {
    console.log('a');
    playSound();
  }, [sensorLeft]);
  useEffect(() => {
    console.log('b');
    playSound();
  }, [sensorMiddle]);
  useEffect(() => {
    console.log('c');
    playSound();
  }, [sensorRight]);

  const toggleSensors = () => {
    setIsOn(!isOn);
    if (isOn) {
      fetchApi();
    }
  };

  const fetchApi = async () => {
    try {
      setTimeout(() => {
        console.log('a');
        axios.get(`${sensorURL}/distanceLeft`).then((response) => {
          if (response.data?.distance) {
            setSensorLeft(response.data.distance);
          }
        });
        setTimeout(() => {
          console.log('b');
          axios.get(`${sensorURL}/distanceMiddle`).then((response) => {
            if (response.data?.distance) {
              setSensorMiddle(response.data.distance);
            }
          });
          setTimeout(() => {
            console.log('c');
            axios.get(`${sensorURL}/distanceRight`).then((response) => {
              if (response.data?.distance) {
                setSensorRight(response.data.distance);
              }
            });
            if (isOn) {
              setTimeout(fetchApi, 2000);
            }
          }, 1000);
        }, 1000);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const defineWebPort = async () => {
    console.log('defineWebPort pressed');
    const url = await returnFullURL();
    console.log(url);
    setSensorURL(`http://${url}`);
    return url;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* {isOn ? (
          <Text style={styles.appTitleOn}>Visão Auricular</Text>
        ) : (
          <Text style={styles.appTitle}>Visão Auricular</Text>
          )} */}
        <Text style={styles.appTitle}>Visão Auricular</Text>

        <MeasuredDistance
          sensorLeft={sensorLeft}
          sensorMiddle={sensorMiddle}
          sensorRight={sensorRight}
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={defineWebPort}>
            <Text style={styles.buttonText}>Define Web Port</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={toggleSensors}>
            <Text style={styles.buttonText}>Toggle Sensors</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={playSound}>
            <Text style={styles.buttonText}>Test Audio</Text>
          </Pressable>
        </View>

        <SoundTable
          sensorLeft={sensorLeft}
          sensorMiddle={sensorMiddle}
          sensorRight={sensorRight}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  appTitle: {
    color: '#1b1b1b',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 60,
  },
  appTitleOn: {
    color: '#128230',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 60,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0091BE',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
