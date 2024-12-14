// Función para iniciar la app cuando se presiona "Comenzar"
document.getElementById("comenzar").addEventListener("click", function () {
    document.getElementById("bienvenida").style.display = "none";
    document.getElementById("configuracion").style.display = "block";
});

// Función para confirmar la configuración de jugadores y carreras
document.getElementById("confirmarConfig").addEventListener("click", function () {
    const nx = parseInt(document.getElementById("nx").value) || 0;
    const px = parseInt(document.getElementById("px").value) || 0;
    const ex = parseInt(document.getElementById("ex").value) || 0;
    const numCarreras = parseInt(document.getElementById("carreras").value);

    if (nx + px + ex === 0) {
        alert("Debes ingresar al menos un jugador.");
        return;
    }

    if (!numCarreras || numCarreras < 1) {
        alert("Por favor, ingresa un número válido de carreras.");
        return;
    }

    document.getElementById("configuracion").style.display = "none";
    generarFormularioResultados({ nx, px, ex }, numCarreras);
});

// Función para generar el formulario de resultados
function generarFormularioResultados(categorias, numCarreras) {
    const { nx, px, ex } = categorias;
    const tabla = document.getElementById("tablaResultados");
    tabla.innerHTML = ""; // Limpiar cualquier contenido anterior

    const categoriasNombres = { NX: nx, PX: px, EX: ex };

    Object.keys(categoriasNombres).forEach((categoria) => {
        if (categoriasNombres[categoria] > 0) {
            // Título de la categoría
            tabla.innerHTML += `<h3>Categoria ${categoria}</h3>`;

            // Encabezados de las carreras
            let encabezados = "<tr><th>Número Corredor</th><th>Nombre</th>";
            for (let i = 1; i <= numCarreras; i++) {
                encabezados += `<th>Carrera ${i} (Inicio y Fin)</th>`;
            }
            encabezados += "</tr>";
            tabla.innerHTML += encabezados;

            // Filas para jugadores
            for (let i = 1; i <= categoriasNombres[categoria]; i++) {
                let fila = `
                <tr>
                    <td><input type="number" placeholder="Número" id="numero${categoria}${i}" required></td>
                    <td><input type="text" placeholder="Nombre" id="nombre${categoria}${i}"></td>`;
                for (let j = 1; j <= numCarreras; j++) {
                    fila += `
                    <td>
                        <input type="time" id="inicio${categoria}${i}_${j}" step="1">
                        <input type="time" id="fin${categoria}${i}_${j}" step="1">
                    </td>`;
                }
                fila += "</tr>";
                tabla.innerHTML += fila;
            }
        }
    });

    document.getElementById("resultados").style.display = "block";
}
