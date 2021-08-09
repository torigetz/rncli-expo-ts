
const generateHelp = (templates) => {
    console.log(`   rncli g|generate help`);
    console.log(``)
    console.log(`   Use: $ rncli g|generate [method] <name>`);
    console.log('');
    console.log(`   Availible methods:`);
    console.log('');
    for (let { template, description } of templates) {
        console.log(`   ${template.join(', ')} - ${description}`);
    }
    console.log('');
}

module.exports = { generateHelp };
