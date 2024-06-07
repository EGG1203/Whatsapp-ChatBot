const restart = require('make-it-restart');
let restartor = restart('node .')

module.exports = {
    name: "r",
    aliases: ["reiniciar"],
    description: "Reiniciar!",
    async execute(client, msg, args) {
        if(msg.author === '556196621014@c.us' || msg.from === '556196621014@c.us' || msg.author === '556185305544@c.us') {
            msg.reply("Tentando reiniciar, verifique meu console!")
                process.kill(process.pid)
                restartor()
        } else {
            msg.reply("Você não tem permissão 😎")
        }
    }
}