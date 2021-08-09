
const path = require('path');
const fs = require('fs-extra');

const addConstToEnv = (key, value) => {
    const content = `export const ${key}: string = '${value}'\n`;

    const envs = [
        path.join(process.cwd(), 'env.ts'),
        path.join(process.cwd(), 'env.production.ts'),
        path.join(process.cwd(), 'env.development.ts')
    ];

    for (let env of envs) {
        const rawFile = fs.readFileSync(env, 'utf-8');
        if (rawFile.indexOf(key) === -1) {
            fs.appendFileSync(env, content);
        }
    }
}

module.exports = { addConstToEnv };
