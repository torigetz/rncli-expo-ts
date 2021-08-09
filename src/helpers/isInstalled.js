
const fs = require('fs');
const path = require('path');

const isInstalled = (packageName) => {
    const packagePath = path.join(process.cwd(), 'node_modules', packageName, 'package.json');
    return fs.existsSync(packagePath);
}

module.exports = { isInstalled };
