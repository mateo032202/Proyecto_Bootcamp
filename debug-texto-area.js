// Script para probar y verificar que el texto se mantenga dentro del cuadrado morado

console.log('🔍 INICIANDO PRUEBAS DE ÁREA DE TEXTO');

// Función para crear un testimonio de prueba con diferentes longitudes de texto
function probarTextoEnArea() {
    const testimoniosPrueba = [
        {
            nombre: "Usuario Test 1",
            texto: "Este es un texto corto para probar que se mantenga dentro del área.",
            color: "#E8F5E8"
        },
        {
            nombre: "Usuario Test 2", 
            texto: "Este es un texto un poco más largo para verificar que el sistema ajuste correctamente el tamaño de fuente y se mantenga dentro de los límites del cuadrado morado sin desbordarse.",
            color: "#FFE8F0"
        },
        {
            nombre: "Usuario Test 3",
            texto: "Este es un texto extremadamente largo que está diseñado específicamente para probar los límites del sistema de ajuste automático de texto. El objetivo es verificar que incluso con contenido muy extenso, el texto se mantenga completamente dentro del área designada sin desbordarse fuera del cuadrado morado. Esto es crucial para mantener la integridad visual del diseño.",
            color: "#E8F0FF"
        }
    ];
    
    console.log('📝 Creando testimonios de prueba...');
    
    testimoniosPrueba.forEach((testimonio, index) => {
        setTimeout(() => {
            console.log(`\n🧪 PRUEBA ${index + 1}: ${testimonio.texto.length} caracteres`);
            
            // Simular la creación de testimonio
            if (typeof crearNuevoTestimonio === 'function') {
                crearNuevoTestimonio(testimonio.nombre, testimonio.texto, '#333333', testimonio.color);
            } else {
                console.error('❌ Función crearNuevoTestimonio no disponible');
            }
        }, index * 1000);
    });
}

// Función para verificar todos los testimonios existentes
function verificarTodosLosTextos() {
    console.log('\n🔍 VERIFICANDO TODOS LOS TESTIMONIOS EXISTENTES...');
    
    const todosLosTestimonios = document.querySelectorAll('.testimonio-carta-wrapper');
    console.log(`📊 Total de testimonios encontrados: ${todosLosTestimonios.length}`);
    
    todosLosTestimonios.forEach((testimonio, index) => {
        const foreignObject = testimonio.querySelector('foreignObject');
        const contenidoDiv = testimonio.querySelector('foreignObject div');
        
        if (foreignObject && contenidoDiv) {
            const ancho = parseInt(foreignObject.getAttribute('width') || '0');
            const alto = parseInt(foreignObject.getAttribute('height') || '0');
            const x = parseInt(foreignObject.getAttribute('x') || '0');
            const y = parseInt(foreignObject.getAttribute('y') || '0');
            
            const texto = contenidoDiv.textContent || '';
            const fontSize = contenidoDiv.style.fontSize || 'no definido';
            
            console.log(`\n📋 TESTIMONIO ${index + 1}:`);
            console.log(`   📐 Posición: x=${x}, y=${y}`);
            console.log(`   📏 Dimensiones: ${ancho}x${alto}px`);
            console.log(`   📝 Texto: ${texto.length} caracteres`);
            console.log(`   🔤 Font size: ${fontSize}`);
            
            // Verificar si está en la posición correcta (dentro del cuadrado morado)
            const posicionCorrecta = (x >= 85 && x <= 95) && (y >= 140 && y <= 150);
            const tamañoCorrecto = ancho === 200 && alto === 80;
            
            if (posicionCorrecta && tamañoCorrecto) {
                console.log(`   ✅ POSICIÓN Y TAMAÑO CORRECTOS`);
            } else {
                console.log(`   ⚠️ NECESITA AJUSTE: posición=${posicionCorrecta}, tamaño=${tamañoCorrecto}`);
                
                // Aplicar corrección automática
                foreignObject.setAttribute('x', '90');
                foreignObject.setAttribute('y', '145');
                foreignObject.setAttribute('width', '200');
                foreignObject.setAttribute('height', '80');
                console.log(`   🔧 CORRECCIÓN APLICADA`);
            }
            
            // Verificar desbordamiento
            if (contenidoDiv.scrollHeight > contenidoDiv.clientHeight) {
                console.log(`   ⚠️ POSIBLE DESBORDAMIENTO detectado`);
                
                // Aplicar ajuste de emergencia
                const currentSize = parseFloat(contenidoDiv.style.fontSize) || 10;
                const newSize = Math.max(5, currentSize - 1);
                contenidoDiv.style.fontSize = newSize + 'px';
                contenidoDiv.style.lineHeight = '0.9';
                console.log(`   🔧 AJUSTE DE EMERGENCIA: ${newSize}px`);
            }
        }
    });
}

// Función para aplicar dimensiones correctas a todos los testimonios
function corregirTodasLasDimensiones() {
    console.log('\n🔧 APLICANDO CORRECCIÓN MASIVA DE DIMENSIONES...');
    
    const todosLosTestimonios = document.querySelectorAll('.testimonio-carta-wrapper');
    
    todosLosTestimonios.forEach((testimonio, index) => {
        const foreignObject = testimonio.querySelector('foreignObject');
        const contenidoDiv = testimonio.querySelector('foreignObject div');
        
        if (foreignObject && contenidoDiv) {
            // Aplicar dimensiones fijas correctas
            foreignObject.setAttribute('x', '90');
            foreignObject.setAttribute('y', '145');
            foreignObject.setAttribute('width', '200');
            foreignObject.setAttribute('height', '80');
            
            // Aplicar estilos restrictivos al contenido
            contenidoDiv.style.width = '100%';
            contenidoDiv.style.height = '100%';
            contenidoDiv.style.maxWidth = '100%';
            contenidoDiv.style.maxHeight = '100%';
            contenidoDiv.style.overflow = 'hidden';
            contenidoDiv.style.boxSizing = 'border-box';
            contenidoDiv.style.display = 'flex';
            contenidoDiv.style.alignItems = 'center';
            contenidoDiv.style.justifyContent = 'center';
            contenidoDiv.style.textAlign = 'center';
            contenidoDiv.style.padding = '4px';
            contenidoDiv.style.margin = '0';
            
            // Ajustar tamaño de fuente según longitud del texto
            const texto = contenidoDiv.textContent || '';
            let fontSize;
            
            if (texto.length <= 80) {
                fontSize = '9px';
            } else if (texto.length <= 120) {
                fontSize = '8px';
            } else if (texto.length <= 160) {
                fontSize = '7px';
            } else if (texto.length <= 200) {
                fontSize = '6px';
            } else {
                fontSize = '5px';
            }
            
            contenidoDiv.style.fontSize = fontSize;
            contenidoDiv.style.lineHeight = '1.1';
            
            console.log(`✅ Testimonio ${index + 1} corregido: ${texto.length} chars, ${fontSize}`);
        }
    });
    
    console.log('✅ CORRECCIÓN MASIVA COMPLETADA');
}

// Función para mostrar el área de prueba visual
function mostrarAreaPrueba() {
    console.log('\n🎯 CREANDO MARCADOR VISUAL DEL ÁREA CORRECTA...');
    
    // Crear un div temporal para mostrar el área exacta donde debe estar el texto
    const marcador = document.createElement('div');
    marcador.id = 'marcador-area-texto';
    marcador.style.position = 'fixed';
    marcador.style.border = '2px solid red';
    marcador.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    marcador.style.width = '200px';
    marcador.style.height = '80px';
    marcador.style.zIndex = '9999';
    marcador.style.pointerEvents = 'none';
    marcador.textContent = 'ÁREA CORRECTA DEL TEXTO';
    marcador.style.fontSize = '10px';
    marcador.style.color = 'red';
    marcador.style.textAlign = 'center';
    marcador.style.lineHeight = '80px';
    
    document.body.appendChild(marcador);
    
    console.log('🔴 Marcador rojo agregado temporalmente');
    console.log('💡 Posiciona este marcador sobre el cuadrado morado de un testimonio para verificar');
    
    // Remover el marcador después de 10 segundos
    setTimeout(() => {
        if (document.getElementById('marcador-area-texto')) {
            document.getElementById('marcador-area-texto').remove();
            console.log('🗑️ Marcador removido');
        }
    }, 10000);
}

// Funciones disponibles para usar en la consola
console.log(`
🛠️ FUNCIONES DISPONIBLES:

1. probarTextoEnArea() - Crear testimonios de prueba con diferentes longitudes
2. verificarTodosLosTextos() - Verificar y ajustar todos los testimonios existentes  
3. corregirTodasLasDimensiones() - Aplicar corrección masiva de dimensiones
4. mostrarAreaPrueba() - Mostrar marcador visual del área correcta

💡 Uso: Simplemente copia y pega el nombre de la función en la consola
`);

// Auto-ejecutar verificación inicial
setTimeout(() => {
    verificarTodosLosTextos();
}, 1000);
