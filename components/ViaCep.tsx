import * as React from 'react';
import {useState} from 'react';
import { Text, TextInput} from 'react-native-paper';
import {PaperProvider} from 'react-native-paper';

const ViaCep=()=>{
    let [cep, setCep] = useState("")
    const BuscCep =(xcep)=>{
        let url ='https://viacep.com.br/ws/${xcep}/json/'
    }

    return(
        <>
            <Text variant="displayLarge">ViaCep Test</Text>
            <TextInput
                label="CEP"
                onChangeText={(value)=>{setCep(value)}}
                mode='outlined'
                />
        </>
    )
}

export default ViaCep;