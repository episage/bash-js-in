var shell = require('shelljs');

/**
 * This allows for yielding `Command`s and reusing their output in a task
 * ```
 * var variable = yield Command('echo test')
 * ```
 * otherwise variable would be undefined.
 *
 * @param {*} task
 * @param {*} [log=() => { }]
 * @returns
 */
async function Run(task, log = () => { }) {
    var results = [];
    for await (var result of InnerRun(task)) {
        log(result);
        results.push(result);
    }
    return results;

    async function* InnerRun(task) {
        // 
        // in a task.
        // Otherwise variable would be undefined.

        var lastResult = { value: undefined, done: false };
        while (true) {
            // handle case when Run() was called with no arguments
            if (!task) {
                break;   
            }

            // handle case when Command(..) is executed as a parameter in Run(..)
            if (!task.next) {
                break;
            }

            // handle case when Command(..)s are executed as [async function *] in Run(..)
            lastResult = await task.next(lastResult.value);
            if (lastResult.done) {
                break;
            }
            yield lastResult.value;
        }
    }
}

async function Command(command, timeoutMs = undefined) {
    return await new Promise((resolve, reject) => {
        shell.exec(command, { timeout: timeoutMs }, function (code, stdout, stderr) {
            if (code !== 0 || stderr) {
                return resolve({
                    command,
                    error: stderr || code,
                    value: stdout,
                });
            }
            return resolve({
                command,
                value: stdout,
            })
        })
    });
}

async function Delay(miliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                command: 'Delay',
                value: miliseconds,
            })
        }, miliseconds);
    })
}

module.exports = {
    Run,
    Command,
    Delay,
}