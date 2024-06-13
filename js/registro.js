var registrar = document.getElementById("registrar");
var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

registrar.onclick = (event) => {
  event.preventDefault(); 

  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var username = document.getElementById("username").value; 
  var password = document.getElementById("password").value; 

  if (nombre.trim() === "" || apellido.trim() === "" || username.trim() === "" || password.trim() === "") {
    Swal.fire("ERROR","TIENES CAMPOS VACÍOS","error");
    return;
  }

  if (validacion(usuarios, username)) {
    Swal.fire("ERROR", "ESTE USUARIO YA EXISTE", "error");
    return;
  }

  let usuario = { nombre, apellido, username, password};

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  Swal.fire("¡REGISTRO EXITOSO!","USUARIO REGISTRADO","success");
  
}

const validacion = (usuarios, username) => {
  return usuarios.some(info => info.username === username);
}
