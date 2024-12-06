const prefix = require("../package.json").prefix
const nomebot = require("../package.json").nomebot



module.exports = {
    name: "lista",
    aliases: ["list", "listas"],
    description: "Retorna uma lista de conteúdos do curso!",
    async execute(client, message, args) {
        client.sendListMessage(message.from, {
            buttonText: 'Listagem',
            description: 'Aqui está!\nUma lista de documentos importantes que pode te ajudar 😊',
            footer: nomebot,
            sections: [
                /*{
                    title: 'Menu voltar',
                    rows: [
                        {
                            rowId: '1',
                            title: 'Voltar ao menu inicial'
                        }
                    ],
                },*/
                {
                    title: 'Listagem de documentos da UDF!',
                    rows: [
                        {
                            rowId: '1',
                            title: `Manual de Normatização e Formação de Trabalhos Acadêmicos`,
                            description: 'UDF 2024',
                        },
                        {
                            rowId: '2',
                            title: `Regulamento Geral de TCC`,
                            description: 'UDF 2024',
                        },
                        {
                            rowId: '3',
                            title: `PROCEDIMENTOS FLUXOS TRABALHO DE CONCLUSAO DE CURSO TCC`,
                            description: 'UDF 2024',
                        },
                        /*{
                            rowId: '4',
                            title: `Guia DOL\'s`,
                            description: 'Disciplinas online 2024',
                        },*/
                        {
                            rowId: '5',
                            title: `Calendário Acadêmico 2024`,
                            description: 'UDF 2024',
                        },
                        {
                            rowId: '6',
                            title: `Regulamento Geral Atividades Complementares`,
                            description: 'UDF 2024',
                        },
                        {
                            rowId: '7',
                            title: `Manual do Aluno - 2024.2`,
                            description: 'UDF 2024',
                        },
                        /*{
                            rowId: '8',
                            title: ``,
                            description: '',
                        },*/
                    ],
                }
            ],
        });
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
                        title: 'Menu voltar',
                        rows: [
                            {
                                rowId: '1',
                                title: `Teste Vocacional`
                            },
                            {
                                rowId: '2',
                                title: `Voltar ao menu inicial`
                            }
    
                        ]
                    }
                ],
            });
        }, 1000);
    }
}