

module.exports = {
    name: "repetir",
    aliases: ["repete"],
    description: "Repete a mensagem descrita!",
    async execute(client, msg, args) {
        client.sendMessage(msg.from, args.join(' '));
    }
}