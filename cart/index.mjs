import {getCart, setCart} from "../util/cart.mjs";
import {redirectIfUnauthorized} from "../util/auth.mjs";
import {getProducts} from "../util/products.mjs";
import {renderHeader} from "../util/header.mjs";

renderCart();

renderHeader("../");

function renderCart() {
    if (redirectIfUnauthorized("../auth/login.html")) return;

    const products = getProducts();
    const cart = getCart();
    const boughtProducts = cart.map(item => ({
        ...item, ...products.find(p => p.id === item.id)
    }));
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = "";
    boughtProducts.forEach((item, index) => {
        cartContainer.innerHTML += `
        <div class="cart-item">
            <img class="cart-item-image" src="${item.imageURL}" alt="prod-image">
            <div class="cart-item-data">
                <h3 class="cart-item-title">${item.name}</h3>
                <h4 class="cart-item-price">${item.price}€</h4>
                <span class="edit-quantity">
                    <button class="edit-count-btn" onclick="modifyCount(${index}, -1)">
                        <i class="material-symbols-outlined">remove</i>
                    </button>
                    <span class="quantity">${item.count}</span>
                    <button class="edit-count-btn" onclick="modifyCount(${index}, 1)">
                        <i class="material-symbols-outlined">add</i>
                    </button>
                </span>
                <button class="delete-btn" onclick="modifyCount(${index})">
                    <i class="material-symbols-outlined">delete</i>
                </button>
            </div>
        </div>`;
    })

}

function modifyCount(itemIndex, offset) {
    const cart = getCart();
    if (offset !== undefined) { // Wenn offset gegeben ist: die Menge des gewählten items ändern
        cart[itemIndex].count += offset;
        // Wenn die Menge gleich 0 ist: gewähltes item löschen
        if (cart[itemIndex].count === 0) cart.splice(itemIndex, 1);
    } else { // Sonst: gewähltes item löschen
        cart.splice(itemIndex, 1);
    }
    setCart(cart);
    renderCart();
}