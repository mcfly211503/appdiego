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
            tabla.innerHTML += <h3>Categoria ${categoria}</h3>;

            // Encabezados de las carreras + columna del número de corredor
            let encabezados = "<tr><th style='width: 100px; font-size: 1.2em;'>Número Corredor</th><th>Nombre</th>";
            for (let i = 1; i <= numCarreras; i++) {
                encabezados += <th>Carrera ${i} (Inicio y Fin)</th>;
            }
            encabezados += "</tr>";
            tabla.innerHTML += encabezados;

            // Generar filas para los jugadores de esta categoría
            for (let i = 1; i <= categoriasNombres[categoria]; i++) {
                let fila = `<tr>
                    <td><input type="number" placeholder="Número" id="numero${categoria}${i}" min="1" required style="font-size: 1.2em; width: 80px;"></td>
                    <td><input type="text" placeholder="Nombre" id="nombre${categoria}${i}"></td>`;
                for (let j = 1; j <= numCarreras; j++) {
                    fila += `<td>
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

// Función para calcular los resultados
document.getElementById("btnCalcularResultados").addEventListener("click", function () {
    const categorias = ["NX", "PX", "EX"];
    let resultados = "";

    categorias.forEach((categoria) => {
        resultados += <h3>Resultados - Categoría ${categoria}</h3>;
        const tabla = document.getElementById("tablaResultados");
        const filas = Array.from(tabla.getElementsByTagName("tr")).filter((tr) =>
            tr.innerHTML.includes(nombre${categoria})
        );

        filas.forEach((fila, index) => {
            const nombre = document.getElementById(nombre${categoria}${index + 1}).value || Jugador ${index + 1};
            const numero = document.getElementById(numero${categoria}${index + 1}).value || "N/A";
            const celdas = fila.getElementsByTagName("td");
            let tiempoTotal = 0;
            let cuentaCarreras = 0;

            for (let j = 1; j < celdas.length; j++) {
                const inicio = document.getElementById(inicio${categoria}${index + 1}_${j}).value;
                const fin = document.getElementById(fin${categoria}${index + 1}_${j}).value;

                if (inicio && fin) {
                    const tiempoInicio = new Date(1970-01-01T${inicio}Z);
                    const tiempoFin = new Date(1970-01-01T${fin}Z);
                    const diferencia = (tiempoFin - tiempoInicio) / 1000;
                    if (diferencia >= 0) {
                        tiempoTotal += diferencia;
                        cuentaCarreras++;
                    }
                }
            }

            if (cuentaCarreras > 0) {
                const tiempoPromedio = (tiempoTotal / cuentaCarreras).toFixed(2);
                resultados += <p>Corredor ${numero} - ${nombre}: Tiempo Promedio: ${tiempoPromedio} segundos</p>;
            } else {
                resultados += <p>Corredor ${numero} - ${nombre}: No tiene tiempos válidos</p>;
            }
        });
    });

    document.getElementById("resultadosCalculados").innerHTML = resultados;
});