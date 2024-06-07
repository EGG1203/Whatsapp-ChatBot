const { Buttons, List } = require('../index')

module.exports = {
    name: "contatos",
    aliases: ["contato", "ctt", "ctts"],
    description: "Veja os contatos de prof's e coord's!",
    async execute(client, msg, args) {
      const chat = await msg.getChat();
        /*let sections = [{title:'Agenda',rows:[
            {title:'Kerlla de Sousa L. P.'},
            {title:'Henrique Domingues Garcia'},
            {title:'Henderson Matsuura Sanches'},
            {title:'Eliel Silva da Cruz'},
            {title:'Kadidja V. R. de Oliveira'},
            {title:'Alexandre C. Ataíde'},
            {title:'Letícia T. Maia Zoby'},
            {title:'Welton Dias de Lima'},
            {title:'Central de Estágios'},
            {title:'Coordenação de Ciências Exatas e Tecnológicas'},
        ]}];
        let cont = new List('Selecione o correspondente', 'Contatos', sections, 'Veja os contatos importantes');
        //let cont = new Buttons('Selecione o correspondente',[{body:'Kerlla de Sousa L. P.'}, {body:'Alexandre C. Ataíde'}, {body:'Elvira M. A. Uchôa'}],'Veja os contatos de prof\'s e coord\'s!');
        client.sendMessage(msg.from, cont)*/
        chat.sendMessage(`Por favor, escreva as iniciais do contato que deseja, como especificado em negrito!\n\n- *\`KSLP\`* - Kerlla de Sousa Luz Prates\n- *\`KVRdO\`* - Kadidja V. R. de Oliveira\n- *\`ACA\`* - Alexandre Camárcio Ataíde\n- *\`LTMZ\`* - Letícia Toledo Maia Zoby\n- *\`ESdC\`* - Eliel Silva da Cruz\n- *\`WDdL\`* - Welton Dias de Lima\n- *\`CdE\`* - Central de Estágios\n- *\`CdCER\`* - Coordenação de Ciências Exatas e Tecnológicas`)
        msg.reply("Caso você tenha algum contato para complementar à lista, por favor, envie para @556196621014", null, {
            mentions: ['556196621014@c.us']
          })
    } 
}