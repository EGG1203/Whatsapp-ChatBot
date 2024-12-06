const malScraper = require('mal-scraper');

module.exports = {
  name: "anime",
  description: "Obter informações sobre um anime!",
  async execute(client, message, args) {
    const search = `${args}`;
    /*if (search == ` \nVeja as informações sobre o anime!`) {
      return client.reply(message.from, 'Escreva o nome de um anime.', message.id.toString());
    }*/
    if (!search) {
      return client.reply(message.from, 'Escreva o nome de um anime.', message.id.toString());
    } 

    malScraper.getInfoFromName(search)
      .then(async function (data) {
        //console.log(data);
        try {
          client
            .sendImage(
              message.from,
              data.picture,
              `imagem`,
              `Resultado da pesquisa da minha lista de animes para _${args}_\n*Título em Inglês*: ${data.englishTitle}\n*Título em Japonês*: ${data.japaneseTitle}\n*Tipo*: ${data.type}\n*Episódios*: ${data.episodes}\n*Avaliação*: ${data.rating}\n*Exibido*: ${data.aired}\n*Pontuação*: ${data.score} ${data.scoreStats}\n*Link*: ${data.url}`
            );
        } catch (e) {
          chat.sendMessage('Anime não encontrado!')
        }
      })
  }
}