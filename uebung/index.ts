import Product from "./product";
import products from "./products";

function searchProduct(name: string): Product | null {
    let result = products.filter(product => product.name === 'name');

    if (result.length === 0) {
        return null;
    }

    return result[0];
}

const product = searchProduct('beanie');