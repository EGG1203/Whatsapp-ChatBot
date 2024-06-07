const axios = require('axios');
const { MessageMedia } = require('../index')
//var ig = require('instagram-scraping');

module.exports = {
    name: "instagram",
    aliases: ["ig"],
    description: "Retorna as informações de um Instagram!",
    async execute(client, msg, args) {
        const chat = await msg.getChat()
        if(!args.join(' ')) return msg.reply('Digite o nome de algum usuário, por favor!')
        const userName = args.join(' ')
        chat.sendMessage(`Procurando 🔍`)
    try {
        ig.scrapeUserPage(userName).then(async (result) => {
            console.log(result)
            //const { profile_pic_url, username, full_name, edge_followed_by, edge_follow, category_name, biography, external_url, is_verified, is_private} = result.data
            const pv = {
                true: "Sim 🔒",
                false: "Não 🔓"
            }
            const privado = pv[result.user.is_private];

            const vf = {
                true: "Sim ✅",
                false: "Não"
            }
            const verif = vf[result.user.is_verified];

            const categ = {
                "Figure public":"Figura pública",
                "Athlete":"Esportista",
                "Media":"",
                "Digital creator":"",
                "Design & fashion":"",
                "":"",
                "":"",
                null:"Nenhuma",
            }
            const categoria = categ[result.user.category_name];
            
            let media = await MessageMedia.fromUrl(result.user.profile_pic_url_hd)
            chat.sendMessage(media, {caption:`Instagram de *${result.user.username}*\n*Nome:* ${result.user.full_name}\n*Publicações:* ${result.user.edge_owner_to_timeline_media.count}\n*Seguidores:* ${result.user.edge_followed_by.count}\n*Seguindo:* ${result.user.edge_follow.count} pessoas\n*Conta privada:* ${privado}\n*Conta verificada:* ${verif}\n*Biografia:* \n${result.user.biography}\n*Categoria:* ${categoria ? categoria : result.user.category_name}\n${result.user.external_url ? result.user.external_url : ""}`})
        });
    } catch (e) {
        chat.sendMessage('Instagram não encontrado! 😢\nPor favor, verifique o nome do usuário e tente novamente.')
    }


        /*var state = 'desativado'
        if(state === "desativado") return msg.reply(`O comando foi desativado! Contate o proprietário do bot para obter mais informações!`)
        if(!args.join(' ')) return msg.reply('Digite o nome de algum usuário, por favor!')
        const userName = args.join(' ')

        await axios.get(`https://docs-jojo.herokuapp.com/api/stalk?username=${userName}`).then(async (response) => {

            const { username, biography, external_url, followers, following, name, category_name, is_private, is_verified, profile_pic } = response.data

            if(username == undefined || name == undefined) return msg.reply(`Instagram de ~*_${userName}_*~ não encontrado!`)

            let media = await MessageMedia.fromUrl(profile_pic)

            const cat = {
                "Tokoh Publik": "Figura pública",
                "Atlet": "Atleta",
                "": "",
                "": "",
                "": "",
                null: "Nenhuma",
            }
            const categoria = cat[category_name];

            const pv = {
                true: "Sim 🔒",
                false: "Não 🔓"
            }
            const privado = pv[is_private];

            const vf = {
                true: "Sim ✅",
                false: "Não"
            }
            const verif = vf[is_verified];

        const chat = await msg.getChat()
        if(external_url != null) {
            chat.sendMessage(media, {caption:`Instagram de *${username}*\n*Nome:* ${name}\n*Seguidores:* ${followers}\n*Seguindo:* ${following} pessoas\n*Conta privada:* ${privado}\n*Conta verificada:* ${verif}\n*Biografia:*\n ${biography}\n${external_url}`})
        } else {
            chat.sendMessage(media, {caption:`Instagram de *${username}*\n*Nome:* ${name}\n*Seguidores:* ${followers}\n*Seguindo:* ${following} pessoas\n*Conta privada:* ${privado}\n*Conta verificada:* ${verif}\n*Biografia:*\n ${biography}`})
        }
        })*/
    }
}