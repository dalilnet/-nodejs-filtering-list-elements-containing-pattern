import { CountryController } from './controller/country.controller';

describe('country-patern', function () {

	// test for searchAnimalsByName function
	it('filter', function () {

		let countryController = new CountryController();
		let result = countryController.searchAnimalsByName('ry');
		expect(result.length).toBe(2);

	});

	// test for getCountriesWithCounts function
	it('count', function () {

		let countryController = new CountryController();
		let result = countryController.getCountriesWithCounts();
		expect(result.length).toBe(5);

	});
});