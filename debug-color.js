// === SCRIPT DE DEBUGGING PARA COLOR DE SOBRES ===
// Ejecutar este script en la consola del navegador para diagnosticar problemas

console.log('🔧 === INICIANDO DIAGNÓSTICO DE COLOR DE SOBRES ===');

function diagnosticarColorSobres() {
    console.log('\n🔍 === DIAGNÓSTICO GENERAL ===');
    
    // Verificar elementos del formulario
    const form = document.getElementById('testimonio-form');
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColor = document.querySelector('.color-option.selected');
    const colorText = document.querySelector('.color-selected-text');
    
    console.log('Formulario encontrado:', form ? '✅' : '❌');
    console.log('Opciones de color encontradas:', colorOptions.length);
    console.log('Color seleccionado:', selectedColor ? selectedColor.dataset.color : 'ninguno');
    console.log('Texto de color:', colorText ? colorText.textContent : 'no encontrado');
    
    // Verificar sobres existentes
    const sobres = document.querySelectorAll('.testimonio-carta-wrapper');
    console.log('Sobres existentes:', sobres.length);
    
    // Verificar gradientes
    const gradientes = document.querySelectorAll('linearGradient[id*="gradienteCuerpo"]');
    console.log('Gradientes de cuerpo encontrados:', gradientes.length);
    
    gradientes.forEach((gradiente, index) => {
        const stops = gradiente.querySelectorAll('stop');
        console.log(`Gradiente ${index + 1} (${gradiente.id}):`, 
            stops.length > 0 ? stops[0].getAttribute('stop-color') : 'sin stops');
    });
}

function probarSeleccionColor(color) {
    console.log('\n🎨 === PROBANDO SELECCIÓN DE COLOR ===');
    console.log('Color a probar:', color);
    
    const colorOption = document.querySelector(`[data-color="${color}"]`);
    if (colorOption) {
        console.log('✅ Opción de color encontrada');
        colorOption.click();
        console.log('🖱️ Click simulado en la opción');
        
        setTimeout(() => {
            const selected = document.querySelector('.color-option.selected');
            console.log('Color seleccionado después del click:', 
                selected ? selected.dataset.color : 'ninguno');
        }, 100);
    } else {
        console.log('❌ Opción de color no encontrada');
    }
}

function simularCreacionTestimonio() {
    console.log('\n🎭 === SIMULANDO CREACIÓN DE TESTIMONIO ===');
    
    // Rellenar formulario
    const nombre = document.getElementById('testimonio-nombre');
    const texto = document.getElementById('testimonio-texto');
    const colorFirma = document.getElementById('testimonio-color');
    
    if (nombre && texto && colorFirma) {
        nombre.value = 'Usuario de Prueba';
        texto.value = 'Este es un testimonio de prueba para verificar que el color del sobre se aplique correctamente.';
        colorFirma.value = '#ff0000';
        
        console.log('✅ Formulario rellenado con datos de prueba');
        
        // Seleccionar un color
        const colorVerde = document.querySelector('[data-color="#E8F5E8"]');
        if (colorVerde) {
            colorVerde.click();
            console.log('✅ Color verde seleccionado');
        }
        
        console.log('📝 Ahora haz click en "Crear Testimonio" para completar la prueba');
        
    } else {
        console.log('❌ No se pudieron encontrar los campos del formulario');
    }
}

function verificarColoresEnSobres() {
    console.log('\n🔍 === VERIFICANDO COLORES EN SOBRES EXISTENTES ===');
    
    const sobres = document.querySelectorAll('.testimonio-carta-wrapper svg');
    sobres.forEach((svg, index) => {
        const gradiente = svg.querySelector('linearGradient[id*="gradienteCuerpo"]');
        const rectangulo = svg.querySelector('rect[width="240"][height="140"]');
        
        console.log(`\nSobre ${index + 1}:`);
        
        if (gradiente) {
            const stops = gradiente.querySelectorAll('stop');
            console.log('  Gradiente ID:', gradiente.id);
            stops.forEach((stop, stopIndex) => {
                console.log(`  Stop ${stopIndex}: ${stop.getAttribute('stop-color')}`);
            });
        }
        
        if (rectangulo) {
            console.log('  Rectángulo fill:', rectangulo.getAttribute('fill'));
        }
    });
}

function forzarAplicacionColor(color) {
    console.log('\n🔧 === FORZANDO APLICACIÓN DE COLOR ===');
    console.log('Color a aplicar:', color);
    
    const ultimoSobre = document.querySelector('.testimonio-carta-wrapper:last-child svg');
    if (ultimoSobre) {
        // Método 1: Gradiente
        const gradiente = ultimoSobre.querySelector('linearGradient[id*="gradienteCuerpo"]');
        if (gradiente) {
            const stops = gradiente.querySelectorAll('stop');
            if (stops.length >= 2) {
                stops[0].setAttribute('stop-color', color);
                stops[1].setAttribute('stop-color', adjustBrightness(color, -10));
                console.log('✅ Color aplicado al gradiente');
            }
        }
        
        // Método 2: Rectángulo directo
        const rectangulos = ultimoSobre.querySelectorAll('rect[width="240"][height="140"]');
        rectangulos.forEach((rect, index) => {
            rect.setAttribute('fill', color);
            console.log(`✅ Color aplicado al rectángulo ${index + 1}`);
        });
        
    } else {
        console.log('❌ No se encontró el último sobre');
    }
}

// Función auxiliar copiada de main.js
function adjustBrightness(hex, percent) {
    if (!hex || hex.length !== 7 || !hex.startsWith('#')) {
        console.warn('Color hexadecimal inválido:', hex);
        return hex;
    }
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const newR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const newG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const newB = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    const toHex = (n) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

// Exportar funciones al objeto global para uso en consola
window.debugColor = {
    diagnosticar: diagnosticarColorSobres,
    probarColor: probarSeleccionColor,
    simular: simularCreacionTestimonio,
    verificar: verificarColoresEnSobres,
    forzar: forzarAplicacionColor
};

console.log('✅ Script de debugging cargado');
console.log('\n📋 Comandos disponibles:');
console.log('- debugColor.diagnosticar() - Diagnóstico general');
console.log('- debugColor.probarColor("#E8F5E8") - Probar selección de color');
console.log('- debugColor.simular() - Simular creación de testimonio');
console.log('- debugColor.verificar() - Verificar colores en sobres');
console.log('- debugColor.forzar("#FFE8F0") - Forzar color en último sobre');

// Ejecutar diagnóstico inicial
diagnosticarColorSobres();
