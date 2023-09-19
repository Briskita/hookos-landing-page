// DATA
import countriesData from './script.js';

// ===================== UI ELEMENT SELECTORS ====================
// NAVBAR
// const toggle = document.querySelector('.toggle');
// const navigation = document.querySelector('nav');
// FORM
const ShowModal = document.querySelector('.show-modal');
const hideModal = document.querySelector('.close-btn');
const formContainer = document.querySelector('.form-container');
// const numberInput = document.querySelector('.tel');
// const validationMessage = document.querySelector('.validation-message');
const countriesInput = document.getElementById('country');
const form = document.querySelector('.form');

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
// toggle.addEventListener('click', () => {
// 	toggle.classList.toggle('active');
// 	navigation.classList.toggle('hidden');
// });

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

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const countryCode = getCountryCode();

	let formData = new FormData(form);

	let message = '<h4>You have a new form submission</h4><br><br>';
	for (let pair of formData.entries()) {
		message += `<strong>${pair[0]}:</strong> ${pair[1]} <br>`;
	}
	message += `<strong>Country Code:</strong> ${countryCode}`;

	Email.send({
		Host: 'smtp.elasticemail.com',
		Username: 'phill@hookos.org',
		Password: '9319878FF8B407A0121C6D6F58204D4EB168',
		To: 'phill@hookos.org',
		From: 'phill@hookos.org',
		Subject: 'Hookos Subscription Form',
		Body: message,
	})
		.then((message) => console.log(message))
		.then(() => {
			document.querySelector('.form-info').classList.remove('hidden');
			setTimeout(() => {
				location.reload();
			}, 2000);
		});
});

