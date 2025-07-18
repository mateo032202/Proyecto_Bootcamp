// Script de prueba para verificar la funcionalidad de creación de testimonios

console.log('🧪 INICIANDO PRUEBAS DE CREACIÓN DE TESTIMONIOS');

// Función para verificar elementos del formulario
function verificarElementosFormulario() {
    console.log('\n🔍 VERIFICANDO ELEMENTOS DEL FORMULARIO...');
    
    const elementos = {
        'Formulario': document.getElementById('testimonio-form'),
        'Campo nombre': document.getElementById('testimonio-nombre'),
        'Campo texto': document.getElementById('testimonio-texto'),
        'Campo color firma': document.getElementById('testimonio-color'),
        'Contador caracteres': document.querySelector('.char-counter'),
        'Paleta de colores': document.querySelector('.color-palette'),
        'Texto color seleccionado': document.querySelector('.color-selected-text')
    };
    
    let todosPresentes = true;
    
    Object.entries(elementos).forEach(([nombre, elemento]) => {
        const presente = elemento !== null;
        console.log(`   ${presente ? '✅' : '❌'} ${nombre}: ${presente ? 'Encontrado' : 'NO ENCONTRADO'}`);
        if (!presente) todosPresentes = false;
    });
    
    return todosPresentes;
}

// Función para verificar opciones de color
function verificarPaletaColores() {
    console.log('\n🎨 VERIFICANDO PALETA DE COLORES...');
    
    const colorOptions = document.querySelectorAll('.color-option');
    console.log(`   📊 Total opciones de color: ${colorOptions.length}`);
    
    if (colorOptions.length === 0) {
        console.error('   ❌ No se encontraron opciones de color');
        return false;
    }
    
    // Verificar que cada opción tenga el atributo data-color
    let opcionesValidas = 0;
    colorOptions.forEach((option, index) => {
        const color = option.dataset.color;
        const titulo = option.title;
        const seleccionada = option.classList.contains('selected');
        
        if (color) {
            opcionesValidas++;
            console.log(`   🎯 Opción ${index + 1}: ${color} (${titulo}) ${seleccionada ? '[SELECCIONADA]' : ''}`);
        } else {
            console.warn(`   ⚠️ Opción ${index + 1} sin data-color`);
        }
    });
    
    console.log(`   ✅ Opciones válidas: ${opcionesValidas}/${colorOptions.length}`);
    return opcionesValidas > 0;
}

// Función para probar selección de colores
function probarSeleccionColor() {
    console.log('\n🧪 PROBANDO SELECCIÓN DE COLORES...');
    
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (colorOptions.length === 0) {
        console.error('   ❌ No hay opciones de color para probar');
        return;
    }
    
    // Probar seleccionar diferentes colores
    const coloresPrueba = ['#E8F5E8', '#FFE8F0', '#F0E8FF'];
    
    coloresPrueba.forEach((colorPrueba, index) => {
        const opcion = document.querySelector(`.color-option[data-color="${colorPrueba}"]`);
        
        if (opcion) {
            console.log(`   🎯 Probando selección de ${colorPrueba}...`);
            
            // Simular click
            opcion.click();
            
            // Verificar que se seleccionó
            setTimeout(() => {
                const seleccionada = opcion.classList.contains('selected');
                console.log(`   ${seleccionada ? '✅' : '❌'} Color ${colorPrueba} ${seleccionada ? 'seleccionado correctamente' : 'NO se seleccionó'}`);
            }, 100 * (index + 1));
        } else {
            console.warn(`   ⚠️ No se encontró opción para color ${colorPrueba}`);
        }
    });
}

// Función para probar creación de testimonio
function probarCreacionTestimonio() {
    console.log('\n🧪 PROBANDO CREACIÓN DE TESTIMONIO...');
    
    // Datos de prueba
    const datosPrueba = {
        nombre: 'Usuario Prueba',
        texto: 'Este es un testimonio de prueba para verificar que la funcionalidad funciona correctamente.',
        colorFirma: '#333333',
        colorSobre: '#E8F5E8' // Verde pastel
    };
    
    // Verificar que la función esté disponible
    if (typeof crearNuevoTestimonio === 'function') {
        console.log('   ✅ Función crearNuevoTestimonio disponible');
        
        // Seleccionar color del sobre primero
        const opcionColor = document.querySelector(`.color-option[data-color="${datosPrueba.colorSobre}"]`);
        if (opcionColor) {
            opcionColor.click();
            console.log(`   🎨 Color del sobre seleccionado: ${datosPrueba.colorSobre}`);
        }
        
        // Intentar crear testimonio
        try {
            console.log('   🚀 Intentando crear testimonio...');
            crearNuevoTestimonio(
                datosPrueba.nombre, 
                datosPrueba.texto, 
                datosPrueba.colorFirma, 
                datosPrueba.colorSobre
            );
            console.log('   ✅ Testimonio creado sin errores');
        } catch (error) {
            console.error('   ❌ Error creando testimonio:', error);
        }
    } else {
        console.error('   ❌ Función crearNuevoTestimonio NO disponible');
    }
}

// Función para llenar y enviar formulario automáticamente
function probarFormularioCompleto() {
    console.log('\n🧪 PROBANDO FORMULARIO COMPLETO...');
    
    const form = document.getElementById('testimonio-form');
    
    if (!form) {
        console.error('   ❌ Formulario no encontrado');
        return;
    }
    
    // Llenar campos
    const campoNombre = document.getElementById('testimonio-nombre');
    const campoTexto = document.getElementById('testimonio-texto');
    const campoColor = document.getElementById('testimonio-color');
    
    if (campoNombre) {
        campoNombre.value = 'Usuario Formulario';
        console.log('   ✅ Campo nombre llenado');
    }
    
    if (campoTexto) {
        campoTexto.value = 'Este testimonio fue creado mediante el formulario para probar la funcionalidad completa.';
        console.log('   ✅ Campo texto llenado');
        
        // Disparar evento input para actualizar contador
        campoTexto.dispatchEvent(new Event('input'));
    }
    
    if (campoColor) {
        campoColor.value = '#0066cc';
        console.log('   ✅ Campo color llenado');
    }
    
    // Seleccionar color del sobre
    const opcionColor = document.querySelector('.color-option[data-color="#FFE8F0"]'); // Rosa pastel
    if (opcionColor) {
        opcionColor.click();
        console.log('   ✅ Color del sobre seleccionado');
    }
    
    // Enviar formulario
    console.log('   📝 Enviando formulario...');
    form.dispatchEvent(new Event('submit'));
}

// Funciones disponibles
console.log(`
🛠️ FUNCIONES DE PRUEBA DISPONIBLES:

1. verificarElementosFormulario() - Verificar que todos los elementos estén presentes
2. verificarPaletaColores() - Verificar opciones de la paleta de colores
3. probarSeleccionColor() - Probar selección de diferentes colores
4. probarCreacionTestimonio() - Probar creación directa de testimonio
5. probarFormularioCompleto() - Llenar y enviar formulario automáticamente

💡 Ejecuta cualquier función copiando su nombre en la consola
`);

// Auto-ejecutar verificación inicial
console.log('\n🚀 EJECUTANDO VERIFICACIÓN INICIAL...');
setTimeout(() => {
    verificarElementosFormulario();
    verificarPaletaColores();
}, 1000);
