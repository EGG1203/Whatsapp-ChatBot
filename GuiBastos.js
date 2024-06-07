const { Client, Location, Poll, List, Buttons, LocalAuth, MessageMedia } = require('./index');
const fs = require('fs');
const { join } = require("path");
const colors = require("colors");
const axios = require("axios");
const { Collection } = require("discord.js");
const speech = require("@google-cloud/speech");
const apispeech = require('./speechapi.json');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDO04qijLTldVXtz5QDzeu8tlgvabHrvdw");
const gifs = require("./gifs");
const PREFIX = require("./package.json").prefix

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false
    }
});

client.commands = new Collection();

const commandFiles = fs.readdirSync(join(__dirname, "comandos")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "comandos", `${file}`));
    client.commands.set(command.name, command);
}

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
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX",
    searchFilter: ["UNSEEN"],
    markSeen: true,
    fetchUnreadOnStart: false,
    mailParserOptions: { streamAttachments: true },
    attachments: false,
    attachmentOptions: { directory: "attachments/" }

});

start()

function start() {
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
                client.sendMessage(number, `*EM FASE DE TESTES, QUALQUER PROBLEMA COMUNICAR O @556196621014*\n\nE-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ~BLOQUEADO~\n*Descrição:* ~BLOQUEADO~`, { mentions: ['556196621014@c.us'] })
                client.sendMessage(number2, `E-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ~BLOQUEADO~\n*Descrição:* ~BLOQUEADO~`, { mentions: ['556196621014@c.us'] })
            } else {
                client.sendMessage(number, `*EM FASE DE TESTES, QUALQUER PROBLEMA COMUNICAR O @556196621014*\n\nE-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ${mail.subject ? mail.subject : "~vazio~"}\n*Descrição:* ${mail.text.split("&nbsp;").join(" ")}`, { mentions: ['556196621014@c.us'] })
                client.sendMessage(number2, `E-mail de *${mail.from.value[0].name || "Blackboard"}*(${mail.from.value[0].address})\n*Assunto:* ${mail.subject ? mail.subject : "~vazio~"}\n*Descrição:* ${mail.text.split("&nbsp;").join(" ")}\n~Verifique se o e-mail refere-se à sua turma!~`, { mentions: ['556196621014@c.us'] })
            }
        }
    })
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

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};

const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });

process.title = 'GG WABOT'

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('Autenticado => GG BOT UDF(Guilherme Bastos)');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('A autenticação falhou', msg);
});

client.on('ready', () => {
    console.log('TO PRONTO!');
});

client.on('console', async (msg) => {
    const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
    console.log('Mensagem do console:', ...args);
});

client.on('message', async msg => {
    console.log('MENSAGEM RECEBIDA', msg);
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    console.log(chat)


    if (chat.isGroup === false && msg.type === 'ptt') {

        let a = MessageMedia.fromFilePath('./attachments/musica.jpg')
        msg.react('🤔')
        chat.sendMessage(a, { sendMediaAsSticker: true })

        async function quickstart() {

            const ptt = await msg.downloadMedia();
            const buffer = Buffer.from(ptt.data, 'base64');
            fs.writeFile('./audio.ogg', buffer, (err) => {
                if (err) throw err;
                console.log('Áudio guardado.');

            });
            chat.sendStateTyping();

            const client = new speech.SpeechClient({
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

                const [response] = await client.recognize(request);
                const transcription = response.results
                    .map(result => result.alternatives[0].transcript)
                    .join('\n');
                console.log(`Transcription: ${transcription}`);

                const result = await model.generateContent(transcription);
                const resposta = await result.response;
                console.log(resposta)
                const text = resposta.text();
                //console.log(text)
                msg.reply(text)
                //msg.reply(transcription)
            }, 2000);
        }
        quickstart();

    }

    if (msg.body.startsWith("bom dia") || msg.body.startsWith("Bom dia")) {
        msg.reply(`Olá, bom dia! 🙋🏼‍♀️`)
        msg.react('❤️')
    } else if (msg.body.startsWith("chico") || msg.body.startsWith("Chico")) {
        msg.reply(`Hola bro, ¿como estás?`)
    } else if (msg.body.includes("ajuda") && msg.body.includes("bot")) {
        msg.reply(`Caso preciso de ajuda, use: *${PREFIX}ajuda*`)
        setTimeout(() => msg, 15000);
    } else if (msg.body.startsWith("@556192736241")) {
        chat.sendMessage("Oi");
        chat.sendMessage("Sou eu!");
        msg.reply(`Olá *${contact.name || contact.pushname || "~sem nome~"}*! Em que posso ajudar?\nPara ver meus comandos utilize: *${PREFIX}ajuda*\nEncontrou algum bug ou erro?\nReporte ao meu desenvolvedor @556196621014`, null, {
            mentions: ['556196621014@c.us']
        });
    }

    if (msg.links > [0]) {
        let number = '556196621014'
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        if (msg.title && msg.description) {
            client.sendMessage(number, `Link recebido de ${msg.author ? msg.author.split('@c.us')[0] : msg.from.split('@c.us')[0]}(${contact.name || contact.pushname || "~sem nome~"})\n*Link:* ${msg.links[0].link}\n*Suspeito?* ${msg.links[0].isSuspicious ? "sim" : "não"}\n*Título do link:* ${msg.title}\n*Descrição:* ${msg.description}`)
        } else {
            client.sendMessage(number, `Link recebido de ${msg.author ? msg.author.split('@c.us')[0] : msg.from.split('@c.us')[0]}(${contact.name || contact.pushname || "~sem nome~"})\n*Link:* ${msg.links[0].link}\n*Suspeito?* ${msg.links[0].isSuspicious ? "sim" : "não"}\n*Mensagem:* ${msg.body}`)
        }
    }

    //if (msg.body == "Kerlla de Sousa L. P." && msg.type === "list_response") {
    if (msg.body == "KSLP") {
        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:4.0\n'
            + 'FN:Kerlla de Sousa Luz Prates(Oliveira)\n'
            + 'ORG:Coordenadora dos cursos de TI;\n'
            //+ 'EMAIL;type=INTERNET;type=WORK;type=pref:kerlla.luz@udf.edu.br\n'
            //+ 'EMAIL;type=Pessoal;type=pref:kesll@yahoo.com\n'
            //+ 'BDAY;value=date:08/10/1979\n'
            + 'TEL;type=CELL;type=VOICE;waid=559182914389:+55 61 98291-4389\n'
            //+ 'item6.CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        /*let vcard2 = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'N:Caetano;Kauan Mendes;;;\n' +
        'FN:Kauan Mendes Caetano\n' +
        'item1.TEL;waid=556198755366:+55 61 9875-5366\n' +
        'item1.X-ABLabel:Móvil\n' +
        'item2.ADR:;;QUADRA 24B CASA 11 SAO MATEUS;;CIDADE OCIDENTAL, DF;72880000;\n' +
        'item2.X-ABADR:ac\n' +
        'item2.X-ABLabel:Casa\n' +
        'BDAY;value=date:2003-08-10\n' +
        'END:VCARD'*/

        const contact = await client.getContactById('556182914389@c.us');
        msg.reply(contact);

            //chat.sendMessage(vcard)

         /*else if (msg.body == "Elvira M. A. Uchôa" && msg.type === "list_response") {
        
            let vcard = 'BEGIN:VCARD\n' 
              + 'VERSION:3.0\n' 
              + 'FN:Elvira Maria Antunes Uchôa\n' 
              + 'ORG:Professora de POO e EDI;\n' 
              + 'EMAIL;type=INTERNET;type=WORK;type=pref:elvira.uchoa@udf.edu.br\n'
              + 'EMAIL:elvira.uchoa@gmail.com\n'
              + 'BDAY:13/03/1966\n'
              + 'TEL;type=CELL;type=VOICE;waid=556199926560:+55 61 99992-6560\n'
              + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
              + 'END:VCARD'
    
            chat.sendMessage(vcard)
        //client.sendMessage(msg.from, `*Elvira Maria Antunes Uchôa(Professora de POO e EDI)*\nCel: ~(61)999926560~ (não divulgado, proibido uso indevido!)\nE-mail's: elvira.uchoa@gmail.com / elvira.uchoa@udf.edu.br`)

*/  } //else if (msg.body == "Letícia T. Maia Zoby" && msg.type === "list_response") {
    else if (msg.body == "LTMZ") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Letícia Toledo Maia Zoby\n'
            + 'ORG:Professora de Banco de Dados;\n'
            + 'EMAIL;type=INTERNET;type=WORK;type=pref:leticia.zoby@udf.edu.br\n'
            // + 'EMAIL:elvira.uchoa@gmail.com\n'
            + 'BDAY:19/04/1980\n'
            + 'TEL;type=CELL;type=VOICE;waid=556191112527:+55 61 99111-2527\n'
            + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556191112527@c.us');
        msg.reply(contact);
        //chat.sendMessage(vcard)

    } //else if (msg.body == "Henrique Domingues Garcia" && msg.type === "list_response") {
    else if (msg.body == "HDG") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Henrique Domingues Garcia\n'
            + 'ORG:Professor de Processamento de Imagens & Teoria dos Grafos;\n'
            + 'EMAIL;type=INTERNET;type=WORK;type=pref:hdgarcia@udf.edu.br\n'
            + 'EMAIL;type=Pessoal;type=pref:henriquedgarcia@gmail.com\n'
            + 'BDAY:06/02/1983\n'
            + 'TEL;type=CELL;type=VOICE;waid=556181070340:+55 61 98107-0340\n'
            + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556181070340@c.us');
        msg.reply(contact);
        //chat.sendMessage(vcard)

    } //else if (msg.body == "Henderson Matsuura Sanches" && msg.type === "list_response") {
    else if (msg.body == "HMS") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Henderson Matsuura Sanches\n'
            + 'ORG:Professor de Análise e Projeto de Sistemas;\n'
            + 'EMAIL;type=INTERNET;type=WORK;type=pref:henderson.matsuura@udf.edu.br\n'
            + 'EMAIL;type=Pessoal;type=pref:hendersonmatsuura@gmail.com\n'
            + 'EMAIL;type=Pessoal;type=pref:hendersonmatsuura@yahoo.com.br\n'
            + 'BDAY:28/09/1979\n'
            + 'TEL;type=CELL;type=VOICE;waid=556199770522:+55 61 99977-0522\n'
            + 'CATEGORIES:CPF vinculado aos CPNJ\'s 24.969.298/0001-00 e 13.680.235/0001-13 com situação BAIXADA!\n'
            + 'CATEGORIES:O CPF tem valores a receber! A partir do dia 7 de março você poderá acessar o SVR - Sistema Valores a Receber\n'
            + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556199770522@c.us');
        msg.reply(contact);
        //chat.sendMessage(vcard)

        //} else if (msg.body == "Welton Dias de Lima" && msg.type === "list_response") {
    } else if (msg.body == "WDdL") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Welton Dias de Lima\n'
            + 'ORG:Professor de Sistemas Operacionais;\n'
            + 'EMAIL;type=INTERNET;type=WORK;type=pref:welton.lima@udf.edu.br\n'
            // + 'EMAIL:elvira.uchoa@gmail.com\n'
            + 'BDAY:17/03/1975\n'
            + 'TEL;type=CELL;type=VOICE;waid=556193515431:+55 61 99351-5431\n'
            + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556193515431@c.us');
        msg.reply(contact);
        //chat.sendMessage(vcard)

        //} else if (msg.body == "Alexandre C. Ataíde" && msg.type === "list_response") {
    } else if (msg.body == "ACA") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Alexandre Camárcio Ataíde\n'
            + 'ORG:Professor de MD;\n'
            + 'EMAIL;type=INTERNET;type=WORK;type=pref:alexandre.ataide@udf.edu.br\n'
            + 'EMAIL:acataide@gmail.com\n'
            + 'TEL;type=CELL;type=VOICE;waid=556181840754:+55 61 98184-0754\n'
            + 'BDAY:23/09/1982\n'
            // + 'ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America\n'
            + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556181840754@c.us');
        msg.reply(contact);
        //  chat.sendMessage(vcard)

        //} else if (msg.body == "Eliel Silva da Cruz" && msg.type === "list_response") {
    } else if (msg.body == "ESdC") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Eliel Silva da Cruz\n'
            + 'ORG:Professor de ApI e BD;\n'
            + 'EMAIL;type=INTERNET;type=WORK;type=pref:eliel.cruz@udf.edu.br\n'
            + 'EMAIL:contato@elielcruz.com.br\n'
            + 'EMAIL:eliel.cruz@enap.gov.br\n'
            + 'EMAIL:elielkruz@gmail.com\n'
            + 'TEL;type=CELL;type=VOICE;waid=556182088525:+55 61 98208-8525\n'
            + 'BDAY:07/01/1984\n'
            + 'CATEGORIES:CPF vinculado ao CPNJ 15.777.722/0001-24 com situação ATIVA!\n'
            // + 'ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America\n'
            + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556182088525@c.us');
        msg.reply(contact);
        //chat.sendMessage(vcard)

        // } else if (msg.body == "Kadidja V. R. de Oliveira" && msg.type === "list_response") {
    } else if (msg.body == "KVRdO") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Kadidja Valéria Reginaldo de Oliveira\n'
            + 'ORG:Professora de PC e TP;\n'
            + 'EMAIL;type=INTERNET;type=WORK;type=pref:kadidja.oliveira@udf.edu.br\n'
            + 'EMAIL:kadidja.oliveira@gmail.com\n'
            + 'TEL;type=CELL;type=VOICE;waid=556192734921:+55 61 99273-4921\n'
            + 'BDAY:30/04/1974\n'
            + 'CATEGORIES:CPF vinculado ao CPNJ 05.374.395/0001-06 com situação BAIXADA!\n'
            // + 'ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America\n'
            + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556192734921@c.us');
        msg.reply(contact);
        //chat.sendMessage(vcard)

    } /*else if (msg.body == "" && msg.type === "list_response") {
        
            let vcard = 'BEGIN:VCARD\n' 
              + 'VERSION:3.0\n' 
              + 'FN:NOME COMPLETO\n' 
              + 'ORG:Professor de ?????????????;\n' 
              + 'EMAIL;type=INTERNET;type=WORK;type=pref:???????????????@udf.edu.br\n'
              + 'EMAIL:????????@gmail.com\n'
              + 'TEL;type=CELL;type=VOICE;waid=556112345678:+55 61 91234-5678\n'
              + 'BDAY:DD/MM/AAAA\n'
             // + 'ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America\n'
             + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
              + 'END:VCARD'
    
            chat.sendMessage(vcard)

    } else if (msg.body == "" && msg.type === "list_response") {
        
            let vcard = 'BEGIN:VCARD\n' 
              + 'VERSION:3.0\n' 
              + 'FN:NOME COMPLETO\n' 
              + 'ORG:Professor de ?????????????;\n' 
              + 'EMAIL;type=INTERNET;type=WORK;type=pref:???????????????@udf.edu.br\n'
              + 'EMAIL:????????@gmail.com\n'
              + 'TEL;type=CELL;type=VOICE;waid=556112345678:+55 61 91234-5678\n'
              + 'BDAY:DD/MM/AAAA\n'
             // + 'ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America\n'
             + 'CATEGORIES:Informações pessoais, proibida a divulgação e uso indevido de acordo com a LGPD!\n'
              + 'END:VCARD'
    
            chat.sendMessage(vcard)

    }*/ //else if (msg.body == "Central de Estágios" && msg.type === "list_response") {
    else if (msg.body == "CdE") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Central de Estágios UDF\n'
            + 'ORG:Educação;\n'
            + 'ADR;TYPE=WORK,PREF:;;704/904 Seps Eq 702/902;Brasília - DF;70390-045;Brasil\n'
            + 'TEL;type=CELL;type=VOICE;waid=556198235930:+55 61 99823-5930\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556198235930@c.us');
        msg.reply(contact);
        //chat.sendMessage(vcard)

        //} else if (msg.body == "Coordenação de Ciências Exatas e Tecnológicas" && msg.type === "list_response") {
    } else if (msg.body == "CdCER") {

        let vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Coordenação de Ciências Exatas e Tecnológicas\n'
            + 'ORG:Coordenação de Ciências Exatas e Tecnológicas;\n'
            + 'ADR;TYPE=WORK,PREF:;;704/904 Seps Eq 702/902;Brasília - DF;70390-045;Brasil\n'
            + 'TEL;type=CELL;type=VOICE;waid=556196457438:+55 61 99645-7438\n'
            + 'TEL;waid=556137048884:+55 61 3704-8884\n'
            + 'END:VCARD'

        const contact = await client.getContactById('556196457438@c.us');
        msg.reply(contact);


    } else if (msg.body == "FdIA") {
        msg.reply(`Por favor, escreva o nome do material que deseja, como descrito em negrito!\n*AI FdIA* - Aula Introdutória 06/02/24\n*AII FdIA* - Aula 20/02/2024 - A INFLUÊNCIA DA LÓGICA NOS ESTUDOS DA INTELIGÊNCIA ARTIFICIAL`);
    } else if (msg.body == "AI FdIA") {
        chat.sendMessage('🔎 Procurando documento 🔍')
        try {
        const media = MessageMedia.fromFilePath('./attachments/AULA INTRODUTORIA - Fundamentos Da Inteligencia Artificial.zip')
            chat.sendMessage(media)
        } catch(error) {
            chat.sendMessage('Documento não encontrado! 📄')
        }
    } else if (msg.body == "AII FdIA") {
        chat.sendMessage('🔎 Procurando documento 🔍')
        try {
        const media = MessageMedia.fromFilePath('./attachments/CAPITULO 1 - A INFLUENCIA DA LOGICA NOS ESTUDOS DA INTELIGENCIA ARTIFICIAL.pdf')
            chat.sendMessage(media)
        } catch(error) {
            chat.sendMessage('Documento não encontrado! 📄')
        }
    }

    if (msg.body === '!ping replyyy') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    } /*else if (msg.body.startsWith('!sendto ')) {
        // Direct send a new message to specific id
        let number = msg.body.split(' ')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        chat.sendSeen();
        client.sendMessage(number, message);

    } /*else if (msg.body === '!sendpoll') {
        await msg.reply(new Poll('Winter or Summer?', ['Winter', 'Summer']));
        await msg.reply(new Poll('Cats or Dogs?', ['Cats', 'Dogs'], { allowMultipleAnswers: true }));
        await msg.reply(
            new Poll('Cats or Dogs?', ['Cats', 'Dogs'], {
                messageSecret: [
                    1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]
            })
        );
    }*/

    if (!msg.body.toLowerCase().startsWith(PREFIX)) return;

    const args = msg.body.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();


    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));


    let gg = args.join(' ')
    let d = new Date();

    //if(!command) return msg.react('🤔') && client.sendMessage(msg.from, `Olá @${contact.number} 👋🏻, acho que você tentou executar um comando erroneamente!\nPara ver meus comandos utilize: *${PREFIX}ajuda*`, {mentions: [contact]})

    try {
        command.execute(client, msg, args);
    } catch (error) {
        console.error(colors.green(`${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()} `) + error);
    }

    if (command) return console.log(colors.green(`${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`) + ` | ${msg.author ? msg.author.split('@c.us')[0] : msg.from.split('@c.us')[0]} ultilizou o comando: ${PREFIX}${commandName} ${gg}`)

});

client.on('vote_update', (vote) => {
    /** The vote that was affected: */
    console.log(vote);
});

process.on("uncaughtException", (err) => {
    console.log("Exceção não capturada: " + err);

    let number = '556196621014'
    number = number.includes('@c.us') ? number : `${number}@c.us`;
    client.sendMessage(number, `Exceção não capturada: ${err}`);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log(
        "[FATAL] Possível rejeição não tratada em: ",
        promise,
        " razão: ",
        reason.message
    );

    let number = '556196621014'
    number = number.includes('@c.us') ? number : `${number}@c.us`;
    client.sendMessage(number, `[FATAL] Possível rejeição não tratada em: ${promise}\n Motivo: ${reason.message}`);

});

client.on('message_create', async (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe) {
        // do stuff here
    }

    // Unpins a message
    if (msg.fromMe && msg.body.startsWith('!unpin')) {
        const pinnedMsg = await msg.getQuotedMessage();
        if (pinnedMsg) {
            // Will unpin a message
            const result = await pinnedMsg.unpin();
            console.log(result); // True if the operation completed successfully, false otherwise
        }
    }
});

client.on('message_ciphertext', (msg) => {
    // Receiving new incoming messages that have been encrypted
    // msg.type === 'ciphertext'
    msg.body = 'Waiting for this message. Check your phone.';

    // do stuff here
});

/*client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after); // message after it was deleted.
    if (before) {
        console.log(before); // message before it was deleted.
    }
});*/

client.on('message_revoke_everyone', async (message, revoked_msg) => {
    const contact = await message.getContact()
    //console.log('test', message); 
    if (revoked_msg) {
        console.log('revoked', revoked_msg);
        let number = '556196621014'
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        if (revoked_msg.type == 'chat') {
            if (revoked_msg._data.id.participant === revoked_msg.author) {
                if (contact.isMe === true) {
                    client.sendMessage(number, `*Eu* apaguei uma mensagem!\n *Mensagem:* ${revoked_msg.body}`)
                } else {
                    client.sendMessage(number, `*${contact.name}* apagou uma mensagem!\n *Mensagem:* ${revoked_msg.body}`)
                }
            } else {
                client.sendMessage(number, `${revoked_msg._data.id.participant ? revoked_msg._data.id.participant.split('@c.us')[0] : revoked_msg._data.id.participant.split('@c.us')[0]} apagou a mensagem de ${revoked_msg.author ? revoked_msg.author.split('@c.us')[0] : revoked_msg.author.split('@c.us')[0]}!\n*Mensagem:* ${revoked_msg.body}`)
            }
        } else {
            client.sendMessage(number, `${contact.name} apagou uma mensagem!\n*Tipo:* ${revoked_msg.type}`)
        }
    }
});

client.on('message_revoke_me', async (msg) => {
    // Fired whenever a message is only deleted in your own view.
    console.log(msg.body); // message before it was deleted.
});

client.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

    if (ack == 3) {
        // The message was read
    }
});


client.on('group_join', async (notification) => {
    console.log('join', notification);
    const chat = await notification.getChat()
    const gp = await notification.getRecipients()
    const rand = Math.floor(Math.random() * gifs.length)
    let ft = await MessageMedia.fromUrl(gifs[rand].img, { sendVideoAsGif: true })

    const texto = `Olá @${gp[0].number}👋🏻\nSeja bem vindo(a) ao grupo de *${chat.name}* da UDF!\nPara ver meus comandos digite:\n_${PREFIX}ajuda_ ou _${PREFIX}help_\n`

    notification.reply(ft, { caption: texto, mentions: gp })
});

client.on('group_leave', async (notification) => {
    console.log('leave', notification);
    const gp = await notification.getRecipients()
    let ft = await MessageMedia.fromUrl(`https://tenor.com/view/triste-sad-cry-tears-lonely-gif-17323377.gif`)
    notification.reply(ft, { caption: `Poxa... @${gp[0].number}(${gp[0].name ? gp[0].name : gp[0].pushname}) saiu do grupo 😢\nSerá que algum dia ele(a) volta?`, mentions: gp });
});

client.on('group_update', (notification) => {
    // Group picture, subject or description has been updated.
    console.log('Alteração', notification);
});

client.on('change_state', state => {
    console.log('STATUS ALTERADO', state);
});

client.on('disconnected', async (reason) => {
    console.log('O bot foi desconectado', reason);
    await client.initialize()
});

// Change to false if you don't want to reject incoming calls
let rejectCalls = true;

client.on('call', async (call) => {
    console.log('Chamada recebida, rejeitada. Vá para linha 574 para desativar', call);
    if (rejectCalls) await call.reject();
    await client.sendMessage(call.from, `[${call.fromMe ? 'Chamada efetuada' : 'Chamada recebida'}] Chamada de *${call.from.split('@c.us')[0]}*, do tipo ${call.isGroup ? 'grupo' : ''} \`${call.isVideo ? 'video' : 'audio'}\`. ${rejectCalls ? 'Esta chamada foi rejeitada automaticamente pelo script.' : ''}`);
});

client.on('contact_changed', async (message, oldId, newId, isContact) => {
    /** The time the event occurred. */
    const eventTime = (new Date(message.timestamp * 1000)).toLocaleString();

    console.log(
        `The contact ${oldId.slice(0, -5)}` +
        `${!isContact ? ' that participates in group ' +
            `${(await client.getChatById(message.to ?? message.from)).name} ` : ' '}` +
        `changed their phone number\nat ${eventTime}.\n` +
        `Their new phone number is ${newId.slice(0, -5)}.\n`);

    /**
     * Information about the @param {message}:
     * 
     * 1. If a notification was emitted due to a group participant changing their phone number:
     * @param {message.author} is a participant's id before the change.
     * @param {message.recipients[0]} is a participant's id after the change (a new one).
     * 
     * 1.1 If the contact who changed their number WAS in the current user's contact list at the time of the change:
     * @param {message.to} is a group chat id the event was emitted in.
     * @param {message.from} is a current user's id that got an notification message in the group.
     * Also the @param {message.fromMe} is TRUE.
     * 
     * 1.2 Otherwise:
     * @param {message.from} is a group chat id the event was emitted in.
     * @param {message.to} is @type {undefined}.
     * Also @param {message.fromMe} is FALSE.
     * 
     * 2. If a notification was emitted due to a contact changing their phone number:
     * @param {message.templateParams} is an array of two user's ids:
     * the old (before the change) and a new one, stored in alphabetical order.
     * @param {message.from} is a current user's id that has a chat with a user,
     * whos phone number was changed.
     * @param {message.to} is a user's id (after the change), the current user has a chat with.
     */
});

client.on('group_admin_changed', (notification) => {
    if (notification.type === 'promote') {
        /** 
          * Emitted when a current user is promoted to an admin.
          * {@link notification.author} is a user who performs the action of promoting/demoting the current user.
          */
        console.log(`You were promoted by ${notification.author}`);
    } else if (notification.type === 'demote')
        /** Emitted when a current user is demoted to a regular user. */
        console.log(`You were demoted by ${notification.author}`);
});

client.on('group_membership_request', async (notification) => {
    /**
     * The example of the {@link notification} output:
     * {
     *     id: {
     *         fromMe: false,
     *         remote: 'groupId@g.us',
     *         id: '123123123132132132',
     *         participant: 'number@c.us',
     *         _serialized: 'false_groupId@g.us_123123123132132132_number@c.us'
     *     },
     *     body: '',
     *     type: 'created_membership_requests',
     *     timestamp: 1694456538,
     *     chatId: 'groupId@g.us',
     *     author: 'number@c.us',
     *     recipientIds: []
     * }
     *
     */
    console.log(notification);
    /** You can approve or reject the newly appeared membership request: */
    await client.approveGroupMembershipRequests(notification.chatId, notification.author);
    await client.rejectGroupMembershipRequests(notification.chatId, notification.author);
});