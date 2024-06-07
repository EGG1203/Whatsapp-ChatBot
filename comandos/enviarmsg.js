const prefix = require("../package.json").prefix


module.exports = {
    name: "enviarmsg",
    aliases: ["envmsg"],
    description: "Envie uma mensagem para alguém através do bot!",
    async execute(client, msg, args) {
        if(!args.join(' ')) return msg.reply(`*Use:* ${prefix}enviarmsg <Número> <msg>\n*Exemplo:* ${prefix}enviarmsg 556187654321 oi`)
        let chat = await msg.getChat();
            let number = args[0];
            const registrado = await client.isRegisteredUser(number + '@c.us');
            if(!args) return msg.reply(`*Use:* enviarmsg <Número> <msg>\n*Exemplo:* ${prefix}enviarmsg 556187654321 oi`)
            let messageIndex = msg.body.indexOf(number) + number.length;
            let message = msg.body.slice(messageIndex, msg.body.length);
            //number = number.includes('@c.us') ? number : `${number}@c.us`;
            //if (!registrado) return msg.reply("*Use:* !enviarmsg <Número> <msg>\n*Exemplo:* !enviarmsg 556187654321@c.us oi")
            chat.sendSeen();
            client.sendMessage(number, message)
            msg.reply(`Mensagem enviada com sucesso!\n*Número:* ${number}\n*Mensagem:* ${message}`)
    }
}