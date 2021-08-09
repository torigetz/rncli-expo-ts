
const { createComponent } = require("./creators/createComponent");
const { createWithLoading } = require("./creators/createWithLoading");
const { createEnv } = require('./creators/createEnv');
const { createAxiosInstance } = require("./creators/createAxiosInstance");

const { generateHelp } = require("./creators/generateHelp");
const { createRequest } = require("./creators/createRequest");
const { createContainer } = require("./creators/createContainer");
const { createNavigation } = require("./creators/createNavigation");
const { createScreen } = require("./creators/createScreen");

const templates = [
    {
        template: [ 'c', 'component' ],
        description: 'Generate React.FC Component',
        creator: createComponent,
        requiredName: true
    },
    {
        template: [ 's', 'screen' ],
        description: 'Generate React.FC Screen with loader',
        creator: createScreen,
        requiredName: true
    },
    {
        template: [ 'ct', 'container' ],
        description: 'Generate React.FC Container',
        creator: createContainer,
        requiredName: true
    },
    {
        template: [ 'wl', 'withLoading' ],
        description: 'Generates withLoading component',
        creator: createWithLoading
    },
    {
        template: [ 'e', 'env' ],
        description: 'Generates env files for project',
        creator: createEnv
    },
    {
        template: [ 'a', 'axios' ],
        description: 'Generate Axios instance',
        creator: createAxiosInstance
    },
    {
        template: [ 'h', 'help' ],
        description: 'Help for generate method',
        creator: () => generateHelp(templates)
    },
    {
        template: [ 'r:get', 'request:get' ],
        description: 'Generate GET request',
        creator: (name, log) => createRequest('get', name, log),
        requiredName: true
    },
    {
        template: [ 'r:post', 'request:post' ],
        description: 'Generate POST request',
        creator: (name, log) => createRequest('post', name, log),
        requiredName: true
    },
    {
        template: [ 'r:patch', 'request:patch' ],
        description: 'Generate PATCH request',
        creator: (name, log) => createRequest('patch', name, log),
        requiredName: true
    },
    {
        template: [ 'r:delete', 'request:delete' ],
        description: 'Generate DELETE request',
        creator: (name, log) => createRequest('delete', name, log),
        requiredName: true
    },
    {
        template: [ 'r:put', 'request:put' ],
        description: 'Generate PUT request',
        creator: (name, log) => createRequest('put', name, log),
        requiredName: true
    },
    {
        template: [ 'nav', 'navigation' ],
        description: 'Generate root navigation',
        creator: (name, log) => createNavigation('root', name, log),
    },
    {
        template: [ 'nav:stack', 'navigation:stack' ],
        description: 'Generate stack navigation',
        creator: (name, log) => createNavigation('stack', name, log),
    },
    {
        template: [ 'nav:tabs', 'navigation:tabs' ],
        description: 'Generate material tabs navigation',
        creator: (name, log) => createNavigation('tabs', name, log),
    },
];

module.exports = templates;
