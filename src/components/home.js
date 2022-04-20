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

import { plotSoundPlace } from '../utils/plotSoundPlace';
import { MeasuredDistance } from './MeasuredDistance';
import { SoundTable } from './SoundTable';
import { DeveloperSettings } from './DeveloperSettings';

// import { api } from './src/services/distanceApi';

export const Home = () => {
  const [isJp, setIsJp] = useState(false);
  const [sensorLeft, setSensorLeft] = useState(0);
  const [sensorMiddle, setSensorMiddle] = useState(0);
  const [sensorRight, setSensorRight] = useState(0);
  const [numberPort, setNumberPort] = useState('12');

  const api = axios.create({
    baseURL: `http://192.168.1.${numberPort}`,
    timeout: 5000,
  });

  useEffect(() => {
    setTimeout(() => {
      fetchApi();
    }, 1000);
  }, [sensorLeft, sensorMiddle, sensorRight]);

  const fetchApi = async () => {
    if (isJp) {
      try {
        await api.get(`/distanceLeft`).then((response) => {
          setSensorLeft(response.data.distance);
        });
        await api.get(`/distanceMiddle`).then((response) => {
          setSensorMiddle(response.data.distance);
        });
        await api.get(`/distanceRight`).then((response) => {
          setSensorRight(response.data.distance);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Ative as "Developer Settings" ');
    }
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

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={fetchApi}>
            <Text style={styles.buttonText}>Get Sensors</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={playSound}>
            <Text style={styles.buttonText}>Play Audio</Text>
          </Pressable>
        </View>
        {/* /Buttons */}

        <SoundTable
          sensorLeft={sensorLeft}
          sensorMiddle={sensorMiddle}
          sensorRight={sensorRight}
        />

        <DeveloperSettings
          isJp={isJp}
          setIsJp={setIsJp}
          setNumberPort={setNumberPort}
          numberPort={numberPort}
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
