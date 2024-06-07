const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDO04qijLTldVXtz5QDzeu8tlgvabHrvdw");
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const { MessageMedia } = require('../index');

module.exports = {
    name: "gpt",
    aliases: ["chat"],
    description: "Veja !",
    async execute(client, msg, args) {
       const chat = await msg.getChat();
       chat.sendSeen();
       chat.sendMessage("Humm... Deixe-me pensar!");
       chat.sendStateRecording();
       chat.sendStateTyping();
       chat.clearState();

       const prompt = args.join(" ");

       const result = await model.generateContent(prompt);
       const response = await result.response;
       const text = response.text();
       //console.log(text)
       msg.reply(text)
           
    }
} 