module.exports = {
    name: "everyone",
    aliases: ["tdmundo"],
    description: "Mencione todos os participantes do grupo!",
    async execute(client, msg, args) {
        if(!args.join(' ')) return msg.reply('Por favor, defina uma mensagem!')
        const chat = await msg.getChat();
        if(chat.isGroup) {
            const admins = chat.groupMetadata.participants.find(admin => admin.id._serialized == msg.author)
            const isAdmin = admins.isAdmin

            if (isAdmin || msg.author == "556196621014@c.us") {
                /*msg.reply(`⚠️ *Atenção!! Mensagem importante de* @${msg.author.split("@c.us")[0]}:\n${args.join(' ')}`, null, {
                mentions: chat.participants
                });*/
            

                let text = `⚠️ *Atenção!! Mensagem importante de* @${msg.author.split("@c.us")[0]}:\n${args.join(' ')}`;
                let mentions = [];

                for (let participant of chat.participants) {
                    mentions.push(`${participant.id.user}@c.us`);
                    text += ``;
                }
            
            await chat.sendMessage(text, { mentions });
            }
            
        } else {
            msg.reply('Este comando só pode ser executado em um grupo!')
        }
    }
}