
const templates = require('./templates');

const generateComponentsString = () => {
    let components = [];

    for (let { template } of templates) {
        if (template[1] !== 'help') {
            components.push(template[1]);
        }
    }

    return components.join('/');
}

module.exports = { generateComponentsString };
