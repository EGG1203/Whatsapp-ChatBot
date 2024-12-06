const prefix = require("../package.json").prefix
const nomebot = require("../package.json").nomebot


module.exports = {
    name: "aulas",
    aliases: ["aula", "zoom"],
    description: "Veja o link das aulas!",
    async execute(client, message, args) {
        client.sendListMessage(message.from, {
            buttonText: 'Clique aqui 👈🏻',
            description: 'Qual semestre está cursando? 🤔',
            title: `Olá, ${message.notifyName}`,
            footer: nomebot,
            sections: [
                {
                    title: 'Selecione o semestre',
                    rows: [
                        {
                            rowId: '1',
                            title: `7°`
                        },
                        {
                            rowId: '2',
                            title: `8°`
                        },
                        {
                            rowId: '3',
                            title: `Nenhuma das opções`
                        },
                        {
                            rowId: '4',
                            title: `Voltar ao menu inicial`
                        },

                    ]
                }
            ],
        });
        /*
        client.sendText(message.from,
            'Qual semestre está cursando?',
            {
                buttons: [
                    {
                        id: '1',
                        text: '7°'
                    },
                    {
                        id: '2',
                        text: '8°'
                    },
                    {
                        id: '3',
                        text: 'Nenhuma das opções'
                    }
                ],
                title: `Olá, ${message.notifyName} 👋🏻`,
                footer: nomebot
            }
        )
            client.sendText(
              message.from,
              'Caso deseje voltar, pressione o botão 👇🏻',
              {
                buttons: [
                  {
                    id: '1',
                    text: 'Voltar'
                  }
                ],
                //title: `Olá, ${message.notifyName} 👋🏻`,
                footer: nomebot
              },
            )
        
        
        /*
        client.sendListMessage(message.from, {
            buttonText: 'Clique aqui',
            description: 'Menu de aulas presenciais e EAD\'s',
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
                    title: 'Menu de aulas',
                    rows: [
                        {
                            rowId: '1',
                            title: `Ciência de Dados e Aprendizagem de Máquina`,
                            description: 'Prof. Leticia Toledo Maia Zoby',
                        },
                        {
                            rowId: '2',
                            title: `Computação em Nuvem`,
                            description: 'Prof. Francisco de Assis Silva de Araujo',
                        },
                        {
                            rowId: '3',
                            title: `Ética Geral e Cidadania`,
                            description: 'Prof. Rebeca Sousa Silva Pinheiro',
                        },
                        {
                            rowId: '4',
                            title: `Projeto de Linguagens de Programação`,
                            description: 'Prof. Kadidja Valéria Reginaldo de Oliveira',
                        }
                    ],
                }
            ],/
        });*/
    }
}