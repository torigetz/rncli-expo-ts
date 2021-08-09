

const { PACKAGE_NOT_FOUND, REACT_NAVIGATION_NATIVE, COMPONENT_EXISTS, REACT_NAVIGATION_STACK, NAME_PREFIX, REACT_NATIVE_PAPER, REACT_NAVIGATION_TABS, REACT_NATIVE_VECTOR_ICONS } = require('../constants');
const { isInstalled } = require('../helpers/isInstalled')
const fs = require('fs-extra');
const path = require('path');
const { createFile } = require('../createFile');
const { formatName } = require('../helpers/formatName');

const projectDir = path.join(__dirname, '..', '..');

const createRootFolder = () => {
    const rootFolder = path.join(process.cwd(), 'navigation')
    fs.ensureDirSync(rootFolder);
}

const createStacksFolder = () => {
    createRootFolder();
    const stacksFolder = path.join(process.cwd(), 'navigation', 'stacks');
    fs.ensureDirSync(stacksFolder);
}

const navigations = {
    "root": (name, { error }) => {
        if (!isInstalled(REACT_NAVIGATION_NATIVE)) {
            error(PACKAGE_NOT_FOUND(REACT_NAVIGATION_NATIVE) + ' See docs: https://reactnavigation.org/docs/getting-started/')
        }
        
        const rootNavPath = path.join(process.cwd(), 'navigation', 'index.tsx');

        if (fs.existsSync(rootNavPath)) {
            error(COMPONENT_EXISTS('root navigation'))
        }

        createRootFolder();

        let files = [
            {
                from: path.join(projectDir, 'templates', 'navigation', 'root.tsx'),
                to: rootNavPath
            },
            {
                to: path.join(process.cwd(), 'navigation', 'routes.ts')
            }
        ];

        return files;
    },
    "stack": (name, { error }) => {
        if (!isInstalled(REACT_NAVIGATION_STACK)) {
            error(PACKAGE_NOT_FOUND(REACT_NAVIGATION_STACK));
        }
        
        const stackName = `${formatName(name)}Stack`;

        const stackPath = path.join(process.cwd(), 'navigation', 'stacks', `${stackName}.tsx`);

        if (fs.existsSync(stackPath)) {
            error(COMPONENT_EXISTS(stackName))
        }

        createStacksFolder();

        const files = [
            {
                from: path.join(projectDir, 'templates', 'navigation', 'stack.tsx'),
                to: stackPath,
                replaceStrings: {
                    from: NAME_PREFIX,
                    to: stackName
                }
            }
        ];

        return files;
    },
    "tabs": (name, { error }) => {
        const tabsPath = path.join(process.cwd(), 'navigation', 'tabs.tsx');
        if (fs.existsSync(tabsPath)) {
            error(COMPONENT_EXISTS('tabs navigation'))
        }

        if (!isInstalled(REACT_NATIVE_PAPER)) {
            error(PACKAGE_NOT_FOUND(REACT_NATIVE_PAPER))
        }

        if (!isInstalled(REACT_NAVIGATION_TABS)) {
            error(PACKAGE_NOT_FOUND(REACT_NAVIGATION_TABS))
        }

        if (!isInstalled(REACT_NATIVE_VECTOR_ICONS)) {
            error(PACKAGE_NOT_FOUND(REACT_NATIVE_VECTOR_ICONS))
        }

        createRootFolder();

        const currentRoutesPath = path.join(process.cwd(), 'navigation', 'routes.ts');
        const tabRoutesPath = path.join(projectDir, 'templates', 'navigation', 'tab.routes.ts')
        
        const currentRoutes = fs.readFileSync(currentRoutesPath, 'utf-8');
        const tabRoutes = fs.readFileSync(tabRoutesPath, 'utf-8');

        if (currentRoutes.indexOf(tabRoutes) === -1) {
            fs.appendFileSync(currentRoutesPath, '\n' + tabRoutes);
        }

        let files = [
            {
                from: path.join(projectDir, 'templates', 'navigation', 'tabs.tsx'),
                to: path.join(process.cwd(), 'navigation', 'tabs.tsx')
            }
        ]

        return files;
    }
}

const createNavigation = (type, name, log) => {
    const files = navigations[type](name, log);

    for (let file of files) {
        let content = '';

        if (file.from) {
            content = fs.readFileSync(file.from, 'utf-8')
        }

        if (file.replaceStrings) {
            content = content.replaceAll(
                file.replaceStrings.from,
                file.replaceStrings.to
            );
        }

        createFile(file, content, log.info);
    }
};

module.exports = { createNavigation };
