const { Buttons } = require('../index');
const { List } = require('../index');

module.exports = {
    name: "ead",
    aliases: ["outras"],
    description: "Veja as matérias EAD!",
    async execute(client, msg, args) {
        const chat = await msg.getChat();
        let ead = new Buttons(
            'Clique na matéria correspondente',
            [
               // { body: 'Área do Aluno', url: 'https://novoportal.cruzeirodosul.edu.br/?empresa=udf&terminal=false&blackboard=false' },
                { body: 'Cálculo Numérico' },
                { body: 'Sistemas Cliente/Servidor' }
            ],
            'Matérias EAD'
        );
        client.sendMessage(msg.from, ead);           
        //chat.sendMessage(`Por favor, escreva o nome da matéria que deseja, como descrito em negrito!\n\n*EdS* - Engenharia de Software\n*PeE* - Probabilidade e Estatística`)
    }
}