const ciudad = document.querySelector('#ciudad');
const year = document.querySelector('#year_cons');
const n_pisos = document.querySelector('#num_pisos');
const n_habitaciones = document.querySelector('#num_hab');
const arriendo = document.querySelector('#arriendo');
const parqueadero = document.querySelector('#park');
const min_price = document.querySelector('#min_price');
const max_price = document.querySelector('#max_price');

const resultado = document.querySelector('#busqueda');
const max = new Date().getFullYear();
const min = max - 12;

const datosbusqueda = {
    ciudad: "",
    parqueadero: "",
    num_pisos: "",
    arriendo: "",
    year: "",
    num_habitaciones: "",
    minimo: "",
    maximo: "",
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCasas(proyectos);
    llenarSelectYear();
    llenarSelectPisos();
    llenarSelectHabs();
});

ciudad.addEventListener('change', evt => {
    datosbusqueda.ciudad = evt.target.value;
    filtrarCasa();
})

year.addEventListener('change', evt => {
    datosbusqueda.year = parseInt(evt.target.value);
    filtrarCasa();
})

n_pisos.addEventListener('change', evt => {
    datosbusqueda.num_pisos = parseInt(evt.target.value);
    filtrarCasa();
})
n_habitaciones.addEventListener('change', evt => {
    datosbusqueda.num_habitaciones = parseInt(evt.target.value);
    filtrarCasa();
})

arriendo.addEventListener('change', evt => {
    datosbusqueda.arriendo = evt.target.value;
    filtrarCasa();
})

parqueadero.addEventListener('change', evt => {
    datosbusqueda.parqueadero = evt.target.value;
    filtrarCasa();
})

min_price.addEventListener('change', evt => {
    datosbusqueda.minimo = parseInt(evt.target.value);
    console.log(datosbusqueda.minimo);
    filtrarCasa();
})

max_price.addEventListener('change', evt => {
    datosbusqueda.maximo = parseInt(evt.target.value);
    console.log(datosbusqueda.maximo);
    filtrarCasa();
})

function llenarSelectYear() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion)
    }
}

function llenarSelectPisos() {
    for (let i = 1; i <= 6; i++) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        n_pisos.appendChild(opcion)
    }
}

function llenarSelectHabs() {
    for (let i = 1; i <= 7; i++) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        n_habitaciones.appendChild(opcion)
    }
}

function mostrarCasas(proyectos) {
    limpiarHTML();
    proyectos.forEach(casa => {
        const { ciudad, parqueadero, num_pisos, arriendo, year, num_habitaciones, precio } = casa;
        const casaHTML = document.createElement('div');
        casaHTML.classList.add('house');
        casaHTML.innerHTML = `<p>Ciudad: ${ciudad}</p>
        <p>No° pisos: ${num_pisos}</p><p>¿Arriendo?: ${arriendo}</p><p> ¿Parqueadero?: ${parqueadero} </p><p>Año: ${year}</p><p>
        No° habitaciones: ${num_habitaciones}</p><p>Precio: ${precio} COP</p>
        `;
        resultado.appendChild(casaHTML);
    })
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function filtrarCasa() {
    const resultado = proyectos.filter(filtrarCiudad).filter(filtrarParqueadero).filter(filtrarNumPisos).filter(filtrarArriendo).filter(filtrarYear).filter(filtrarNumHabs).filter(filtrarMaximo).filter(filtrarMinimo);

    if (resultado.length) {
        mostrarCasas(resultado)
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add();
    noResultado.textContent = "No hay resultado";
    resultado.appendChild(noResultado);
}

function filtrarCiudad(casa) {
    const { ciudad } = datosbusqueda;
    if (ciudad) {
        return casa.ciudad === ciudad;
    }
    return casa;
}

function filtrarYear(casa) {
    const { year } = datosbusqueda;
    if (year) {
        return casa.year === year;
    }
    return casa;
}

function filtrarMinimo(casa) {
    const { minimo } = datosbusqueda;
    if (minimo) {
        return casa.precio >= minimo;
    }
    return casa;
}

function filtrarMaximo(casa) {
    const { maximo } = datosbusqueda;
    if (maximo) {
        return casa.precio <= maximo;
    }
    return casa;
}

function filtrarParqueadero(casa) {
    const { parqueadero } = datosbusqueda;
    if (parqueadero) {
        return casa.parqueadero === parqueadero;
    }
    return casa;
}

function filtrarNumPisos(casa) {
    const { num_pisos } = datosbusqueda;
    if (num_pisos) {
        return casa.num_pisos === num_pisos;
    }
    return casa;
}

function filtrarNumHabs(casa) {
    const { num_habitaciones } = datosbusqueda;
    if (num_habitaciones) {
        return casa.num_habitaciones === num_habitaciones;
    }
    return casa;
}

function filtrarArriendo(casa) {
    const { arriendo } = datosbusqueda;
    if (arriendo) {
        return casa.arriendo === arriendo;
    }
    return casa;
}