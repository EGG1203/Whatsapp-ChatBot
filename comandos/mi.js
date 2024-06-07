const { MessageMedia } = require('../index')

module.exports = {
    name: "mi",
    aliases: ["my"],
    description: "Veja as suas informações!",
    async execute(client, msg, args) {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        const sts = await contact.getAbout();
        const pic = await contact.getProfilePicUrl();
        const pic2 = "https://loritta.website/assets/img/unknown.png"
        let ft = await MessageMedia.fromUrl(pic ? pic : pic2)
        if(sts !== null) {
            chat.sendMessage(`Olá @${contact.number}`, {mentions: [contact]})
            chat.sendMessage(ft, {caption:`*Nome:* ${contact.pushname || contact.shortName || `@${contact.number}`}\n*Número:* ${contact.number || msg.author.split("@c.us")[0]}\n*Empresa:* ${contact.isBusiness ? "Sim" : "Não"}\n*Corporativa:* ${contact.isEnterprise ? "Sim" : "Não"}\n*Dispositivo:* ${msg.deviceType}\n*Recado:* ${sts}`}, {mentions: [contact]})
        } else {
            chat.sendMessage(`Olá @${contact.number}`, {mentions: [contact]})
            chat.sendMessage(ft, {caption: `*Nome:* ${contact.pushname || contact.shortName || `@${contact.number}`}\n*Número:* ${contact.number || msg.author.split("@c.us")[0]}\n*Empresa:* ${contact.isBusiness ? "Sim" : "Não"}\n*Corporativa:* ${contact.isEnterprise ? "Sim" : "Não"}\n*Dispositivo:* ${msg.deviceType}`}, {mentions: [contact]})
        }
    }
}