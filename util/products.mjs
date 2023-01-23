export function getProducts() {
    return JSON.parse(localStorage.getItem("products") ?? "[]");
}

export function setProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}