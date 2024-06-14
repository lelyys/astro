const password = document.getElementById("password");
const username = document.getElementById("username");

function validarUsuario(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
}

username.onkeydown = () => {
    const email = username.value;
    username.style.boxShadow = "none";

    if (validarUsuario(email)) {
        username.style.boxShadow = "15px 0 30px lightgreen";
    } else {
        username.style.boxShadow = "15px 0 30px crimson";
    }
};


function validarPass(pass) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return regex.test(pass.trim());
}

password.oninput = () => {
    const pass = password.value;
    password.style.boxShadow = "none";

    if (validarPass(pass)) {
        password.style.boxShadow = "15px 0 30px lightgreen";
    } else {
        password.style.boxShadow = "15px 0 30px crimson";
    }
};

const loginForm = document.querySelector('#loginForm');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;
            const users = JSON.parse(localStorage.getItem('usuarios')) || [];
            const validUser = users.find(user => user.username === email && user.password === password);
            if (!validUser) {
                return Swal.fire("ERROR","¡Usuario y/o contraseña incorrectos!","error");
            }

            localStorage.setItem('usuarioActual', JSON.stringify(validUser));
            window.location.href ='inicio.html';
});
