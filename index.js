const TelegramApi = require('node-telegram-bot-api')
const {gameOptions,againOptions} = require('./options')
const token = '6139556949:AAGjh-TEsszmj8gRZkCSEQny1FWUHuiOT60'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
    {command: "/start", description: "Start welcome"},
    {command: "/info", description: "Info"},
    {command: "/game", description: "Game"}
])

const chats = {}



const startGame = async chatId => {
    await bot.sendMessage(chatId, "lets game")
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, "guess a number", gameOptions)
}

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        if (text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/12.webp')
            return bot.sendMessage(chatId, `Welcome to my tgBot`)
        }
        if (text === '/info'){
            return bot.sendMessage(chatId, `NEW TELEGRAM BOT`)
        }
        if (text === "/game"){
            startGame(chatId)
        }
        bot.sendMessage(chatId, "I dont understand you")
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again'){
            return startGame(chatId)
        }
        if (data == chats[chatId]){
            return await bot.sendMessage(chatId, "Congratulations, you won!", againOptions)
        }else {
            return await bot.sendMessage(chatId, `wrong, i take ${chats[chatId]}`, againOptions)
        }

    })
}
start()