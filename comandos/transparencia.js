var axios = require("axios");

module.exports = {
    name: "tp",
    aliases: ["transparencia"],
    description: "Veja !",
    async execute(client, message, args) {

        await axios.get(`https://noticias.cruzeirodosuleducacional.edu.br/`)
        .then(async (response) => {
            console.log(response)
        })


        /* const reply = resposta.data.content
 
         client.reply(
             message.from,
             reply,
             message.id.toString()
         )*/
    }
} 