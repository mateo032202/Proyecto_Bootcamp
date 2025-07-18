// Script de prueba para verificar que el texto se mantenga dentro del cuadrado morado

console.log('🧪 INICIANDO PRUEBAS DE TEXTO EN CUADRADO MORADO');

// Función para verificar todos los testimonios y sus dimensiones
function verificarDimensionesTexto() {
    console.log('\n🔍 VERIFICANDO TESTIMONIOS EXISTENTES...');
    
    const testimonios = document.querySelectorAll('.testimonio-carta-wrapper');
    console.log(`📊 Total testimonios encontrados: ${testimonios.length}`);
    
    testimonios.forEach((testimonio, index) => {
        const foreignObject = testimonio.querySelector('foreignObject');
        const contenido = testimonio.querySelector('.testimonio-contenido');
        
        if (foreignObject && contenido) {
            const x = parseInt(foreignObject.getAttribute('x') || '0');
            const y = parseInt(foreignObject.getAttribute('y') || '0');
            const width = parseInt(foreignObject.getAttribute('width') || '0');
            const height = parseInt(foreignObject.getAttribute('height') || '0');
            
            const texto = contenido.textContent || '';
            const fontSize = contenido.style.fontSize || 'no definido';
            
            console.log(`\n📋 TESTIMONIO ${index + 1}:`);
            console.log(`   📐 Posición: x=${x}, y=${y}`);
            console.log(`   📏 Dimensiones: ${width}x${height}px`);
            console.log(`   📝 Texto: ${texto.length} caracteres`);
            console.log(`   🔤 Font size: ${fontSize}`);
            
            // Verificar si las dimensiones son las correctas para el cuadrado morado
            const dimensionesCorrectas = (
                x >= 95 && x <= 105 &&     // Centrado horizontalmente
                y >= 145 && y <= 155 &&    // Centrado verticalmente
                width === 180 &&           // Ancho correcto
                height === 70              // Altura correcta
            );
            
            if (dimensionesCorrectas) {
                console.log(`   ✅ DIMENSIONES CORRECTAS`);
            } else {
                console.log(`   ⚠️ NECESITA CORRECCIÓN`);
                // Aplicar corrección automática
                foreignObject.setAttribute('x', '100');
                foreignObject.setAttribute('y', '150');
                foreignObject.setAttribute('width', '180');
                foreignObject.setAttribute('height', '70');
                console.log(`   🔧 CORRECCIÓN APLICADA`);
            }
        }
    });
}

// Función para forzar dimensiones correctas en todos los testimonios
function forzarDimensionesCorrectas() {
    console.log('\n🔧 FORZANDO DIMENSIONES CORRECTAS...');
    
    const testimonios = document.querySelectorAll('.testimonio-carta-wrapper');
    
    testimonios.forEach((testimonio, index) => {
        const foreignObject = testimonio.querySelector('foreignObject');
        const contenido = testimonio.querySelector('.testimonio-contenido');
        
        if (foreignObject && contenido) {
            // Aplicar dimensiones fijas para el cuadrado morado
            foreignObject.setAttribute('x', '100');
            foreignObject.setAttribute('y', '150');
            foreignObject.setAttribute('width', '180');
            foreignObject.setAttribute('height', '70');
            
            // Aplicar estilos restrictivos al contenido
            const texto = contenido.textContent || '';
            const longitudTexto = texto.replace(/['"]/g, '').length; // Sin comillas
            
            let fontSize, lineHeight;
            if (longitudTexto <= 80) {
                fontSize = '8px';
                lineHeight = '1.1';
            } else if (longitudTexto <= 120) {
                fontSize = '7px';
                lineHeight = '1.0';
            } else if (longitudTexto <= 160) {
                fontSize = '6px';
                lineHeight = '0.9';
            } else if (longitudTexto <= 200) {
                fontSize = '5px';
                lineHeight = '0.8';
            } else {
                fontSize = '4px';
                lineHeight = '0.7';
            }
            
            // Aplicar estilos
            contenido.style.fontSize = fontSize;
            contenido.style.lineHeight = lineHeight;
            contenido.style.padding = '2px';
            contenido.style.margin = '0';
            contenido.style.overflow = 'hidden';
            contenido.style.textOverflow = 'ellipsis';
            contenido.style.wordWrap = 'break-word';
            contenido.style.width = '100%';
            contenido.style.height = '100%';
            contenido.style.maxWidth = '100%';
            contenido.style.maxHeight = '100%';
            contenido.style.boxSizing = 'border-box';
            contenido.style.display = 'flex';
            contenido.style.alignItems = 'center';
            contenido.style.justifyContent = 'center';
            contenido.style.textAlign = 'center';
            
            // Truncar si es necesario
            if (longitudTexto > 120) {
                contenido.style.webkitLineClamp = '4';
                contenido.style.webkitBoxOrient = 'vertical';
                contenido.style.display = '-webkit-box';
            }
            
            console.log(`✅ Testimonio ${index + 1} ajustado: ${longitudTexto} chars, fontSize=${fontSize}`);
        }
    });
    
    console.log('✅ TODAS LAS DIMENSIONES FORZADAS CORRECTAMENTE');
}

// Función para crear testimonios de prueba con diferentes longitudes
function crearTestimoniosPrueba() {
    console.log('\n🧪 CREANDO TESTIMONIOS DE PRUEBA...');
    
    const testimoniosPrueba = [
        {
            nombre: "Test Corto",
            texto: "Texto corto para verificar dimensiones."
        },
        {
            nombre: "Test Medio",
            texto: "Este es un texto de longitud media para verificar que el sistema de dimensiones funciona correctamente y el texto se mantiene dentro del cuadrado morado."
        },
        {
            nombre: "Test Largo",
            texto: "Este es un texto extremadamente largo diseñado para probar los límites del sistema de ajuste automático. El objetivo es verificar que incluso con contenido muy extenso, el texto se mantenga completamente dentro del área designada del cuadrado morado sin desbordarse nunca hacia afuera de los límites establecidos."
        }
    ];
    
    testimoniosPrueba.forEach((testimonio, index) => {
        setTimeout(() => {
            console.log(`\n🧪 Creando testimonio de prueba ${index + 1}: ${testimonio.texto.length} caracteres`);
            
            // Verificar si la función crearNuevoTestimonio está disponible
            if (typeof crearNuevoTestimonio === 'function') {
                crearNuevoTestimonio(testimonio.nombre, testimonio.texto, '#333333');
                
                // Verificar después de crear
                setTimeout(() => {
                    forzarDimensionesCorrectas();
                }, 500);
            } else {
                console.error('❌ Función crearNuevoTestimonio no disponible');
            }
        }, index * 1000);
    });
}

// Función para mostrar área visual del cuadrado morado
function mostrarAreaCuadradoMorado() {
    console.log('\n🟣 MOSTRANDO ÁREA DEL CUADRADO MORADO...');
    
    // Remover marcador anterior si existe
    const marcadorExistente = document.getElementById('marcador-cuadrado-morado');
    if (marcadorExistente) {
        marcadorExistente.remove();
    }
    
    // Crear marcador visual
    const marcador = document.createElement('div');
    marcador.id = 'marcador-cuadrado-morado';
    marcador.style.position = 'fixed';
    marcador.style.border = '3px solid purple';
    marcador.style.backgroundColor = 'rgba(128, 0, 128, 0.1)';
    marcador.style.width = '180px';
    marcador.style.height = '70px';
    marcador.style.zIndex = '9999';
    marcador.style.pointerEvents = 'none';
    marcador.style.top = '50%';
    marcador.style.left = '50%';
    marcador.style.transform = 'translate(-50%, -50%)';
    marcador.textContent = 'ÁREA CORRECTA 180x70px';
    marcador.style.fontSize = '12px';
    marcador.style.color = 'purple';
    marcador.style.textAlign = 'center';
    marcador.style.lineHeight = '70px';
    marcador.style.fontWeight = 'bold';
    
    document.body.appendChild(marcador);
    
    console.log('🟣 Marcador del cuadrado morado mostrado por 10 segundos');
    console.log('💡 Compara este marcador con el área de texto de los testimonios');
    
    // Remover después de 10 segundos
    setTimeout(() => {
        marcador.remove();
        console.log('🗑️ Marcador removido');
    }, 10000);
}

// Funciones disponibles
console.log(`
🛠️ FUNCIONES DISPONIBLES:

1. verificarDimensionesTexto() - Verificar todos los testimonios existentes
2. forzarDimensionesCorrectas() - Aplicar corrección a todos los testimonios
3. crearTestimoniosPrueba() - Crear testimonios de prueba con diferentes longitudes
4. mostrarAreaCuadradoMorado() - Mostrar marcador visual del área correcta

📝 ESPECIFICACIONES DEL CUADRADO MORADO:
   - Posición: x=100, y=150
   - Dimensiones: 180px × 70px
   - Centrado en el sobre

💡 Ejecuta cualquier función copiando su nombre en la consola
`);

// Auto-ejecutar verificación inicial
console.log('\n🚀 EJECUTANDO VERIFICACIÓN INICIAL...');
setTimeout(() => {
    verificarDimensionesTexto();
}, 1000);
