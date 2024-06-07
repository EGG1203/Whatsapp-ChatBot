const { MiniGames, MiniGame } = require('wa-minigames');
const minigames = new MiniGames();

module.exports = {
    name: "start",
    aliases: ["test"],
    description: "test!",
    async execute(client, msg, args) {
                class MyGame extends MiniGame {
                    constructor(message, client){
                        super();
                        this.client = client;
                        this.chatId = message._getChatId();
                        this.answer = Math.floor(Math.random() * 10).toString();
                        this.client.sendMessage(this.chatId, "Game Started! Guess the number!");
                    }
                    async procMessage(message){
                        if (message.body===this.answer){
                            await this.client.sendMessage(this.chatId, 'You are right!');
                            this.gameOver();
                        }else if (!message.fromMe){
                            await this.client.sendMessage(this.chatId, 'You are wrong.');
                        }
                    }
                    gameOver(){
                        super.gameOver();
                    }
                }
                await minigames.addGameChat(msg._getChatId(), new MyGame(msg, client));
                minigames.forwardMsg(msg);
    }
}