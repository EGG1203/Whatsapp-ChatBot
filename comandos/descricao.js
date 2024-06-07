

module.exports = {
    name: "desc",
    aliases: ["descrição", "description"],
    description: "Altere a descrição do grupo!",
    async execute(client, msg, args) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = args.join(' ');
            chat.setDescription(newDescription);
        } else {
            msg.reply('Este comando só pode ser usado em um grupo!');
        }
    }
}