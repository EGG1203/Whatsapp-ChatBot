const { Location } = require('../index');

module.exports = {
    name: "4r",
    aliases: ["4R"],
    description: "Veja a localização do prédio 4R no mapa!",
    async execute(client, msg, args) {
        msg.reply(new Location(-15.8006303,-47.8997399, 'SGAS I SGAS 903 - Brasília, DF, 70297-400\nEDIFÍCIO REZENDE R. DE REZENDE, UDF'));         
    }
}