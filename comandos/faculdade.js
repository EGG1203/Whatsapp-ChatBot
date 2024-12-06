//const { Location } = require('../index');
const nomebot = require("../package.json").nomebot


module.exports = {
  name: "faculdade",
  aliases: ["localização", "localization"],
  description: "Veja a localização da faculdade no mapa!",
  async execute(client, message, args) {
    client.sendLocation(message.from, '-15.8026199', '-47.8995229', '704/904 Seps Eq 702/902, Brasília - DF, 70390-045\nUDF, Centro Universitário');
    /*client.sendFile(
      message.from,
      './attachments/udf.jpeg',
      {
        type: 'image',
        caption: 'Caso preciso de ajuda, utilize o  comando *\/ajuda*',
        buttons: [
          {
            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
            text: 'Área do Aluno'
          },
          {
            url: 'https://portal.office.com',
            text: 'Webmail/Office (cs.udf.edu.br)'
          },
          {
            url: 'https://outlook.office365.com/mail/inbox',
            text: 'Acessar Office 365 (cs.udf.edu.br)'
          }
        ],
        title: 'Links que podem te ajudar!',
        footer: nomebot
      }
    )*/
    setTimeout(() => {
      client.sendFile(message.from,
        './attachments/test.jpg',
      )
      client.sendListMessage(message.from, {
        buttonText: 'Clique aqui 👈🏻',
        description: 'Faça-o agora mesmo! Escolha a opção abaixo 👇🏻',
        title: `Opa, ${message.notifyName}, sabia que a Cruzeiro do Sul possui um teste vocacional só para você?`,
        footer: nomebot,
        sections: [
          {
            title: 'Menu opções',
            rows: [
              {
                rowId: '1',
                title: `Teste Vocacional`
              },
              {
                rowId: '2',
                title: `Área do Aluno`
              },
              {
                rowId: '3',
                title: `Webmail/Office (cs.udf.edu.br)`
              },
              {
                rowId: '4',
                title: `Acessar Office 365 (cs.udf.edu.br)`
              },
              {
                rowId: '5',
                title: `Voltar ao menu inicial`
              }

            ]
          }
        ],
      });
    }, 1000);
  }
}