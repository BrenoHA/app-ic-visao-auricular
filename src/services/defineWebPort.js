import * as NetWork from 'expo-network';
import axios from 'axios';

const getPort = async () => {
  let valor = await NetWork.getIpAddressAsync().then();
  let strings = valor.split('.');
  return `http://${strings[0]}.${strings[1]}.${strings[2]}.`;
};

const requestPort = async (url) => {
  let valorURL = await axios
    .get(url, { timeout: 2000 })
    .then((response) => {
      return response.data.server;
    })
    .catch((error) => {});

  if (valorURL != undefined) {
    return valorURL;
  }
};

export const returnFullURL = async () => {
  const defaultPort = await getPort();

  let fullURL = defaultPort;

  // Tries in each port
  for (let index = 1; index <= 255; index++) {
    let baseURL = `${defaultPort}${index}`;
    let tempURL = `${baseURL}/startServer`;
    console.log(tempURL);

    let valorTemp = await requestPort(tempURL);
    if (valorTemp != undefined) {
      fullURL = valorTemp;
      break;
    }
  }
  return fullURL;
};
