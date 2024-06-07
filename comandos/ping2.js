const { MessageMedia } = require('../index')
const Converter = require('timestamp-conv');

module.exports = {
    name: "ping",
    description: "Ping!",
    async execute(client, msg, args) {
        const Date = new Converter.date(msg.timestamp);
        const cidade = args.join(" ")
        if(!cidade) {
        const link = `https://wttr.in/brasilia.png?m`;
        const img = await MessageMedia.fromUrl(link);

        const contact = await msg.getContact();
        const chat = await msg.getChat();

        msg.reply("pong?");
        chat.sendMessage(`Olá @${contact.number}`, {mentions: [contact]})
        chat.sendMessage(img, {caption: `Este é o clima para os próximos 3 dias em Brasilia\nAgora são ${Date.getHour()}:${Date.getMinute()} do dia ${Date.getDay()}/${Date.getMonth()}/${Date.getYear()}`})
        } else {
            const link = `https://wttr.in/${cidade}.png?m`;
            const img = await MessageMedia.fromUrl(link);

        const contact = await msg.getContact();
        const chat = await msg.getChat();

            msg.reply("pong?");
            chat.sendMessage(`Olá @${contact.number}`, {mentions: [contact]})
            chat.sendMessage(img, {caption: `Este é o clima para os próximos 3 dias em ${cidade}\nAgora são ${Date.getHour()}:${Date.getMinute()} do dia ${Date.getDay()}/${Date.getMonth()}/${Date.getYear()}`})
        
        }
    }
}