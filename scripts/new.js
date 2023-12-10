// le parti commentate sono funzionalità che avevo pensato per aggiungere proprietà opzionali ai prodotti. poi ho scoperto che al server non piacciono neanche se le metti con PUT!!!
// le ho comunque lasciate
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const standardProps = [
  "name",
  "id",
  "price",
  "brand",
  "description",
  "imageUrl",
];
const customButton = document.getElementById("btn-addResource");
const customContainer = document.getElementById("custom");
const customFields = document.getElementById("custom-field-container");
const reset = document.querySelector("[type=reset]");
const editContainer = document.querySelector(".modifyBox");

class DOM {
  constructor() {}
  // queste due funzioni non sono più usate, permettevano di creare input/label per attributi opzionali ai prodotti
  // static createInput(type, id, parent) {
  //   const elem = document.createElement("input");
  //   elem.setAttribute("type", type);
  //   elem.setAttribute("id", id);
  //   parent.appendChild(elem);
  // }
  // static createLabel(forAttr, text, parent) {
  //   const elem = document.createElement("label");
  //   elem.setAttribute("for", forAttr);
  //   elem.innerText = text;
  //   parent.appendChild(elem);
  // }
  static createOption(value, text, parent) {
    const elem = document.createElement("option");
    elem.setAttribute("value", value);
    elem.innerText = text;
    parent.appendChild(elem);
  }
}

function pass() {
  return;
}

function urlIsValid(str) {
  if (!str.startsWith("http")) {
    alert("Please input a valid URL");
    return false;
  } else {
    return true;
  }
}

function getResources() {
  fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function formHarvester(formElem) {
  const props = ["name", "description", "brand", "price", "imageUrl"];
  const inputFields = formElem.querySelectorAll("input");
  const results = {};
  for (i = 0; i < props.length; i++) {
    results[props[i]] = inputFields[i].value;
  }
  return results;
}

// creazione di una nuova risorsa
const form = document.getElementById("add-form");
function createResource() {
  const resource = formHarvester(form);
  if (!urlIsValid(resource.imageUrl)) {
    return;
  }
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
      "Content-type": "application/json",
    },
    body: JSON.stringify(resource),
  })
    .then(() => alert("Successfully added product"))
    .then(() => form.reset())
}

form.addEventListener('submit', (e) => e.preventDefault())
form.addEventListener("submit", createResource);
// reset.addEventListener('reset', (event) => {
//   if (!confirm('Are you sure?')) {
//     event.preventDefault()
//   }
// })

const addBtn = document.getElementById("newResource");
addBtn.addEventListener("click", function () {
  form.style.display = "block";
  editContainer.style.display = "none";
});


const chooseModify = document.getElementById("modifyResource");
chooseModify.addEventListener("click", function () {
  // rimuove tutte le options dal select
  while (selector.firstChild) {
    selector.firstChild.remove();
  }

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // ricrea le options del select
      for (let product of data) {
        DOM.createOption(product._id, product.name, selector);
      }
      form.style.display = "none";
      editContainer.style.display = "flex";
    });
});

const selector = document.querySelector("select");
selector.addEventListener("change", () => {
  const options = selector.querySelectorAll("option");
  const index = selector.selectedIndex;
  showProduct(options[index].value);
});

function showProduct(resource_id) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${resource_id}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => fillEditFields(data));
}

function fillEditFields(product) {
  const cover = document.querySelector(".cover");
  const name = document.getElementById("modify-name");
  const description = document.getElementById("modify-description");
  const brand = document.getElementById("modify-brand");
  const price = document.getElementById("modify-price");
  const imageUrl = document.getElementById("modify-imageUrl");

  cover.setAttribute("src", product.imageUrl);
  name.value = product.name;
  description.value = product.description;
  brand.value = product.brand;
  price.value = product.price;
  imageUrl.value = product.imageUrl;
}

// modifica una risorsa
const editForm = document.getElementById("edit-form");
editForm.addEventListener("submit", function (e) {
  const modifiedResource = formHarvester(editForm);
  if (!urlIsValid(modifiedResource.imageUrl)) {
    return;
  }
  const options = selector.querySelectorAll("option");
  const index = selector.selectedIndex;
  const option = options[index]
  const itemID = option.value;

  e.preventDefault();
  fetch(`https://striveschool-api.herokuapp.com/api/product/${itemID}`, {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
      "Content-type": "application/json",
    },
    body: JSON.stringify(modifiedResource),
  }).then(() => (option.innerText = modifiedResource.name));
});

// rimuovi una risorsa
const removeBtn = document.querySelector("[type=button]");
removeBtn.addEventListener('click', (event) => {
  if (!confirm('Are you sure?')) {
    event.preventDefault()
  }
})

removeBtn.addEventListener("click", function () {
  const options = selector.querySelectorAll("option");
  const index = selector.selectedIndex;
  const option = options[index]
  const resource_id = option.value;

  fetch(`https://striveschool-api.herokuapp.com/api/product/${resource_id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
      "Content-type": "application/json",
    },
  });
  option.remove();
});

// questa funzione creava campi label e input in base al prompt dell'utente, e aveva dei controlli per evitare che venissero inseriti campi duplicati

// customButton.addEventListener("click", function (event) {
//   const attributeName = document
//     .querySelector("#custom input")
//     .value.trim()
//     .toLowerCase();
//   if (!attributeName) {
//     alert("Please specify an attribute");
//     return;
//   }
//   const customInputs = customFields.querySelectorAll("input");

//   for (elem of customInputs) {
//     if (elem.id === attributeName || standardProps.includes(attributeName)) {
//       alert("Invalid or already existing attribute!");
//       return;
//     }
//   }
//   DOM.createLabel("for", attributeName, customFields);
//   DOM.createInput("text", attributeName, customFields);
// });

// funzione per attivare la modalità "modifica" della pagina back office

//   // questa funzione conteneva una logica per aggiungere proprietà custom ai prodotti.

// function formHarvester(formElem) {
//   const inputFields = formElem.querySelectorAll("input");
//   console.log(inputFields);
//   // const customProps = {};
//   const results = {};
//   for (let input of inputFields) {
//     if (standardProps.includes(input.id)) {
//       results[input.classList] = input.value;
//     } else if (input.id === "custom-attributes") {
//       pass();
//     } else {
//       // customProps[input.id] = input.value;
//     }
//   }
//   // results.custom = customProps;
//   return results;
// }
