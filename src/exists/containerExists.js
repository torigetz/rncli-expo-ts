
const path = require('path');
const fs = require('fs-extra');

const createFolder = () => {
    const containersFolder = path.join(process.cwd(), 'containers')
}

const containerExists = (name) => {
    const containerPath = path.join(process.cwd(), 'containers', `${name}.tsx`);
    return fs.existsSync(containerPath);
}

module.exports = { containerExists };
