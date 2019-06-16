# Bash JS in

Have you ever wanted to Bash script something but Bash is not your favourite language?

Is the script you want to write complex?

You want to save your time because you are not Bash expert (yet)?

## Features

 - vanilla JavaScript
 - using Bash inside JavaScript
 - Bash output redirecition to JavaScript
 - JavaScript backticks `` templating for Bash
 - outputs command results to STDIN so it can be redirected

## Requirements

 - NodeJS 8 (for async, await and yield)

## Usage

``` javascript
var { Run, Command } = require('../src/core');

(async function () {
    var results = await Run(seriesOfCommands());
    console.log(`executed ${results.length} commands`);
})();

async function* seriesOfCommands() {
    // get my IP address
    var myIp = yield Command('curl --silent https://canihazip.com/s');
    console.log(`\t＼（＾ ＾）／ my IP is ${myIp.value}`);

    // get a Quote of the Day
    var quoteOfTheDay = yield Command(`curl --silent -X GET --header 'Accept: application/json' 'https://quotes.rest/qod'`);
    var quote = JSON.parse(quoteOfTheDay.value).contents.quotes[0];
    console.log(`\t"${quote.quote}" -- ${quote.author}`);
}
```

Result
``` text
31.60.22.70
        ＼（＾ ＾）／ my IP is 31.60.22.70

{
    "success": {
        "total": 1
    },
    "contents": {
        "quotes": [
            {
                "quote": "He who is not courageous enough to take risks will accomplish nothing in life.",
                "author": "Mohamad Ali",
                "length": null,
                "tags": [
                    "courage",
                    "inspire",
                    "risk"
                ],
                "category": "inspire",
                "title": "Inspiring Quote of the day",
                "date": "2019-06-16",
                "id": null
            }
        ],
        "copyright": "2017-19 theysaidso.com"
    }
}
        "He who is not courageous enough to take risks will accomplish nothing in life." -- Mohamad Ali

Summary:
===
executed 2 commands
```

## Usages

 - maintenance scripts
 - advanced Bash output manipulation
