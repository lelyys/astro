const username = document.getElementById("username");
const password = document.getElementById("password");
const registrar = document.getElementById("registrar");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];



function validarUsuario(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
}



function validarPass(pass) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return regex.test(pass.trim());
}


username.onkeydown = () => {
    const email = username.value;
    username.style.boxShadow = validarUsuario(email) ? "15px 0 30px lightgreen" : "15px 0 30px crimson";
};


password.oninput = () => {
    const pass = password.value;
    password.style.boxShadow = validarPass(pass) ? "15px 0 30px lightgreen" : "15px 0 30px crimson";
};



registrar.onclick = (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const usernameValue = username.value;
    const passwordValue = password.value;
    const tipo = document.getElementById("tipo").value;
    const tarjeta = document.getElementById("tarjeta").value;
    const notarjeta = document.getElementById("notarjeta").value;


    if (nombre.trim() === "" || apellido.trim() === "" || usernameValue.trim() === "" || passwordValue.trim() === "" || notarjeta.trim() === "") {
        Swal.fire("ERROR", "TIENES CAMPOS VACÍOS", "error");
        return;
    }


    if (!validarUsuario(usernameValue)) {
        Swal.fire("ERROR", "USUARIO NO VÁLIDO", "error");
        return;
    }

    if (!validarPass(passwordValue)) {
        Swal.fire("ERROR", "CONTRASEÑA NO VÁLIDA", "error");
        return;
    }



    if (validacion(usuarios, usernameValue, passwordValue, notarjeta)) {
        Swal.fire("ERROR", "ESTE USUARIO, CONTRASEÑA O NÚMERO DE TARJETA YA EXISTE", "error");
        return;
    }


    const usuario = { nombre, apellido, username: usernameValue, password: passwordValue, tipo, tarjeta, notarjeta };
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire("¡REGISTRO EXITOSO!", "USUARIO REGISTRADO", "success");
    
    
    username.style.boxShadow = "none";
    password.style.boxShadow = "none";
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("tipo").selectedIndex=0;
    
    document.getElementById("notarjeta").value="";
};



const validacion = (usuarios, username, password, notarjeta) => {
    return usuarios.some(info => info.username === username || info.password === password || 
        info.notarjeta === notarjeta);
};
