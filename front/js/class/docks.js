/*
* Class gestion du dock
* Chargement du dock ou crée un dock vide 
*   dans le construteur
*/
export class Docks {
    constructor(item) {
        this.item = item;

        this.dock = localStorage.getItem(this.item);
        if (this.dock == null) {
            this.dock = {};
        } else {
            this.dock = JSON.parse(this.dock);
        };
    };

    // Ajout de produits au dock 
    addDock(prodId, prodQuantity, prodColors) {
        prodQuantity = parseInt(prodQuantity);

        if (this.validation(prodQuantity, prodColors)) {

            const clef = prodId + "_" + prodColors;

            if (this.dock[clef] === undefined) {
                this.dock[clef] = { id: prodId, quantity: prodQuantity, color: prodColors };
            } else {
                this.dock[clef]["quantity"] += prodQuantity;
            }
            this.saveDock();
        };
    };

    // Ajout de quantité suplémantaire au dock
    addDockQuantity(prodId, prodQuantity) {
        prodQuantity = parseInt(prodQuantity);
        this.dock[prodId]["quantity"] = prodQuantity;
        this.saveDock();
    };

    // Efface le produit par son id
    removeDock(prodId) {
        delete this.dock[prodId];
        this.saveDock();
    };

    // Sauvegarde du dock dans le localstorage
    saveDock() {
        localStorage.setItem(this.item, JSON.stringify(this.dock));
    };

    // validation des entrées dock
    validation(prodQuantity, prod_colors) {
        if (isNaN(prodQuantity)) return false;
        if (prodQuantity <= 0) return false;
        if (prodQuantity >= 101) return false;
        if (prodQuantity === '') return false;
        if (prod_colors !== undefined) {
            if (prod_colors == '') return false;
        }

        return true;
    }
};