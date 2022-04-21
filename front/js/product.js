import { getData, getConfig }  from "./utils/getdata.js";
import { Docks } from "./class/docks.js";

const prod_colors = document.querySelector("#colors");
const prod_quantity = document.querySelector("#quantity");

let params = new URLSearchParams(window.location.search);

const docks = new Docks(getConfig.basket);

// Affichage sur la page html
(async () => {
    var products = products = getData("/api/products/" + params.get("id"));

    products.then(data => {
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.querySelector("#title").innerText = data.name;
        document.querySelector("#price").innerText = data.price;
        document.querySelector("#description").innerText = data.description;
        for (let color of data.colors) {
            document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`;
        }
    });
})();

// Ecouteur d'event click
document.body.addEventListener('click', event => {

    // Ajout au panier
    if (event.target.id == "addToCart") {
        if (docks.validation(prod_quantity.value)) {
            docks.addDock(params.get("id"), prod_quantity.value, prod_colors.value);
        } else {
            prod_quantity.value = 1;
        }
    };
})