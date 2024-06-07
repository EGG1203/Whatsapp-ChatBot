const { MessageMedia } = require('../index');
const { client, GenerationStyle, Status } = require('imaginesdk');
const imagine = client("vk-BquW9w3T4PlgemEHjWO00H172D9fcVxbUmo8bSAlMGtzRR");

module.exports = {
    name: "imagine",
    aliases: ["crie"],
    description: "Veja !",
    async execute(client, msg, args) {
       const imagem = args.join(" ")
       const chat = await msg.getChat();
       chat.sendMessage("Gerando imagem, por favor, aguarde! 🖥️🔍\nEste processo pode demorar de 5 à 55 segundos;")

         const response = await imagine.generations(
           imagem,
           {
             style: GenerationStyle.IMAGINE_V5,
           }
         );
       
         if (response.status() === Status.OK) {
           const image = response.getOrThrow();
           image.asFile("output.png");
           msg.reply(MessageMedia.fromFilePath("./output.png"))
         } else {
           console.log(response.errorOrThrow());
         }

       
           
    }
} 