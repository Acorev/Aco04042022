
// Chargement du fichier de configuration loadconfig.json
let loadConfig = async () => {
    return await (await fetch("../../config.json"))
        .json()
        .catch(err => console.log('Error!: ' + err));
}

export let getConfig = await loadConfig();

// Chargement de l'Api products
export async function getData(addr, option = undefined) {
    return await (await fetch(getConfig.host + addr, option))
        .json()
        .catch(err => console.log('Error!: ' + err));
}