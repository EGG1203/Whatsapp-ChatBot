const { Buttons } = require('../index')

module.exports = {
    name: "fig",
    aliases: ["figurinhas"],
    description: "Veja algumas figurinhas que tenho para você!",
    async execute(client, msg, args) {
        let desativado = true
        if(desativado) {
            return msg.reply("Comando desativado até a próxima atualização Multi-device, desculpe-nos o transtorno!")
        }
        const chat = await msg.getChat()
        let button = new Buttons('Selecione um pacote de figurinhas',[{body:'Round 6'},{body:'Round 6 animado'},{body: 'E se você'}],'Figurinhas');
        chat.sendMessage(button)
    }
}