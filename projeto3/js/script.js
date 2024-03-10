const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector("#fade")
const loaderElement = document.querySelector("#loader")

const closeButton = document.querySelector("#close-message");

// Validate CEP Input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]|\./;
    const key = String.fromCharCode(e.keyCode);
  
    //console.log(key);
  
    //console.log(onlyNumbers.test(key));
  
    // permitir apenas número
    if (!onlyNumbers.test(key)) {
      e.preventDefault();
      return;
    }
  });

  //dispara um evento quando tiver 8 digitos
  cepInput.addEventListener("keyup", (e) =>{
    const inputValue = e.target.value
  
    // Verifica se temos um CEP com 8 digitos
    if(inputValue.length === 8) {
      getAddress(inputValue);
    }
    
  });


  //obter o endereço do cliente da api

const getAddress = async (cep) => {
	//console.log(cep)
  toggleLoader()
  //

  cepInput.blur(); //essa função serve para o input ficar invalido durante a pesquisa

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  const response =  await fetch(apiUrl);

	const data = await response.json();

  if(data.erro === "true") {
		addressForm.reset(); // resete e uma função nativa do js
		toggleLoader();
    toggleMessage("Cep Inválido, tente novamente")
		return;	
	}

    // Activate disabled attribute if form is empty
  if (addressInput.value === "") {
    fadeElement.classList.toggle(".hide")	
    loaderElement.classList.toggle(".hide")
  }

  addressInput.value = data.logradouro;
  cityInput.value = data.localidade;
  neighborhoodInput.value = data.bairro;
  regionInput.value = data.uf;

  toggleLoader();//tirar o loading da tela
};

const toggleLoader = () =>{
	// chamar as div que tem essas class
	


	 // função "togle" verifica se tem essa class, se tiver ele tira se não tiver ele coloca
	fadeElement.classList.toggle("hide")	
	loaderElement.classList.toggle("hide")
	
};

const toggleMessage = (msg) => {
	const messageElemet = document.querySelector("#message")	
	
	const messageElemetText = document.querySelector("#message p ")

	messageElemetText.innerText = msg;

	fadeElement.classList.toggle("hide");
	messageElemet.classList.toggle("hide");

	//chamar essa função agr no getAddress
};


// fechar mensagem

closeButton.addEventListener("click", () => toggleMessage());

// Save address
addressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();

    toggleMessage("Endereço salvo com sucesso!");

    addressForm.reset();

    toggleDisabled();
  }, 1000);
});



