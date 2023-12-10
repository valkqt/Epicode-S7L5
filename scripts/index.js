const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

class Product {
  constructor(name, description, brand, imageUrl, price) {
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.imageUrl = imageUrl;
    this.price = price;
    this.id = "";
  }
}

const archive = [
  new Product(
    "Highly Responsive to Prayers",
    "Single player action shooting game",
    "Touhou",
    "https://en.touhouwiki.net/images/9/97/Th01cover.jpg?20111208213934",
    200
  ),
  new Product(
    "Dokyuusei",
    "Adult visual novel",
    "ELF",
    "https://upload.wikimedia.org/wikipedia/en/4/45/D%C5%8Dky%C5%ABsei_game_cover.jpg",
    80
  ),
  new Product(
    "YU-NO: A Girl Who Chants Love at the Bound of this World",
    "Adventure novel",
    "ELF",
    "https://upload.wikimedia.org/wikipedia/en/4/43/YU-NO_NEC_PC-98_cover.png",
    75
  ),
  new Product(
    "Popful Mail",
    "Side-scrolling platformer",
    "Falcom",
    "https://upload.wikimedia.org/wikipedia/en/b/b0/PopfulMailBox.jpg",
    90
  ),
  new Product(
    "Xanadu",
    "Action role playing game",
    "Falcom",
    "https://upload.wikimedia.org/wikipedia/en/8/84/Xanadu_MSX_Cover.jpg",
    130
  ),
  new Product(
    "Ultima V: Warriors of Destiny",
    "Role playing game",
    "Origin Systems",
    "https://upload.wikimedia.org/wikipedia/en/8/89/Ultima5box.jpg",
    100
  ),
  new Product(
    "The Secret of Monkey Island",
    "Graphic adventure game",
    "Lucasfilm Games",
    "https://upload.wikimedia.org/wikipedia/en/a/a8/The_Secret_of_Monkey_Island_artwork.jpg",
    60
  ),
  new Product(
    "King's Quest V",
    "Graphic adventure game",
    "Sierra On-Line",
    "https://upload.wikimedia.org/wikipedia/en/8/80/King%27s_Quest_V_-_Absence_Makes_the_Heart_Go_Yonder%21_Coverart.jpg",
    70
  ),
  new Product(
    "Lemmings ",
    "Puzzle-strategy game",
    "DMA Design",
    "https://upload.wikimedia.org/wikipedia/en/0/0c/Lemmings-BoxScan.jpg",
    140
  ),
  new Product(
    "Might and Magic II: Gates to Another World",
    "Role-playing game",
    "New World Computing",
    "https://upload.wikimedia.org/wikipedia/en/d/dc/Might_and_Magic_II_Coverart.png",
    170
  ),
  new Product(
    "Lotus Land Story",
    "Vertical shooting bullet hell",
    "Touhou",
    "https://en.touhouwiki.net/images/3/35/Th04cover.jpg",
    180
  ),
  new Product(
    "Embodiment of Scarlet Devil",
    "Vertical shooting bullet hell",
    "Touhou",
    "https://en.touhouwiki.net/images/8/8b/Th06cover.jpg",
    150
  ),
];

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
      generateCards(data);
    });
}

function generateCards(items) {
  const container = document.querySelector("main");

  for (item of items) {
    const cardHTML = `
        <div class="card " style="width: 18rem;">
        <div class="imgContainer">
        <img src="${item.imageUrl}" class="card-img-top" alt="Cover of ${item.name}"></a>
        </div>
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.price}$</p>

          <a href="/details.html?id=${item._id}" class="btn btn-success me-3">Details</a>

        </div>
        </div>
        `;

    container.innerHTML += cardHTML;
  }
}

getResources()

// const products = [];

// funzione per aggiungere prodotti di default da un Array. non serve attiva in quanto sono già nel server
// function addResources() {
//   for (let i = 0; i < archive.length; i++) {
//     fetch(endpoint, {
//       method: "POST",
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(archive[i]),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         archive[i].id = data._id;
//       })
//       .catch(console.log("Invalid Request"));
//   }
// }

// function deleteResource(resource_id) {
//   fetch(`${endpoint}/${resource_id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
//       "Content-type": "application/json",
//     },
//   });
// }

// funzione per eliminare tutte le risorse nel Server, usata solo in fase di testing
// function getAndDeleteAll() {
//   fetch(endpoint, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
//       "Content-type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       for (i = 0; i < archive.length; i++) {
//         archive[i].id = data[i]._id;
//       }
//     })
//     .then(() => {
//       for (product of archive) {
//         deleteResource(product.id);
//       }
//     });
// }


// funzione per mettere risorse del server in un Array, usata in fase di testing
// function fetchDatabase() {
//   fetch(endpoint, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
//       "Content-type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       for (let item of data) {
//         trimObject(item);
//         products.push(item);
//       }
//     })
//     .then(() => console.log(products));
// }
// function trimObject(obj) {
//   delete obj.__v;
//   delete obj.createdAt;
//   delete obj.updatedAt;
//   delete obj.userId;
//   obj.id = obj._id;
//   delete obj._id;
// }

// function modifyResource(resource_id) {
//   fetch(`${endpoint}/${resource_id}`, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
//       "Content-type": "application/json",
//     },
//   }).then(response => response.json()).then((data) => {
//     fetch(`${endpoint}/${resource_id}`, {
//       method: "PUT",
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxOGY2ZWZkMzg0OTAwMThhNzljZmIiLCJpYXQiOjE3MDE5NDQ2MDMsImV4cCI6MTcwMzE1NDIwM30.4OoXlRQgNK5LuhCQGOeI47VTi6cQT2Oluhl297gIDB4",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({pepe: 'pepe'}),
//     })
//   console.log(data)}
//   );
// }

