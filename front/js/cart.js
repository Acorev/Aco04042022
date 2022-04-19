import { getData } from "./utils/getdata.js";
import { Docks } from "./class/docks.js";

const paniers = new Docks('panier');
const panier = paniers.dock;
const products = getData("/api/products/");
// Affichage sur la page html
(async () => {
  products.then(data => {
    for (let item in panier) {
      let prod = data.filter(value => value._id == panier[item].id)[0];
      document.querySelector("#cart__items").innerHTML +=
        `
          <article class="cart__item" data-id="${panier[item].id}" data-color="${panier[item].color}">
              <div class="cart__item__img">
                <img src="${prod.imageUrl}" alt="${prod.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${prod.name}</h2>
                  <p>${panier[item].color}</p>
                  <p>${prod.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[item].quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
      `;
    }
  });
})();

nbArticle();
nbtPrice();

// Ecouteur d'event change
document.body.addEventListener('change', event => {
  // Event changement de quantité article
  if (event.target.className == "itemQuantity") {
    let cartItem = event.target.closest(".cart__item");
    let dataId = cartItem.dataset.id;
    let dataColor = cartItem.dataset.color;
    let dataIdColor = dataId + '_' + dataColor;

    paniers.addDockQuantity(dataIdColor, event.target.value);
    nbArticle();
    nbtPrice();
  }
});

// Ecouteur d'event click
document.body.addEventListener('click', event => {
  // Event supprime l'item selectionné
  if (event.target.className == "deleteItem") {
    const cartItem = event.target.closest(".cart__item");
    const dataId = cartItem.dataset.id + '_' + cartItem.dataset.color;

    cartItem.remove();
    paniers.removeDock(dataId);
    nbArticle();
    nbtPrice();
  }

  if (event.target.id == "order") {
    validInput(event);
  }
});

// calcul nombre d'article totale
function nbArticle() {
  let nbIntemTotal = 0;
  for (let key in panier) {
    nbIntemTotal += panier[key].quantity;
  }
  document.querySelector('#totalQuantity').innerText = nbIntemTotal;
};

// calcul price Totale
function nbtPrice() {
  products.then(data => {
    let prixArticleTotale = 0;
    for (let key in panier) {
      let prixArticle = data.filter(item => item._id == panier[key].id)[0].price;
      let quantitéArticle = panier[key].quantity;
      prixArticleTotale += prixArticle * quantitéArticle;
    }
    document.querySelector('#totalPrice').innerText = prixArticleTotale;
  })
};

// validation du formulaire
let validInput = (event) => {
  event.preventDefault();
  const form = event.target.closest(".cart__order__form");
  const input = Array.from(form);
  const inputText = input.filter(item => item.type === 'text' || item.type === 'email');

  let valid = true;
  inputText.forEach(element => {

    // Ajout d'un regex avec l'attibut pattern
    if (element.name === 'firstName' || element.name === 'lastName') {
      element.removeAttribute("required");
      element.setAttribute("pattern", '[a-zA-Z-]+');
      element.setAttribute("required", '');
    }

    valid &&= element.checkValidity();
    messageErr(valid, element);

  });

  if (valid) {
    formSubmit();
  }
};

// Affichage message d'erreur
let messageErr = (valid, element) => {
  if (!valid) {
    element.nextSibling.nextSibling.innerHTML = element.validationMessage;
  } else {
    element.nextSibling.nextSibling.innerHTML = '';
  }
};

// Envoie formulaire et panier a l'API
let formSubmit = () => {

  // Array du panier pour l'envoie
  var products = [];
  for (var key in panier) {
    products.push(panier[key].id);
  }

  // Object du formulaire et array pannier pour envoie
  const order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: lastName.value,
      city: city.value,
      email: email.value,
    },
    products: products
  }

  // envoie de l'object order
  const option = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
    }
  };

  let getReponse = getData("/api/products/order", option);
  getReponse.then(data => {
    document.location.href = 'confirmation.html?id=' + data.orderId;
  });

  console.log(products);
  
};