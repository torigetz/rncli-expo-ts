
const templates = require('./templates');
const { NAME_IS_REQUIRED, TEMPLATE_IS_REQUIRED } = require('./constants');

const getCreator = (args, logger) => {
    const { debug, error } = logger;
    
    const templateArg = args[1];
    const entityName = args[2];

    debug(`template - ${templateArg}`)
    if (!templateArg || templateArg === '--config') {
        error(TEMPLATE_IS_REQUIRED);
    }

    for (let { template, requiredName, creator } of templates) {
        for (let type of template) {
            if (templateArg === type) {
                return () => {
                    if (requiredName && !entityName) {
                        error(NAME_IS_REQUIRED)
                    }
                    creator(entityName, logger);
                }
            }
        }
    }
}

module.exports = { getCreator };
