var registrar = document.getElementById("registrar");
var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

registrar.onclick = (event) => {
  event.preventDefault(); 

  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var username = document.getElementById("username").value; 
  var password = document.getElementById("password").value; 

  var tipo = document.getElementById("tipo").value;
  var tarjeta = document.getElementById("tarjeta").value; 
  var notarjeta = document.getElementById("notarjeta").value;

  if (nombre.trim() === "" || apellido.trim() === "" || username.trim() === "" || password.trim() === "" || notarjeta.trim() === "") {
    Swal.fire("ERROR","TIENES CAMPOS VACÍOS","error");
    return;
  }


  if (validacion(usuarios, username, password, notarjeta)) {
    Swal.fire("ERROR", "ESTE USUARIO, CONTRASEÑA O NÚMERO DE TARJETA YA EXISTE", "error");
    return;
  }

  let usuario = {nombre, apellido, username, password, tipo, tarjeta, notarjeta};

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  Swal.fire("¡REGISTRO EXITOSO!","USUARIO REGISTRADO","success");
}

const validacion = (usuarios, username, password, notarjeta) => {
  return usuarios.some(info => info.username === username || info.password === password || 
    info.notarjeta === notarjeta);
}
