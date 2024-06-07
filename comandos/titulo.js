

module.exports = {
    name: "titulo",
    aliases: ["title"],
    description: "Altere o título do grupo!",
    async execute(client, msg, args) {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = args.join(' ');
            chat.setSubject(newSubject);
        } else {
            msg.reply('Este comando só pode ser usado em um grupo!');
        }
    }
}