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
import { DeveloperSettings } from './DeveloperSettings';

const H1_L = require('../../assets/audios/HAudios/H1_L.wav');
const H2_L = require('../../assets/audios/HAudios/H2_L.wav');
const H3_L = require('../../assets/audios/HAudios/H3_L.wav');
const H4_L = require('../../assets/audios/HAudios/H4_L.wav');

const H1_C = require('../../assets/audios/HAudios/H1_C.wav');
const H2_C = require('../../assets/audios/HAudios/H2_C.wav');
const H3_C = require('../../assets/audios/HAudios/H3_C.wav');
const H4_C = require('../../assets/audios/HAudios/H4_C.wav');

const H1_R = require('../../assets/audios/HAudios/H1_R.wav');
const H2_R = require('../../assets/audios/HAudios/H2_R.wav');
const H3_R = require('../../assets/audios/HAudios/H3_R.wav');
const H4_R = require('../../assets/audios/HAudios/H4_R.wav');

export const Home = () => {
  const [sensorLeft, setSensorLeft] = useState(0);
  const [sensorMiddle, setSensorMiddle] = useState(0);
  const [sensorRight, setSensorRight] = useState(0);
  const [sensorURL, setSensorURL] = useState();
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ------- SOUND2 -------

  function playSound2(sound) {
    console.log('Playing');
    Audio.Sound.createAsync(sound, { shouldPlay: true })
      .then((res) => {
        res.sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.didJustFinish) return;
          console.log('Unloading');
          res.sound.unloadAsync().catch(() => {});
        });
      })
      .catch((error) => {});
  }

  // ------- SOUND2 -------

  const defineWebPort = async () => {
    console.log('defineWebPort pressed');
    let url = '';
    if (!isLoading) {
      setIsLoading(true);
      url = await returnFullURL();
    }
    console.log(url);
    setIsLoading(false);
    setSensorURL(url);
    return url;
  };

  useEffect(() => {
    fetchApi();
  }, [isOn]);

  const fetchApi = async () => {
    if (isOn) {
      console.log('Entrou no if');

      setTimeout(() => {
        axios
          .get(`${sensorURL}/distanceLeft`)
          .then((response) => {
            if (response.data?.distance) {
              setSensorLeft(response.data.distance);
              console.log('L -> ' + response.data.distance);
              playSound2(H1_L);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setTimeout(() => {
          axios
            .get(`${sensorURL}/distanceMiddle`)
            .then((response) => {
              if (response.data?.distance) {
                setSensorMiddle(response.data.distance);
                console.log('C -> ' + response.data.distance);
                playSound2(H1_L);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          setTimeout(() => {
            axios
              .get(`${sensorURL}/distanceRight`)
              .then((response) => {
                if (response.data?.distance) {
                  setSensorRight(response.data.distance);
                  console.log('R -> ' + response.data.distance);
                  playSound2(H1_L);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            setTimeout(fetchApi, 500);
          }, 300);
        }, 300);
      }, 300);
    } else {
      console.log('fetchApi Stopped');
    }
  };

  const testL = () => {
    setTimeout(() => {
      axios
        .get(`${sensorURL}/distanceLeft`)
        .then((response) => {
          if (response.data?.distance) {
            setSensorLeft(response.data.distance);
            console.log('L -> ' + response.data.distance);
            playSound2(H1_L);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {isOn ? (
          <Text style={styles.appTitleOn}>Visão Auricular</Text>
        ) : (
          <Text style={styles.appTitle}>Visão Auricular</Text>
        )}

        <MeasuredDistance
          sensorLeft={sensorLeft}
          sensorMiddle={sensorMiddle}
          sensorRight={sensorRight}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: isLoading ? 'gray' : '#0091BE' },
            ]}
            disabled={isLoading}
            onPress={defineWebPort}
          >
            <Text style={styles.buttonText}>Definir Porta Web</Text>
          </Pressable>
        </View>
        {isLoading && <Text style={styles.simpleText}>Loading...</Text>}
        {sensorURL != '' && <Text style={styles.simpleText}>{sensorURL}</Text>}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: isOn ? 'gray' : '#0091BE' },
            ]}
            disabled={isOn}
            onPress={() => setIsOn(true)}
          >
            <Text style={styles.buttonText}>Ligar sensores</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={testL}>
            <Text style={styles.buttonText}>Test L</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => playSound2(H1_L)}>
            <Text style={styles.buttonText}>Testar Audio</Text>
          </Pressable>
        </View>

        <SoundTable
          sensorLeft={sensorLeft}
          sensorMiddle={sensorMiddle}
          sensorRight={sensorRight}
        />
      </View>
      <DeveloperSettings setSensorURL={setSensorURL} />
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
