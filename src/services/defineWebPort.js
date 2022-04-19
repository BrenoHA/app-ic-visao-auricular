import * as NetWork from 'expo-network';

async function getPort() {
    let valor = await NetWork.getIpAddressAsync().then();
    return valor;
    // .then(result =>{
    //     let strings = result.split('.');
    //     return strings;
    //     }
    // );
}

const returnPortB = async () => {
    return NetWork.getIpAddressAsync()
    .then(result =>{
        let strings = result.split('.');
        let stringFormat = `http://${strings[0]}.${strings[1]}.${strings[2]}.`;
        return stringFormat;
        }
    );
}

export const definePort = () =>{

    const defaultPort = getPort();
    
    console.log("RESPOSTA---JP: "+ defaultPort);
    

    const defaultPortB = returnPortB().then(response =>{
        console.log("ESPERADO-B:" +response);
        return response;
    });
    console.log("ESPERADO-B2:" + JSON.stringify(defaultPortB));
    
}

console.log('DEFINE PORT RETURN:' + JSON.stringify(definePort()));









// // while(!fullURL){
//     for(let i=0; i>=255; i++){
//         try{
//             let tempURL = `${defaultPort}${i}`;
//             let value = fetch(tempURL)
//                 .then(response => response.json())
//                 .then(data => data.hasOwnProperty("server")).then;
//             if(value){
//                 fullURL=tempURL;
//                 break;
//             }
//         }catch(e){console.log('')};
//     }
// // }
// console.log(`PORTA FINAL: ${fullURL}`);
// return fullURL;