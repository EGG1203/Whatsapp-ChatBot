const { List } = require('../index')
const prefix = require("../package.json").prefix


module.exports = {
    name: "lista",
    aliases: ["list", "listas"],
    description: "Retorna uma lista de conteúdos do curso!",
    async execute(client, msg, args) {
        let sections = [{title:'Listagem de documentos da UDF',rows:[
            //{title:'', description: ''},
            //{title:'', description: ''},
            {title:'Calendário Ciclos 1 e 2', description: 'DOL\'s 2023'},
            {title:'Protocolo de biossegurança', description: 'UDF 2022'},
            {title:'Plano de contingência', description: 'UDF 2022'},
            {title:'Guia DOL\'s', description: 'Disciplinas online 2023'},
            {title:'Instruções das atividades de Temas Transversais', description: 'Disciplinas online 2023'},
            {title:'Orientação para inclusão de Temas Transversais', description: 'Disciplinas online 2023'},
            {title:'Edital Monitoria', description: 'Processo Seletivo Complementar para Monitoria de Ensino 2022'}
        ]}];
        let list = new List(`Caso queira ver a lista de conteúdos dos cursos utilize: *${prefix}importantes*`, 'Listagem', sections, `Listagem de documentos da UDF`);
        client.sendMessage(msg.from, list);  
    }
}