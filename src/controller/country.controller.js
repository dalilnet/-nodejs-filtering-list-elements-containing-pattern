"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.CountryContoller = void 0;
var countriesRepository = require('../items/data');
var CountryContoller = /** @class */ (function () {
    function CountryContoller() {
        this.countries = [];
        this.countries = countriesRepository === null || countriesRepository === void 0 ? void 0 : countriesRepository.data;
    }
    /**
     *
     *
     * @returns {Country[]}
     * @memberof CountryContoller
     */
    CountryContoller.prototype.getCountiesWithCounts = function () {
        var countries = __spreadArray([], this.countries);
        for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
            var contry = countries_1[_i];
            contry.name = contry.name + " [" + contry.people.length + "]";
            contry.people.forEach(function (people) {
                people.name = people.name + " [" + people.animals.length + "]";
            });
        }
        return countries;
    };
    CountryContoller.prototype.searchAnimalsByName = function (q) {
        var filteredCountry = [];
        for (var _i = 0, _a = this.countries; _i < _a.length; _i++) {
            var country = _a[_i];
            var peoples = this.getFilteredPeoples(country, q);
            if (peoples.length > 0) {
                filteredCountry.push({ name: country.name, people: peoples });
            }
        }
        return filteredCountry;
    };
    CountryContoller.prototype.getFilteredPeoples = function (country, q) {
        var filteredPeople = [];
        for (var _i = 0, _a = country.people; _i < _a.length; _i++) {
            var people = _a[_i];
            var animals = this.getFilteredAnimal(people, q);
            if (animals.length > 0) {
                filteredPeople.push({ name: people.name, animals: animals });
            }
        }
        return filteredPeople;
    };
    CountryContoller.prototype.getFilteredAnimal = function (people, q) {
        var filteredAnimal = [];
        people.animals.forEach(function (animal) {
            if (animal.name.includes(q)) {
                filteredAnimal.push(animal);
            }
        });
        return filteredAnimal;
    };
    return CountryContoller;
}());
exports.CountryContoller = CountryContoller;
