const rastro = require('rastrojs')

module.exports = {
    name: "correios",
    aliases: ["rastreio", "encomenda"],
    description: "Rastreie sua encomenda do correios!",
    async execute(client, msg, args) {
        var state = 'desativado'
        if(state === "desativado") return msg.reply(`O comando foi desativado! Contate o proprietário do bot para obter mais informações!`)
        if(!args.join(' ')) return msg.reply('Forneça um código de rastreio do correios, por favor!')
        const codigo = args.join(' ')
        const data = await rastro.track(codigo);
        const track = data[0];
        if (track.isInvalid && track.isInvalid === true) {
            return msg.reply(`Código de rastreio inválido!`)
        }
        const { tracks, code, isDelivered } = track;
        if (isDelivered) {
            return msg.reply(`Rastreio do pedido *${code}*\nSeu pedido já foi entregue! 👏`);
        } else {
            const { locale, observation } = tracks[tracks.length - 1];
            if (observation) {
              const to = observation.split("para");
                return msg.reply(`Rastreio do pedido *${code}*\nSeu objeto já está a caminho! 🚶‍♂️🚶‍♀️\nObjeto encaminhado para ${to[1]}`);
            } else {
                return msg.reply(`Rastreio do pedido *${code}*\nSeu objeto já foi postado! ⚠\nObjeto postado em ${locale}`);
            }
        }
    }
}