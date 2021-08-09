
const { COMPONENT_PATH_TOO_LARGE, NAME_IS_REQUIRED, COMPONENT_EXISTS, NAME_PREFIX } = require("../constants");
const componentExists = require("../exists/componentExists");
const { formatName } = require("../helpers/formatName");
const path = require('path');
const fs = require('fs-extra');
const { createFile } = require("../createFile");

const createFolders = (subDir, name) => {
    const componentDirectories = [
        path.join(process.cwd(), 'components'),
        path.join(process.cwd(), 'components', subDir),
        path.join(process.cwd(), 'components', subDir, name),
    ];

    for (let dir of componentDirectories) {
        fs.ensureDirSync(dir);
    }
}

const createComponent = (name, { error, debug, info }) => {
    let subDir = '';
    let formattedName = '';

    if (name.indexOf('/') > -1) {
        let modifiedName = name.split('')[0] === '/' ? name.substring(1) : name;
        let splittedName = modifiedName.split('/');

        if (splittedName.length > 2) {
            error(COMPONENT_PATH_TOO_LARGE);
        }

        if (!splittedName[1]) {
            error(NAME_IS_REQUIRED)
        }

        subDir = splittedName[0];
        formattedName = formatName(splittedName[1]);
    } else {
        formattedName = formatName(name);
    }

    const componentDir = path.join(subDir, formattedName)
    if (componentExists(componentDir, debug)) {
        error(COMPONENT_EXISTS);
    }

    createFolders(subDir, formattedName);

    const projectDir = path.join(__dirname, '..', '..');

    const componentFiles = [
        {
            from: path.join(projectDir, 'templates', 'component', 'index.tsx'),
            to: path.join(process.cwd(), 'components', subDir, formattedName, 'index.tsx')
        },
        {
            from: path.join(projectDir, 'templates', 'component', 'styles.ts'),
            to: path.join(process.cwd(), 'components', subDir, formattedName, 'styles.ts')
        }
    ];

    for (file of componentFiles) {
        const rawFile = fs.readFileSync(file.from, 'utf-8');
        const generatedContent = rawFile.replaceAll(NAME_PREFIX, formattedName);
        createFile(file, generatedContent, info);
    }
}

module.exports = { createComponent };
