const image = document.querySelector("img");
const title = document.querySelector("h2");
const description = document.querySelector("main p:first-of-type");
const textContainer = document.querySelector(".row-cols-2");
const brand = textContainer.querySelector("p:first-child");
const price = textContainer.querySelector("p:last-child");

const item = new URLSearchParams(window.location.search);

function details(resource_id) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${resource_id}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      image.src = data.imageUrl;
      title.innerText = data.name;
      description.innerText = data.description;
      brand.innerText = `Brand: ${data.brand}`;
      price.innerText = `Price: ${data.price}$`;
    });
}

details(item.get("id"));
