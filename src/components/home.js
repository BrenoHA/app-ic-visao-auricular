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
import soundLibrary from '../utils/soundLibrary';

import { MeasuredDistance } from './MeasuredDistance';
import { SoundTable } from './SoundTable';
import { returnFullURL } from '../services/defineWebPort';
import { getDefaultDistance } from '../utils/defaultDistances';

export const Home = () => {
  const [sensorLeft, setSensorLeft] = useState(0);
  const [sensorMiddle, setSensorMiddle] = useState(0);
  const [sensorRight, setSensorRight] = useState(0);
  const [sensorURL, setSensorURL] = useState();
  const [isOn, setIsOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // ------- SOUND -------

  const soundObjects = {};

  const load = (library) => {
    const promisedSoundObjects = [];

    for (const name in library) {
      const sound = library[name];

      soundObjects[name] = new Audio.Sound();

      promisedSoundObjects.push(soundObjects[name].loadAsync(sound));
    }

    return promisedSoundObjects;
  };

  const loadAudios = () => {
    console.log('loadAudios');
    const sounds = load(soundLibrary);

    return Promise.all([...sounds]);
  };

  const playSound = async (name) => {
    try {
      if (soundObjects[name]) {
        await soundObjects[name].replayAsync();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // ------- SOUND -------

  useEffect(() => {
    console.log('a');
    console.log(getDefaultDistance(sensorLeft));
    playSound(getDefaultDistance(sensorLeft), 'L');
  }, [sensorLeft]);
  useEffect(() => {
    console.log('b');
    console.log(getDefaultDistance(sensorMiddle));
    playSound(getDefaultDistance(sensorMiddle), 'C');
  }, [sensorMiddle]);
  useEffect(() => {
    console.log('c');
    console.log(getDefaultDistance(sensorRight));
    playSound(getDefaultDistance(sensorRight), 'R');
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
    setIsLoading(true);
    const url = await returnFullURL();
    console.log(url);
    setIsLoading(false);
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
            <Text style={styles.buttonText}>Definir Porta Web</Text>
          </Pressable>
        </View>
        {isLoading && <Text style={styles.simpleText}>Loading...</Text>}
        {sensorURL != '' && <Text style={styles.simpleText}>{sensorURL}</Text>}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={toggleSensors}>
            <Text style={styles.buttonText}>Ligar sensores</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={loadAudios}>
            <Text style={styles.buttonText}>Carregar Audios</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => playSound('H1_C')}>
            <Text style={styles.buttonText}>Testar Audio</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => playSound('H3_C')}>
            <Text style={styles.buttonText}>Testar Audio2</Text>
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
  simpleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
});
