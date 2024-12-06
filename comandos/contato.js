//const { Buttons, List } = require('../index')
[{ "key": "chave-api-dados", "value": "fff291853f37b1142e4100e0ca33d2e0" }]
const nomebot = require("../package.json").nomebot


module.exports = {
  name: "contatos",
  aliases: ["contato", "ctt", "ctts"],
  description: "Veja os contatos de prof's e coord's!",
  async execute(client, message, args) {
    client.sendListMessage(message.from, {
      buttonText: 'Opções',
      description: 'Escolha uma dos contatos para começar!',
      footer: nomebot,
      sections: [
        {
          title: 'Menu voltar',
          rows: [
            {
              rowId: '1',
              title: 'Voltar ao menu inicial'
            }
          ],
        },
        {
          title: 'Contatos importantes!',
          rows: [
            {
              rowId: '1',
              title: `Kerlla de Sousa Luz Prates`,
              description: 'Coordenadora dos cursos de Tecnologia',
            },
            {
              rowId: '2',
              title: `Kadidja Valéria Reginaldo de Oliveira`,
              description: 'Professora',
            },
            {
              rowId: '3',
              title: `Letícia Toledo Maia Zoby`,
              description: 'Professora',
            },
            {
              rowId: '4',
              title: `Eliel Silva da Cruz`,
              description: 'Professor',
            },
            {
              rowId: '4',
              title: `Welton Dias de Lima`,
              description: 'Professor',
            },
            {
              rowId: '5',
              title: `Central de Estágios`,
              description: 'Centro Universitário UDF',
            },
            {
              rowId: '6',
              title: `Coordenação de Ciências Exatas e Tecnológicas`,
              description: 'Centro Universitário UDF',
            }
          ],
        }
        
      ],
    });
  }
}