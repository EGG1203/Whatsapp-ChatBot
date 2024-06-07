module.exports = {
    name: "sair",
    aliases: ["leave"],
    description: "Remova o bot do grupo!",
    async execute(client, msg, args) {
        if (msg.from == "556196621014@c.us" || msg.author == "556196621014@c.us") {
            let chat = await msg.getChat();
            if (chat.isGroup) {
                chat.leave();
            } else {
                msg.reply('Este comando só pode ser usado em um grupo!');
            }
        } else {
            msg.reply("Você não tem permissão! 😎")
        }
    }
}