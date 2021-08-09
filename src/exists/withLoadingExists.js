
const fs = require('fs-extra');
const path = require('path');

const withLoadingExists = () => {
    let result = false;

    const paths = [
        path.join(process.cwd(), 'core', 'createLoader.tsx'),
        path.join(process.cwd(), 'components', 'withLoading.tsx'),
        path.join(process.cwd(), 'components', 'Loader', 'index.tsx'),
        path.join(process.cwd(), 'components', 'Loader', 'styles.ts')
    ];

    for (let entity of paths) {
        const pathExists = fs.existsSync(entity);
        if (pathExists) result = true;
    }

    return result;
}

module.exports = { withLoadingExists };
