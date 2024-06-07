const malScraper = require('mal-scraper');
const { MessageMedia } = require('../index');

module.exports = {
    name: "anime",
    description: "Obter informações sobre um anime!",
    async execute(client, msg, args) {
        const chat = await msg.getChat();
        const search = `${args}`;
        if(!search)
        return msg.reply('Escreva o nome de um anime.');

        malScraper.getInfoFromName(search)
          .then(async function (data) {
                  //console.log(data);
                  try {
                  const img = await MessageMedia.fromUrl(data.picture);
                  chat.sendMessage(img, { caption: `Resultado da pesquisa da minha lista de animes para _${args}_\n*Título em Inglês*: ${data.englishTitle}\n*Título em Japonês*: ${data.japaneseTitle}\n*Tipo*: ${data.type}\n*Episódios*: ${data.episodes}\n*Avaliação*: ${data.rating}\n*Exibido*: ${data.aired}\n*Pontuação*: ${data.score} ${data.scoreStats}\n*Link*: ${data.url}`});
                  } catch(e) {
                    chat.sendMessage('Anime não encontrado!')
                  }
              })
    } 
}