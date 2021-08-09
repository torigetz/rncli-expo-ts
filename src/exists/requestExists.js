
const path = require('path');
const fs = require('fs-extra');

const requestExists = (method, name) => {
    const requestPath = path.join(process.cwd(), 'core', 'api', method, `${name}.ts`);
    return fs.existsSync(requestPath);
}

module.exports = { requestExists };
