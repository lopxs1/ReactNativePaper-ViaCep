import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { List, PaperProvider, TextInput, Button, Dialog, Portal } from 'react-native-paper';
import { useState } from 'react';

export default function App() {
  let [cep, setCep] = useState('');
  let [nome, setNome] = useState('');
  let [idade, setIdade] = useState('');
  let [numero, setNumero] = useState('');
  let [dados, setDados] = useState({});
  let [complemento, setComplemento] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [cepErrorDialogVisible, setCepErrorDialogVisible] = useState(false);

  const handlePress = () => { setExpanded(!expanded); };

  const handleItemPress = (value) => {
    setSelectedValue(value);
    setExpanded(false);
  };

  const [cepValido, setCepValido] = useState(true);

  const buscacep = (xcep) => {
    if (xcep.length !== 8) return;

    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then((resp) => resp.json())
      .then((dados) => {
        if (dados.erro) {
          if (cepValido) {
            setCepErrorDialogVisible(true);
            setCepValido(false);
          }
          setDados({});
          setSelectedValue(null);
        } else {
          setDados(dados);
          setSelectedValue(dados.uf);
          setCepValido(true);
        }
      })
      .catch((x) => {
        console.log(x);
      });
  };

  const handleDialogShow = () => {
    if (nome === '' || idade === '' || cep === '' || numero === '' || !dados.logradouro) {
      setErrorDialogVisible(true);
    } else {
      setDialogVisible(true);
    }
  };

  const handleDialogHide = () => setDialogVisible(false);
  const handleErrorDialogHide = () => setErrorDialogVisible(false);
  const handleCepErrorDialogHide = () => setCepErrorDialogVisible(false);

  const handleSubmit = () => {
    handleDialogHide();
    Alert.alert("Dados registrados com sucesso");
    setCep('');
    setNome('');
    setIdade('');
    setNumero('');
    setDados({});
    setComplemento('');
    setSelectedValue(null);
    setExpanded(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.textoCep}>INSIRA SEUS DADOS</Text>
        <TextInput
          label='Nome'
          mode='outlined'
          value={nome}
          onChangeText={(value) => setNome(value)} />

        <TextInput
          label='Idade'
          mode='outlined'
          value={idade}
          onChangeText={(value) => setIdade(value)} />

        <Text style={styles.textoCep}>INSIRA O CEP</Text>
        <TextInput
          label="CEP"
          value={cep}
          onChangeText={(value) => {
            setCep(value);
            buscacep(value);
          }}
          mode='outlined'
          keyboardType='numeric'
          onBlur={() => { buscacep(cep); }}
        />
        <TextInput
          label='Rua'
          mode='outlined'
          value={dados.logradouro || ''}
          editable={false}
        />

        <TextInput
          label='Número'
          mode='outlined'
          value={numero}
          onChangeText={(value) => setNumero(value)} />

        <TextInput
          label='Complemento'
          mode='outlined'
          value={complemento}
          onChangeText={(value) => setComplemento(value)} />

        <TextInput
          label='Bairro'
          mode='outlined'
          value={dados.bairro || ''}
          editable={false}
        />

        <TextInput
          label='Cidade'
          mode='outlined'
          value={dados.localidade || ''}
          editable={false}
        />

        <TextInput
          label='Estado'
          mode='outlined'
          value={selectedValue || ''}
          editable={false}
        />

        <List.Section title=''>
          <List.Accordion
            title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
            expanded={expanded}
            onPress={() => {
              if (!dados.uf) setExpanded(!expanded);
            }}
            disabled={!!dados.uf}
          >
            <List.Item title="AC" onPress={() => { handleItemPress('AC'); }} />
            <List.Item title="AL" onPress={() => { handleItemPress('AL'); }} />
            <List.Item title="AP" onPress={() => { handleItemPress('AP'); }} />
            <List.Item title="AM" onPress={() => { handleItemPress('AM'); }} />
            <List.Item title="BA" onPress={() => { handleItemPress('BA'); }} />
            <List.Item title="CE" onPress={() => { handleItemPress('CE'); }} />
            <List.Item title="DF" onPress={() => { handleItemPress('DF'); }} />
            <List.Item title="ES" onPress={() => { handleItemPress('ES'); }} />
            <List.Item title="GO" onPress={() => { handleItemPress('GO'); }} />
            <List.Item title="MA" onPress={() => { handleItemPress('MA'); }} />
            <List.Item title="MT" onPress={() => { handleItemPress('MT'); }} />
            <List.Item title="MS" onPress={() => { handleItemPress('MS'); }} />
            <List.Item title="MG" onPress={() => { handleItemPress('MG'); }} />
            <List.Item title="PA" onPress={() => { handleItemPress('PA'); }} />
            <List.Item title="PB" onPress={() => { handleItemPress('PB'); }} />
            <List.Item title="PR" onPress={() => { handleItemPress('PR'); }} />
            <List.Item title="PE" onPress={() => { handleItemPress('PE'); }} />
            <List.Item title="PI" onPress={() => { handleItemPress('PI'); }} />
            <List.Item title="RJ" onPress={() => { handleItemPress('RJ'); }} />
            <List.Item title="RN" onPress={() => { handleItemPress('RN'); }} />
            <List.Item title="RS" onPress={() => { handleItemPress('RS'); }} />
            <List.Item title="RO" onPress={() => { handleItemPress('RO'); }} />
            <List.Item title="RR" onPress={() => { handleItemPress('RR'); }} />
            <List.Item title="SC" onPress={() => { handleItemPress('SC'); }} />
            <List.Item title="SP" onPress={() => { handleItemPress('SP'); }} />
            <List.Item title="SE" onPress={() => { handleItemPress('SE'); }} />
            <List.Item title="TO" onPress={() => { handleItemPress('TO'); }} />
          </List.Accordion>
        </List.Section>

        <Button mode="contained" onPress={handleDialogShow} style={styles.button}>
          Enviar
        </Button>

        <Portal>
          <Dialog visible={dialogVisible} onDismiss={handleDialogHide}>
            <Dialog.Title style={{ color: 'white', fontSize: 20 }}>Confirmar Registro</Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: 'white', fontSize: 18 }}>Deseja registrar os dados?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDialogHide} textColor="white">Cancelar</Button>
              <Button onPress={handleSubmit} textColor="white">Confirmar</Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog visible={errorDialogVisible} onDismiss={handleErrorDialogHide}>
            <Dialog.Title style={{ color: 'white', fontSize: 20 }}>Erro</Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: 'white', fontSize: 18 }}>Não tem dados suficientes.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleErrorDialogHide} textColor="white">OK</Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog visible={cepErrorDialogVisible} onDismiss={handleCepErrorDialogHide}>
            <Dialog.Title style={{ color: 'white', fontSize: 20 }}>Erro</Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: 'white', fontSize: 18 }}>O CEP inserido não existe.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleCepErrorDialogHide} textColor="white">OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCep: {
    color: 'white',
  },
  button: {
    marginTop: 20,
  },
});
