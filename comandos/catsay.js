const { MessageMedia } = require('../index');

module.exports = {
    name: "catsay",
    aliases: ["cs"],
    description: "O que o gato está dizendo?",
    async execute(client, msg, args) {
        const chat = await msg.getChat();
        const state = "disabled";
    if (state === "disabled") {
      return msg.reply("O comando foi desativado por enquanto");
    }
    const msgg = args.join(" ");
    if (!msgg) {
      return msg.reply("O que você quer que o gato diga?");
    }
    const cat = `https://cataas.com/cat/cute/says/${msgg}`
    const img = await MessageMedia.fromUrl(cat)
        chat.sendMessage(img);
    }
}