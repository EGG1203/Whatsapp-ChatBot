const { getJson } = require("serpapi");

module.exports = {
    name: "acad",
    aliases: ["gacad"],
    description: "Pesquise algo no google acadêmico!",
    async execute(client, msg, args) {
        if (!args.join(' ')) return msg.reply('Por favor, escreva algo para eu poder pesquisar!')
        const chat = await msg.getChat();
        msg.react("🤔")
        chat.sendMessage(`Um momento, estou pesquisando... 🔍`)
        const googleSearch = args.join(' ')
        if (googleSearch == undefined || googleSearch == ' ') return msg.reply(`*Resultado não encontrado para: ${googleSearch}*`)
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
            if (chat.isGroup) {
                msg.reply("Resultado da pesquisa enviada no seu privado!", msg.from)
                msg.reply(vars, msg.author);
            } else {
                msg.reply(vars)
            }
        }).catch(e => {
            console.log(e)
            msg.reply('Google Error: ' + e);
        });
    }
}