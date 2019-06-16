# Bash JS in

Have you ever wanted to Bash script something but Bash is not your favourite language?

Is the script you want to write complex?

You want to save your time because you are not Bash expert (yet)?

## Features

 - vanilla JavaScript
 - using Bash inside JavaScript
 - Bash output redirecition to JavaScript
 - JavaScript backticks `` templating for Bash

## Requirements

 - NodeJS 8 (for async, await and yield)

## Usage

``` javascript
var { Run, Command } = require('bash-js-in');

(async function () {
    var allExecutedCommands = await Run(seriesOfCommands());

    console.log(`executed these commands: ${allExecutedCommands.map(c => c.command).join(' and ')}`);
})();

async function* seriesOfCommands() {
    // get my IP address
    var myIp = yield Command('curl --silent https://canihazip.com/s');
    console.log(`my IP is ${myIp.value}`);

    // get a Quote of the Day
    var quoteOfTheDay = yield Command(`curl --silent -X GET --header 'Accept: application/json' 'https://quotes.rest/qod'`);
    var quote = JSON.parse(quoteOfTheDay.value).contents.quotes[0];
    console.log(`${quote.quote} -- ${quote.author}`);
}
```

Result
``` text
my IP is 72.8.212.142
He who is not courageous enough to take risks will accomplish nothing in life. -- Mohamad Ali
executed these commands: curl --silent https://canihazip.com/s and curl --silent -X GET --header 'Accept: application/json' 'https://quotes.rest/qod'
```

## Usages

 - maintenance scripts
 - advanced Bash output manipulation
