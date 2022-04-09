var userId = -1;

//Michèle
//Registrierung neuer Kunde - createCustomer()
function createCustomer() {
	let usernameInput = document.querySelector('#username');
	let pwdInput = document.querySelector("#pwd");
	let firstNameInput = document.querySelector("#vname");
	let lastNameInput = document.querySelector("#nname");
	let streetInput = document.querySelector('#strasse');
	let streetNrInput = document.querySelector('#hnummer');
	let zipCodeInput = document.querySelector('#plz');
	let cityInput = document.querySelector('#ort'); 
	
	$.ajax({
		type: "POST",
		url: "/demo/createCustomer",
		data: JSON.stringify({ username: usernameInput.value, password: pwdInput.value, firstName: firstNameInput.value, lastName: lastNameInput.value, street: streetInput.value, streetNr: streetNrInput.value, zipCode: zipCodeInput.value, city: cityInput.value}),
		success: responseRegister,
		dataType: 'json',
		contentType: 'application/json'
	});

}

//Michèle
//Registrierung neuer Kunde - Verarbeitung der Server-Antwort
function responseRegister(response) {
	if (response != 0) {
	userId = response;
	alert("Kundenregistrierung erfolgreich. Die Kunden-ID lautet: " + userId);
	} else {
		alert("Registrierung fehlgeschlagen. Bitte waehlen Sie einen anderen Benutzernamen.");
	}
	
}

//Michèle
//Login des Kunden - loginCustomer()
function loginCustomer() {
	let username = document.querySelector('#username');
	let password = document.querySelector('#pwd');
	
	$.ajax({
		type: "POST",
		url: "/demo/login",
		data: JSON.stringify({ username: username.value, password: password.value }),
		success: loginResponse,
		dataType: 'json',
		contentType: 'application/json',

	});
}

//Michèle
//Login des Kunden - Verarbeitung der Server-Antwort
function loginResponse(response) {
	if (response == 0) {
		$("#customerId").empty();
		alert("Login fehlgeschlagen.");
	} else {
		$("#customerId").text("Login erfolgreich. Hallo Kunde mit ID: " + response);
		userId = response;
		$("#username").empty();
		$("#pwd").empty();
	}

}

/*// Alter Code von Sevi

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const usernameInput = document.querySelector('#username');
const pwdInput = document.querySelector('#pwd');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(usernameInput.value === '' || pwdInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${usernameInput.value}: ${pwdInput.value}`));

    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

    // Append to ul
    userList.appendChild(li);

    // Clear fields
    usernameInput.value = '';
    pwdInput.value = '';
  }
}*/