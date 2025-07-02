export type RootStackParamList = {
  Tabs: undefined;
  Resultado: {
    fato: string;
    respostaUsuario: boolean;
    acertou: boolean;
    fim: 'ganhou' | 'perdeu' | null;
    explicacao: string;
  };
};


export type BottomTabParamList = {
  Fato: undefined;
  Histórico: undefined;
};

