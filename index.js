
const { generate } = require('./modules/generate');
const { generateComponentsString } = require('./src/generateComponentsString');

module.exports = [
    {
        command: [ 'g', 'generate' ],
        description: `Creates a new RN Component [${generateComponentsString()}]`,
        module: generate
    }
];