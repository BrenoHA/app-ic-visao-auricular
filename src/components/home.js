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

export const Home = () => {
  const [sensorLeft, setSensorLeft] = useState(0);
  const [sensorMiddle, setSensorMiddle] = useState(0);
  const [sensorRight, setSensorRight] = useState(0);
  const [sensorURL, setSensorURL] = useState();

  // FETCH EVERY SECOND
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchApi();
  //   }, 1000);
  // }, [sensorLeft, sensorMiddle, sensorRight]);

  const fetchApi = async () => {
    try {
      await axios.get(`${sensorURL}/distanceLeft`).then((response) => {
        if (response.data?.distance) {
          setSensorLeft(response.data.distance);
        }
      });
      await axios.get(`${sensorURL}/distanceMiddle`).then((response) => {
        if (response.data?.distance) {
          setSensorLeft(response.data.distance);
        }
      });
      await axios.get(`${sensorURL}/distanceRight`).then((response) => {
        if (response.data?.distance) {
          setSensorLeft(response.data.distance);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const defineWebPort = async () => {
    const url = await returnFullURL();
    console.log(url);
    setSensorURL(`http://${url}`);
    return url;
  };
  // ------- SOUND -------

  const [sound, setSound] = useState();

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audios/HAudios/H1.wav')
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
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
          <Pressable style={styles.button} onPress={fetchApi}>
            <Text style={styles.buttonText}>Get Sensors</Text>
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
