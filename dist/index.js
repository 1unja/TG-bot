"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const unipi_pars_1 = require("./parsing/unipi-pars");
const token = '6556895330:AAEVcnk5f15OhPhxy4j2BfohIWkoxVJzpn4';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.setMyCommands([
    { command: '/lessontoday', description: 'shows all the lessons today' },
    { command: '/lessontomorrow', description: 'shows all the lessons tomorrow' },
]);
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const text = msg.text;
    const chatId = msg.chat.id;
    const message_id = msg.message_id;
    yield bot.sendMessage(chatId, 'Please wait...');
    if (text === '/start') {
        yield bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/be1/98c/be198cd5-121f-4f41-9cc0-e246df7c210d/2.webp');
        yield bot.sendMessage(chatId, `Hello, ${(_a = msg.from) === null || _a === void 0 ? void 0 : _a.first_name}!`);
    }
    if (text === '/sendToAnna') {
        yield bot.sendMessage(1134536213, 'Душистая пися :)');
    }
    if (text === '/lessontoday') {
        const data = yield (0, unipi_pars_1.dataFromWeb)(0);
        yield bot.deleteMessage(chatId, message_id + 1);
        if (!data[0]) {
            yield bot.sendMessage(chatId, 'No lessons today');
        }
        data.forEach((lesson) => __awaiter(void 0, void 0, void 0, function* () {
            yield bot.sendMessage(chatId, `${lesson.name}: ${lesson.time}`);
        }));
    }
    if (text === '/lessontomorrow') {
        const data = yield (0, unipi_pars_1.dataFromWeb)(1);
        yield bot.deleteMessage(chatId, message_id + 1);
        console.log(data);
        if (!data[0]) {
            yield bot.sendMessage(chatId, 'No lessons tomorrow');
        }
        data.forEach((lesson) => __awaiter(void 0, void 0, void 0, function* () {
            yield bot.sendMessage(chatId, `${lesson.name}: ${lesson.time}`);
        }));
    }
    // await bot.sendMessage(chatId, 'You have written ' + text )
    console.log(msg);
}));
// #md-6-month-2024-2-29
// #md-6-month-2024-3-1
// 1701385200000
// 1701471600000
// 86400000
