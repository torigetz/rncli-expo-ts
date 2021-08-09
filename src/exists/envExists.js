
const fs = require('fs-extra');
const path = require('path');

const envExists = () => {
    let result = false;

    const paths = [
        path.join(process.cwd(), 'env.ts'),
        path.join(process.cwd(), 'env.production.ts'),
        path.join(process.cwd(), 'env.development.ts')
    ];

    for (dir of paths) {
        const dirExists = fs.existsSync(dir);
        if (dirExists) result = true;
    }

    return result;
}

module.exports = { envExists };
