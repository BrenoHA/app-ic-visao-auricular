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
import DefinidorDePorta from '../services/DefinidorDePorta';
// import { api } from './src/services/distanceApi';

export const Home = () => {
  const [isJp, setIsJp] = useState(false);
  const [sensorLeft, setSensorLeft] = useState(0);
  const [sensorMiddle, setSensorMiddle] = useState(0);
  const [sensorRight, setSensorRight] = useState(0);
  const [numberPort, setNumberPort] = useState();


  useEffect(() => {
    setTimeout(() => {
      fetchApi();
    }, 1000);
  }, [sensorLeft, sensorMiddle, sensorRight]);

  const simpleFetchApi = async () => {
    let urlParaChamar = `http://${numberPort}/distanceMiddle`;
    console.log(urlParaChamar);
    await axios.get(urlParaChamar).then((response) => {
      // setSensorMiddle(response.data.distance);
      console.log(response.data)
    });
  };

  const fetchApi = async () => {
    if (isJp) {
      try {
        await axios.get(`http://${numberPort}/distanceLeft`).then((response) => {
          setSensorLeft(response.data.distance);
        });
        await axios.get(`http://${numberPort}/distanceMiddle`).then((response) => {
          setSensorMiddle(response.data.distance);
        });
        await axios.get(`http://${numberPort}/distanceRight`).then((response) => {
          setSensorRight(response.data.distance);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Ative as "Developer Settings" ');
    }
  };

  const defineWebPort = async () => {
    const definirPorta = new DefinidorDePorta();
    const port = await definirPorta.returnPort();
    console.log(port);
    setNumberPort(port);
    return port;
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
          <Pressable style={styles.button} onPress={simpleFetchApi}>
            <Text style={styles.buttonText}>simpleFetchApi</Text>
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
