import TelegramBot from 'node-telegram-bot-api'
import TelegramApi from 'node-telegram-bot-api'
import { dataFromWeb } from './parsing/unipi-pars'

const token = '6556895330:AAEVcnk5f15OhPhxy4j2BfohIWkoxVJzpn4'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
    {command: '/lessontoday', description: 'shows all the lessons today'},
    {command: '/lessontomorrow', description: 'shows all the lessons tomorrow'},
])


bot.on('message', async msg => {

    const text = msg.text
    const chatId = msg.chat.id
    const message_id = msg.message_id

    await bot.sendMessage(chatId, 'Please wait...')

    if( text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/be1/98c/be198cd5-121f-4f41-9cc0-e246df7c210d/2.webp')
        await bot.sendMessage(chatId, `Hello, ${msg.from?.first_name}!`)
    }
    if( text === '/sendToAnna') {
        await bot.sendMessage(1134536213, 'Душистая пися :)')
    }

    if( text === '/lessontoday'){
        const data = await dataFromWeb(0)
        await bot.deleteMessage(chatId, message_id+1)
        if (!data[0]){
            await bot.sendMessage(chatId, 'No lessons today')
        }
        data.forEach(async (lesson) => {
            await bot.sendMessage(chatId, `${lesson.name}: ${lesson.time}`)
        })
    }

    if( text === '/lessontomorrow'){
        const data = await dataFromWeb(1)
        await bot.deleteMessage(chatId, message_id+1)
        console.log(data)
        if (!data[0]){
            await bot.sendMessage(chatId, 'No lessons tomorrow')
        }
        data.forEach(async (lesson) => {
            await bot.sendMessage(chatId, `${lesson.name}: ${lesson.time}`)
        })
    }
    // await bot.sendMessage(chatId, 'You have written ' + text )
    console.log(msg)
})
// #md-6-month-2024-2-29
// #md-6-month-2024-3-1

// 1701385200000
// 1701471600000
// 86400000
