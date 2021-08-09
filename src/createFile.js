
const fs = require('fs');

const createFile = (file, content, info) => {
    fs.writeFileSync(file.to, content);

    const filename = file.to.split('/').pop();
    info(`${filename} created!`.yellow);
}

module.exports = { createFile };
