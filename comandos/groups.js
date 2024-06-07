
module.exports = {
    name: "groups",
    aliases: ["grupos"],
    description: "!",
    async execute(client, msg, args) {
        if(msg.from === '556196621014@c.us' || msg.author === '556196621014@c.us' || msg.from === '556185305544@c.us' || msg.author === '556185305544@c.us') {
            client.getChats().then(chats => {
                const groups = chats.filter(chat => chat.isGroup);
        
                if (groups.length == 0) {
                msg.reply('Eu ainda não tenho um grupo.');
                } else {
                let replyMsg = '*MEUS GRUPOS*\n\n';
                groups.forEach((group, i) => {
                    replyMsg += `ID: ${group.id._serialized}\nNome: ${group.name}\n\n`;
                });
                replyMsg += '_Você pode usar o ID para enviar uma mensagem ao grupo._'
                msg.reply(replyMsg);
                }
            });
        }
    }
}