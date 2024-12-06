const { OpenAI } = require("openai")

module.exports = {
    name: "gpt2",
    aliases: ["chat2"],
    description: "Veja !",
    async execute(client, message, args) {

        const config = new OpenAI({
            apiKey: "sk- ",
        })
        const openai = new OpenAI(config);

        const prompt = args.join(" ");

        const resposta = await openai.chat.completions.create({
            model: "gpt-4",
            messages: prompt,
            max_tokens: 500,
            temperature: 0.6,
        });

        const reply = resposta.data.choices[0].message.content

        client.reply(
            message.from,
            reply,
            message.id.toString()
        )
    }
} 