const Maths = require('mathjs');

module.exports = {
    name: "calc",
    aliases: ["calculator", "calcular"],
    description: "Calculadora!",
    async execute(client, msg, args) {
        if(!args.join(' ')) return msg.reply('Digite algo para eu poder calcular!')
        const mtm = args.join(' ')
            try {
                if (typeof Maths.evaluate(mtm) !== "number") {
                    msg.reply(`"${mtm}"?\nUse somente números`)
                } else {
                    msg.reply(`${mtm} = ${Maths.evaluate(mtm)}`)
                }
            } catch (e) {
                msg.reply(`"${mtm}"???\nUse somente números e as 4 operações básicas, por favor!`)
            }
    }
}