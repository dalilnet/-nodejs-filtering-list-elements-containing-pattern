"use strict";
exports.__esModule = true;
var country_controller_1 = require("./controller/country.controller");
try {
    main();
}
catch (ex) {
    console.log('An error occurred while processing your request');
}
function main() {
    var args = process.argv.slice(2);
    if (args.length > 0) {
        var countryContoller = new country_controller_1.CountryContoller();
        if (args[0] === '--count') {
            var countedData = countryContoller.getCountiesWithCounts();
            console.log(JSON.stringify(countedData, null, 4));
        }
        else if (args[0].includes('--filter')) {
            var wordToSearch = args[0].split('=')[1];
            var filtredData = countryContoller.searchAnimalsByName(wordToSearch);
            console.log(JSON.stringify(filtredData, null, 4));
        }
        else {
            console.log("Bad request: ");
        }
    }
    else {
        console.log("Your command does not contain the arguments");
    }
}
