import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type Props = {
  visivel: boolean;
  titulo: string;
  mensagem: string;
  aoFechar: () => void;
  acaoPosAlerta?: () => void;  // função opcional para executar após fechar
};

export function AlertaPixelArt({ visivel, titulo, mensagem, aoFechar, acaoPosAlerta }: Props) {
  const handleFechar = () => {
    aoFechar();                // fecha o alerta
    if (acaoPosAlerta) {       // executa a ação pós-alerta se existir
      acaoPosAlerta();
    }
  };

  return (
    <Modal transparent visible={visivel} animationType="fade">
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}>
        <View style={{
          backgroundColor: '#f4f1de',
          borderWidth: 4,
          borderColor: '#222',
          padding: 20,
          width: '80%',
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 1,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#222',
            marginBottom: 10,
            fontFamily: 'monospace',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>
            {titulo}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#333',
            textAlign: 'center',
            fontFamily: 'monospace',
            marginBottom: 20
          }}>
            {mensagem}
          </Text>
          <TouchableOpacity
            onPress={handleFechar}
            style={{
              backgroundColor: '#81b29a',
              borderColor: '#222',
              borderWidth: 2,
              paddingVertical: 8,
              paddingHorizontal: 20
            }}
          >
            <Text style={{
              color: '#fff',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              fontSize: 12
            }}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}