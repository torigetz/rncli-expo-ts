
const { COMPONENT_EXISTS, COMPONENT_NOT_FOUND, NAME_PREFIX } = require('../constants');
const { withLoadingExists } = require('../exists/withLoadingExists');
const path = require('path');
const fs = require('fs-extra');
const { formatName } = require('../helpers/formatName');
const { createFile } = require('../createFile');

const projectDir = path.join(__dirname, '..', '..');

const createFolder = (name) => {
    const dirs = [
        path.join(process.cwd(), 'screens'),
        path.join(process.cwd(), 'screens', name)
    ]

    for (let dir of dirs) {
        fs.ensureDirSync(dir);
    }
}

const createScreen = (name, { error, info }) => {
    if (!withLoadingExists()) {
        error(COMPONENT_NOT_FOUND('withLoading'))
    }

    let screenName = formatName(name);

    const screenPath = path.join(process.cwd(), 'screens', screenName, 'index.tsx');
    if (fs.existsSync(screenPath)) {
        error(COMPONENT_EXISTS(`${screenName} screen`))
    }

    createFolder(screenName);

    const files = [
        {
            from: path.join(projectDir, 'templates', 'screen', 'index.tsx'),
            to: path.join(process.cwd(), 'screens', screenName, 'index.tsx')
        },
        {
            from: path.join(projectDir, 'templates', 'screen', 'styles.ts'),
            to: path.join(process.cwd(), 'screens', screenName, 'styles.ts')
        }
    ];

    for (let file of files) {
        let content = fs.readFileSync(file.from, 'utf-8');
        content = content.replaceAll(NAME_PREFIX, screenName);
        createFile(file, content, info);
    }
}

module.exports = { createScreen };
