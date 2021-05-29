import { Country } from './models/country.model';
import { CountryController } from './controller/country.controller';

//using try-catch to handle les exceptions
try {

	main(); // Go to start

} catch (ex) {
	console.log('An error occurred while processing your request')
}

/**
 * the main function that launches the solution
 * main()
 * @returns
 */
function main() {

	var args = process.argv.slice(2); // we are looking for the list of input parameters

	if (args.length > 0) {

		const countryContoller = new CountryController();

		// first request if the user requests data count
		if (args[0] === '--count') {

			// call method
			const countedData: Country[] = countryContoller.getCountriesWithCounts();

			console.log(JSON.stringify(countedData, null, 4)); // output datas
			return;
		}

		// second request, if the user requests data filtering
		if (args[0].includes('--filter')) {

			// get searched text
			const wordToSearch = args[0].split('=')[1];

			//call method
			const filtredData: Country[] = countryContoller.searchAnimalsByName(wordToSearch);

			console.log(JSON.stringify(filtredData, null, 4));  // output datas
			return;

		}

		console.log("Bad request: ");
		return;

	} else {
		console.log("Your command does not contain the arguments");
	}
}



