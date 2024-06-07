module.exports = {
    name: "join",
    aliases: ["entrar"],
    description: "Adicione o bot à um grupo!",
    async execute(client, msg, args) {
        if (msg.from == "556196621014@c.us" || msg.author == "556196621014@c.us") {
            const inviteCode = msg.body.split(' ')[1];
            try {
                await client.acceptInvite(inviteCode);
                    msg.reply('Me juntei ao grupo!');
            } catch (e) {
                console.log(e)
                msg.reply('Esse código de convite parece ser inválido.');
            }
        } else {
            msg.reply("Você não tem permissão")
        }
    }
}