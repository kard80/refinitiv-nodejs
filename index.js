const https = require('https')
const cheerio = require('cheerio')

const options = {
    hostname: "codequiz.azurewebsites.net",
    headers: {
        "cookie": "hasCookie=true",
    }
}

const req = https.request(options, res => {
    res.on('data', d => {
        const $ = cheerio.load(d)
        
        let td = []
        $('td').each(function (i, e) {
            td[i] = $(this).text();
        });

        let title = []
        let value = []
        for (let i = 0; i <= td.length; i+=5) {
            if (td[i] === undefined) {
                break
            }
            let trim = td[i].trim()
            title.push(trim)
            value.push(td[i+1])
        }

        const args = process.argv
        let answer = ""
        title.forEach((item, index) => {
            if (item == args[2] ) {
                answer =value[index]
            }
        })
        console.log(answer)

    })

})

req.on('error', err => {
    console.log(err)
})

req.end()