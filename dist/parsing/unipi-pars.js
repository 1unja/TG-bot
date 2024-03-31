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
exports.dataFromWeb = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = 'https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=65c65432c87e2601635761ef';
const dateFun = (value) => {
    const currentDate = new Date();
    const outputDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + value);
    return [outputDate.getMonth(), outputDate.getDate()];
};
const dataFromWeb = (day) => __awaiter(void 0, void 0, void 0, function* () {
    const date = dateFun(day);
    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    const browser = yield puppeteer_1.default.launch({
        headless: false,
        defaultViewport: null
    });
    const page = yield browser.newPage();
    yield page.goto(url, {
        waitUntil: 'networkidle0'
    });
    yield delay(0);
    yield page.click('#calendarioPubblico > md-toolbar > div:nth-child(10) > button:nth-child(1)');
    yield delay(500);
    yield page.click('#date-picker-toolbar > div.md-datepicker-input-container > button');
    yield delay(500);
    yield page.click(`#md-0-month-2024-${date[0]}-${date[1]} > span`);
    // await page.wait
    // await page.click('arial-label="Display in calendar format"')
    yield delay(200);
    const titleOfPage = yield page.evaluate(() => {
        const date = [];
        // date.push(String(document.querySelector('.fc-title')?.innerHTML))
        document.querySelectorAll('.fc-content ').forEach((value) => {
            var _a, _b;
            const lessonObj = {
                name: (_a = value.querySelector('.fc-title')) === null || _a === void 0 ? void 0 : _a.innerHTML.split('<')[0],
                time: (_b = value.querySelector('.fc-time > span')) === null || _b === void 0 ? void 0 : _b.innerHTML
            };
            date.push(lessonObj);
        });
        return date;
    });
    // const result = await page.evaluate(() => {
    //     const lesson = []
    //     document.querySelectorAll('fc-list-item-title fc-widget-content').forEach((card) => {
    //         lesson.push
    //     })
    // })
    yield page.close();
    return titleOfPage;
});
exports.dataFromWeb = dataFromWeb;
