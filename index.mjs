import {getCart, setCart} from "./util/cart.mjs";
import {renderHeader} from "./util/header.mjs";
import {getProducts, setProducts} from "./util/products.mjs";

const productsPath = 'data/products.json';

renderHeader();
loadProducts();
addEvents();

function addEvents() {
    document.getElementById("categories").addEventListener("click", (evt) => renderProducts(evt.target.value));
}

// Fetch data from products.json and store to local storage
function loadProducts() {
    fetch(productsPath).then(raw => raw.json()).then(setProducts).then(renderProducts);
}

// render products based on given categories
function renderProducts(cat) {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = "";
    const products = getProducts();
    for (const product of products) {
        if (!cat || product.category === cat) {
            productContainer.innerHTML += `
            <div class="product-item">
                <img class="product-image" src="${product.imageURL}" alt="">
                <div class="product-data">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-description">
                        <h4 class="product-price">${product.price}€</h4>
                        <button class="product-btn btn" onclick="addToCart('${product.id}')">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>`;

        }
    }
}

// Add the item with the product id to the current user's cart
window.addToCart = function (prodId) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === prodId);
    if (index === -1) cart.push({id: prodId, count: 1}); else cart[index].count += 1;
    setCart(cart);
    renderHeader();
}