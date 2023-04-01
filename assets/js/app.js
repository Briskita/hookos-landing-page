// DATA
import countriesData from './script.js';

// UI ELEMENT SELECTORS
// NAVBAR
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('nav');
// FORM
const ShowModal = document.querySelector('.show-modal');
const hideModal = document.querySelector('.close-btn');
const formContainer = document.querySelector('.form-container');
const numberInput = document.querySelector('.tel');
const validationMessage = document.querySelector('.validation-message');
const countriesInput = document.getElementById('country');

// ================= EVENTS ================

// COUNTRIES DROPDOWN
document.addEventListener('DOMContentLoaded', () => {
	let countries = '';
	countriesData.forEach((country) => {
		countries += countryOptions(country);
	});

	countriesInput.innerHTML = countries;
});

// TOGGLE THE NAVIGATION SECTION
toggle.addEventListener('click', () => {
	toggle.classList.toggle('active');
	navigation.classList.toggle('hidden');
});

// TOGGLE FORM DISPLAY
// SHOW FORM
ShowModal.addEventListener('click', () => {
	formContainer.classList.remove('hidden');
	// SET DEFAULT COUNTRY CODE
	getCountryCode();
});

// HIDE FORM
hideModal.addEventListener('click', () => {
	formContainer.classList.add('hidden');
});

// PHONE NUMBER VALIDATION
numberInput.addEventListener('focusout', (e) => {
	let number = e.target.value;
	// let inputValue = e.target.value;
	let countryCode = getCountryCode();

	// CHECK IF USER ADDED COUNTRY CODE (CHECK IF NUMBER STARTS WITH +)
	if (number.charAt(0) !== '+') {
		number = countryCode + e.target.value;
		// 	number = e.target.value;
		// } else {
	}

	const url = `https://phonevalidation.abstractapi.com/v1/?api_key=c594494f1d704e9189c778b6305ae64f&phone=${number}`;

	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			checkStatus(data);
		})
		.catch((err) => console.log(err));
});

// ======================= FUNCTIONS ===================

// GET COUNTRY CODE FROM SELECTED COUNTRY OPTION
function getCountryCode() {
	let option = countriesInput.options[countriesInput.selectedIndex];
	let countryCode = option.attributes['data-code'].nodeValue;
	return countryCode;
}

// RETURN AN OPTION ELEMENT WITH A COUNTRY OBJECT
function countryOptions(country) {
	let countryCode = country.phone_code;
	let countryName = country.country_name;
	if (countryName === 'Nigeria') {
		return `<option data-code=${countryCode} selected="selected">${countryName}</option>`;
	}
	return `<option data-code=${countryCode}>${countryName}</option>`;
}

// SHOW NUMBER VALIDITY STATUS
function checkStatus(data) {
	if (data.valid) {
		// PHONE NUMBER IS VALID
		validationMessage.classList.remove('error');
		validationMessage.classList.add('hidden');
		// validationMessage.textContent = `${data.country.name} ${data.country.prefix}`;
		numberInput.style.borderColor = 'green';
		numberInput.value = data.format.international;
	} else {
		// PHONE NUMBER IS NOT VALID
		validationMessage.classList.remove('hidden');
		// validationMessage.textContent = 'Please enter a valid number';
		validationMessage.classList.add('error');

		numberInput.style.borderColor = 'red';
	}
}

// THESE WERE PREVIOUS IMPLIMENTATIONS OF COUNTRY SELECTION

// countriesInput.addEventListener('change', (e) => {
// 	getCountryCode();
// });

// fetch('https://restcountries.com/v3.1/all')
// fetch('https://countrycode.dev/api/calls')
// 	.then((res) => res.json())
// 	.then((data) => {
// 		let countries = '';
// 		data.forEach((country) => {
// 			countries += countryOptions(country);
// 		});

// 		countriesInput.innerHTML = countries;
// 	})
// 	.catch((err) => {
// 		console.error('error message: ', err);
// 	});

// countriesData.forEach((data) => {
// });
