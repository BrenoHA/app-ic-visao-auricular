import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const MeasuredDistance = ({ sensorLeft, sensorMiddle, sensorRight }) => {
  const roundTwoDecimal = (num) => {
    if (num === 0) {
      return '-';
    }
    return Math.trunc(num * 100) / 100;
  };

  return (
    <View style={styles.cardSoundPlace}>
      <Text style={styles.subtitle}>Distancia medida (cm)</Text>
      <View style={styles.boxViewSoundPlace}>
        <View style={styles.viewSoundPlace}>
          <Text style={styles.textSensores}>Sensor L</Text>
          <Text style={styles.textSensores}>{roundTwoDecimal(sensorLeft)}</Text>
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
  textSensores: {
    color: '#1b1b1b',
    fontSize: 16,
  },
});
