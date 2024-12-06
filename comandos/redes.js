const nomebot = require("../package.json").nomebot

module.exports = {
    name: "redes",
    aliases: ["sociais"],
    description: "Veja !",
    async execute(client, message, args) {
        client.sendListMessage(message.from, {
            buttonText: 'Clique aqui 👈🏻',
            description: 'Veja as redes sociais do Centro Universitário UDF',
            footer: nomebot,
            sections: [
                {
                    title: 'Redes sociais UDF',
                    rows: [
                        {
                            rowId: '1',
                            title: `Instagram`,
                            description: 'https://www.instagram.com/udf_oficial',
                        },
                        {
                            rowId: '2',
                            title: `LinkedIn`,
                            description: 'https://www.linkedin.com/school/udfcentrouniversitario/?originalSubdomain=br',
                        },
                        {
                            rowId: '3',
                            title: `Facebook`,
                            description: 'https://www.facebook.com/oudfcentrouniversitario',
                        },
                        {
                            rowId: '4',
                            title: `YouTube`,
                            description: 'https://www.youtube.com/c/UDFCentroUniversitario',
                        },
                        {
                            rowId: '5',
                            title: `X(Twitter)`,
                            description: 'https://x.com/udf_oficial',
                        }
                    ],
                },
                {
                    title: 'Menu voltar',
                    rows: [
                        {
                            rowId: '1',
                            title: 'Voltar ao menu inicial'
                        }
                    ],
                }
            ],
        });
        /*client.sendFile(message.from, './attachments/redes.png',
            {
                //type: 'image',
                caption: 'Veja as redes sociais do Centro Universitário UDF',
                buttons: [
                    {
                        url: 'https://www.facebook.com/oudfcentrouniversitario',
                        text: 'Facebook'
                    },
                    {
                        url: 'https://www.instagram.com/udf_oficial',
                        text: 'Instagram'
                    },
                    {
                        url: 'https://www.linkedin.com/school/udfcentrouniversitario/?originalSubdomain=br',
                        text: 'LinkedIn'
                    }
                ],
                title: `Olá, ${message.notifyName} 👋🏻`,
                footer: nomebot
            },
        );
        setTimeout(() => {
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
        }, 3000);*/
    }
} 