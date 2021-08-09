
const fs = require('fs-extra');
const path = require('path');

const componentExists = (componentDir, debug) => {
    let result = false;

    const paths = [
        path.join(process.cwd(), componentDir),
        path.join(process.cwd(), componentDir, 'index.tsx'),
        path.join(process.cwd(), componentDir, 'styles.ts')
    ];

    for (dir of paths) {
        const dirExists = fs.existsSync(dir);
        debug(`${dir} - ${dirExists}`);
        if (dirExists) result = true;
    }

    return result;
}

module.exports = componentExists;
