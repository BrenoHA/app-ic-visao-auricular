import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Switch } from 'react-native';
import * as NetWork from 'expo-network';

export const DeveloperSettings = ({ setSensorURL }) => {
  const getPort = async () => {
    let valor = await NetWork.getIpAddressAsync().then();
    let strings = valor.split('.');
    return `http://${strings[0]}.${strings[1]}.${strings[2]}.`;
  };

  const [numberPort, setNumberPort] = useState('');
  const [fullUrl, setFullUrl] = useState('');

  const makeUrl = async (port) => {
    const baseUrl = await getPort();
    setFullUrl(baseUrl + numberPort);
    console.log(fullUrl);
  };

  useEffect(() => {
    makeUrl(numberPort);
  }, [numberPort]);

  useEffect(() => {
    console.log(fullUrl);
    setSensorURL(fullUrl);
  }, [fullUrl]);

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
      {/* <Switch
        trackColor={{ false: '#767577', true: '##33ACFF' }}
        thumbColor={isDev ? '#0C75BE' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsDev(!isDev)}
        value={isDev}
      /> */}
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
    marginTop: 100,
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
    marginBottom: 20,
  },
});
