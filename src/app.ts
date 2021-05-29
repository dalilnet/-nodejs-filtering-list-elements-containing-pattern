import { CountryContoller } from './controller/country.controller';


try {
	main();
} catch (ex) {
	console.log('An error occurred while processing your request')
}


function main() {
	var args = process.argv.slice(2);

	if (args.length > 0) {

		const countryContoller = new CountryContoller();
		if (args[0] === '--count') {

			const countedData = countryContoller.getCountiesWithCounts();

			console.log(JSON.stringify(countedData, null, 4));
			return;
		}
		if (args[0].includes('--filter')) {

			const wordToSearch = args[0].split('=')[1];

			const filtredData = countryContoller.searchAnimalsByName(wordToSearch);

			console.log(JSON.stringify(filtredData, null, 4));
			return;

		} else {
			console.log("Bad request: ");
		}

	} else {
		console.log("Your command does not contain the arguments");
	}
}



