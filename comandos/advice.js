const translate = require("google-translate-api")

const axios = require("axios")

module.exports = {
    name: "advice",
    aliases: ["conselho"],
    description: "test!",
    async execute(client, msg, args) {

        
            try {
              const result = await axios.get("https://api.adviceslip.com/advice");
              //console.log(result.data.slip.advice);
              msg.reply(result.data.slip.advice)
            } catch (error) {
              console.log(error);
              msg.reply("Ops! Ocorreu um erro, tente novamente mais tarde.")
            }
          
        
        
    }
}