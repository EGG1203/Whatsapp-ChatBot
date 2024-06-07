/*const covid19 = require('covid19-stats');
const { MessageMedia } = require('../index');
const covid = require('covid-br-api');

module.exports = {
    name: "covid",
    aliases: ["casos"],
    description: "Veja as informações sobre o covid no país!",
    async execute(client, msg, args) {
        const chat = await msg.getChat();
        const img = MessageMedia.fromFilePath('./docs/covid.jpg');
            let stats = await covid19.getCountry('brazil');
            console.log(stats)
            if(stats.newCases == 0) {
                chat.sendMessage(img, {caption: `*Estatísticas do COVID-19 para o Brasil*\n *Casos:* ${stats.totalCases}\n *Mortes:* ${stats.totalDeaths}\n *Casos hoje:* ~Ainda não divulgado~\n *Mortes hoje:* ~Ainda não divulgado~`})
            } else {
                chat.sendMessage(img, {caption: `*Estatísticas do COVID-19 para o Brasil*\n *Casos:* ${stats.totalCases}\n *Mortes:* ${stats.totalDeaths}\n *Casos hoje:* ${stats.newCases}\n *Mortes hoje:* ${stats.newDeaths}`})
    
            }
            covid.getCasesByCountry('brazil')
            .then( (data) => {
                console.log(data)
                chat.sendMessage(img, {caption: `*Estatísticas do COVID-19 para o _Brasil_*\n*Casos:* ${data.data.cases ? data.cases : "Ainda não divulgado"}\n*Mortes:* ${data.data.deaths}\n*Confirmados:* ${data.data.confirmed}\n*Recuperados:* ${data.data.recovered ? data.data.recovered : "Ainda não divulgado"}`})
                }
            );
            covid.getCasesByUf('DF')
            .then( (data) => {
                    chat.sendMessage(img, {caption: `*Estatísticas do COVID-19 para o _${data.state}_*\n*Casos:* ${data.cases}\n*Mortes:* ${data.deaths}\n*Suspeitos:* ${data.suspects}\n*Testes negativos:* ${data.refuses}`})
                }
            );

            /*covid.getAllStateCases('canada')
            .then( (data) => {
                console.log(data)
                }
            );


        }
    }*/