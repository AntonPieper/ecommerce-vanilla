import {isAuthenticated, logout} from "./auth.mjs";
import {fetchCartPage, getCart} from "./cart.mjs";

const logoutHandler = () => logout();
let cartHandler = () => fetchCartPage();

export function renderHeader(prefix = "") {
    document.getElementById("logoutButton")?.removeEventListener("click", logoutHandler);
    document.getElementById("logoutButton")?.addEventListener("click", logoutHandler);
    cartHandler = () => fetchCartPage(prefix);
    document.getElementById("cart")?.removeEventListener("click", cartHandler);
    document.getElementById("cart")?.addEventListener("click", cartHandler);

    if (isAuthenticated()) {
        const basket = document.getElementById('basket');
        if (basket) basket.innerText = getCart().reduce((sum, item) => sum + item.count, 0);
        const loginBtn = document.getElementById("loginButton");
        if (loginBtn) loginBtn.style.display = "none";
        const cartName = document.getElementById("cartName");
        if (cartName) cartName.innerText = `${sessionStorage.getItem("firstName")}s Warenkorb`;
    } else {
        const cart = document.getElementById("cart");
        if (cart) cart.style.display = "none";
        const logoutBtn = document.getElementById('logoutButton');
        if (logoutBtn) logoutBtn.style.display = "none";
    }
}