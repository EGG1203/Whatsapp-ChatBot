/*module.exports = {
    name: "infomidia",
    aliases: ["mediainfo"],
    description: "Veja as informações da mídia enviada!",
    async execute(client, msg, args) {
        const attachmentData = await msg.downloadMedia();
        if(attachmentData.filename == undefined) {
            msg.reply(`*Informação de mídia*\nTipo: ${attachmentData.mimetype}\nDados (base64): ${attachmentData.data.length}`);
        } else {
            msg.reply(`*Informação de mídia*\nTipo: ${attachmentData.mimetype}\nNome do arquivo: ${attachmentData.filename}\nDados (base64): ${attachmentData.data.length}`);
        }
    }
}*/