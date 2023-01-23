import {getCart, setCart} from "../util/cart.mjs";
import {getProducts} from "../util/products.mjs";
import {renderHeader} from "../util/header.mjs";

renderCheckout();
renderHeader("../");

function renderCheckout() {
    const products = getProducts();
    const cart = getCart();
    if (cart.length <= 0) {
        document.getElementById('confirm-purchase').style.display = "none";
    } else {
        const boughtProducts = cart.map(item => ({
            ...products.find(p => p.id === item.id), quantity: item.count
        }));
        const rowContainer = document.getElementById('checkout-table-row');
        document.getElementById('total').innerHTML = boughtProducts.reduce((sum, item) => sum + (+item.quantity * +item.price), 0);
        rowContainer.innerHTML = "";
        for (let i = 0; i < boughtProducts.length; ++i) {
            const item = boughtProducts[i];
            rowContainer.innerHTML += `
			<tr>
				<td>${item.id}</td>
				<td>${item.name}</td>
				<td>${item.price}€</td>
				<td>${item.quantity}</td>
				<td>${+item.quantity * +item.price}€</td>
			</tr>`;
        }
    }
}

function confirmPurchase() {
    setCart([]);
    alert('Danke für deinen Einkauf!');
    window.location = '../index.html';
}

document.getElementById("confirm-purchase").addEventListener("click", () => confirmPurchase());
