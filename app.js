const wppconnect = require('@wppconnect-team/wppconnect');
const fs = require('fs');
const { join } = require("path");
const colors = require("colors");
const axios = require("axios");
const db = require("./helpers/mysql")
const { Collection, EmbedBuilder, WebhookClient, cleanCodeBlockContent } = require('discord.js');
const { webhookId, webhookToken, webhookId2, webhookToken2 } = require('./config.json');
const sheetdb = require("sheetdb-node");
const clientSheet = sheetdb({ address: 'aqo1rbhgnviby' })
const speech = require("@google-cloud/speech");
const apispeech = require('./speechapi.json');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDO04qijLTldVXtz5QDzeu8tlgvabHrvdw");
const { Configuration, OpenAIApi } = require("openai")
const { MessageMedia } = require('whatsapp-web.js');
const gifs = require("./gifs");
const { title } = require('process');
let token = 'bbea083c7e184677a9c1b8e45a7597e6';
const PREFIX = require("./package.json").prefix
const nomebot = require('./package.json').nomebot

wppconnect
    .create({
        session: 'sessionName',
        catchQR: (base64Qr, asciiQR) => {
            console.log(asciiQR);
            var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer.from(matches[2], 'base64');

            var imageBuffer = response;
            require('fs').writeFile(
                'out.png',
                imageBuffer['data'],
                'binary',
                function (err) {
                    if (err != null) {
                        console.log(err);
                    }
                }
            );
        },
        logQR: false,
    })
    .then((client) => start(client))
    .catch((error) => console.log(error));

wppconnect.commands = new Collection()

const commandFiles = fs.readdirSync(join(__dirname, "comandos")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "comandos", `${file}`));
    wppconnect.commands.set(command.name, command);
}

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });
const webhookClient2 = new WebhookClient({ id: webhookId2, token: webhookToken2 });

process.title = 'GG WABOT'


function start(client) {

    //STARTOU!!!!!!
    var { MailListener } = require('mail-listener6')

    const { username, password, host, port } = require('./config.json');

    let mailListener = new MailListener({
        username,
        password,
        host,
        port,
        tls: true,
        connTimeout: 10000,
        authTimeout: 5000,
        autotls: 'never',
        tlsOptions: { rejectUnauthorized: false },
        mailbox: "INBOX",
        searchFilter: ["UNSEEN"],
        markSeen: true,
        //fetchUnreadOnStart: false,
        //mailParserOptions: { streamAttachments: true },
        //attachments: false,
        //attachmentOptions: { directory: "attachments/" }
    });

    startt()

    function startt() {
        mailListener.start()

        mailListener.on('server:connected', function () {
            console.log('imap conectado')
        })

        mailListener.on('mailbox', function (mailbox) {
            console.log('Número de e-mails:', mailbox.messages.total)
        })

        mailListener.on("server:disconnected", function () {
            console.log("imap desconectado");
            console.log('imap reiniciando...')
            //start()
        });

        mailListener.on("error", function (err) {
            console.log(err);
            console.log('imap reiniciando...')
            //start()
        });

        mailListener.on("mail", function (mail, seqno) {

            if (mail.from.value[0].address == 'do-not-reply@blackboard.com') {
                console.log(mail)
                let number = '556185048686-1613998777@g.us'
                let number2 = '120363041128865536@g.us'
                if (mail.text.includes('@import')) {
                    return;
                } else if (mail.text.includes('Código exclusivo do item')) {
                    client.sendText(number, `*EM FASE DE TESTES, QUALQUER PROBLEMA COMUNICAR O @556196621014*\n\nE-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ~BLOQUEADO~\n*Descrição:* ~BLOQUEADO~`, { mentions: ['556196621014@c.us'] })
                    client.sendText(number2, `E-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ~BLOQUEADO~\n*Descrição:* ~BLOQUEADO~`, { mentions: ['556196621014@c.us'] })
                } else {
                    client.sendText(number, `*EM FASE DE TESTES, QUALQUER PROBLEMA COMUNICAR O @556196621014*\n\nE-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ${mail.subject ? mail.subject : "~vazio~"}\n*Descrição:* ${mail.text.split("&nbsp;").join(" ")}`, { mentions: ['556196621014@c.us'] })
                    client.sendText(number2, `E-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ${mail.subject ? mail.subject : "~vazio~"}\n*Descrição:* ${mail.text.split("&nbsp;").join(" ")}\n~Verifique se o e-mail refere-se à sua turma!~`, { mentions: ['556196621014@c.us'] })
                }
            }

            if (mail.from.value[0].address == 'guilherme120347@hotmail.com') {
                console.log(mail)
                let number = '120363243834804321@g.us'
                if (mail.text.includes('@import')) {
                    return;
                } else if (mail.text.includes('Código exclusivo do item')) {
                    client.sendText(number, `E-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ~BLOQUEADO~\n*Descrição:* ~BLOQUEADO~`)
                } else {
                    client.sendText(number, `E-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ${mail.subject ? mail.subject : "~vazio~"}\n*Descrição:* ${mail.text.split("&nbsp;").join(" ")}`)
                }
            }
        })
    }

    /*function isEmptyObject(obj) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }*/


    //////////////////////////////////////////// 
    client.onMessage(async (message) => {
        console.log(message)
        /*try {
            const user = message.from.replace(/\D/g, '')
            const NomeWpp = message.notifyName
            const getUser = await db.getUser(user)
            if(getUser == false) {
                setUserFrom = await db.setUser(user)
                //setWppFrom = await db.setWpp(message.notifyName)
            }
            console.log('foi')
        } catch (e) {
            console.log(e)
        }*/
        /*if (!registrado) {
            client.sendText(
                message.from,
                `Eu sou ${nomebot}\nUm assistente virtual de suporte aos alunos de Ciência da Computação da UDF\nMe parece que você não está registrado no meu banco de dados, pois então, me diga de qual corpo faz parte 👇🏻`, {
                buttons: [
                    {
                        id: '0',
                        text: 'Discente'
                    },
                    {
                        id: '1',
                        text: 'Docente'
                    },
                    {
                        id: '2',
                        text: 'Nenhum'
                    },
                ],
                title: `Ooi, ${message.notifyName}👋🏻`,
                footer: nomebot
            });
        }
        const user = message.from.replace(/\D/g, '');
        clientSheet.read({ search: { whatsapp: user } }).then(async function (data) {
            const userJson = JSON.parse(data);
            if (isEmptyObject(userJson)) {
                clientSheet.create({ ID: Math.floor((Math.random() * 500) + 1), Name: message.sender.shortName || message.notifyName || " ", whatsapp: user, EmailRGM: " " }).then(async function (data) {
                    console.log(data);
                    //clientSheet.read({ search: { ID: user } }).then(async function (datas) {
                    //console.log(JSON.parse(datas))
                    const pic = message.sender.profilePicThumbObj.eurl;
                    const pic2 = "https://loritta.website/assets/img/unknown.png"
                    const embed = new EmbedBuilder()
                        .setTitle('Log SuriBot')
                        .setURL('https://wa.me/556133617303/')
                        .setDescription(`Usuário registrado no banco de dados`)
                        .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                        .addFields(
                            { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                            { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                            //{ name: '\u200B', value: '\u200B' },
                            { name: 'Create', value: `${data}` },
                            // { name: 'ID', value: `${datas}` },
                        )
                        .setThumbnail(pic ? pic : pic2)
                        .setTimestamp()
                        .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                        .setColor(0x00FFFF);

                    webhookClient2.send({
                        username: 'Suri 🦦',
                        avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                        embeds: [embed],
                    });
                    //})
                }, function (err) {
                    console.log(err);
                });
            }
        }, function (err) {
            console.log(err);
        });*/

        /*const registrado = clientSheet.read({ search: { EmailRGM } });
        if (!registrado) {
            client.sendText(message.from, `Olá, ${message.notifyName}\nVocê não está registrado, por favor, informe seu *RGM* ou *e-mail institucional (@cs.udf.edu.br)*`)
        }*/
        if (message.body === '/google\nPesquisa no google o que escrevestes 📃') {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Por favor, forneça algo para que eu possa pesquisar\n*Ex.:* /google receita de bolo de milho\n\nCaso deseje voltar, selecione a opção abaixo 👇🏻',
                title: `Opa, ${message.notifyName}`,
                footer: nomebot,
                sections: [
                    {
                        title: 'Menu voltar',
                        rows: [
                            {
                                rowId: '1',
                                title: `Voltar ao menu inicial`
                            }

                        ]
                    }
                ],
            });
            /*client.sendFile(
                message.from,
                './attachments/1.webp',
                {
                    type: 'image',
                    caption: `Por favor, forneça algo para que eu possa pesquisar\n*Ex.:* /google receita de bolo de milho`,
                    buttons: [
                        {
                            id: '1',
                            text: 'Voltar'
                        }
                    ],
                    title: `Opa, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                }
            )*/
        }

        if (message.body === '/acad \nPesquise atividades acadêmicas relacionadas à sua pesquisa 🔎') {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Por favor, forneça algo para que eu possa pesquisar\n*Ex.:* /acad Trabalho de conclusão de curso sobre...\n\nCaso deseje voltar, selecione a opção abaixo 👇🏻',
                title: `Opa, ${message.notifyName}`,
                footer: nomebot,
                sections: [
                    {
                        title: 'Menu voltar',
                        rows: [
                            {
                                rowId: '1',
                                title: `Voltar ao menu inicial`
                            }

                        ]
                    }
                ],
            });/*
            client.sendFile(
                message.from,
                './attachments/1.webp',
                {
                    type: 'image',
                    caption: `Por favor, forneça algo para que eu possa pesquisar\n*Ex.:* /acad Trabalho de conclusão de curso sobre...`,
                    buttons: [
                        {
                            id: '1',
                            text: 'Voltar'
                        }
                    ],
                    title: `Opa, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                }
            )*/
        }

        //console.log( await client.getChat(message.chatId))
        /*if(!message) {
            setTimeout(() => {
                client.sendFile(
                    message.from,
                    './attachments/s2.jfif',
                    {
                        type: 'image',
                        caption: 'Caso ainda precise de ajuda, veja se alguma dessas opções pode te ajudar!',
                        buttons: [
                            {
                                id: '1',
                                text: 'Comandos'
                            },
                            {
                                id: '2',
                                text: ''
                            },
                        ],
                        title: `Até a próxima, ${message.notifyName} 👋🏻`,
                        footer: nomebot
                    }
                )
            }, 120000);
        }*/
        /*const contact = await client.getContact(message.from)
        const user = await client.getContact(message.from.user)
        clientSheet.read({ search: { whatsapp: user } }).then(function (data) {
            const userJson = JSON.parse(data);
            if (isEmptyObject(userJson)) {
                clientSheet.create({ ID: Math.floor((Math.random() * 500) + 1), Name: contact.name || contact.pushname || " ", whatsapp: user, reclamacao: " ", obs: " ", elogio: " ", Status: "Em aberto" }).then(function (data) {
                    console.log(data);
                }, function (err) {
                    console.log(err);
                });
            }
        }, function (err) {
            console.log(err);
        });
        if (message.body.startsWith('!sheet ')) {
            const mensagem = message.body.slice(7);
            clientSheet.read().then(function (data) {
                const respostas = JSON.parse(data);
                respostas.forEach((resposta, i) => {
                    const whatsapp = resposta.whatsapp;
                    if (message.from == "556196621014@c.us") {
                        setTimeout(() => {
                            client.sendText(whatsapp + '@c.us', mensagem)
                        }, 1000 + Math.floor(Math.random() * 8000) * (1 + i));
                    }
                })
            })
        }*/

        /*if (message.isGroupMsg === false && message.type === 'ptt') {

            client.sendImageAsStickerGif(message.from, './attachments/gifs/1.gif');

            async function quickstart() {

                const ptt = await client.downloadMedia(message.id)
                const buffer = Buffer.from(ptt.split(';base64,').pop(), 'base64');
                fs.writeFile('./audio.ogg', buffer, (err) => {
                    if (err) throw err;
                    console.log('Áudio guardado.');
                });

                const clienti = new speech.SpeechClient({
                    credentials: apispeech
                });

                setTimeout(async () => {
                    const audioBytes = fs.readFileSync('./audio.ogg').toString('base64');

                    const audio = {
                        content: audioBytes
                    };
                    const config = {
                        encoding: 'OGG_OPUS',
                        sampleRateHertz: 16000,
                        languageCode: 'pt-BR'
                    };
                    const request = {
                        audio: audio,
                        config: config,
                    };

                    const [response] = await clienti.recognize(request);
                    const transcription = response.results
                        .map(result => result.alternatives[0].transcript)
                        .join('\n');
                    console.log(`Transcription: ${transcription}`);

                    const result = await model.generateContent(transcription);
                    const resposta = await result.response;
                    console.log(resposta)
                    const text = resposta.text();
                    //console.log(text)
                    client.reply(
                        message.from,
                        text,
                        message.id.toString()
                    )
                }, 2000);
            }
            quickstart();
        }*/
        if (message.body === 'create newsletter' && message.isGroupMsg === false) {
            const t = await client.createNewsletter('WPP Test Newsletter2', {
                description: 'test',
            });
            console.log(t);
            await client.sendText(message.from, '```' + JSON.stringify(t) + '```');
            await client.sendText(
                message.from,
                'Check the channels of connected device'
            );
        }

        if (message.body.startsWith("@556133617303")) {
            client.reply(
                message.from,
                'Olá, eu não respondo à comandos em grupos para evitar conflitos 😕\nMas te mandei uma mensagem no privado que talvez possa te ajudar! 😉 \u2705',
                message.id.toString()
            )
            try {
                client.sendListMessage(message.author, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: `Eu sou ${nomebot}\nUm assistente virtual de suporte aos alunos de Ciência da Computação da UDF\nEstá precisando de ajuda?\nVeja se alguma dessas opções pode te ajudar! 👇🏻`,
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Selecione uma das opções',
                            rows: [
                                {
                                    rowId: '1',
                                    text: 'Comandos'
                                },
                                /*{
                                    rowId: '2',
                                    text: 'Notícias Brasil'
                                },*/

                            ]
                        }
                    ],
                });
                /*client.sendFile(
                    message.author,
                    './attachments/s3.png',
                    {
                        type: 'image',
                        caption: `Eu sou ${nomebot}\nUm assistente virtual de suporte aos alunos de Ciência da Computação da UDF\nEstá precisando de ajuda?\nVeja se alguma dessas opções pode te ajudar!`,
                        buttons: [
                            {
                                id: '1',
                                text: 'Comandos'
                            },
                            {
                                id: '2',
                                text: 'Notícias Brasil'
                            },
                        ],
                        title: `Olá, ${message.notifyName} 👋🏻`,
                        footer: nomebot
                    }
                )*/
            } catch {
                client.reply(
                    message.from,
                    'Falha ao enviar mensagem 😕\nVou verificar o que houve, mas tente utilizar o comando */ajuda* (no meu privado) 😉',
                    message.id.toString()
                )
            }
        }

        if (message.body === 'enq') {
            client.sendText(message.from, 'aaaaaaaaaaaaaaa', {
                useTemplateButtons: true,
                buttons: [
                    {
                        url: 'https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp881320',
                        text: 'Copiar'
                    },
                ],
                title: 'Title',
                footer: 'Footer'
            });
            client.sendText(message.from, `*\`Código\`*\n> quote\n- Item 1\n* Item 2\n1. Item A\n2. Item B`)
        }

        if (message.body === 'Nenhuma das opções') {
            client.sendFile(
                message.from,
                `./duda.png`, {
                type: 'image',
                caption: 'Já que nenhuma das opções lhe ajudou 😕\nTalvez o app Duda possa te ajudar! Escaneie o QR Code ou clique no botão abaixo 👇🏻',
                title: `Opa, ${message.notifyName}`,
                footer: nomebot
            }
            )
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    sections: [
                        {
                            title: 'Menu opções',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `App Duda (Android/iOS)`
                                }

                            ]
                        }
                    ],
                });
            }, 1500);
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },
                    { name: 'Ack QT', value: `Reconhecimento tipo ${message.quotedMsg.ack}` },
                    { name: 'Botões', value: `${JSON.stringify(message.quotedMsg.hydratedButtons)}` },
                    { name: 'rowId', value: `${message.quotedMsg.rowId}` },
                    { name: 'Time', value: `<t:${message.quotedMsg.t}:R>` },


                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });

            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 5000);
        }


        if (message.body === 'App Duda (Android/iOS)' && message.type === 'list_response') {
            client.reply(message.from, 'https://urlgeni.us/metatron', message.id.toString())
        }
        if (message.body === '7°' && message.type === 'list_response') {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Menu de aulas presenciais e EAD\'s (7° Semestre)',
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
                            },
                            {
                                rowId: '5',
                                title: `Trabalho de Conclusão de Curso I`,
                                description: 'Prof. Kerlla de Souza Luz',
                            }
                        ],
                    }
                ],
            });
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },
                    { name: 'Ack QT', value: `Reconhecimento tipo ${message.quotedMsg.ack}` },
                    { name: 'Botões', value: `${JSON.stringify(message.quotedMsg.hydratedButtons)}` },
                    { name: 'rowId', value: `${message.quotedMsg.rowId}` },
                    { name: 'Time', value: `<t:${message.quotedMsg.t}:R>` },


                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
        }
        if (message.body === '8°' && message.type === 'list_response') {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Menu de aulas presenciais e EAD\'s (8° Semestre)',
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
                            },
                            {
                                rowId: '5',
                                title: `Trabalho de Conclusão de Curso II`,
                                description: 'Prof. Orientador(a)',
                            }
                        ],
                    }
                ],
            });
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },
                    { name: 'Ack QT', value: `Reconhecimento tipo ${message.quotedMsg.ack}` },
                    { name: 'Botões', value: `${JSON.stringify(message.quotedMsg.hydratedButtons)}` },
                    { name: 'rowId', value: `${message.quotedMsg.rowId}` },
                    { name: 'Time', value: `<t:${message.quotedMsg.t}:R>` },


                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
        }

        if (message.body === 'Área do Aluno' && message.type === 'list_response') {
            client.reply(message.from, 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm', message.id.toString())
        } else if (message.body === 'Webmail/Office (cs.udf.edu.br)' && message.type === 'list_response') {
            client.reply(message.from, 'https://portal.office.com', message.id.toString())
        } else if (message.body === 'Acessar Office 365 (cs.udf.edu.br)' && message.type === 'list_response') {
            client.reply(message.from, 'https://outlook.office365.com/mail/inbox', message.id.toString())
        } /*else if (message.body === 'Área do Aluno' && message.type === 'list_response') {

        }*/
        if (message.body === 'Teste Vocacional' && message.type === 'list_response') {
            client.sendText(message.from,
                'https://www.orientaportal.com.br/teste-vocacional/',{
                //'Aqui está o link para o *teste vocacional* e o site de *notícias* da Cruzeiro do Sul para você ficar por dentro das novidades!', {
                /*buttons: [
                    {
                        url: 'https://www.orientaportal.com.br/teste-vocacional/',
                        text: 'Teste Vocacional'
                    },
                    {
                        url: 'https://noticias.cruzeirodosuleducacional.edu.br',
                        text: 'Notícias Cruzeiro do Sul'
                    },
                ],*/
                title: `Prontinho, ${message.notifyName} 👋🏻`,
                footer: nomebot
            });
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);
        }


        if (message.body === 'Diurno' && message.type === 'list_response') {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Menu de datas diurno',
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
                        title: 'Ciência de Dados e Aprendizagem de Máquina',
                        rows: [
                            {
                                rowId: '1',
                                title: `19/08/2024`,
                                description: 'Desafios 1.1 e 1.2',
                            },
                            {
                                rowId: '2',
                                title: `30/08/2024`,
                                description: 'Lista 1 – Big Data: Os 3/5 Vs nas Olimpíadas',
                            },
                            {
                                rowId: '3',
                                title: `27/08/2024`,
                                description: 'Lista de Exercícios 2 – Introdução ao NoSQL',
                            },
                            {
                                rowId: '4',
                                title: `08/09/2024`,
                                description: 'Entrega 2 - Skate',
                            },
                            {
                                rowId: '5',
                                title: `25/11/2024`,
                                description: 'A1 - Prova Regimental',
                            },
                            {
                                rowId: '6',
                                title: `16/12/2024`,
                                description: 'AF - Avaliação Final',
                            },

                        ],
                    },
                    {
                        title: 'Projeto de Linguagens de Programação',
                        rows: [
                            /*{
                                rowId: '1',
                                title: `xx/xx/2024`,
                                description: 'Data...',
                            },*/
                            {
                                rowId: '2',
                                title: `28/11/2024`,
                                description: 'A1 - Prova Regimental',
                            },
                            {
                                rowId: '3',
                                title: `12/12/2024`,
                                description: 'AF - Avaliação Final',
                            },
                        ],
                    },
                ],


            });
            const embeddiurno = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embeddiurno],
            });
            /*client.sendPollMessage(
                message.from,
                'Datas importantes para o turno Diurno',
                ['Option 1', 'Option 2', 'Option 3'],
                {
                    selectableCount: 1,
                }
            );*/
        } else if (message.body === 'Noturno' && message.type === 'list_response') {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Menu de datas noturno',
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
                        title: 'Ciência de Dados e Aprendizagem de Máquina',
                        rows: [
                            {
                                rowId: '1',
                                title: `21/08/2024`,
                                description: 'Desafios 1.1 e 1.2',
                            },
                            {
                                rowId: '2',
                                title: `30/08/2024`,
                                description: 'Lista 1 – Big Data: Os 3/5 Vs nas Olimpíadas',
                            },
                            {
                                rowId: '3',
                                title: `29/08/2024`,
                                description: 'Lista de Exercícios 2 – Introdução ao NoSQL',
                            },
                            {
                                rowId: '4',
                                title: `12/09/2024`,
                                description: 'Entrega 2 - Skate',
                            },
                            {
                                rowId: '5',
                                title: `27/11/2024`,
                                description: 'A1 - Prova Regimental',
                            },
                            {
                                rowId: '6',
                                title: `11/12/2024`,
                                description: 'AF - Avaliação Final',
                            },

                        ],
                    },
                    {
                        title: 'Projeto de Linguagens de Programação',
                        rows: [
                            /*{
                                rowId: '1',
                                title: `xx/xx/2024`,
                                description: 'Data...',
                            },*/
                            {
                                rowId: '2',
                                title: `29/11/2024`,
                                description: 'A1 - Prova Regimental',
                            },
                            {
                                rowId: '3',
                                title: `13/12/2024`,
                                description: 'AF - Avaliação Final',
                            },
                        ],
                    }
                ],


            });
            const embednoturno = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embednoturno],
            });
            /*client.sendPollMessage(
                message.from,
                'Datas importantes para o turno Noturno',
                ['Option 1', 'Option 2', 'Option 3'],
                {
                    selectableCount: 1,
                }
            );*/
        }

        if (message.body === 'Notícias Brasil' && message.type === 'list_response') {

            client.sendText(message.from, `Notícias?!\nAguarde enquanto eu as reuno 📰`)
            client.sendImageAsStickerGif(message.from, './attachments/gifs/pesq.gif');

            const apiUrl = `https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=${token}`

            await axios.get(apiUrl).then(async (response) => {
                const result = response.data.articles

                let vars = `*ÚLTIMAS NOTÍCIAS*: \n`
                for (let i = 0; i < result.length; i++) {

                    const shortReq = await axios.get(`https://is.gd/create.php?format=json&url=${result[i].url}&logstats=1`);
                    const data = await shortReq.data;
                    console.log(data)

                    vars += `\n------------------------------------------------\n\n*Título*: ${result[i].title}\n\n*Link*: ${data.shorturl}\n\n`
                }
                client.sendFile(message.from, './attachments/not.png',
                    {
                        type: 'image',
                        caption: `Reuni as 10 últimas notícias do portal Google News (Brasil) para você!\nCaso queira dar uma olhada nas *Notícias da faculdade*, pressione o botão lá embaixo 👇🏻\n\n\n${vars}`,
                        /*buttons: [
                            {
                                url: 'https://noticias.cruzeirodosuleducacional.edu.br/#noticias',
                                text: 'Notícias Cruzeiro do Sul'
                            }
                        ],*/
                        title: `Feito, ${message.notifyName} 👋🏻`,
                        footer: nomebot
                    },
                );
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                        title: `Opa, ${message.notifyName}`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu voltar',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 5000);

            })
            const embedd = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Mensagem citada (bot)', value: `${message.quotedMsg.caption || message.quotedMsg.list.description}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embedd],
            });
        }


        if (message.body.toLowerCase().includes("ajuda") && message.body.toLowerCase().includes("bot")) {
            client.sendFile(message.from, './attachments/3.png',
                {
                    type: 'image',
                    caption: 'Está precisando de ajuda?\nVeja se alguma dessas opções pode te ajudar!\nPara ver meus comandos, utilize */ajuda* e lembre-se que não posso responder a alguns comandos em grupos!',
                    buttons: [
                        {
                            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
                            text: 'Área do Aluno (RGM e senha)'
                        },
                        {
                            phoneNumber: '+55 61 996457438',
                            text: 'Coord. Ciências Exatas e Tec'
                        }
                    ],
                    title: `Olá, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            );
            const embedajuda = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Disse', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embedajuda],
            });
            //client.sendText(message.from, `*\`Código\`*\n> quote\n- Item 1\n* Item 2\n1. Item A\n2. Item B`)
        }
        if (message.body === 'Comandos' && message.type === 'list_response') {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Abaixo você poderá ver meus comandos.\nEspero que algum deles possa te ajudar! 😉',
                title: `Olá, ${message.notifyName}`,
                footer: nomebot,
                sections: [
                    {
                        title: 'Menu faculdade',
                        rows: [
                            {
                                rowId: '1',
                                title: `${PREFIX}aulas `,
                                description: 'Veja as informações das aulas(presenciais e EAD) 🤓',
                            },
                            {
                                rowId: '2',
                                title: `${PREFIX}contatos `,
                                description: 'Veja os contatos de prof\'s e coord\'s 👨🏻‍🏫👩🏻‍🏫',
                            },
                            {
                                rowId: '3',
                                title: `${PREFIX}datas `,
                                description: 'Veja as datas importantes para este semestre! 📆',
                            },
                            {
                                rowId: '4',
                                title: `${PREFIX}lista `,
                                description: 'Listagem de documentos importantes da UDF 📑',
                            },
                            {
                                rowId: '5',
                                title: `${PREFIX}faculdade `,
                                description: 'Localização da faculdade 🚩',
                            },
                            {
                                rowId: '6',
                                title: `${PREFIX}redes sociais`,
                                description: 'Confira as redes sociais da UDF! 👩🏻‍💻',
                            },
                            {
                                rowId: '7',
                                title: `${PREFIX}acad `,
                                description: 'Pesquise atividades acadêmicas relacionadas à sua pesquisa 🔎',
                            },

                        ],
                    },
                    /*{
                        title: 'Menu diversos',
                        rows: [

                            {
                                rowId: '0',
                                title: `${PREFIX}acad `,
                                description: 'Pesquise atividades acadêmicas relacionadas à sua pesquisa 🔎',
                            },
                            {
                                rowId: '1',
                                title: `${PREFIX}google`,
                                description: 'Pesquisa no google o que escrevestes 📃',
                            },
                            {
                                rowId: '2',
                                title: `${PREFIX}ping `,
                                description: 'Pong? Notícias 📜, clima⛅ e muito mais...',
                            },
                        ],
                    },*/
                    /*{
                      title: 'Menu voltar',
                      rows: [
                        {
                          rowId: '1',
                          title: 'Voltar ao menu inicial'
                        }
                      ],
                    }*/
                ],
            });
            const embedd = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Mensagem citada (bot)', value: `${message.quotedMsg.caption || message.quotedMsg.list.description}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embedd],
            });
        } else if (message.body === 'Voltar ao menu inicial' && message.type === 'list_response') {
            client.sendText(message.from, `Voltando... 🔙`)
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Abaixo você poderá ver meus comandos.\nEspero que algum deles possa te ajudar! 😉',
                    title: `Olá, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu faculdade',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `${PREFIX}aulas `,
                                    description: 'Veja as informações das aulas(presenciais e EAD) 🤓',
                                },
                                {
                                    rowId: '2',
                                    title: `${PREFIX}contatos `,
                                    description: 'Veja os contatos de prof\'s e coord\'s 👨🏻‍🏫👩🏻‍🏫',
                                },
                                {
                                    rowId: '3',
                                    title: `${PREFIX}datas `,
                                    description: 'Veja as datas importantes para este semestre! 📆',
                                },
                                {
                                    rowId: '4',
                                    title: `${PREFIX}lista `,
                                    description: 'Listagem de documentos importantes da UDF 📑',
                                },
                                {
                                    rowId: '5',
                                    title: `${PREFIX}faculdade `,
                                    description: 'Localização da faculdade 🚩',
                                },
                                {
                                    rowId: '6',
                                    title: `${PREFIX}redes sociais`,
                                    description: 'Confira as redes sociais da UDF! 👩🏻‍💻',
                                },
                                {
                                    rowId: '7',
                                    title: `${PREFIX}acad `,
                                    description: 'Pesquise atividades acadêmicas relacionadas à sua pesquisa 🔎',
                                },

                            ],
                        },
                        /*{
                            title: 'Menu diversos',
                            rows: [

                                {
                                    rowId: '0',
                                    title: `${PREFIX}acad `,
                                    description: 'Pesquise atividades acadêmicas relacionadas à sua pesquisa 🔎',
                                },
                                {
                                    rowId: '1',
                                    title: `${PREFIX}google`,
                                    description: 'Pesquisa no google o que escrevestes 📃',
                                },
                                {
                                    rowId: '2',
                                    title: `${PREFIX}ping `,
                                    description: 'Pong? Notícias 📜, clima⛅ e muito mais...',
                                },
                            ],
                        },*/
                        /*{
                          title: 'Menu voltar',
                          rows: [
                            {
                              rowId: '1',
                              title: 'Voltar ao menu inicial'
                            }
                          ],
                        }*/
                    ],
                });
            }, 1000);

            const embedd = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Mensagem citada (bot)', value: `${message.quotedMsg.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embedd],
            });
        }
        if (message.body === "test2") {
            client.sendLinkPreview(message.from, `https://www.instagram.com/eiguilhermebastos/`, `teste`)
        }

        if (message.body === `Kerlla de Sousa Luz Prates\nCoordenadora dos cursos de Tecnologia` && message.type === "list_response") {
            await client
                .sendContactVcard(message.from, '556182914389@c.us', 'Kerlla de Sousa Luz Prates')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            client.sendText(
                message.from,
                'Seguem informações de contato da coordenadora Kerlla',
                {
                    buttons: [
                        {
                            url: 'mailto:kerlla.luz@udf.edu.br',
                            text: 'E-mail'
                        },
                        {
                            phoneNumber: '+ 55 61 982914389',
                            text: 'Telefone'
                        },
                        {
                            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
                            text: 'Área do Aluno (RGM e senha)'
                        },
                    ],
                    title: `Oi, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            )
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);
        } else if (message.body === `Kadidja Valéria Reginaldo de Oliveira\nProfessora` && message.type === "list_response") {
            await client
                .sendContactVcard(message.from, '556192734921@c.us', 'Kadidja Valéria Reginaldo de Oliveira')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            client.sendText(
                message.from,
                'Seguem informações de contato da professora Kadidja',
                {
                    buttons: [
                        {
                            url: 'mailto:kadidja.oliveira@udf.edu.br',
                            text: 'E-mail'
                        },
                        {
                            phoneNumber: '+55 61 992734921',
                            text: 'Telefone'
                        },
                        {
                            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
                            text: 'Área do Aluno (RGM e senha)'
                        },
                    ],
                    title: `Olá, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            )
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);
        } else if (message.body === `Letícia Toledo Maia Zoby\nProfessora` && message.type === "list_response") {
            await client
                .sendContactVcard(message.from, '556191112527@c.us', 'Letícia Toledo Maia Zoby')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            client.sendText(
                message.from,
                'Seguem informações de contato da professora Letícia',
                {
                    buttons: [
                        {
                            url: 'mailto:leticia.zoby@udf.edu.br',
                            text: 'E-mail'
                        },
                        {
                            phoneNumber: '+55 61 991112527',
                            text: 'Telefone'
                        },
                        {
                            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
                            text: 'Área do Aluno (RGM e senha)'
                        },
                    ],
                    title: `Olá, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            )
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);
        } else if (message.body === `Eliel Silva da Cruz\nProfessor` && message.type === "list_response") {
            await client
                .sendContactVcard(message.from, '556182088525@c.us', 'Eliel Silva da Cruz')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            client.sendText(
                message.from,
                'Seguem informações de contato do professor Eliel',
                {
                    buttons: [
                        {
                            url: 'mailto:eliel.cruz@udf.edu.br',
                            text: 'E-mail'
                        },
                        {
                            phoneNumber: '+55 61 982088525',
                            text: 'Telefone'
                        },
                        {
                            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
                            text: 'Área do Aluno (RGM e senha)'
                        },
                    ],
                    title: `Olá, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            )
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);
        } else if (message.body === `Central de Estágios\nCentro Universitário UDF` && message.type === "list_response") {
            await client
                .sendContactVcard(message.from, '556198235930@c.us', 'Central de Estágios')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            client.sendText(
                message.from,
                'Seguem informações de contato da Central de Estágios UDF',
                {
                    buttons: [
                        {
                            url: 'mailto:',
                            text: 'E-mail'
                        },
                        {
                            phoneNumber: '+55 61 998235930',
                            text: 'Telefone'
                        },
                        {
                            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
                            text: 'Área do Aluno (RGM e senha)'
                        },
                    ],
                    title: `Olá, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            )
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);
        } else if (message.body === `Welton Dias de Lima\nProfessor` && message.type === "list_response") {
            await client
                .sendContactVcard(message.from, '556193515431@c.us', 'Welton Dias de Lima')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            client.sendText(
                message.from,
                'Seguem informações de contato do professor Welton',
                {
                    buttons: [
                        {
                            url: 'mailto:welton.lima@udf.edu.br',
                            text: 'E-mail'
                        },
                        {
                            phoneNumber: '+55 61 993515431',
                            text: 'Telefone'
                        },
                        {
                            url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&blackboard=false&mode=login-rgm',
                            text: 'Área do Aluno (RGM e senha)'
                        },
                    ],
                    title: `Olá, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            )
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);

        } else if (message.body === `Coordenação de Ciências Exatas e Tecnológicas\nCentro Universitário UDF` && message.type === "list_response") {
            await client
                .sendContactVcard(message.from, '556196457438@c.us', 'Coordenação de Ciências Exatas e Tecnológicas')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            client.sendText(
                message.from,
                'Seguem informações de contato da Coordenação',
                {
                    buttons: [
                        {
                            url: 'mailto:coordenacao.exatas@udf.edu.br',
                            text: 'E-mail'
                        },
                        {
                            phoneNumber: '+55 61 99645557438',
                            text: 'Telefone'
                        },
                        {
                            phoneNumber: '+55 61 37048884',
                            text: 'Telefone'
                        },
                    ],
                    title: `Olá, ${message.notifyName} 👋🏻`,
                    footer: nomebot
                },
            )
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
            setTimeout(() => {
                client.sendListMessage(message.from, {
                    buttonText: 'Clique aqui 👈🏻',
                    description: 'Caso deseje voltar, selecione a opção abaixo 👇🏻',
                    title: `Opa, ${message.notifyName}`,
                    footer: nomebot,
                    sections: [
                        {
                            title: 'Menu voltar',
                            rows: [
                                {
                                    rowId: '1',
                                    title: `Voltar ao menu inicial`
                                }

                            ]
                        }
                    ],
                });
            }, 3000);
        }

        if (message.body === "Ciência de Dados e Aprendizagem de Máquina\nProf. Leticia Toledo Maia Zoby" && message.type === "list_response") {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Segue lista de conteúdo, caso deseje saber das datas importantes da disciplina, utilize */datas*',
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
                        title: 'Ciência de Dados e Aprendizagem de Máquina',
                        rows: [
                            {
                                rowId: '0',
                                title: `Plano de ensino`,
                                description: '07/08/2024',
                            },
                            {
                                rowId: 'rg',
                                title: 'Regras Gamer CDAM Noturno'
                            },
                            {
                                rowId: 'c',
                                title: 'Capturando e armazenando os Dados'
                            },
                            {
                                rowId: 'i',
                                title: 'Introdução a Big Data - 3V'
                            },
                            {
                                rowId: 'ia',
                                title: 'Introdução AM'
                            },
                            {
                                rowId: 'm',
                                title: 'Aula Machine Learning'
                            },
                            {
                                rowId: 'ba',
                                title: 'Base skate'
                            },
                            {
                                rowId: 're',
                                title: 'Registro de pedidos(csv)'
                            },
                            {
                                rowId: 'as',
                                title: 'Associação R'
                            },
                            {
                                rowId: 'a2',
                                title: 'Aula 2 KDD'
                            },
                            {
                                rowId: 'a3',
                                title: 'Aula 3 Tarefas DM'
                            },
                            /*{
                              rowId: '4',
                              title: ``,
                              description: '',
                            }*/
                        ],
                    }
                ],
            });
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
        } else if (message.body === "Projeto de Linguagens de Programação\nProf. Kadidja Valéria Reginaldo de Oliveira" && message.type === "list_response") {
            await client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Segue lista de conteúdo, caso deseje saber das datas importantes da disciplina, utilize */datas*',
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
                        title: 'Projeto de Linguagens de Programação',
                        rows: [
                            {
                                rowId: '1',
                                title: `Plano de ensino`,
                                description: '09/08/2024',
                            },
                            {
                                rowId: '2',
                                title: `Apresentação da disciplina`,
                                description: '16/08/2024',
                            },
                            {
                                rowId: '3',
                                title: `Conceitos de Linguagem de Programação`,
                                description: 'Robert W. Sebesta',
                            },
                            /*{
                              rowId: '4',
                              title: ``,
                              description: '',
                            }*/
                        ],
                    }
                ],
            });
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
        } else if (message.body === "Computação em Nuvem\nProf. Francisco de Assis Silva de Araujo" && message.type === "list_response") {
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Escolha uma das opções para começar!',
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
                        title: 'Computação em Nuvem',
                        rows: [
                            {
                                rowId: '0',
                                title: `Plano de ensino`,
                                description: '05/08/2024',
                            },
                            {
                                rowId: '1',
                                title: `Calendário DOL's`,
                                description: '02/08/2024',
                            },
                            {
                                rowId: '2',
                                title: `Manual DOL's`,
                                description: '02/08/2024',
                            },
                            {
                                rowId: '3',
                                title: `Planner roteiro de estudos`,
                                description: '02/08/2024',
                            }
                        ],
                    }
                ],
            });
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
        } else if (message.body === "Ética Geral e Cidadania\nProf. Rebeca Sousa Silva Pinheiro" && message.type === "list_response") {
            client.sendListMessage(message.from, {
                buttonText: 'Opções',
                description: 'Escolha uma das opções para começar!',
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
                        title: 'Ética Geral e Cidadania',
                        rows: [
                            {
                                rowId: '0',
                                title: `Plano de ensino`,
                                description: '06/08/2024',
                            },
                            {
                                rowId: '1',
                                title: `Calendário DOL's`,
                                description: '02/08/2024',
                            },
                            {
                                rowId: '2',
                                title: `Manual DOL's`,
                                description: '02/08/2024',
                            },
                            {
                                rowId: '3',
                                title: `Planner roteiro de estudos`,
                                description: '02/08/2024',
                            }
                        ],
                    }
                ],
            });
            const embed = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                    { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Selecionou', value: `${message.body}` },
                    { name: 'Tipo', value: message.type },
                    { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                )
                .setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embed],
            });
        } else if (message.body === "Trabalho de Conclusão de Curso I\nProf. Kerlla de Souza Luz" && message.type === "list_response") {
            client.sendFile(message.from,
                './attachments/PFTCC_page-0001.jpg',
            );
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Esta é uma matéria especial 📝\nPara obter mais informações, clique no botão abaixo 👇🏻, realize o login e entre no BlackBoard 🌐\n\nAh, caso queira ver o Regulamento Geral de TCC,\nutilize o comando */lista*',
                title: `TCC II`,
                footer: nomebot,
                sections: [
                    {
                        title: 'Menu opções',
                        rows: [
                            {
                                rowId: '1',
                                title: `Área do Aluno (RGM e senha)`
                            },
                            {
                                rowId: '2',
                                title: `Voltar ao menu inicial`
                            }

                        ]
                    }
                ],
            });
        } else if (message.body === "Trabalho de Conclusão de Curso II\nProf. Orientador(a)" && message.type === "list_response") {
            client.sendFile(message.from,
                './attachments/PFTCC_page-0001.jpg',
            );
            client.sendListMessage(message.from, {
                buttonText: 'Clique aqui 👈🏻',
                description: 'Esta é uma matéria especial 📝\nPara obter mais informações, clique no botão abaixo 👇🏻, realize o login e entre no BlackBoard 🌐\n\nAh, caso queira ver o Regulamento Geral de TCC,\nutilize o comando */lista*',
                title: `TCC II`,
                footer: nomebot,
                sections: [
                    {
                        title: 'Menu opções',
                        rows: [
                            {
                                rowId: '1',
                                title: `Área do Aluno (RGM e senha)`
                            },
                            {
                                rowId: '2',
                                title: `Voltar ao menu inicial`
                            }

                        ]
                    }
                ],
            });
        } /*else if (message.body === `Aula2 - KDD.pdf\nxx/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendText(message.from, 'Em breve!')
                //client.sendFile(message.from, './attachments/........', ' by ${nomebot}', 'Doc')
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Aula 3 Tarefas DM.pdf\nxx/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendText(message.from, 'Em breve!')
                //client.sendFile(message.from, './attachments/........', ' by ${nomebot}', 'Doc')
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Introdução-BigData-3V.pdf\nxx/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendText(message.from, 'Em breve!')
                //client.sendFile(message.from, './attachments/........', ' by ${nomebot}', 'Doc')
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } */else if (message.body === `Apresentação da disciplina\n16/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/ProjetosLP_2024_2.pdf',
                    {
                        caption: '*Apresentação da disciplina*\n\nProjeto de Linguagens de Programação',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Conceitos de Linguagem de Programação\nRobert W. Sebesta` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Conceitos de Linguagem de Programação (9a Edição) - Robert W. Sebesta - trabalho.pdf',
                    {
                        caption: '*Conceitos de Linguagem de Programação (9a Edição) - Robert W. Sebesta*\n\nProjeto de Linguagens de Programação',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Plano de ensino\n09/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/plano plp.PDF',
                    {
                        caption: '*Plano de ensino da disciplina*\n\nProjeto de Linguagens de Programação',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Plano de ensino\n07/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/plano cdam.PDF',
                    {
                        caption: '*Plano de ensino da disciplina*\n\nCiência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Plano de ensino\n06/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/plano egc.PDF',
                    {
                        caption: '*Plano de ensino da disciplina*\n\nÉtica Geral e Cidadania',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Plano de ensino\n05/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/plano cn.PDF',
                    {
                        caption: '*Plano de ensino da disciplina*\n\nComputação em Nuvem',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Calendário DOL's\n02/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/DOL.pdf',
                    {
                        caption: 'Calendário DOL\'s',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Manual DOL's\n02/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Manual DOL.pdf',
                    {
                        caption: 'Manual DOL\'s',
                        footer: nomebot
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Planner roteiro de estudos\n02/08/2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Planner roteiro de estudos.pdf',
                    {
                        caption: 'Planner roteiro de estudos',
                        footer: nomebot
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Manual do Aluno - 2024.2\nUDF 2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/MANUAL ALUNO 2024.pdf',
                    {
                        caption: 'Manual do Aluno - 2024.2',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Regulamento Geral Atividades Complementares\nUDF 2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/RGAC.pdf',
                    {
                        caption: 'Regulamento Geral Atividades Complementares',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Calendário Acadêmico 2024\nUDF 2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/CALENDARIO 2024.pdf',
                    {
                        caption: 'Calendário Acadêmico 2024',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `PROCEDIMENTOS FLUXOS TRABALHO DE CONCLUSAO DE CURSO TCC\nUDF 2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/PFTCC.pdf',
                    {
                        caption: 'PROCEDIMENTOS FLUXOS TRABALHO DE CONCLUSAO DE CURSO TCC',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Regulamento Geral de TCC\nUDF 2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/RGTCC.pdf',
                    {
                        caption: 'Regulamento Geral de TCC',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Manual de Normatização e Formação de Trabalhos Acadêmicos\nUDF 2024` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/MNFTA.pdf',
                    {
                        caption: 'Manual de Normatização e Formação de Trabalhos Acadêmicos',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `21/08/2024\nDesafios 1.1 e 1.2` && message.type === "list_response") {
            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                )
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: '21/08/2024\nDesafios 1.1 e 1.2\n\nFaça seu envio através do BlackBoard 👇🏻',
                        title: `Ciência de Dados e Aprendizagem de Máquina`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Área do Aluno (RGM e senha)`
                                    },
                                    {
                                        rowId: '2',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 3000);
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `19/08/2024\nDesafios 1.1 e 1.2` && message.type === "list_response") {
            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                )
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: '19/08/2024\nDesafios 1.1 e 1.2\n\nFaça seu envio através do BlackBoard 👇🏻',
                        title: `Ciência de Dados e Aprendizagem de Máquina`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Área do Aluno (RGM e senha)`
                                    },
                                    {
                                        rowId: '2',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 3000);
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `30/08/2024\nLista 1 – Big Data: Os 3/5 Vs nas Olimpíadas` && message.type === "list_response") {

            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                )
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: '30/08/2024\nLista 1 – Big Data: Os 3/5 Vs nas Olimpíadas\n\nFaça seu envio através do BlackBoard 👇🏻',
                        title: `Ciência de Dados e Aprendizagem de Máquina`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Área do Aluno (RGM e senha)`
                                    },
                                    {
                                        rowId: '2',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 3000);
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `29/08/2024\nLista de Exercícios 2 – Introdução ao NoSQL` && message.type === "list_response") {

            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                )
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: '29/08/2024\nLista de Exercícios 2 – Introdução ao NoSQL\n\nFaça seu envio através do BlackBoard 👇🏻',
                        title: `Ciência de Dados e Aprendizagem de Máquina`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Área do Aluno (RGM e senha)`
                                    },
                                    {
                                        rowId: '2',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 3000);
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `27/08/2024\nLista de Exercícios 2 – Introdução ao NoSQL` && message.type === "list_response") {

            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                )
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: '27/08/2024\nLista de Exercícios 2 – Introdução ao NoSQL\n\nFaça seu envio através do BlackBoard 👇🏻',
                        title: `Ciência de Dados e Aprendizagem de Máquina`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Área do Aluno (RGM e senha)`
                                    },
                                    {
                                        rowId: '2',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 3000);
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Regras Gamer CDAM Noturno` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Regras_Gamer_CDAM_Noturno.pdf',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Capturando e armazenando os Dados` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Capturando_Armazenando_Dados.pdf',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Introdução a Big Data - 3V` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Introd_BigData-3Vs.pdf',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Introdução AM` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Introd_AM.pdf',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Aula Machine Learning` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/AulaAM_AD_NB.pdf',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Base skate` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/baseskate.xlsx',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Registro de pedidos(csv)` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/registro_pedidos1.csv',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Associação R` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                    {
                        caption: '*Ciência de Dados e Aprendizagem de Máquina*\n\n\```# Instalar e carregar pacotes necessários\ninstall.packages("arules")\nlibrary(arules)\n# Ler o arquivo CSV com o separador correto\nbase_dados <- read.table("C:\\Users\\let_t\\Downloads\\Lgg R\\registro_pedidos1.csv", header=TRUE, sep=";", stringsAsFactors=FALSE)\n# Verificar o conteúdo do data frame\nprint(head(base_dados))\n# Converter os valores \'sim\' e \'não\' para fatores\nbase_dados[] <- lapply(base_dados, function(x) as.factor(ifelse(x == "sim", "yes", "no")))\n# Converter o data frame para o formato transactions\nbase_dados_transacional <- as(base_dados, "transactions")\n# Verificar a estrutura e o conteúdo das transações\nsummary(base_dados_transacional)\n# Aplicar o algoritmo apriori\nregras <- apriori(base_dados_transacional, parameter=list(supp=0.1, conf=0.5))\n# Verificar o número de regras geradas\nprint(length(regras))\n# Verificar as primeiras regras, se houver\nif (length(regras) > 0) {\ninspect(head(regras))\n}```',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Aula 2 KDD` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Aula2 - KDD.pdf',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Aula 3 Tarefas DM` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/Aula 3 Tarefas DM.pdf',
                    {
                        caption: 'Ciência de Dados e Aprendizagem de Máquina',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `27/08/2024\nLista de Exercícios 2 – Introdução ao NoSQL` && message.type === "list_response") {
            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                )
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: '27/08/2024\nLista de Exercícios 2 – Introdução ao NoSQL\n\nFaça seu envio através do BlackBoard 👇🏻',
                        title: `Ciência de Dados e Aprendizagem de Máquina`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Área do Aluno (RGM e senha)`
                                    },
                                    {
                                        rowId: '2',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 3000);
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `08/09/2024\nEntrega 2 - Skate` && message.type === "list_response") {
            try {
                client.sendFile(message.from,
                    './attachments/ciencia.webp',
                )
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: '08/09/2024\nEntrega 2 - Skate\n\nFaça seu envio através do BlackBoard 👇🏻',
                        title: `Ciência de Dados e Aprendizagem de Máquina`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Menu opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: `Área do Aluno (RGM e senha)`
                                    },
                                    {
                                        rowId: '2',
                                        title: `Voltar ao menu inicial`
                                    }

                                ]
                            }
                        ],
                    });
                }, 3000);
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `25/11/2024\nA1 - Prova Regimental` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/CALENDARIO 2024.pdf',
                    {
                        caption: 'Data prevista para PR de Ciência de Dados e Aprendizagem de Máquina\nVeja o calendário!',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `16/12/2024\nAF - Avaliação Final` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/CALENDARIO 2024.pdf',
                    {
                        caption: 'Data prevista para AF de Ciência de Dados e Aprendizagem de Máquina\nVeja o calendário!',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `28/11/2024\nA1 - Prova Regimental` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/CALENDARIO 2024.pdf',
                    {
                        caption: 'Data prevista para PR de Projeto de Linguagens de Programação\nVeja o calendário!',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `29/11/2024\nA1 - Prova Regimental` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/CALENDARIO 2024.pdf',
                    {
                        caption: 'Data prevista para PR de Projeto de Linguagens de Programação\nVeja o calendário!',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `12/12/2024\nAF - Avaliação Final` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/CALENDARIO 2024.pdf',
                    {
                        caption: 'Data prevista para AF de Projeto de Linguagens de Programação\nVeja o calendário!',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `13/12/2024\nAF - Avaliação Final` && message.type === "list_response") {
            client.reply(
                message.from,
                '🔎 Procurando documento 🔍',
                message.id.toString()
            )
            try {
                client.sendFile(message.from,
                    './attachments/CALENDARIO 2024.pdf',
                    {
                        caption: '*Projeto de Linguagens de Programação*\n\nData prevista para AF de Projeto de Linguagens de Programação\nVeja o calendário!',
                    }
                )
            } catch (error) {
                client.reply(
                    message.from,
                    'Documento não encontrado! 📄',
                    message.id.toString()
                )
            }
        } else if (message.body === `Todos os chats` && message.type === "list_response") {
            const chats = await client.listChats();
            if (chats.length == 0) {
                client.sendText(message.from, 'Eu ainda não tenho chats!');
            } else {
                let replyMsg = '*TODOS OS CHATS*\n\n';
                chats.forEach((group, i) => {
                    replyMsg += `ID: ${group.id._serialized}\n\n`;
                });
                replyMsg += '_Você pode usar o ID para enviar uma mensagem a um grupo ou usuário._'
                client.sendText(message.from, replyMsg);
            }
        } else if (message.body === `Últimos 20 chats` && message.type === "list_response") {
            const chats = await client.listChats({ count: 20 });
            if (chats.length == 0) {
                client.sendText(message.from, 'Eu ainda não tenho chats!');
            } else {
                let replyMsg = '*ÚLTIMOS 20 CHATS*\n\n';
                chats.forEach((group, i) => {
                    replyMsg += `ID: ${group.id._serialized}\n\n`;
                });
                replyMsg += '_Você pode usar o ID para enviar uma mensagem a um grupo ou usuário._'
                client.sendText(message.from, replyMsg);
            }
        } else if (message.body === `Somente usuários` && message.type === "list_response") {
            const chats = await client.listChats({ onlyUsers: true });
            console.log(chats)
            if (chats.length == 0) {
                client.sendText(message.from, 'Eu ainda não tenho chats!');
            } else {
                let replyMsg = '*MEUS CHATS (USUÁRIOS)*\n\n';
                chats.forEach((group, i) => {
                    if (group.contact.isBusiness === true) {
                        replyMsg += `ID: ${group.id._serialized}\nNome: ${group.contact.name || group.contact.verifiedName}\nMensagens não lidas: ${group.unreadCount}\n\n`;
                    } else {
                        replyMsg += `ID: ${group.id._serialized}\nNome: ${group.contact.name || group.contact.pushname}\nMensagens não lidas: ${group.unreadCount}\n\n`;
                    }
                });
                replyMsg += '_Você pode usar o ID para enviar uma mensagem ao usuário._'
                client.sendText(message.from, replyMsg);
            }
        } else if (message.body === `Somente grupos` && message.type === "list_response") {
            const chats = await client.listChats({ onlyGroups: true });
            if (chats.length == 0) {
                client.sendText(message.from, 'Eu ainda não tenho um grupo.');
            } else {
                let replyMsg = '*MEUS GRUPOS*\n\n';
                chats.forEach((group, i) => {
                    replyMsg += `ID: ${group.id._serialized}\nNome: ${group.name}\n\n`;
                });
                replyMsg += '_Você pode usar o ID para enviar uma mensagem ao grupo._'
                client.sendText(message.from, replyMsg);
            }
        }

        if (message.type === 'miss_video' || message.type === 'miss_call') {
            client.sendFile(message.from)
        }
        /*if (message.body.toLowerCase() === "a") {
            client.reply(message.from, "a",
                message.id.toString())
            
            const chats = await client.getAllGroups(false);
            for (const c of chats) {
            const ids = c.groupMetadata.participants.map((p) => p.id._serialized);
            await client.subscribePresence(ids);
            }
        }*/



        //if (!message.body.toLowerCase().startsWith(PREFIX)) return;

        const args = message.body.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();


        const command =
            wppconnect.commands.get(commandName) ||
            wppconnect.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));


        let gg = args.join(' ')
        let d = new Date();

        //if(!command) return await client.sendReactionToMessage('🤔') && client.sendText(message.from, `Olá 👋🏻, acho que você tentou executar um comando erroneamente!\nPara ver meus comandos utilize: *${PREFIX}ajuda*`)

        const embedcommand = new EmbedBuilder()
            .setTitle('Log SuriBot')
            .setURL('https://wa.me/556133617303/')
            .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
            .addFields(
                { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0], inline: true },
                { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                //{ name: '\u200B', value: '\u200B' },
                { name: 'Utilizou o comando', value: `${PREFIX}${commandName} ${gg}` },
                { name: 'Tipo', value: message.type },
                { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

            )
            .setThumbnail(message.sender.profilePicThumbObj.eurl)
            .setTimestamp()
            .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
            .setColor(0x00FFFF);



        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(colors.green(`${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()} `) + error);
        }

        if (command) {
            console.log(colors.green(`${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`) + ` | ${message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0]} ultilizou o comando: ${PREFIX}${commandName} ${gg}`)
            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embedcommand],
            });
        }

        if (message.isNewMsg === true && message.type === 'template_button_reply' || message.isNewMsg === true && message.type === 'buttons_response' || message.isNewMsg === true && message.type === 'list_response' || message.isNewMsg === true && message.body === `${PREFIX}${commandName}` || message.isNewMsg === true && message.body === `${PREFIX}${commandName} ${gg}`) {
            return;
        } else {
            if (message.isGroupMsg === false) {
                client.sendFile(
                    message.from,
                    './attachments/s3.png',
                );
                setTimeout(() => {
                    client.sendListMessage(message.from, {
                        buttonText: 'Clique aqui 👈🏻',
                        description: `Eu sou ${nomebot}\nUm assistente virtual de suporte aos alunos de Ciência da Computação da UDF\nEstá precisando de ajuda?\nVeja se alguma dessas opções pode te ajudar! 👇🏻`,
                        title: `Opa, ${message.notifyName}`,
                        footer: nomebot,
                        sections: [
                            {
                                title: 'Selecione uma das opções',
                                rows: [
                                    {
                                        rowId: '1',
                                        title: 'Comandos'
                                    },
                                    /*{
                                        rowId: '2',
                                        title: 'Notícias Brasil'
                                    },*/

                                ]
                            }
                        ],
                    });
                }, 1500);
                /*client.reply(message.from, `Olá, bom dia! 🙋🏼‍♀️`, message.id.toString())
                client.sendReactionToMessage(message.id, '❤️')*/
                const embedmsg = new EmbedBuilder()
                    .setTitle('Log SuriBot')
                    .setURL('https://wa.me/556133617303/')
                    .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                    .addFields(
                        { name: 'Número', value: message.author ? message.author.split('@c.us')[0] : message.from.split('@c.us')[0] },
                        { name: 'Nome', value: message.sender.name ? message.sender.name : message.notifyName, inline: true },
                        //{ name: '\u200B', value: '\u200B' },
                        { name: 'Disse', value: `${message.body}` },
                        { name: 'Tipo', value: message.type },
                        { name: 'Ack', value: `Reconhecimento tipo ${message.ack}` },

                    )
                    .setThumbnail(message.sender.profilePicThumbObj.eurl)
                    .setTimestamp()
                    .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                    .setColor(0x00FFFF);

                webhookClient.send({
                    username: 'Suri 🦦',
                    avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                    embeds: [embedmsg],
                });
            }
        }
    });
    client.onIncomingCall(async (callback) => {
        console.log(callback)
        const contact = await client.getContact(callback.peerJid)
        if (callback.isVideo === true) {
            const embedmsg = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setDescription(`Chamada recebida`)
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: callback.peerJid ? callback.peerJid.split('@c.us')[0] : callback.peerJid.split('@c.us')[0] },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Tipo', value: `Vídeo` },
                    { name: 'ID', value: callback.id },
                )
                //.setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embedmsg],
            });
            client.sendFile(
                callback.peerJid,
                './attachments/call.webp',
                {
                    type: 'image',
                    caption: `Eu não atendo ligações! Caso queira ver meus comandos, aperte o botão abaixo 👇🏻`,
                    buttons: [
                        {
                            id: '1',
                            text: 'Comandos'
                        }
                    ],
                    title: `Opa, ${contact.formattedName || contact.name || contact.pushname} 👋🏻`,
                    footer: nomebot
                }
            )
        } else if (callback.isVideo === false) {
            const embedmsg = new EmbedBuilder()
                .setTitle('Log SuriBot')
                .setURL('https://wa.me/556133617303/')
                .setDescription(`Chamada recebida`)
                .setAuthor({ name: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png', url: 'https://wa.me/556133617303/' })
                .addFields(
                    { name: 'Número', value: callback.peerJid ? callback.peerJid.split('@c.us')[0] : callback.peerJid.split('@c.us')[0] },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: 'Tipo', value: `Áudio` },
                    { name: 'ID', value: callback.id },
                )
                //.setThumbnail(message.sender.profilePicThumbObj.eurl)
                .setTimestamp()
                .setFooter({ text: 'Suri 🦦', iconURL: 'https://i.imgur.com/C6BcGLx.png' })
                .setColor(0x00FFFF);

            webhookClient.send({
                username: 'Suri 🦦',
                avatarURL: 'https://i.imgur.com/C6BcGLx.png',
                embeds: [embedmsg],
            });
            client.sendFile(
                callback.peerJid,
                './attachments/call.webp',
                {
                    type: 'image',
                    caption: `Eu não atendo ligações! Caso queira ver meus comandos, aperte o botão abaixo 👇🏻`,
                    buttons: [
                        {
                            id: '1',
                            text: 'Comandos'
                        }
                    ],
                    title: `Opa, ${contact.formattedName || contact.name || contact.pushname} 👋🏻`,
                    footer: nomebot
                }
            )
        }
    })
    client.onStateChange(async (callback) => {
        console.log(callback)
    })
    client.onPollResponse(async (callback) => {
        console.log(callback)
        client.sendText(
            `120363327359681094@g.us`,
            JSON.stringify(callback)
        )
    })
    client.onLiveLocation(async (callback) => {
        console.log(callback)
    })
    client.onReactionMessage(async (callback) => {
        console.log(callback)
    })
    client.onUpdateLabel(async (callback) => {
        console.log(callback)
    })
    client.onPresenceChanged(async (callback) => {
        console.log(callback)
        if (callback.isGroup === true) {
            return;
        }
        if (callback.state === 'available') {
            client.sendText(
                '120363327359681094@g.us',
                `${callback.shortName} ficou online`
            )
        } else if (callback.state === 'unavailable') {
            client.sendText(
                '120363327359681094@g.us',
                `${callback.shortName} ficou offline`
            )
        } else if (callback.state === 'typing') {
            client.sendText(
                '120363327359681094@g.us',
                `${callback.shortName} está digitando...`
            )
        } else if (callback.state === 'recording_audio') {
            client.sendText(
                '120363327359681094@g.us',
                `${callback.shortName} está gravando áudio`
            )
        }
    })
    client.onNotificationMessage(async (callback) => {
        console.log(callback)
    })
    /*client.onAck(async (callback) => {
        console.log(callback)
    })*/
    process.on("uncaughtException", (err) => {
        console.log("Exceção não capturada: " + err);
        client.sendText('120363327359681094@g.us', `Exceção não capturada: ${err}`);
    });

    process.on("unhandledRejection", (reason, promise) => {
        console.log(
            "[FATAL] Possível rejeição não tratada em: ",
            promise,
            " razão: ",
            reason.message
        );
        client.sendText('120363327359681094@g.us', `[FATAL] Possível rejeição não tratada em: ${promise}\n Motivo: ${reason.message}`);

    });
}






