const nomebot = require("../package.json").nomebot


module.exports = {
    name: "chats",
    aliases: ["conversas"],
    description: "Veja !",
    async execute(client, message, args) {
        client.sendListMessage(message.from, {
            buttonText: 'Opções de chats',
            description: 'Escolha uma das opções para começar!',
            footer: nomebot,
            sections: [
                {
                    title: 'Chats',
                    rows: [
                        {
                            rowId: '1',
                            title: `Todos os chats`,
                            //description: 'GG BOT UDF 😎',
                        },
                        {
                            rowId: '2',
                            title: `Últimos 20 chats`,
                           // description: 'GG BOT UDF 😎',
                        },
                        {
                            rowId: '3',
                            title: `Somente usuários`,
                            //description: 'GG BOT UDF 😎',
                        },
                        {
                            rowId: '4',
                            title: `Somente grupos`,
                            //description: 'GG BOT UDF 😎',
                        },
                        /*{
                            rowId: '5',
                            title: ``,
                            description: 'GG BOT UDF 😎',
                        },*/
                    ],
                },
            ],
        });
    }
}