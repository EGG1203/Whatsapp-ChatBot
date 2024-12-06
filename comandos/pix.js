const https = require("https");
var axios = require("axios");
const nomebot = require("../package.json").nomebot
var fs = require("fs");

module.exports = {
    name: "pix",
    aliases: ["pix"],
    description: "Veja a ...!",
    async execute(client, message, args) {
        const valor = args.join(' ')
        if(!valor) return client.reply(message.from, `Por favor, defina um valor para gerar o QR Code!`, message.id.toString())
        client.sendReactionToMessage(message.id, '⏳')

        client.reply(message.from, `Gerando seu QR Code Pix, por favor, aguarde!`, message.id.toString())

        client.sendReactionToMessage(message.id, '🔄')

        axios({
            method: 'GET',
            url: `https://gerarqrcodepix.com.br/api/v1?nome=Metatron%20GG&cidade=Brasilia&valor=${valor}&saida=qr&chave=guilherme.bastos@pague.com.gi`,
            responseType: 'stream'
        }).then(responde => {
            responde.data.pipe(fs.createWriteStream('./pix.png'))
            setTimeout(() => {
                client.sendFile(
                    message.from,
                    './pix.png',
                    {
                        type: 'image',
                        caption: 'Este é seu QR Code Pix.\nÉ possível usar o pix copia e cola com a mensagem abaixo 👇🏻',
                        title: `Olá, ${message.notifyName} 👋🏻`,
                        footer: nomebot
                    }
                )
            }, 2000);
            setTimeout(() => {
                client.sendText(
                    message.from,
                    responde.headers.brcode
                );
            }, 3000);
            
        })

        /* client.sendPollMessage(
             message.from,
             'A poll name',
             ['Option 1', 'Option 2', 'Option 3'],
             {
                 selectableCount: 1,
             }
         ).then(async (result) => {
             const a  = await client.getVotes(result.id)
             let vars = `*Votos*: \n`
             for (let i = 0; i < a.length; i++) {
                 vars += `${a[i]}\n`
             }
             setTimeout(() => {
                 console.log(vars);
             }, 5000);
         })*/
    }
}