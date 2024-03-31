import puppeteer from "puppeteer";

const url = 'https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=65c65432c87e2601635761ef'

type LessonType = {
    name: string | undefined,
    time: string | undefined
}

const dateFun = (value: number) => {
    const currentDate = new Date()
    const outputDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+value)
    return [outputDate.getMonth(), outputDate.getDate()]
}

export const dataFromWeb = async (day: number) => {
    const date = dateFun(day)
    
    const delay = (ms: number) => {
        return new Promise( resolve => setTimeout(resolve, ms))
    }

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    })

    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle0'
    })

    await delay(0)
    await page.click('#calendarioPubblico > md-toolbar > div:nth-child(10) > button:nth-child(1)')
    await delay(500)
    await page.click('#date-picker-toolbar > div.md-datepicker-input-container > button')
    await delay(500)
    await page.click(`#md-0-month-2024-${date[0]}-${date[1]} > span`)
    // await page.wait
    // await page.click('arial-label="Display in calendar format"')
    await delay(200)

    const titleOfPage = await page.evaluate(() => {
        const date: Array<LessonType> = []
        // date.push(String(document.querySelector('.fc-title')?.innerHTML))
        document.querySelectorAll('.fc-content ').forEach((value) => {
            const lessonObj = {
                name: value.querySelector('.fc-title')?.innerHTML.split('<')[0], 
                time: value.querySelector('.fc-time > span')?.innerHTML
            }
            date.push(lessonObj)
        })
        return date
    })

    // const result = await page.evaluate(() => {
    //     const lesson = []
    //     document.querySelectorAll('fc-list-item-title fc-widget-content').forEach((card) => {
    //         lesson.push
    //     })
    // })
    await page.close()
    return titleOfPage
}