var customerid = -1;

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
	customerid = response;
	alert("Kundenregistrierung erfolgreich. Die Kunden-ID lautet: " + customerid);
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
		customerid = response;
		$("#username").empty();
		$("#pwd").empty();
	}

}


// TEIL MATTHIAS (START)
let orderid = 55;
//let customerid = 24;

// Anlegen einer neugen Bestellung
function createOrder() {
			
	$.ajax({
		type: "POST",
		url: "/api/createOrder/",
		data: JSON.stringify({ customerid: customerid }),
		success: responseCreateOrder,
		dataType: 'json',
		contentType: 'application/json'
	});
	
}

// Antwort von createOrder(), wo wir die orderid speichern
function responseCreateOrder(response) {
	
	orderid = response;
	
	// customerid = response;
	alert("Die Order für den Kunden mit der ID " + customerid + " wurde gespeichert. Die OrderID lautet: " + orderid);
	
}

let articleid = -1;
let amount = -1;


// Artikel zu einer Bestellung hinzufügen
function addArticleToOrder() {
	
	// let amout = document.getElementById("addToOrder1");
	//var amount = parseInt(window.prompt("Anzahl?", "5"), 10);
	
	let articleid = document.getElementById("addToOrder1");
	let article1amount = document.getElementById("orderitem1");
	

	articleid = articleid.value
	amount = article1amount.value;
	
	alert("Article ID : " + articleid + "---Order ID : " + orderid + "----Amount : " + amount);

	// let article2amount = document.getElementById("orderitem2");
	// amount2 = article2amount.value;
	
	$.ajax({
		type: "PUT",
  		url: "/api/order/"+orderid+"/addArticle",
  		data: JSON.stringify({ articleid : articleid , amount: amount , orderid: orderid }),
  		success: responseAddArticleToOrder, 
  		dataType: 'json',
  		contentType: 'application/json'
	});
	
	console.log(JSON.stringify({ articleid : articleid , amount: amount , orderid: orderid , customerid: customerid}));
}

function responseAddArticleToOrder(response) {
	
	if (response == true) {
		alert("Hinzufügen erfolgreich. Die OrderID lautet: " + orderid)
	} else {
		alert("Fehlgeschlagen. Die OrderID lautet: " + orderid)
	}

	
}

// TEIL MATTHIAS (ENDE)

// TEIL ANDRÉ (START)


function checkEmail(str) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(str)) {
    alert("Bitte geben Sie eine gueltige E-Mailadresse ein!");
    document.getElementById("username").value="";
	document.getElementById("name").value="";
	}
    
}
	
// TEIL ANDRÉ (ENDE)


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