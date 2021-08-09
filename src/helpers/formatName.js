
const formatName = (name) => {
    const lowerCaseName = name.toLowerCase();
    const symbolsArray = lowerCaseName.split('');
    const formattedName = symbolsArray[0].toUpperCase() + lowerCaseName.substring(1);
    return formattedName;
}

module.exports = { formatName };
