import {register} from "../util/auth.mjs";
import {renderHeader} from "../util/header.mjs";

renderHeader("../");

document.getElementById("signup-form").addEventListener("submit", register);