const { getCreator } = require("../src/getCreator");

const generate = (logger, args) => {
    const log = logger(generate.name);

    const creator = getCreator(args, log);

    if (creator) {
        creator();
        return;
    }

    log.error('unknown command');
}

module.exports = { generate };
