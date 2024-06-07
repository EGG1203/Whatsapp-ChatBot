const google = require('google-it');

module.exports = {
    name: "google",
    aliases: ["pesquisar"],
    description: "Pesquise algo no google!",
    async execute(client, msg, args) {
        if(!args.join(' ')) return msg.reply('Por favor, escreva algo para eu poder pesquisar!')
        const chat = await msg.getChat();
        const googleSearch = args.join(' ')
        if(googleSearch == undefined || googleSearch == ' ') return msg.reply(`*Resultado não encontrado para: ${googleSearch}*`)
        google({ 'query': googleSearch }).then(results => {
        let vars = `_*Resultado para: ${googleSearch}*_\n`
        for (let i = 0; i < results.length; i++) {
            vars +=  `\n------------------------------------------------\n\n*Título*: ${results[i].title}\n\n*Descrição*: ${results[i].snippet}\n\n*Link*: ${results[i].link}\n\n`
        }
            if (chat.isGroup) {
                msg.reply("Resultado da pesquisa enviada no seu privado!", msg.from)
                msg.reply(vars, msg.author);
            } else {
                msg.reply(vars)
            }
        }).catch(e => {
            console.log(e)
            msg.reply('Google Error: ' + e);
        })
    }
}