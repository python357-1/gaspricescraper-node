const cheerio = require("cheerio")

let gasprices = []

fetch("https://www.gasbuddy.com/home?search=76182&fuel=1&method=all&maxAge=0")
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