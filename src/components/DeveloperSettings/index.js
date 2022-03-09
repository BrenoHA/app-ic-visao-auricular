import React from 'react';
import { StyleSheet, Text, TextInput, View, Switch } from 'react-native';

export const DeveloperSettings = ({
  isJp,
  setIsJp,
  setNumberPort,
  numberPort,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text style={styles.subtitle}>- Developer Settings -</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNumberPort}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  separator: {
    marginTop: 300,
    borderBottomColor: '#737373',
  },
  subtitle: {
    color: '#1b1b1b',
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    textAlign: 'center',
    width: 60,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
});
