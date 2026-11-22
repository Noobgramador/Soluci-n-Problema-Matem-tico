const readline = require('readline');

// Interfaz para leer datos desde la consola en Node.js
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Calcula el factor constante de la ecuación:
 * x^2 * (2 + PI/8 - 1/4) = AreaTotal
 */
function obtenerFactorGeometrico() {
    const coeficienteRectangulo = 2;
    const coeficienteSemicirculo = Math.PI / 8;
    const coeficienteTriangulo = 1 / 4; // Se resta porque es un recorte

    return coeficienteRectangulo + coeficienteSemicirculo - coeficienteTriangulo;
}

/**
 * Despeja el valor de 'x' (base principal) a partir del área total.
 */
function calcularBaseX(areaObjetivo) {
    const factor = obtenerFactorGeometrico();
    return Math.sqrt(areaObjetivo / factor);
}

/**
 * Calcula las dimensiones y áreas parciales de la figura compuesta.
 */
function calcularGeometriaCompleta(areaObjetivo) {
    const x = calcularBaseX(areaObjetivo);

    // Dimensiones en función de x
    const baseRectangulo = x;
    const alturaRectangulo = 2 * x;

    const diametroSemicirculo = x;
    const radioSemicirculo = x / 2;

    const baseTriangulo = x;
    const alturaTriangulo = x / 2;

    // Áreas parciales
    const areaRectangulo = baseRectangulo * alturaRectangulo;
    const areaSemicirculo = (Math.PI * Math.pow(radioSemicirculo, 2)) / 2;
    const areaTriangulo = (baseTriangulo * alturaTriangulo) / 2;

    // Área neta verificada (suma de aportes menos el recorte)
    const areaTotalVerificada = areaRectangulo + areaSemicirculo - areaTriangulo;

    return {
        areaObjetivo,
        x,
        dimensiones: {
            baseRectangulo,
            alturaRectangulo,
            diametroSemicirculo,
            radioSemicirculo,
            baseTriangulo,
            alturaTriangulo
        },
        areas: {
            areaRectangulo,
            areaSemicirculo,
            areaTriangulo,
            areaTotalVerificada
        }
    };
}

/**
 * Imprime en consola los resultados del cálculo.
 */
function mostrarResultados(datos) {
    const { areaObjetivo, x, dimensiones, areas } = datos;

    console.log('\n====================================================');
    console.log('       RESULTADOS DEL CÁLCULO DE FIGURA COMPUESTA   ');
    console.log('====================================================');
    console.log(`Área total objetivo        : ${areaObjetivo.toFixed(2)} cm²`);
    console.log(`Valor de x (ancho base)    : ${x.toFixed(4)} cm`);
    console.log('----------------------------------------------------');
    console.log('DIMENSIONES:');
    console.log(`  - Rectángulo (base x alt)  : ${dimensiones.baseRectangulo.toFixed(2)} cm x ${dimensiones.alturaRectangulo.toFixed(2)} cm`);
    console.log(`  - Semicírculo (diám / rad) : ${dimensiones.diametroSemicirculo.toFixed(2)} cm / ${dimensiones.radioSemicirculo.toFixed(2)} cm`);
    console.log(`  - Triángulo (base x alt)   : ${dimensiones.baseTriangulo.toFixed(2)} cm x ${dimensiones.alturaTriangulo.toFixed(2)} cm`);
    console.log('----------------------------------------------------');
    console.log('ÁREAS PARCIALES:');
    console.log(`  + Área rectángulo        : ${areas.areaRectangulo.toFixed(2)} cm²`);
    console.log(`  + Área semicírculo       : ${areas.areaSemicirculo.toFixed(2)} cm²`);
    console.log(`  - Área recorte triángulo : ${areas.areaTriangulo.toFixed(2)} cm²`);
    console.log(`  = Área neta verificada   : ${areas.areaTotalVerificada.toFixed(2)} cm²`);
    console.log('====================================================\n');
}

/**
 * Inicia la solicitud por consola y valida la entrada del usuario.
 */
function iniciarPrograma() {
    console.log('--- Calculadora de Figura Compuesta (Node.js) ---');
    rl.question('Ingresa el área total en cm²:', (respuesta) => {
        const areaObjetivo = parseFloat(respuesta.trim().replace(',', '.'));

        if (Number.isNaN(areaObjetivo) || areaObjetivo <= 0) {
            console.log('\n[Error] Ingresa un número válido mayor que 0.\n');
            rl.close();
            return;
        }

        const datosCalculados = calcularGeometriaCompleta(areaObjetivo);
        mostrarResultados(datosCalculados);
        rl.close();
    });
}

iniciarPrograma();