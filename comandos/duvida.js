const { List } = require('../index')

module.exports = {
    name: "dúvida",
    aliases: ["duvida", "aux", "auxílio"],
    description: "Veja as dúvidas que o bot pode solucioná-las!",
    async execute(client, msg, args) {
        const chat = await msg.getChat()
        let sections = [{title:'Dúvidas frequentes',rows:[
            {title:'Antecipação Rematrícula 2022.2'},
            {title:'Emitir declarações'},
            {title:'Estágio Obrigatório'},
            {title:'ENADE'},
            {title:'Atividades Complementares'}
        ]}];
        let aulas = new List('Selecione a dúvida correspondente', 'Lista', sections, 'Dúvidas');
        client.sendMessage(msg.from, aulas); 
    }
}