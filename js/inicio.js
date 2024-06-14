var btnMov = document.getElementById("btnMov");
var btnTar = document.getElementById("btnTar");
var btnDash = document.getElementById("btnDash");

var action = document.getElementById("action"); //DIV QUE CAMBIA DEPENDIENDO DE BOTÓN QUE PRESIONES


//FUNCIONES PARA BOTÓN DE SALDO
const mostrarSaldo = () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    let saldoGuardado = JSON.parse(localStorage.getItem("saldo"));

    let saldoActual = saldoGuardado.reduce((total, item) => total + parseFloat(item.monto), 0);

    let saldoT = `
        <h2>¡Hola, ${usuarioActual.nombre} ${usuarioActual.apellido}!</h2>
        <br>
        <h3 id="saldo">Tu Saldo es de: $${saldoActual.toFixed(2)}</h3>
        <br>
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addSaldo">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
            </svg>
            Agregar Saldo
        </button>
        <br>
        <br>
    `;
    action.innerHTML = saldoT;
    tablaSaldo();
};

const agregarSaldo = () => {
    let monto = parseFloat(document.getElementById("monto").value);

    if (isNaN(monto) || monto <= 0) {
        Swal.fire("ERROR", "Ingrese un monto válido.", "error");
        return;
    }

    let saldoActual = JSON.parse(localStorage.getItem("saldo")) || [];
    let nuevoSaldo = saldoActual.reduce((total, item) => total + item.monto, 0) + monto;

    let fechaHora = new Date().toLocaleString();

    saldoActual.push({ monto: monto, fechaHora: fechaHora });

    localStorage.setItem("saldo", JSON.stringify(saldoActual));

    Swal.fire("¡SALDO AGREGADO!", `Se agregó un saldo de $${monto.toFixed(2)}.`, "success");

    saldo.innerText = `Tu Saldo es de: $${nuevoSaldo.toFixed(2)}`;
};

const tablaSaldo = () => {
    let tablaSaldo = `<table class="table table-striped w-75 m-auto">
<tr>
<td>SALDO INGRESADO</td>
<td>FECHA Y HORA</td>
</tr>`;
    let saldoGuardado = JSON.parse(localStorage.getItem("saldo")) || [];
    saldoGuardado.forEach(item => {
        tablaSaldo += `
<tr>
<td>$${item.monto.toFixed(2)}</td>
<td>${item.fechaHora}</td>
</tr>`;
    });
    tablaSaldo += `</table>`;
    action.innerHTML += tablaSaldo;
};



//FUNCIONES PARA BOTÓN MOVIMIENTOS

btnMov.onclick=()=>{
    let saldoT = `
    <h3>¿QUÉ MOVIMIENTO DESEAS HACER HOY?</h3>
    <br>
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addRetiro">
        Retiro
    </button>
    <br>
    <br>
`;
action.innerHTML = saldoT;

}