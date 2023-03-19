// UI ELEMENT SELECTORS
// NAVBAR
const header = document.querySelector('.header');
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('nav');
// FORM
const ShowModal = document.querySelector('.show-modal');
const hideModal = document.querySelector('.close-btn');
const formContainer = document.querySelector('.form-container');

// TOGGLE THE NAVIGATION SECTION
toggle.addEventListener('click', () => {
	toggle.classList.toggle('active');
	navigation.classList.toggle('hidden');
});

// COUNTRIES DROPDOWN
document.addEventListener('DOMContentLoaded', () => {
	const countrySelector = document.querySelector('#country');

	fetch('https://restcountries.com/v3.1/all')
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			let countries = '';
			data.forEach((country) => {
				countries += countryOptions(country.name.common);
			});

			countrySelector.innerHTML = countries;
		})
		.catch((err) => {
			console.error(err);
		});
});

// TOGGLE FORM DISPLAY
// SHOW FORM
ShowModal.addEventListener('click', () => {
	formContainer.classList.remove('hidden');
});

// HIDE FORM
hideModal.addEventListener('click', () => {
	formContainer.classList.add('hidden');
});

// RETURN AN OPTION ELEMENT WITH A COUNTRY OBJECT
function countryOptions(country) {
	if (country === 'Nigeria') {
		return `<option selected="selected">${country}</option>`;
	}
	return `<option>${country}</option>`;
}
