const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDO04qijLTldVXtz5QDzeu8tlgvabHrvdw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
/*({ 
    model: "gemini-1.5-flash" ,
    generationConfig: {
      temperature: 1.0,}
    });*/
const nomebot = require('../package.json').nomebot

module.exports = {
    name: "gpt",
    aliases: ["chat", "google"],
    description: "Veja !",
    async execute(client, message, args) {
        //client.sendText(message.from, "Humm... Deixe-me pensar!");
        client.sendReactionToMessage(message.id, '🤔')
        client.sendImageAsStickerGif(message.from, './attachments/gifs/pesq.gif');


        const prompt = args.join(" ");

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        /*client.sendFile(
            message.from,
            './attachments/result.jpg',
        )*/
        client.reply(
            message.from,
            text,
            message.id.toString()
        );
        setTimeout(() => {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                title: `Opa, ${message.notifyName}`,
                footer: nomebot,
                sections: [
                    {
                        title: 'Menu voltar',
                        rows: [
                            {
                                rowId: '1',
                                title: `Voltar ao menu inicial`
                            }
    
                        ]
                    }
                ],
            });
        }, 3000);
        
    }
} 