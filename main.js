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
            tabla.innerHTML += `<h3>Resultados - Categoría ${categoria}</h3>`;

            // Encabezados de las carreras + columna del número de corredor
            let encabezados = "<tr><th>Número Corredor</th><th>Nombre</th>";
            for (let i = 1; i <= numCarreras; i++) {
                encabezados += `<th>Carrera ${i} (Inicio y Fin)</th>`;
            }
            encabezados += "</tr>";
            tabla.innerHTML += encabezados;

            // Generar filas para los jugadores de esta categoría
            for (let i = 1; i <= categoriasNombres[categoria]; i++) {
                let fila = `<tr>
                    <td><input type="number" placeholder="Número" id="numero${categoria}${i}" min="1" required></td>
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

document.getElementById("btnCalcularResultados").addEventListener("click", function () {
    const categorias = ["NX", "PX", "EX"];
    let resultadosHTML = ""; // Variable para construir el HTML de resultados

    categorias.forEach((categoria) => {
        let corredores = []; // Aquí almacenaremos los corredores con sus tiempos
        let categoriaHTML = `<h3>Resultados - Categoría ${categoria}</h3>`;

        for (let i = 1; document.getElementById(`nombre${categoria}${i}`); i++) {
            const nombre = document.getElementById(`nombre${categoria}${i}`).value || `Jugador ${i}`;
            const numero = document.getElementById(`numero${categoria}${i}`).value || "N/A";
            let tiempoTotal = 0, cuentaCarreras = 0;

            // Calcular tiempo total
            for (let j = 1; document.getElementById(`inicio${categoria}${i}_${j}`); j++) {
                const inicio = document.getElementById(`inicio${categoria}${i}_${j}`).value;
                const fin = document.getElementById(`fin${categoria}${i}_${j}`).value;

                if (inicio && fin) {
                    const tiempoInicio = new Date(`1970-01-01T${inicio}Z`);
                    const tiempoFin = new Date(`1970-01-01T${fin}Z`);
                    const diferencia = (tiempoFin - tiempoInicio) / 1000;

                    if (diferencia >= 0) {
                        tiempoTotal += diferencia;
                        cuentaCarreras++;
                    }
                }
            }

            const promedio = cuentaCarreras > 0 ? (tiempoTotal / cuentaCarreras) : null;

            corredores.push({
                numero,
                nombre,
                promedio: promedio !== null ? promedio.toFixed(2) : "Sin datos"
            });
        }

        // Ordenar corredores por tiempo promedio (de menor a mayor)
        corredores.sort((a, b) => {
            if (a.promedio === "Sin datos") return 1;
            if (b.promedio === "Sin datos") return -1;
            return parseFloat(a.promedio) - parseFloat(b.promedio);
        });

        // Construir HTML de resultados ordenados
        if (corredores.length > 0) {
            corredores.forEach((corredor) => {
                categoriaHTML += `<p>Corredor ${corredor.numero} - ${corredor.nombre}: Tiempo Promedio: ${corredor.promedio} segundos</p>`;
            });
        } else {
            categoriaHTML += `<p>No hay datos ingresados en esta categoría.</p>`;
        }

        resultadosHTML += categoriaHTML;
    });

    document.getElementById("resultadosCalculados").innerHTML = resultadosHTML;
});
