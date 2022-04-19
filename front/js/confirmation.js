
// envoie de l'id sur la page
let params = new URLSearchParams(window.location.search);
document.querySelector('#orderId').innerHTML = params.get('id');