const figlet = require("figlet");

module.exports = {
    name: "ascii",
    description: "Retorna o texto fornecido em formato ascii!",
    async execute(client, msg, args) {
        const chat = await msg.getChat();
        let text = args.join(" ");
        if (!text) {
            return msg.reply(`Digite alguma mensagem!`);
        }
        if (text.length > 20) {
            return msg.reply(
              `Por favor, coloque um texto com 20 caracteres ou menos porque a conversão não será boa!`
            );
        }
        figlet(text, function (err, data) {
            chat.sendMessage(data, {
              code: "AsciiArt",
            });
          });
    }
}