
module.exports = {
    name: "add",
    aliases: ["adc"],
    description: "Adicione alguém no grupo!",
    async execute(client, msg, args) {
        const chat = await msg.getChat()
        if(chat.isGroup) {
            let participantIds = args
            await chat.addParticipants(participantIds)
        } else {
            msg.reply('Este comando só pode ser executado em um grupo')
        }
    }
}