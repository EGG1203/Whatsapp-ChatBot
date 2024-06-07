/*const { MessageMedia } = require('../index');
const coronaScraper = require('covid-19-brasil-scraper');
const covid = require('covid-br-api');

module.exports = {
    name: "covid",
    aliases: ["casos"],
    description: "Veja as informações sobre o covid no país!",
    async execute(client, msg, args) {
        const chat = await msg.getChat();
        chat.sendMessage("Estou buscando, por favor, aguarde um momento! ⌨️")
            try {
                coronaScraper().then(res => {
                    console.log(res[0].dados);
                    const img = MessageMedia.fromFilePath('./attachments/covidbr.jpeg');
                    const img2 = MessageMedia.fromFilePath('./attachments/covidbsb.jpeg');
                    chat.sendMessage(img, {caption: `*Estatísticas do COVID-19 para o Brasil*\n*Total de casos:* ${res[0].dados[0].totalCasos}\n*${res[0].dados[0].novosCasos}*\n*Total de mortes:* ${res[0].dados[0].totalMortes}\n*${res[0].dados[0].novasMortes}*\n*Recuperados:* ${res[0].dados[0].recuperados}\n*Vacinados primeira dose:* ${res[0].dados[0].vacinadosPrimeiraDose}\n*Vacinados segunda dose:* ${res[0].dados[0].vacinadosSegundaDose}`})
                    covid.getCasesByUf('DF')
                    .then( (data) => {
                            chat.sendMessage(img2, {caption: `*Estatísticas do COVID-19 para o _${data.state}_*\n*Casos:* ${data.cases}\n*Mortes:* ${data.deaths}\n*Suspeitos:* ${data.suspects}\n*Testes negativos:* ${data.refuses}`})
                        }
                    );
                });
            } catch(e) {
                chat.sendMessage('Comando com eventuais erros, por favor, contate o proprietário do bot para obter mais informações!')
            }
        }
    }*/