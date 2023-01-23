export function register(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const id = Math.floor(Math.random() * 1000000);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const name = firstName + " " + lastName;
    const email = formData.get("email");
    const password = formData.get("password");

    const newUser = {id, name, email, password};
    const cartKey = "cart_" + newUser.id;

    const users = JSON.parse(localStorage.getItem('users') ?? "[]");
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem(cartKey, JSON.stringify([]));
    window.location = '../auth/login.html'
}

export function login(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const users = JSON.parse(localStorage.getItem('users') ?? "[]");
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        sessionStorage.setItem('firstName', user.name.split(' ')[0]);
        sessionStorage.setItem('userID', user.id);
        sessionStorage.setItem('isAuthenticated', "yes");
        window.location = '../index.html';
    } else alert("Falsche Email Adresse oder falsches Passwort.");
}

// Logout current user
export function logout() {
    sessionStorage.clear();
}

export function redirectIfUnauthorized(loginUrl) {
    if (!isAuthenticated()) {
        window.location = loginUrl;
        return true;
    }
    return false;
}

export function isAuthenticated() {
    return !!sessionStorage.getItem("isAuthenticated");
}
