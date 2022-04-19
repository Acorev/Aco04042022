// Chargement du fichier json adresse serveur
async function loadUrl() {
    return await (await fetch("../../config.json"))
    .json()
    .catch(err => console.log('Error!: ' + err));
}

// Chargement de l'Api products
export async function getData(addr, option = undefined) {
    let url = await loadUrl();
    console.log(url.host + addr, option)
    return await (await fetch(url.host + addr, option))
        .json()
        .catch(err => console.log('Error!: ' + err));
}