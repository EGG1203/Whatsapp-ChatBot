const axios = require('axios');
const Converter = require('timestamp-conv');
let d = new Date();
let token = 'b28258578b9a405f956a6f418d41e613';
let token2 = 'bde2e1fbf1bc47b9955fca923ff09384';
const nomebot = require("../package.json").nomebot


module.exports = {
    name: "ping",
    description: "Ping!",
    async execute(client, message, args) {
        //const Date = new Converter.date(message.timestamp)

        client.reply(message.from, `Pong? 🏓 \nQue tal vermos as notícias?!\nAguarde enquanto eu as reuno 📰`, message.id.toString())
        client.sendImageAsStickerGif(message.from, './attachments/gifs/pesq.gif');
        //const url = `http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3477/current?token=${token2}`

        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=${token}`

        await axios.get(apiUrl).then(async (response) => {
            const result = response.data.articles
            var convertapi = require('convertapi')('secret_XoaiquW6rafIum0C');
            convertapi.convert('jpg', {
                Url: 'https://wttr.in/brasilia'
            }, 'web').then(function (result) {
                result.saveFiles('./attachments');
            });
            let vars = `*ÚLTIMAS NOTÍCIAS*: \n`
            for (let i = 0; i < result.length; i++) {

                const shortReq = await axios.get(`https://is.gd/create.php?format=json&url=${result[i].url}&logstats=1`);
                const data = await shortReq.data;
                console.log(data)

                vars += `\n------------------------------------------------\n\n*Título*: ${result[i].title}\n\n*Link*: ${data.shorturl}\n\n`
            }
            setTimeout(() => {
                client.sendFile(message.from, './attachments/not.png',
                    {
                        type: 'image',
                        caption: `Reuni as 10 últimas notícias do portal Google News (Brasil) para você!\nCaso queira dar uma olhada nas *Notícias da faculdade*, pressione o botão lá embaixo 👇🏻\n\n\n${vars}`,
                        buttons: [
                            {
                                url: 'https://noticias.cruzeirodosuleducacional.edu.br/#noticias',
                                text: 'Notícias Cruzeiro do Sul'
                            }
                        ],
                        title: `Feito, ${message.notifyName} 👋🏻`,
                        footer: nomebot
                    },
                );
            }, 2000);
            setTimeout(() => {
                client.sendFile(message.from,
                    './attachments/test.jpg',
                    {
                        type: 'image',
                        caption: `Faça-o agora mesmo! Pressione o botão abaixo 👇🏻`,
                        buttons: [
                            {
                                id: '1',
                                text: 'Teste Vocacional'
                            }
                        ],
                        title: `${message.notifyName}, sabia que a Cruzeiro do Sul possui um teste vocacional só para você?`,
                        footer: nomebot
                    }
                )
            }, 5000);
            setTimeout(() => {
                client.sendFile(message.from,
                    './attachments/wttr_in.jpg',
                    {
                        type: 'image',
                        //caption: `Só passando pra avisar, este é o clima para os próximos 3 dias em Brasília\nAgora são ${d.getHours()}:${d.getMinutes()} do dia ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
                        caption: `Só passando pra avisar, este é o clima para os próximos 3 dias em Brasília`,
                        buttons: [
                            {
                                id: '1',
                                text: 'Voltar'
                            }
                        ],
                        title: `Olá, ${message.notifyName} 👋🏻`,
                        footer: nomebot
                    }
                )
            }, 8000);
        })
    }
}


/*client.sendListMessage(message.from, {
                buttonText: 'Notícias',
                description: 'Veja as últimas notícias que estão acontecendo no Brasil!',
                footer: "GG BOT UDF 😎",
                sections: [
                    {
                        title: 'últimas notícias!',
                        rows: [
                            {
                                rowId: '1',
                                title: result[0].title,
                                description: result[0].publishedAt,
                            },
                            {
                                rowId: '2',
                                title: result[1].title,
                                description: result[1].publishedAt,
                            },
                            {
                                rowId: '3',
                                title: result[2].title,
                                description: result[2].publishedAt,
                            },
                            {
                                rowId: '4',
                                title: result[3].title,
                                description: result[3].publishedAt,
                            },
                            {
                                rowId: '5',
                                title: result[4].title,
                                description: result[4].publishedAt,
                            },
                            {
                                rowId: '6',
                                title: result[5].title,
                                description: result[5].publishedAt,
                            },
                            {
                                rowId: '7',
                                title: result[6].title,
                                description: result[6].publishedAt,
                            },
                            {
                                rowId: '8',
                                title: result[7].title,
                                description: result[7].publishedAt,
                            }
                        ],
                    },
                ],
            });*/