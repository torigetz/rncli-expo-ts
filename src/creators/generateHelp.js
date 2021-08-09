
const generateHelp = (templates) => {
    console.log(`   rncli g|generate help`);
    console.log(``)
    console.log(`   Use: $ rncli g|generate [template] <name>`);
    console.log('');
    console.log(`   Availible templates:`);
    console.log('');
    for (let { template, description } of templates) {
        console.log(`   ${template.join(', ')} - ${description}`);
    }
    console.log('');
}

module.exports = { generateHelp };
