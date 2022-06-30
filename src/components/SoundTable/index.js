import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { plotSoundPlace } from '../../utils/plotSoundPlace';

export const SoundTable = ({ sensorLeft, sensorMiddle, sensorRight }) => {
  return (
    <View style={styles.cardSoundPlace}>
      <Text style={styles.subtitle}>Som</Text>
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
  );
};

const styles = StyleSheet.create({
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
  subtitle: {
    color: '#1b1b1b',
    fontSize: 20,
    marginBottom: 15,
  },
});
