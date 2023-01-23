import {login} from "../util/auth.mjs";
import {renderHeader} from "../util/header.mjs";

renderHeader("../");

document.getElementById("login-form").addEventListener("submit", login);