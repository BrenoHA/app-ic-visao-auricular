import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { defaultDistance } from './defaultDistances';

export const plotSoundPlace = (distance) => {
  if (distance === 0) {
    return (
      <>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
      </>
    );
  }
  if (distance <= defaultDistance[1]) {
    return (
      <>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>X </Text>
      </>
    );
  }
  if (distance <= defaultDistance[2]) {
    return (
      <>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>X </Text>
        <Text style={styles.textSensores}>- </Text>
      </>
    );
  }
  if (distance <= defaultDistance[3]) {
    return (
      <>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>X </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
      </>
    );
  }
  if (distance > defaultDistance[3]) {
    return (
      <>
        <Text style={styles.textSensores}>X </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
      </>
    );
  }
};

const styles = StyleSheet.create({
  textSensores: {
    color: '#1b1b1b',
    fontSize: 16,
  },
});
