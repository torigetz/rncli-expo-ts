
const fs = require('fs-extra');
const path = require('path');
const { COMPONENT_NOT_FOUND, COMPONENT_EXISTS, NAME_PREFIX } = require('../constants');
const { createFile } = require('../createFile');
const { axiosInstanceExists } = require('../exists/axiosInstanceExists');
const { requestExists } = require('../exists/requestExists');

const createFolders = (method) => {
    const dirs = [
        path.join(process.cwd(), 'core'),
        path.join(process.cwd(), 'core', 'api'),
        path.join(process.cwd(), 'core', 'api', method)
    ];

    for (let dir of dirs) {
        fs.ensureDirSync(dir);
    }
}

const createRequest = (method, name, { error, info }) => {
    if (!axiosInstanceExists()) {
        error(COMPONENT_NOT_FOUND('axios instance'))
    }

    if (requestExists(method, name)) {
        error(COMPONENT_EXISTS(name))
    }

    createFolders(method);

    const projectDir = path.join(__dirname, '..', '..');

    const requests = [
        {
            from: path.join(projectDir, 'templates', 'axios', 'request.ts'),
            to: path.join(process.cwd(), 'core', 'api', method, `${name}.ts`)
        }
    ];

    for (let request of requests) {
        let content = fs.readFileSync(request.from, 'utf-8');
        let contentWithName = content.replaceAll(NAME_PREFIX, name);
        let contentWithMethod = contentWithName.replaceAll('__method__', method);
        createFile(request, contentWithMethod, info);
    }
}

module.exports = { createRequest };
