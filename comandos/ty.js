module.exports = {
    name: "thanks",
    aliases: ["ty"],
    description: "Agradeço!",
    async execute(client, msg, args) {
        const frases = [
            {
                frase: 'You’re welcome!'
            },
            {
                frase: 'That’s okay!'
            },
            {
                frase: 'That’s all right!'
            },
            {
                frase: 'No problem!'
            },
            {
                frase: 'It was nothing!'
            },
            {
                frase: 'No worries!'
            },
            {
                frase: 'Not at all!'
            },
            {
                frase: 'My pleasure!'
            },
            {
                frase: 'It was a pleasure!'
            },
            {
                frase: 'You’re most welcome!'
            },
            {
                frase: 'You’re entirely welcome!'
            },
            {
                frase: 'The pleasure was all mine!'
            },
            {
                frase: 'Any time!'
            },
            {
                frase: 'No sweat!'
            }
        ]
        const rand = Math.floor(Math.random() * frases.length)
        msg.reply(frases[rand].frase)
    }
}