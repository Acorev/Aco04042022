import { getData } from "./utils/getdata.js";
// Affichage sur la page html
(async () => {
    let products = getData("/api/products/");
    products.then(data => {
        for (let item of data) {
            document.querySelector("#items").innerHTML +=
                `
            <a href="./product.html?id=${item._id}">
                <article>
                    <img src="${item.imageUrl}" alt="${item.altTxt}">
                    <h3 class="productName">${item.name}</h3>
                    <p class="productDescription">${item.description}</p>
                </article>
            </a>
            `
        }
    }).catch(error => {
        console.log(error)
    });
})();