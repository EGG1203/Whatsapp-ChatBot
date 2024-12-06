const prefix = require("../package.json").prefix
const nomebot = require("../package.json").nomebot


module.exports = {
  name: "ajuda",
  aliases: ["help", "h", "comandos"],
  description: "Veja os comandos do bot!",
  async execute(client, message, args) {
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
              title: `${prefix}aulas `,
              description: 'Veja as informações das aulas(presenciais e EAD) 🤓',
            },
            {
              rowId: '2',
              title: `${prefix}contatos `,
              description: 'Veja os contatos de prof\'s e coord\'s 👨🏻‍🏫👩🏻‍🏫',
            },
            {
              rowId: '3',
              title: `${prefix}datas `,
              description: 'Veja as datas importantes para este semestre! 📆',
            },
            {
              rowId: '4',
              title: `${prefix}lista `,
              description: 'Listagem de documentos importantes da UDF 📑',
            },
            {
              rowId: '5',
              title: `${prefix}faculdade `,
              description: 'Localização da faculdade 🚩',
            },
            {
              rowId: '6',
              title: `${prefix}redes sociais`,
              description: 'Confira as redes sociais da UDF! 👩🏻‍💻',
            },
            {
              rowId: '7',
              title: `${prefix}acad `,
              description: 'Pesquise atividades acadêmicas relacionadas à sua pesquisa 🔎',
          },

          ],
        },
        /*{
          title: 'Menu diversos',
          rows: [
            
            {
              rowId: '0',
              title: `${prefix}acad `,
              description: 'Pesquise atividades acadêmicas relacionadas à sua pesquisa 🔎',
            },
            {
              rowId: '1',
              title: `${prefix}google`,
              description: 'Pesquisa no google o que escrevestes 📃',
            },
            {
              rowId: '2',
              title: `${prefix}ping `,
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
    /*chat.sendMessage(`Olá @${contact.number}!`,  {
        mentions: [contact]
    });
    let sections = [{title:'Comandos',rows:[
    {title: `${prefix}aulas `, description: `Veja as informações das aulas(presenciais)`},
    {title: `${prefix}ead `, description: `Veja o link das aulas EAD`},
    {title: `${prefix}dúvida `, description: `Veja as dúvidas frequentes que o bot pode solucionar para você`},
    {title: `${prefix}contatos `, description: `Veja os contatos de prof\'s e coord\'s`},
    {title: `${prefix}lista `, description: `Listagem de documentos do curso`},
    {title: `${prefix}importantes `, description: `Botões com informações importantes`}, 
    {title: `${prefix}covid `, description: `Veja as últimas informações sobre o corona`},
    {title: `${prefix}ping`, description: `Pong`}, 
    {title: `${prefix}anime`, description: `Veja as informações sobre o anime!`}, 
    {title: `${prefix}faculdade `, description: `Localização da faculdade`},
    //{title: '${prefix}fig ', description: 'Veja algumas figurinhas para você adicionar'},
    {title: `${prefix}google`, description: `Pesquisa no google o que escrevestes`},
    {title: `${prefix}calc`, description: `Calculadora automatizada`},
   // {title: '!infogrupo ', description: 'Retorna as informações do grupo'},
  //  {title: '!repetir', description: 'Repete a mensagem descrita'},  
   // {title: '!chats ', description: 'Veja quantos chat\'s o bot tem em aberto!'}, 
  //  {title: '!infobot ', description: 'Veja as informações do bot'}, 
    //{title: '!ig', description: 'Retorna as informações de um Instagram(desativado temporariamente)'},
    //{title: '!correios', description: 'Rastreie seu pedido do correios(desativado temporariamente)'},
    //{title: '!infomidia', description: 'Veja as informações da mídia enviada'}, 
    //{title: '!reenvmidia', description: 'Faça o bot reenviar a mídia mencionada'}, 
   // {title: '!num', description: 'Verifique se um número está registrado no WhatsApp'},
   // {title: '', description: ''},
   // {title: '', description: ''},
    ]}];
    let list = new List('Veja os comandos do bot!', 'Comandos', sections, 'Lista de comandos');
    chat.sendMessage(list)*/
    //chat.sendMessage(`*Veja meus comandos abaixo* 👇\n> em fase de construção\n\n- *\`${prefix}acad\`* Pesquise e receba resultados do google acadêmico!\n- *\`${prefix}add\`* - Adicionar alguém ao grupo!\n- *\`${prefix}advice\`* - Receba um conselho (inglês).\n- *\`${prefix}anime\`* - Informações sobre o anime citado!\n- *\`${prefix}aulas\`* - Veja as informações das aulas(presenciais)\n- *\`${prefix}ead\`* - Veja o link das aulas EAD\n- *\`${prefix}contatos\`* - Veja os contatos de prof\'s e coord\'s\n- *\`${prefix}importantes\`* - Informações importantes\n- *\`${prefix}imagine\`* - Crie uma imagem a partir de uma descrição!\n- *\`${prefix}gpt\`* - Receba uma resposta do que foi pedido ou perguntado!`)
  }
}