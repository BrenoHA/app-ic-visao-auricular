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
} from 'react-native';
import { Audio } from 'expo-av';

import { api } from './src/services/distanceApi';

export default function App() {
  const [isJp, setIsJp] = useState(false);
  const [sensorValue, setSensorValue] = useState(0);

  // -------------------

  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/audios/H1.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

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
  }, [sensorValue]);

  const fetchApi = () => {
    if (isJp) {
      try {
        api.get().then((response) => {
          setSensorValue(response.data.distance);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Ligue o JP env para teste');
    }
  };

  const roundTwoDecimal = (num) => {
    return Math.trunc(num * 100) / 100;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.appTitle}>Visão Auricular</Text>
        <View style={styles.cardSensores}>
          <Text style={styles.subtitle}>Distancia medida:</Text>
          <View style={styles.viewSensores}>
            <Text style={styles.textSensores}>Sensor 1</Text>
            <Text style={styles.textSensores}>Sensor 2</Text>
            <Text style={styles.textSensores}>Sensor 3</Text>
          </View>
          <View style={styles.viewSensores}>
            <Text style={styles.textSensores}>-</Text>
            <Text style={styles.textSensores}>
              {roundTwoDecimal(sensorValue)}
            </Text>
            <Text style={styles.textSensores}>-</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={fetchApi}>
            <Text style={styles.buttonText}>Get Sensor</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={playSound}>
            <Text style={styles.buttonText}>Play Audio</Text>
          </Pressable>
        </View>

        <View style={styles.separator} />
        <Text style={styles.subtitle}>JP env?</Text>
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
    backgroundColor: '#FAFAFA',
  },
  viewSensores: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
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
    marginBottom: 40,
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
});
