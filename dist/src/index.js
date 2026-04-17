import { CanvasLocal } from './canvasLocal.js';
const canvas = document.getElementById('circlechart');
const graphics = canvas.getContext('2d');
const inputDatos = document.getElementById('datosGrafica');
const boton = document.getElementById('btnDibujar');
const miCanvas = new CanvasLocal(graphics, canvas);
// Ahora el paint se ejecuta cuando el usuario hace clic
boton.addEventListener('click', () => {
    const valoresTexto = inputDatos.value;
    if (valoresTexto.trim() === "") {
        alert("Por favor ingresa algunos números");
        return;
    }
    // Convertimos el string en un array de números
    const h = valoresTexto.split(',').map(val => Number(val.trim()));
    // Validamos que sean números válidos
    if (h.some(isNaN)) {
        alert("Asegúrate de ingresar solo números separados por comas");
        return;
    }
    miCanvas.paint(h); // Le pasamos los datos al paint
});
