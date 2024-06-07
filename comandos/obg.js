module.exports = {
    name: "obg",
    aliases: ["obrigado", "brigado"],
    description: "Agradeço!",
    async execute(client, msg, args) {
        const frases = [
            {
                frase: 'De nada!'
            },
            {
                frase: 'Por nada!'
            },
            {
                frase: 'Não seja por isso!'
            },
            {
                frase: 'Eu que agradeço!'
            },
            {
                frase: 'Obrigado a você!'
            },
            {
                frase: 'Disponha!'
            },
            {
                frase: 'Às ordens!'
            },
            {
                frase: 'Que nada!'
            },
            {
                frase: 'Imagina!'
            },
            {
                frase: 'Estou aqui pra ajudar!'
            },
        ]
        const rand = Math.floor(Math.random() * frases.length)
        msg.reply(frases[rand].frase)
    }
}