import axios from "axios";

//função assíncrona que recebe uma palavra em português e o idioma sorteado com o shuffle
export const translateWord = async (
  word: string,
  targetLang: string
): Promise<string> => {
  try {
    //faz uma requisição GET para a API MyMemory enviando a palavra e o par de idiomas (pt|targetLang)
    //encodeURIComponent é usado para garantir que a palavra esteja corretamente codificada na URL (tenho que revisar essa parte)
    const response = await axios.get(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        word
      )}&langpair=pt|${targetLang}`
    );

    //pega a palavra traduzida da Api
    const translatedText = response.data?.responseData?.translatedText;

    //se n tiver tradução lança um erro
    if (!translatedText) throw new Error("Nenhuma tradução encontrada");

    //para ver se a API ta funcionando -- tirar na hora de apresentar
    console.log(`Traduzindo "${word}" para "${targetLang}":`, translatedText);

    //retorna a palavra traduzida
    return translatedText;
  } catch (error) {
    //se retornar erro na resposta ou na api (teste final) cai aqui
    console.error("Erro na tradução MyMemory:", error);
    //joga o erro para o user
    throw new Error("Erro ao traduzir a palavra");
  }
};
