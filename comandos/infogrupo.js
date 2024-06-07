module.exports = {
  name: "infogrupo",
  aliases: ["infogroup", "groupinfo"],
  description: "Veja as informações do grupo!",
  async execute(client, msg, args) {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      try {
        if (chat.description == undefined) {
          msg.reply(`*Detalhes do Grupo*\nNome: ${chat.name}\nCriado em: ${chat.createdAt.toString()}\nCriado por: @${chat.owner.user}\nParticipantes: ${chat.participants.length}`, null, {
            mentions: [chat.owner._serialized]
          });
        } else {
          msg.reply(`*Detalhes do Grupo*\nNome: ${chat.name}\nDescrição: ${chat.description}\nCriado em: ${chat.createdAt.toString()}\nCriado por: @${chat.owner.user}\nParticipantes: ${chat.participants.length}`, null, {
            mentions: [chat.owner._serialized]
          });
        }
      } catch {
        console.log("Deu erro!");
      }
    } else {
      msg.reply('Este comando só pode ser usado em um grupo!');
    }
  }
}