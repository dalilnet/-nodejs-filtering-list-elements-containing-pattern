import { People } from './../models/people.model';
import { Country } from './../models/country.model';
import { Animal } from './../models/animal.model';

const countriesRepository = require('../items/data');



export class CountryContoller {

	private readonly countries: Country[] = [];
	public constructor() {

		this.countries = countriesRepository?.data as Country[];
	}


	/**
	 *
	 *
	 * @returns {Country[]}
	 * @memberof CountryContoller
	 */
	public getCountiesWithCounts(): Country[] {

		let countries = [...this.countries];

		for (let contry of countries) {
			contry.name = `${contry.name} [${contry.people.length}]`;

			contry.people.forEach((people: People) => {
				people.name = `${people.name} [${people.animals.length}]`;
			});
		}

		return countries;
	}


	public searchAnimalsByName(q: string): Country[] {

		let filteredCountry: Country[] = [];

		for (let country of this.countries) {

			let peoples = this.getFilteredPeoples(country, q);

			if (peoples.length > 0) {
				filteredCountry.push({ name: country.name, people: peoples })
			}

		}

		return filteredCountry;
	}

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

	private getFilteredAnimal(people: People, q: string): Animal[] {

		let filteredAnimal: Animal[] = [];

		people.animals.forEach((animal: Animal) => {
			if (animal.name.includes(q)) {
				filteredAnimal.push(animal);
			}
		});

		return filteredAnimal;
	}
}