module.exports = {
    name: "del",
    aliases: ["delete", "apagar"],
    description: "Apague mensagens do bot!",
    async execute(client, msg, args) {
        if (msg.author == "556196621014@c.us" || msg.from == '556196621014@c.us' || msg.author == "556182234888@c.us") {
            if (msg.hasQuotedMsg) {
                const quotedMsg = await msg.getQuotedMessage();
                if (quotedMsg.fromMe) {
                    quotedMsg.delete(true);
                } else {
                    msg.reply('Eu só posso deletar minhas próprias mensagens');
                }
            }
        } else {
            msg.reply("Você não tem permissão!")
        }
    }
}