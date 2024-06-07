const { Buttons, List } = require('../index')

module.exports = {
    name: "importantes",
    aliases: ["botoes", "botões", "importante"],
    description: "Veja alguns botões importantes!",
    async execute(client, msg, args) {
        let ead = new Buttons(
            'Selecione o correspondente',
            [
                //{ body: 'Área do Aluno', url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&terminal=false&blackboard=false' },
                { body: 'Discord' },
                { body: 'Calendário 2023' },
                { body: 'Lista de conteúdos' },
            ],
            'Cousas importantes'
        );
        client.sendMessage(msg.from, ead);
        /*let sections = [{title:'Importantes',rows:[
            {title:'Discord'},
            {title:'Calendário 2022'},
            {title:'Lista de conteúdos'}
        ]}];
        let button = new List('Selecione o correspondente', 'Importantes', sections, 'Cousas importantes');
        //let button = new Buttons('Clique no botão correspondente',[{body:'Discord'}, {body: 'Calendário 2022'}, {body: 'Lista de conteúdos'}],'Importantes');
        client.sendMessage(msg.from, button);*/
    }
}