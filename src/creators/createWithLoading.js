const path = require("path");
const { COMPONENT_EXISTS } = require("../constants");
const { withLoadingExists } = require("../exists/withLoadingExists");
const fs = require('fs-extra');
const { createFile } = require("../createFile");

const createFolders = () => {
    fs.ensureDirSync(path.join(process.cwd(), 'core')); 
    fs.ensureDirSync(path.join(process.cwd(), 'components'));
    fs.ensureDirSync(path.join(process.cwd(), 'components', 'Loader'));
}

const createWithLoading = (name, { info, error, debug }) => {
    if (withLoadingExists(debug)) {
        error(COMPONENT_EXISTS('withLoading'))
    }

    const projectDir = path.join(__dirname, '..', '..');
    
    const files = [
        {
            from: path.join(projectDir, 'templates', 'withLoading', 'createLoader.tsx'),
            to: path.join(process.cwd(), 'core', 'createLoader.tsx')
        },
        {
            from: path.join(projectDir, 'templates', 'withLoading', 'withLoading.tsx'),
            to: path.join(process.cwd(), 'components', 'withLoading.tsx')
        },
        {
            from: path.join(projectDir, 'templates', 'withLoading', 'Loader', 'index.tsx'),
            to: path.join(process.cwd(), 'components', 'Loader', 'index.tsx')
        },
        {
            from: path.join(projectDir, 'templates', 'withLoading', 'Loader', 'styles.ts'),
            to: path.join(process.cwd(), 'components', 'Loader', 'styles.ts')
        }
    ];

    createFolders();

    for (let file of files) {
        const content = fs.readFileSync(file.from, 'utf-8');
        createFile(file, content, info);
    }
}

module.exports = { createWithLoading };
