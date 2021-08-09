
const path = require('path');
const fs = require('fs');

const axiosInstanceExists = () => {
    const instancePath = path.join(process.cwd(), 'core', 'axios.ts');
    return fs.existsSync(instancePath);
}

module.exports = { axiosInstanceExists };
