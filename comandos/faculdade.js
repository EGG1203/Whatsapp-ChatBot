const { Location } = require('../index');

module.exports = {
    name: "faculdade",
    aliases: ["localização", "localization"],
    description: "Veja a localização da faculdade no mapa!",
    async execute(client, msg, args) {
        msg.reply(new Location(-15.8026199,-47.8995229, '704/904 Seps Eq 702/902, Brasília - DF, 70390-045\nUDF, Centro Universitário'));         
    }
}