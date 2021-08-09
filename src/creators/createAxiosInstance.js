const { COMPONENT_EXISTS, AXIOS_MODULE, PACKAGE_NOT_FOUND, COMPONENT_NOT_FOUND } = require("../constants");
const { axiosInstanceExists } = require("../exists/axiosInstanceExists");
const { envExists } = require("../exists/envExists");
const { addConstToEnv } = require("../helpers/addConstToEnv");
const { isInstalled } = require("../helpers/isInstalled");
const path = require('path');
const fs = require('fs-extra');
const { createFile } = require("../createFile");

const createFolders = () => {
    const coreDir = path.join(process.cwd(), 'core');

    fs.ensureDirSync(coreDir);
}

const createAxiosInstance = (name, { error, info }) => {
    if (axiosInstanceExists()) {
        error(COMPONENT_EXISTS('Axios instance'));
    }

    if (!envExists()) {
        error(COMPONENT_NOT_FOUND('env'))
    }

    if (!isInstalled(AXIOS_MODULE)) {
        error(PACKAGE_NOT_FOUND(AXIOS_MODULE));
    }

    addConstToEnv('API_URL', 'http://localhost:3000/api')

    const projectDir = path.join(__dirname, '..', '..');

    const files = [
        {
            from: path.join(projectDir, 'templates', 'axios', 'axios.ts'),
            to: path.join(process.cwd(), 'core', 'axios.ts')
        }
    ];

    createFolders();

    for (let file of files) {
        const content = fs.readFileSync(file.from);
        createFile(file, content, info);
    }
}

module.exports = { createAxiosInstance };
