var { Run, Command } = require('../src/core');

(async function () {
    var results = await Run(seriesOfCommands());
    console.log();
    console.log(`Summary:`);
    console.log(`===`);
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
