import * as NetWork from 'expo-network';
import axios from 'axios';


class PortDefine{
  
  async getPort(){
    let valor = await NetWork.getIpAddressAsync().then();
    let strings = valor.split('.');
    return `http://${strings[0]}.${strings[1]}.${strings[2]}.`;
  }
  
  async requestPort(url){
    let valorURL = await axios.get(url).then((response) =>{
      return response.data.server;
    }).catch((error) => {});
    if(valorURL != undefined) {
      return valorURL;
    }
  }
}

export default class DefinidorDePorta{
  
  async returnPort(){
    const portDefine = new PortDefine();
    const defaultPort = await portDefine.getPort();
  
    let fullURL = defaultPort;
  
    // Tries in each port
    for (let index = 10; index <= 15; index++) {
      let baseURL = `${defaultPort}${index}`
      let tempURL = `${baseURL}/startServer`;
      
      let valorTemp = await portDefine.requestPort(tempURL);
      if (valorTemp != undefined){
        fullURL = valorTemp;
        break;
      }
    }
    return fullURL;
  };
  
}