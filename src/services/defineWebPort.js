import * as NetWork from 'expo-network';

export const definePort = () =>{
    console.log("----s--");

    const defaultPort ='';
    //#TODO ESSA PARTE NÃO ESTÁ RETORNANDO A STRING, E SIM UMA PROMISSE
    returnPort().then(response => {
        console.log("RESPONSE:"+ response);
        defaultPort = response;
    });

    //#TODO ESSA PARTE DEVERIA ESTAR PRINTANDO O INICIO DA PORTA;
    console.log("DEFAULT:" + defaultPort);
    let fullURL='';

    // while(!fullURL){
        for(let i=0; i>=255; i++){
            try{
                let tempURL = `${defaultPort}${i}`;
                let value = fetch(tempURL)
                    .then(response => response.json())
                    .then(data => data.hasOwnProperty("server")).then;
                if(value){
                    fullURL=tempURL;
                    break;
                }
            }catch(e){console.log('')};
        }
    // }
    // console.log(fullURL);
    return fullURL;
}

function returnPort(){
    return NetWork.getIpAddressAsync()
    .then(result =>{
        let strings = result.split('.');
        let stringFormat = `http://${strings[0]}.${strings[1]}.${strings[2]}.`;
        console.log("String:" + stringFormat);
        return stringFormat;
        }
    );
}