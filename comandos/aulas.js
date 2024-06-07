const { Buttons, List } = require('../index')

module.exports = {
    name: "aulas",
    aliases: ["aula", "zoom"],
    description: "Veja o link das aulas!",
    async execute(client, msg, args) {
        const chat = await msg.getChat();
       /* let ead = new Buttons(
            'Clique na matéria correspondente',
            [
                //{ body: 'Área do Aluno', url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&terminal=false&blackboard=false' },
                { body:'Processamento de Imagens' },
                { body:'Teoria dos Grafos' },
                { body:'Análise e Projeto de Sistemas' }
            ],
            'Aulas da semana',
            'GG BOT UDF 😎'
        );
        client.sendMessage(msg.from, ead);
        /*let sections = [{title:'Aulas',rows:[
            {title:'Estrutura de Dados II'},
            {title:'Sistemas Operacionais'},
            {title:'Banco de Dados'}
        ]}];
        let aulas = new List('Selecione a matéria correspondente', 'Aulas', sections, 'Aulas da semana');
        //let aulas = new Buttons('Clique no dia correspondente',[{body:'Segunda'},{body:'Terça'},{body: 'Quarta'}],'Aulas');
        client.sendMessage(msg.from, aulas);*/
        //chat.sendMessage(aulas);
        //chat.sendMessage(`*\`Código\`*\n> quote\n- Item 1\n* Item 2\n1. Item A\n2. Item B`)
        chat.sendMessage(`Por favor, escreva o nome da matéria que deseja, como descrito em negrito!\n\n*FdIA* - Fundamentos de Inteligência Artificial\n*PPDM* - Programação Para Dispositivos Móveis\n*LFA* - Linguagens Formais e Autômatos`);
    }
}