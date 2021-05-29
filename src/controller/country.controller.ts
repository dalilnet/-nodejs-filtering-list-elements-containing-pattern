import { People } from './../models/people.model';
import { Country } from './../models/country.model';
import { Animal } from './../models/animal.model';
/** import of models */

const countriesRepository = require('../datas/data'); //I used require instead of import because it is a js file


/**
 *
 *
 * @export
 * @class CountryController
 */
export class CountryController {

	/**
	 * the list of countries, peoples and animals
	 * @private
	 * @type {Country[]}
	 * @memberof CountryController
	 */
	private readonly countries: Country[] = [];

	/**
	 *Creates an instance of CountryController.
	 * @memberof CountryController
	 */
	public constructor() {

		this.countries = countriesRepository?.data as Country[]; //we retrieve the data from the list
	}


	/**
	 * this function returns the list of countries with the count of people, animals
	 * getCountriesWithCounts
	 * @returns {Country[]}
	 * @memberof CountryController
	 */
	public getCountriesWithCounts(): Country[] {

		let countries = [...this.countries]; // I copy the list to a temporary list

		// I browse the list to handle each country, we can use also forEach
		for (let contry of countries) {
			contry.name = `${contry.name} [${contry.people.length}]`; // concatenate the country name with its size 

			// the same for the list of animals
			contry.people.forEach((people: People) => {
				people.name = `${people.name} [${people.animals.length}]`;
			});

		}

		return countries;
	}


	/**
	 * this method makes it possible to carry out searches in the list of animals
	 * searchAnimalsByName
	 * @param {string} q
	 * @returns {Country[]}
	 * @memberof CountryController
	 */
	public searchAnimalsByName(q: string): Country[] {

		let filteredCountry: Country[] = [];

		// I browse the list to handle each country, we can use also forEach
		for (let country of this.countries) {

			// get the list of filtered peoples
			let peoples = this.getFilteredPeoples(country, q);

			// if the list is empty, we do not add it to the contries list
			if (peoples.length > 0) {
				filteredCountry.push({ name: country.name, people: peoples })
			}

		}

		// the filtered the contries list
		return filteredCountry;
	}

	/**
	 *
	 *
	 * @private
	 * @param {Country} country
	 * @param {string} q
	 * @returns {People[]}
	 * @memberof CountryController
	 */
	private getFilteredPeoples(country: Country, q: string): People[] {

		let filteredPeople: People[] = [];

		for (let people of country.people) {

			let animals = this.getFilteredAnimal(people, q);
			if (animals.length > 0) {
				filteredPeople.push({ name: people.name, animals: animals });
			}
			
		}

		return filteredPeople;
	}

	/**
	 *
	 * the function retrieve the list of animals filtered by name
	 * @private
	 * @param {People} people
	 * @param {string} q
	 * @returns {Animal[]}
	 * @memberof CountryController
	 */
	private getFilteredAnimal(people: People, q: string): Animal[] {

		let filteredAnimal: Animal[] = [];

		// to iterate over animals list
		people.animals.forEach((animal: Animal) => {

			/** if the name contains the desired text, we add the animal in the list */
			if (animal.name.includes(q)) {
				filteredAnimal.push(animal);
			}

		});

		return filteredAnimal;
	}
}