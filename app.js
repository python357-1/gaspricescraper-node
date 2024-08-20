const ZIP_CODE = ''
const SAMS_CLUB_ENABLED = false
const SAMS_CLUB_URL = '' // if sams club scraping is enabled, the url must be set to a particular sams club. you can find a location by zip code at https://www.samsclub.com/locator

const cheerio = require("cheerio")

function normalizePrice(str) {
    if (str.includes("-")) {
        return 0
    }
    if (str.startsWith("$")) {
        return parseFloat(str.substring(1))
    }
    return parseFloat(str)
}

let gasprices = []

fetch(`https://www.gasbuddy.com/home?search=${ZIP_CODE}&fuel=1&method=all&maxAge=0`, {headers: {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"}})
.then(res => {
    res.text()
    .then(html => {
        let $ = cheerio.load(html)
        var panels = $(".panel__panel___3Q2zW")
        Array.from(panels).forEach(x => {
            var station_name = $(x).find(".header__header3___1b1oq").text().trim();
            var address = $(x).find(".StationDisplay-module__address___2_c7v").text().trim();
            var price = normalizePrice($(x).find(".StationDisplayPrice-module__price___3rARL").text());
            var scraped_time = Date.now();
            var recorded_time = $(x).find(".ReportedBy-module__postedTime___J5H9Z").text().trim();
                
            if (recorded_time == "") {
                recorded_time = scraped_time
            }

            if (station_name !== '') {
                console.log(`${station_name}@@@${address}@@@${price}@@@${scraped_time}@@@${recorded_time}`)
            }
        })
    })
})

if (SAMS_CLUB_ENABLED) {
    fetch(SAMS_CLUB_URL, {headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"}})
    .then(res => res.text())
    .then(html => {
        let $ = cheerio.load(html);
        var station_name = $(".sc-club-general-info-card-club-name").text();
        var address = $("div.sc-club-general-info-card-line-wrapper:nth-child(1)").text();
        var price = normalizePrice($(".sc-club-gas-prices-grid > div:nth-child(1) > div:nth-child(2)").text().substring(0, 4))
        var scraped_time = Date.now();
        var recorded_time = Date.now();

       console.log(`${station_name}@@@${address}@@@${price}@@@${scraped_time}@@@${recorded_time}`)
    })
}
