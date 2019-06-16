var { Run, Command } = require('../src/core');

(async function () {
    var allExecutedCommands = await Run(seriesOfCommands());

    console.log(`executed these commands: ${allExecutedCommands.map(c => c.command).join(' and ')}`);
})();

async function* seriesOfCommands() {
    // get my IP address
    var myIp = yield Command('curl --silent https://canihazip.com/s');
    console.log(JSON.stringify(myIp, null, 2))

    // get a Quote of the Day
    var quoteOfTheDay = yield Command(`curl --silent -X GET --header 'Accept: application/json' 'https://quotes.rest/qod'`);
    var quote = JSON.parse(quoteOfTheDay.value).contents.quotes[0];
    console.log(`${quote.quote} -- ${quote.author}`);
}

// __OUTPUT__
// ==========
//
// {
//   "command": "curl --silent https://canihazip.com/s",
//   "value": "78.8.212.144\n"
// }
// He who is not courageous enough to take risks will accomplish nothing in life. -- Mohamad Ali
// executed these commands: curl --silent https://canihazip.com/s and curl --silent -X GET --header 'Accept: application/json' 'https://quotes.rest/qod'