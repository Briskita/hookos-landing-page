// DATA
import countriesData from './script.js';

// ===================== UI ELEMENT SELECTORS ====================
// NAVBAR
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('nav');
// FORM
const ShowModal = document.querySelector('.show-modal');
const hideModal = document.querySelector('.close-btn');
const formContainer = document.querySelector('.form-container');
// const numberInput = document.querySelector('.tel');
// const validationMessage = document.querySelector('.validation-message');
const countriesInput = document.getElementById('country');
const countryCodeInput = document.getElementById('country-code')
const form = document.querySelector('.form');

// ================= EVENTS ================

// COUNTRIES DROPDOWN
document.addEventListener('DOMContentLoaded', () => {
	// LOAD COUNTRY SELECT OPTIONS
	let countries = '';
	countriesData.forEach((country) => {
		countries += returnCountryOptions(country);
	});

	countriesInput.innerHTML = countries;
	
	// LOAD COUNTRY CODE SELECT OPTIONS
	let countryCodes = '';
	countriesData.forEach((country) => {
		countryCodes += returnCountryCodeOptions(country);
	});

	countryCodeInput.innerHTML = countryCodes;
});

// CHANGE SELECTED COUNTRY CODE WHENEVER USER SELECTS A DIFFERENT COUNTRY NAME
// CHANGE THE COUNTRY CODE TO MATCH THE COUNTRY NAME
countriesInput.onchange = (e) => {
	const selectedCountry = countriesInput.options[e.target.selectedIndex]
	countryCodeInput.value = selectedCountry.attributes['data-code'].nodeValue

}
// CHANGE SELECTED COUNTRY NAME WHENEVER USER SELECTS A DIFFERENT COUNTRY CODE
// CHANGE THE COUNTRY NAME TO MATCH THE COUNTRY CODE
countryCodeInput.onchange = (e) => {
	const selectedCountryCode = countryCodeInput.options[e.target.selectedIndex]
	countriesInput.value = selectedCountryCode.attributes['data-country'].nodeValue
}

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

// ======================= FUNCTIONS ===================

// GET COUNTRY CODE FROM SELECTED COUNTRY OPTION
// no longer necessary since I already added the country code select
// function getCountryCode() {
// 	let option = countriesInput.options[countriesInput.selectedIndex];
// 	let countryCode = option.attributes['data-code'].nodeValue;
// 	return countryCode;
// }

// RETURN AN OPTION ELEMENT WITH A COUNTRY NAME
function returnCountryOptions(country) {
	let countryCode = country.phone_code;
	let countryName = country.country_name;
	if (countryName === 'Nigeria') {
		return `<option data-code=${countryCode} selected="selected">${countryName}</option>`;
	}
	return `<option data-code=${countryCode}>${countryName}</option>`;
}

// RETURN AN OPTION ELEMENT WITH A COUNTRY CODE
function returnCountryCodeOptions(country) {
	let countryCode = country.phone_code;
	let countryName = country.country_name;
	if (countryName === 'Nigeria') {
		return `<option data-country=${countryName} selected="selected">${countryCode}</option>`;
	}
	return `<option data-country=${countryName} value=${countryCode}>${countryCode}</option>`;
}

// SUBMIT FORM ACTION
form.addEventListener('submit', (e) => {
	e.preventDefault();
	// const countryCode = getCountryCode();

	let formData = new FormData(form);

	let message = '<h4>You have a new form submission</h4><br><br>';
	for (let pair of formData.entries()) {
		message += `<strong>${pair[0]}:</strong> ${pair[1]} <br>`;
	}
	// message += `<strong>Country Code:</strong> ${countryCode}`;

	Email.send({
		Host: 'smtp.elasticemail.com',
		Username: 'nduke@hookos.org',
		Password: 'A621431D25AAACFA73D90E862914EF72E7B7',
		To: 'nduke@hookos.org',
		From: 'nduke@hookos.org',
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

