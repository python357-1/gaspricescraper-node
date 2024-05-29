const fs = require('node:fs')
const http = require("node:http")

const LOG_FILE = ''
const PORT = 6969

function getStationsJson() {
    var data_array = []
    file = fs.readFileSync(LOG_FILE, 'utf8')

    for (var line of file.split("\n")) {
        if (line == "") break;

        let data = line.split("@@@")
        let station = {
            station_name: data[0],
            address: data[1],
            price: data[2],
            scraped_time: data[3], 
            recorded_time: data[4]
        }
        data_array.push(station)
    }

    return data_array
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify(getStationsJson()))
})

server.listen(PORT, () => {
    console.log("server listening at " + PORT)
})
