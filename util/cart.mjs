import {isAuthenticated, redirectIfUnauthorized} from "./auth.mjs";

export function getCart() {
    if (!isAuthenticated()) return alert("Du musst eingeloggt sein, um einen Warenkorb zu haben.");
    const userID = sessionStorage.getItem('userID');
    const cartKey = 'cart_' + userID;
    return JSON.parse(localStorage.getItem(cartKey) ?? "[]");
}

export function setCart(cart) {
    const userID = sessionStorage.getItem('userID');
    const cartKey = 'cart_' + userID;
    return localStorage.setItem(cartKey, JSON.stringify(cart));
}

// Fetch Cart page
export function fetchCartPage(prefix = "") {
    if (!redirectIfUnauthorized(`${prefix}auth/login.html`)) {
        window.location = `${prefix}cart/`
    }
}
