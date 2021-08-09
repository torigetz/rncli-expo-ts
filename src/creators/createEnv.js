
const { COMPONENT_EXISTS } = require('../constants');
const { envExists } = require('../exists/envExists');
const fs = require('fs-extra'); 
const path = require('path');
const { createFile } = require('../createFile');

const createEnv = (name, { error, info }) => {
    if (envExists()) {
        error(COMPONENT_EXISTS('env'));
    }

    const projectDir = path.join(__dirname, '..', '..');;
    const envFiles = [
        {
            from: path.join(projectDir, 'templates', 'env', 'env.ts'),
            to: path.join(process.cwd(), 'env.ts')
        },
        {
            from: path.join(projectDir, 'templates', 'env', 'env.production.ts'),
            to: path.join(process.cwd(), 'env.production.ts')
        },
        {
            from: path.join(projectDir, 'templates', 'env', 'env.development.ts'),
            to: path.join(process.cwd(), 'env.development.ts')
        }
    ];

    for (let file of envFiles) {
        let content = fs.readFileSync(file.from, 'utf-8');
        createFile(file, content, info);
    }
}

module.exports = { createEnv };
