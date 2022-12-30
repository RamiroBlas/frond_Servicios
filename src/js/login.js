
import validate from "./validation.js";

const formLogin = document.getElementById("form");
const email = document.getElementById("exampleInputEmail");
const password = document.getElementById("exampleInputPassword");

let loginUser = async (event) => {
    event.preventDefault();
    let validated = validate([email.value, password.value]);
    if (validated) {
        let response = await fetch("http://127.0.0.1:8000/users/login/" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });
        let data = await response.json();
        if (response.status === 200) {
            let { tokens, data: user } = data
            localStorage.setItem("authTokens", JSON.stringify(tokens));
            localStorage.setItem("user", JSON.stringify(user));
            window.location.replace("../../templates/index.html");
            
            
        } else {
            Swal.fire({
                icon: "error",
                title: "incorrect",
                text: "¡Correo o contraseña no válidos!",
            });
        }
    }
};

formLogin.addEventListener("submit", loginUser);
