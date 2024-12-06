const { getJson } = require("serpapi");
const nomebot = require("../package.json").nomebot

module.exports = {
    name: "acad",
    aliases: ["gacad"],
    description: "Pesquise algo no google acadêmico!",
    async execute(client, message, args) {
       // if (!args.join(' ')) return client.reply(message.from, 'Por favor, escreva algo para eu poder pesquisar!', message.id.toString())
        client.sendText(message.from, `Um momento, estou pesquisando... 🔍`)
        client.sendImageAsStickerGif(message.from, './attachments/gifs/pesq.gif');
        const googleSearch = args.join(' ')
        if (googleSearch == undefined || googleSearch == ' ') return client.reply(message.from, `*Resultado não encontrado para: ${googleSearch}*`, message.id.toString())
        getJson({
            engine: "google_scholar",
            q: googleSearch,
            api_key: "34c6d4efca35aa7f5c82143bb4772817d2a0208ca4c6eb037fe783a284dead34"
        }, (json) => {
            const result = json["organic_results"]
            console.log(result);
            let vars = `*Resultado para*: \`${googleSearch}\`\n`
            for (let i = 0; i < result.length; i++) {
                vars += `\n------------------------------------------------\n\n*Título*: ${result[i].title}\n\n*Descrição*: ${result[i].snippet}\n\n*Link*: ${result[i].link}\n\n`
            }
            if (message.isGroupMsg) {
                client.reply(message.from, "Resultado da pesquisa enviada no seu privado!", message.id.toString())
                client.reply(message.author, vars, message.id.toString());
            } else {
                client.reply(message.from, vars, message.id.toString())
            }
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }
        
                            ]
                        }
                    ],
                });
            }, 8000);
        }).catch(e => {
            console.log(e)
            client.reply(message.from, 'Google Error: ' + e, message.id.toString());
        });
    }
}