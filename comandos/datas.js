//const { Location } = require('../index');
const nomebot = require("../package.json").nomebot


module.exports = {
  name: "datas",
  aliases: ["dates", "importantes"],
  description: "Veja !",
  async execute(client, message, args) {
    client.sendFile(
      message.from,
      './attachments/sl.jpg',
    )
    setTimeout(() => {
    client.sendListMessage(message.from, {
      buttonText: 'Clique aqui 👈🏻',
      description: 'Por favor, selecione seu turno abaixo 👇🏻',
      title: `Opa, ${message.notifyName}`,
      footer: nomebot,
      sections: [
        {
          title: 'Menu opções',
          rows: [
            {
              rowId: '1',
              title: `Diurno`
            },
            {
              rowId: '1',
              title: `Noturno`
            },
            {
              rowId: '1',
              title: `Voltar ao menu inicial`
            },

          ]
        }
      ],
    });
  }, 2000);
  }
}