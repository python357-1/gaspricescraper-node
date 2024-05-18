const ZIP_CODE = ''
const SAMS_CLUB_ENABLED = false
const SAMS_CLUB_URL = '' // if sams club scraping is enabled, the url must be set to a particular sams club. you can find a location by zip code at https://www.samsclub.com/locator

const cheerio = require("cheerio")

let gasprices = []

fetch(`https://www.gasbuddy.com/home?search=${ZIP_CODE}&fuel=1&method=all&maxAge=0`)
.then(res => {
    res.text()
    .then(html => {
        let $ = cheerio.load(html)
        var panels = $(".panel__panel___3Q2zW")
        Array.from(panels).forEach(x => {
            var y = {
                station_name: $(x).find(".header__header3___1b1oq").text(),
                address: $(x).find(".StationDisplay-module__address___2_c7v").text(),
                price: $(x).find(".StationDisplayPrice-module__price___3rARL").text(),
                scraped_time: Date.now(),
                recorded_time: $(x).find(".ReportedBy-module__postedTime___J5H9Z").text(),
            }
            if (y.station_name !== '') {
                console.log(y)
            }
        })
    })
})

if (SAMS_CLUB_ENABLED) {
    fetch(SAMS_CLUB_URL)
    .then(res => res.text())
    .then(html => {
        let $ = cheerio.load(html)
        var gasdata = {
            station_name: $(".sc-club-title-name").text(),
            address: $(".sc-club-address").text(),
            price: $($(".sc-gas-price")['0']).text().substring(0, 4),
            scraped_time: Date.now(),
            recorded_time: Date.now()
        }

        console.log(gasdata)
    })
}