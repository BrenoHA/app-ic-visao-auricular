import React from 'react';
import { Text, StyleSheet } from 'react-native';

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
  if (distance <= 30) {
    return (
      <>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>X </Text>
      </>
    );
  }
  if (distance <= 50) {
    return (
      <>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>X </Text>
        <Text style={styles.textSensores}>- </Text>
      </>
    );
  }
  if (distance <= 100) {
    return (
      <>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>X </Text>
        <Text style={styles.textSensores}>- </Text>
        <Text style={styles.textSensores}>- </Text>
      </>
    );
  }
  if (distance > 100) {
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
