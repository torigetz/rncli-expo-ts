const { COMPONENT_EXISTS, NAME_PREFIX } = require("../constants");
const { containerExists } = require("../exists/containerExists");
const { formatName } = require("../helpers/formatName")
const path = require('path');
const fs = require('fs-extra');
const { createFile } = require("../createFile");

const createFolder = () => {
    const containersFolder = path.join(process.cwd(), 'containers')
    fs.ensureDirSync(containersFolder);
}

const createContainer = (name, { error, info }) => {
    const containerName = `${formatName(name)}Container`;

    if (containerExists(containerName)) {
        error(COMPONENT_EXISTS(containerName))
    }

    createFolder();

    const projectDir = path.join(__dirname, '..', '..');
    const containerDirectories = [
        {
            from: path.join(projectDir, 'templates', 'container.tsx'),
            to: path.join(process.cwd(), 'containers', `${containerName}.tsx`)
        }
    ];

    for (let containerDir of containerDirectories) {
        let content = fs.readFileSync(containerDir.from, 'utf-8');
        let contentWithName = content.replaceAll(NAME_PREFIX, containerName);
        createFile(containerDir, contentWithName, info);
    }
}

module.exports = { createContainer };
