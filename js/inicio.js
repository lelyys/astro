var btnMov = document.getElementById("btnMov");
var btnTar = document.getElementById("btnTar");
var btnDash = document.getElementById("btnDash");

var action = document.getElementById("action"); // DIV QUE CAMBIA DEPENDIENDO DE BOTÓN QUE PRESIONES
var user = "";



// FUNCIONES PARA BOTÓN DE SALDO
const mostrarSaldo = () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    user = usuarioActual.username;
    let saldoGuardado = JSON.parse(localStorage.getItem("saldo")) || [];
    let total = 0;
    saldoGuardado.forEach(item => {
        if (item.user === user) {
            total += parseFloat(item.monto);
        }
    });

    let saldoT = `
        <h2>¡Hola, ${usuarioActual.nombre} ${usuarioActual.apellido}!</h2>
        <br>
        <h3 id="saldo">Tu Saldo es de: $${total.toFixed(2)}</h3>
        <br>
    `;
    action.innerHTML = saldoT;
};

const agregarSaldo = () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    user = usuarioActual.username;

    let saldoGuardado = JSON.parse(localStorage.getItem("saldo")) || [];
    let total = 0;
    saldoGuardado.forEach(item => {
        if (item.user === user) {
            total += parseFloat(item.monto);
        }
    });

    let monto = parseFloat(document.getElementById("monto").value);
    
    if (isNaN(monto) || monto <= 0) {
        Swal.fire("ERROR", "Ingrese un monto válido.", "error");
        return;
    }

    if (usuarioActual.tipo === "Basica" && (total + monto) >= 50000) {
        Swal.fire("ERROR", "Las cuentas básicas no pueden tener un saldo mayor o igual a $50,000.", "warning");
        return;
    }

    if (usuarioActual.tipo === "Basica" && monto >= 20000) {
        Swal.fire("ERROR", "Las cuentas básicas no pueden depositar monto mayor o igual a $20,000.", "warning");
        return;
    }

    let nuevoSaldo = total + monto;
    let fechaHora = new Date().toLocaleString();

    saldoGuardado.push({ monto: monto, fechaHora: fechaHora, user: user, tipo: "Deposito" });

    localStorage.setItem("saldo", JSON.stringify(saldoGuardado));

    Swal.fire("¡SALDO AGREGADO!", `Se agregó un saldo de $${monto.toFixed(2)}.`, "success");
    
        
        
    document.getElementById("monto").value = "";

    document.getElementById("saldo").innerText = `Tu Saldo es de: $${nuevoSaldo.toFixed(2)}`;
};



const retirarSaldo = () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    user = usuarioActual.username;

    let monto = parseFloat(document.getElementById("retirar").value);

    if (isNaN(monto) || monto <= 0) {
        Swal.fire("ERROR", "Ingrese un monto válido.", "error");
        return;
    }
    
    if (usuarioActual.tipo === "Basica" && monto >= 15000) {
        Swal.fire("ERROR", "Las cuentas básicas no pueden retirar un monto mayor o igual a $15,000.", "warning");
        return;
    }

    let saldoActual = JSON.parse(localStorage.getItem("saldo")) || [];
    let saldoDisponible = saldoActual.reduce((total, item) => total + (item.user === user ? parseFloat(item.monto) : 0), 0);

    if (monto > saldoDisponible) {
        Swal.fire("ERROR", "Fondos insuficientes", "error");
        return;
    }

    let nuevoSaldo = saldoDisponible - monto;
    let fechaHora = new Date().toLocaleString();

    saldoActual.push({ monto: -monto, fechaHora: fechaHora, user: user, tipo: "Retiro" });

    localStorage.setItem("saldo", JSON.stringify(saldoActual));

    Swal.fire("¡RETIRO EXITOSO!", `Se retiró un monto de $${monto.toFixed(2)}.`, "success");
    
    
    
    document.getElementById("retirar").value = "";
    
    

    document.getElementById("saldo").innerText = `Tu Saldo es de: $${nuevoSaldo.toFixed(2)}`;
};







// FUNCIONES PARA BOTÓN MOVIMIENTOS

btnMov.onclick = () => {
    let movimientosC = `
    <h3>¿QUÉ MOVIMIENTO DESEAS HACER HOY?</h3>
    <br>
    <table class="table w-100 m-auto">
    <tr>
    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addSaldo">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
        </svg>
        Agregar Saldo
    </button></td>
    <td><button class="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#addRetiro">
        Retiro  
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-piggy-bank-fill" viewBox="0 0 16 16">
        <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595m7.173 3.876a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199m-8.999-.65a.5.5 0 1 1-.276-.96A7.6 7.6 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.6 6.6 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0
        <h3>1 1.5 0 .75.75 0 0 1 1.5 0"></h3>
    </button></td>
   <td><button class="btn btn-info mx-2" onclick="historialT()">
       Historial de Transacciones
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
        </svg>
    </button></td>
    </tr>
    </table>
`;
    action.innerHTML = movimientosC;
}

// HISTORIAL DE TRANSFERENCIAS

const historialT = () => {
  
    let tablaH = `
    
        <h3>¿QUÉ MOVIMIENTO DESEAS HACER HOY?</h3>
    <br>
    <table class="table w-100 m-auto">
    <tr>
    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addSaldo">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
        </svg>
        Agregar Saldo
    </button></td>
    
   <td> <button class="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#addRetiro">
        Retiro  
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-piggy-bank-fill" viewBox="0 0 16 16">
        <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595m7.173 3.876a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199m-8.999-.65a.5.5 0 1 1-.276-.96A7.6 7.6 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.6 6.6 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0
        <h3>1 1.5 0 .75.75 0 0 1 1.5 0"></h3>
    </button></td>
    
  <td>  <button class="btn btn-info mx-2" onclick="historialT()">
       Historial de Transacciones
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
        </svg>
    </button><td>
    </table>
   
   <br>
    
    <table class="table table-striped w-75 m-auto">
    <tr>
    <td>TIPO DE TRANSACCIÓN</td>
    <td>DESCRIPCIÓN</td>
    <td>MONTO</td>
    <td>FECHA Y HORA</td>
    </tr>`;
    let saldoGuardado = JSON.parse(localStorage.getItem("saldo")) || [];
    saldoGuardado.reverse().forEach(item => {
        if(item.user==user){
        tablaH += `
    <tr>
    <td>${item.tipo || 'Ingreso'}</td>
    <td>${item.descripcion || 'N/A'}</td>
    <td>$${item.monto.toFixed(2)}</td>
    <td>${item.fechaHora}</td>
    </tr>`;
        }
    });
    tablaH += `</table>`;
    action.innerHTML = tablaH;
}




//MOSTRAR TARJETA DIFERENTE

var btnTar = document.getElementById("btnTar");
var action = document.getElementById("action");

const mostrarTarjeta = () => {
    const usuarioActualString = localStorage.getItem('usuarioActual');
    const usuarioActual = JSON.parse(usuarioActualString);

    let tarjetaHTML = `
        <div class="tarjeta">
            <div class="ti">INFINITE EMPRESARIAL</div>
            <div class="chip"></div>
            <div class="logo"></div>
            <div class="numero">${usuarioActual.notarjeta}</div>
            <div class="nombre">${usuarioActual.nombre} ${usuarioActual.apellido}</div>
            <div class="fecha">12/26</div>
        </div>
    `;

    action.innerHTML = tarjetaHTML;

    let style = document.createElement('style');

    if (usuarioActual.tipo === 'Empresarial') {
        style.innerHTML = `
            .tarjeta {
                width: 300px;
                height: 200px;
                background: rgb(5,3,58);
                background: linear-gradient(45deg, rgba(19,18,45,1) 15%, rgba(16,39,107,1) 61%);
                border-radius: 15px;
                padding: 20px;
                box-sizing: border-box;
                color: white;
                font-family: Arial, sans-serif;
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: auto; /* Para centrar horizontalmente */
            }
            
            .ti {
            position: absolute;
                top: 20px;
                left: 180px;
                font-size: 10px;
            }
            

            .chip {
                width: 50px;
                height: 40px;
                background: url('/img/chipem.png') no-repeat ;
                background-size: cover;
                position: absolute;
                top: 20px;
                left: 20px;
            }
            .logo {
                width: 70px;
                height: 60px;
                background: url('/img/visa.png') no-repeat;
                background-size: cover;
                position: absolute;
                top: 20px;
                right: 20px;
            }
            .numero {
                margin-top: 80px;
                font-size: 22px;
                letter-spacing: 2px;
                text-align: center;
                font-family: "Aldrich", sans-serif;
                font-weight: 600;
                font-style: normal;
}

            }
            .nombre {
                margin-top: 20px;
                font-size: 16px;
                text-align: center;
            }
        `;
    } else if(usuarioActual.tipo === 'Basica') {
        style.innerHTML = `
            .tarjeta {
                width: 300px;
                height: 200px;
                background: rgb(149,220,233);
                background: linear-gradient(45deg, rgba(149,220,233,1) 0%, rgba(0,130,187,1) 57%);
                border-radius: 15px;
                padding: 20px;
                box-sizing: border-box;
                color: white;
                font-family: Arial, sans-serif;
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: auto;
            }

               .ti {
              position: absolute;
                top: 20px;
                left: 180px;
                font-size: 10px;
                color: transparent;
            }

            .chip {
                width: 50px;
                height: 40px;
                background: url('/img/chip.png') no-repeat ;
                background-size: cover;
                position: absolute;
                top: 20px;
                left: 20px;
            }
            .logo {
                width: 70px;
                height: 60px;
                background: url('/img/visa.png') no-repeat;
                background-size: cover;
                position: absolute;
                top: 20px;
                right: 20px;
            }
            .numero {
                margin-top: 80px;
                font-size: 22px;
                letter-spacing: 2px;
                text-align: center;
                font-family: "Aldrich", sans-serif;
                font-weight: 600;
                font-style: normal;
                

        
           }
            .nombre {
                margin-top: 20px;
                font-size: 16px;
                text-align: center;
            }
        `;
    }

    document.head.appendChild(style);
};

btnTar.onclick = mostrarTarjeta;




const graficoSaldo = () => {

    action.innerHTML = '';

    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
     user = usuarioActual.username;


    let saldoGuardado = JSON.parse(localStorage.getItem("saldo")) || [];


    const ingresosPorDia = {};
    const retirosPorDia = {};


    saldoGuardado.forEach(item => {
        if (item.user === user && (item.tipo === "Deposito" || item.tipo === "Retiro")) {
            const fecha = item.fechaHora.slice(0, 10);
            
            if (!(fecha in ingresosPorDia)) {
                ingresosPorDia[fecha] = 0;
                retirosPorDia[fecha] = 0;
            }
            if (item.tipo === "Deposito") {
                ingresosPorDia[fecha] += parseFloat(item.monto);
            } else if (item.tipo === "Retiro") {
                retirosPorDia[fecha] += parseFloat(item.monto);
            }
        }
    });

    const fechas = Object.keys(ingresosPorDia).sort();

    let canvasIngresos = document.createElement('canvas');
    canvasIngresos.id = 'canvasIngresos';
    action.appendChild(canvasIngresos);


    let ctxIngresos = canvasIngresos.getContext('2d');
    let chartIngresos = new Chart(ctxIngresos, {type: 'bar', data: {
       labels: fechas,
            datasets: [{
                label: 'Ingresos por Día',
                data: fechas.map(fecha => ingresosPorDia[fecha]),
                backgroundColor: '#44F59C', 
                borderColor: 'green',
                borderWidth: 1
            }]
        },
     options: {scales: {y: {beginAtZero:true
                }
            }
        }
    });


    let canvasRetiros = document.createElement('canvas');
    canvasRetiros.id = 'canvasRetiros';
    action.appendChild(canvasRetiros);

    let ctxRetiros = canvasRetiros.getContext('2d');
    let chartRetiros = new Chart(ctxRetiros, {
        type: 'bar',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Retiros por Día',
                data: fechas.map(fecha => retirosPorDia[fecha]),
                backgroundColor: '#F54444',
                borderColor: 'red',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

btnDash.onclick = graficoSaldo;
        
