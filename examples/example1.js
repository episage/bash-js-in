var { Run, Command } = require('../src/core');


(async function () {
    await Run(Command('curl --silent https://en.wikipedia.org/wiki/JavaScript'));
})();
