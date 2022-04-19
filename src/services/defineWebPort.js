import * as NetWork from 'expo-network';
import axios from 'axios';

const getPort = async () => {
  let valor = await NetWork.getIpAddressAsync().then();
  let strings = valor.split('.');
  return `http://${strings[0]}.${strings[1]}.${strings[2]}.`;
};

export const definePort = async () => {
  const defaultPort = await getPort();
  console.log('defaultPort: ' + JSON.stringify(defaultPort));

  let fullURL = defaultPort;

  // Tries in each port
  for (let index = 0; index <= 255; index++) {
    let tempURL = `${defaultPort}${index}`;
    console.log('tempURL: ' + tempURL);
    try {
      axios
        .get(tempURL)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          //   console.log('Não é a porta: ' + index);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return fullURL;
};
