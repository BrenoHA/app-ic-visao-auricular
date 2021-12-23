import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Switch,
  TextInput,
} from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

import { plotSoundPlace } from './src/utils/plotSoundPlace';
// import { api } from './src/services/distanceApi';

export default function App() {
  const [isJp, setIsJp] = useState(false);
  const [sensorLeft, setSensorLeft] = useState(0);
  const [sensorMiddle, setSensorMiddle] = useState(0);
  const [sensorRight, setSensorRight] = useState(0);
  const [numberPort, onChangeNumberPort] = useState('12');

  const api = axios.create({
    baseURL: `http://192.168.1.${numberPort}`,
    timeout: 5000,
  });

  // -------------------

  const [sound, setSound] = useState();

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/audios/H1.wav')
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

  // -------------------

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

  const roundTwoDecimal = (num) => {
    if (num === 0) {
      return '-';
    }
    return Math.trunc(num * 100) / 100;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.appTitle}>Visão Auricular</Text>
        {/* Distância Medida */}
        <View style={styles.cardSoundPlace}>
          <Text style={styles.subtitle}>Distancia medida:</Text>
          <View style={styles.boxViewSoundPlace}>
            <View style={styles.viewSoundPlace}>
              <Text style={styles.textSensores}>Sensor L</Text>
              <Text style={styles.textSensores}>
                {roundTwoDecimal(sensorLeft)}
              </Text>
            </View>
            <View style={styles.viewSoundPlace}>
              <Text style={styles.textSensores}>Sensor M</Text>
              <Text style={styles.textSensores}>
                {roundTwoDecimal(sensorMiddle)}
              </Text>
            </View>
            <View style={styles.viewSoundPlace}>
              <Text style={styles.textSensores}>Sensor R</Text>

              <Text style={styles.textSensores}>
                {roundTwoDecimal(sensorRight)}
              </Text>
            </View>
          </View>
        </View>
        {/* /Distância Medida */}

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

        {/* SoundPlace */}
        <View style={styles.cardSoundPlace}>
          <Text style={styles.subtitle}>Som:</Text>
          <View style={styles.boxViewSoundPlace}>
            <View style={styles.viewSoundPlace}>
              <Text style={styles.textSensores}>Sensor L</Text>
              {plotSoundPlace(sensorLeft)}
            </View>
            <View style={styles.viewSoundPlace}>
              <Text style={styles.textSensores}>Sensor M</Text>
              {plotSoundPlace(sensorMiddle)}
            </View>
            <View style={styles.viewSoundPlace}>
              <Text style={styles.textSensores}>Sensor R</Text>
              {plotSoundPlace(sensorRight)}
            </View>
          </View>
        </View>
        {/* /SoundPlace */}

        <View style={styles.separator} />
        <Text style={styles.subtitle}>- Developer Settings -</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumberPort}
          value={numberPort}
          placeholder="XX"
          keyboardType="numeric"
        />
        <Switch
          trackColor={{ false: '#767577', true: '##33ACFF' }}
          thumbColor={isJp ? '#0C75BE' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsJp(!isJp)}
          value={isJp}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardSensores: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: '#FAFAFA',
  },
  viewSensores: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  cardSoundPlace: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: '#FAFAFA',
  },
  boxViewSoundPlace: {
    flex: 1,
    flexDirection: 'row',
  },
  viewSoundPlace: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  separator: {
    marginTop: 300,
    borderBottomColor: '#737373',
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
  appTitle: {
    color: '#1b1b1b',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 60,
  },
  subtitle: {
    color: '#1b1b1b',
    fontSize: 20,
    marginBottom: 15,
  },
  textSensores: {
    color: '#1b1b1b',
    fontSize: 16,
  },
  input: {
    textAlign: 'center',
    width: 60,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
});
