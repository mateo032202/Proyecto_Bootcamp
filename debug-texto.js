// === SCRIPT DE PRUEBA PARA AJUSTE DE TEXTO ===
window.testTexto = {
    
    // Función para probar diferentes longitudes de texto
    probarLongitudes: function() {
        console.log('📝 === PRUEBA DE AJUSTE DE TEXTO ===');
        
        const textosPrueba = [
            {
                nombre: "Texto Corto",
                contenido: "Este es un testimonio corto.",
                longitud: "short"
            },
            {
                nombre: "Texto Medio",
                contenido: "Este es un testimonio de longitud media que contiene más palabras y debería ajustarse correctamente dentro del área disponible.",
                longitud: "medium"
            },
            {
                nombre: "Texto Largo",
                contenido: "Este es un testimonio considerablemente más largo que contiene muchas más palabras y frases completas para probar cómo se ajusta el texto cuando hay mucho contenido que mostrar en el espacio limitado.",
                longitud: "long"
            },
            {
                nombre: "Texto Muy Largo",
                contenido: "Este es un testimonio extremadamente largo que contiene una gran cantidad de palabras, frases completas y párrafos enteros para probar exhaustivamente cómo se comporta el sistema de ajuste automático de texto cuando hay muchísimo contenido que debe mostrarse en el espacio muy limitado disponible dentro de la carta del sobre.",
                longitud: "very-long"
            }
        ];
        
        console.log(`🧪 Probando ${textosPrueba.length} casos de prueba...`);
        
        textosPrueba.forEach((prueba, index) => {
            console.log(`\n📄 CASO ${index + 1}: ${prueba.nombre}`);
            console.log(`📏 Longitud: ${prueba.contenido.length} caracteres`);
            console.log(`📝 Contenido: "${prueba.contenido.substring(0, 50)}..."`);
            
            // Simular la lógica de ajuste
            this.simularAjuste(prueba.contenido);
        });
        
        console.log('\n✅ Prueba de longitudes completada');
    },
    
    // Función para simular el ajuste de texto
    simularAjuste: function(texto) {
        const longitudTexto = texto.length;
        let fontSize, lineHeight, padding, textLengthClass;
        
        if (longitudTexto <= 100) {
            fontSize = '11px';
            lineHeight = '1.4';
            padding = '8px';
            textLengthClass = 'short';
        } else if (longitudTexto <= 150) {
            fontSize = '10px';
            lineHeight = '1.3';
            padding = '6px';
            textLengthClass = 'medium';
        } else if (longitudTexto <= 200) {
            fontSize = '9px';
            lineHeight = '1.2';
            padding = '5px';
            textLengthClass = 'long';
        } else {
            fontSize = '8px';
            lineHeight = '1.1';
            padding = '4px';
            textLengthClass = 'very-long';
        }
        
        console.log(`  🎨 Estilos calculados:`);
        console.log(`    Font Size: ${fontSize}`);
        console.log(`    Line Height: ${lineHeight}`);
        console.log(`    Padding: ${padding}`);
        console.log(`    CSS Class: ${textLengthClass}`);
    },
    
    // Función para probar el ajuste en vivo con un testimonio existente
    probarEnVivo: function(texto) {
        console.log('🎬 Probando ajuste en vivo...');
        
        if (!texto) {
            texto = "Este es un testimonio de prueba para verificar que el texto se ajuste correctamente dentro del área disponible de la carta sin desbordarse.";
        }
        
        console.log(`📝 Texto de prueba: "${texto}"`);
        console.log(`📏 Longitud: ${texto.length} caracteres`);
        
        // Buscar el último testimonio
        const testimonios = document.querySelectorAll('.testimonio-carta-wrapper');
        if (testimonios.length === 0) {
            console.log('❌ No se encontraron testimonios para probar');
            return;
        }
        
        const ultimoTestimonio = testimonios[testimonios.length - 1];
        const contenidoDiv = ultimoTestimonio.querySelector('foreignObject div');
        const foreignObject = ultimoTestimonio.querySelector('foreignObject');
        const cartaContenido = ultimoTestimonio.querySelector('.carta-contenido');
        
        if (!contenidoDiv) {
            console.log('❌ No se encontró contenido div para probar');
            return;
        }
        
        // Aplicar el texto de prueba
        contenidoDiv.textContent = `"${texto}"`;
        
        // Aplicar los ajustes
        this.aplicarAjusteCompleto(contenidoDiv, foreignObject, cartaContenido, texto);
        
        console.log('✅ Ajuste aplicado en vivo');
    },
    
    // Función para aplicar ajuste completo
    aplicarAjusteCompleto: function(contenidoDiv, foreignObject, cartaContenido, texto) {
        const longitudTexto = texto.length;
        let fontSize, lineHeight, padding, textLengthClass;
        
        if (longitudTexto <= 100) {
            fontSize = '11px';
            lineHeight = '1.4';
            padding = '8px';
            textLengthClass = 'short';
        } else if (longitudTexto <= 150) {
            fontSize = '10px';
            lineHeight = '1.3';
            padding = '6px';
            textLengthClass = 'medium';
        } else if (longitudTexto <= 200) {
            fontSize = '9px';
            lineHeight = '1.2';
            padding = '5px';
            textLengthClass = 'long';
        } else {
            fontSize = '8px';
            lineHeight = '1.1';
            padding = '4px';
            textLengthClass = 'very-long';
        }
        
        // Asignar clase CSS
        if (cartaContenido) {
            cartaContenido.setAttribute('data-text-length', textLengthClass);
        }
        
        // Aplicar estilos
        contenidoDiv.style.fontSize = fontSize;
        contenidoDiv.style.lineHeight = lineHeight;
        contenidoDiv.style.padding = padding;
        contenidoDiv.style.overflow = 'hidden';
        contenidoDiv.style.textOverflow = 'ellipsis';
        contenidoDiv.style.wordWrap = 'break-word';
        contenidoDiv.style.hyphens = 'auto';
        contenidoDiv.style.height = '100%';
        contenidoDiv.style.boxSizing = 'border-box';
        
        // Ajustar foreignObject si es necesario
        if (foreignObject && longitudTexto > 150) {
            foreignObject.setAttribute('height', '110');
            foreignObject.setAttribute('y', '135');
        }
        
        console.log(`✅ Ajuste aplicado: ${fontSize}, ${lineHeight}, ${textLengthClass}`);
    },
    
    // Función para diagnosticar problemas de texto
    diagnosticar: function() {
        console.log('🔍 === DIAGNÓSTICO DE TEXTO ===');
        
        const testimonios = document.querySelectorAll('.testimonio-carta-wrapper');
        console.log(`📦 Total de testimonios: ${testimonios.length}`);
        
        testimonios.forEach((testimonio, index) => {
            console.log(`\n📄 --- TESTIMONIO ${index + 1} ---`);
            
            const contenidoDiv = testimonio.querySelector('foreignObject div');
            const foreignObject = testimonio.querySelector('foreignObject');
            const cartaContenido = testimonio.querySelector('.carta-contenido');
            
            if (contenidoDiv) {
                const texto = contenidoDiv.textContent || '';
                const fontSize = contenidoDiv.style.fontSize || '11px';
                const padding = contenidoDiv.style.padding || '8px';
                const longitud = texto.length;
                
                console.log(`📝 Texto: "${texto.substring(0, 50)}..."`);
                console.log(`📏 Longitud: ${longitud} caracteres`);
                console.log(`🎨 Font Size: ${fontSize}`);
                console.log(`📐 Padding: ${padding}`);
                
                if (foreignObject) {
                    const width = foreignObject.getAttribute('width');
                    const height = foreignObject.getAttribute('height');
                    console.log(`📦 Dimensiones: ${width}x${height}`);
                }
                
                if (cartaContenido) {
                    const textClass = cartaContenido.getAttribute('data-text-length');
                    console.log(`🏷️ Clase de texto: ${textClass || 'no asignada'}`);
                }
                
                // Verificar desbordamiento
                if (contenidoDiv.scrollHeight > contenidoDiv.clientHeight) {
                    console.log('⚠️ POSIBLE DESBORDAMIENTO DETECTADO');
                } else {
                    console.log('✅ Texto se ajusta correctamente');
                }
            } else {
                console.log('❌ No se encontró contenido div');
            }
        });
        
        console.log('\n✅ Diagnóstico completado');
    },
    
    // Función para reparar todos los testimonios
    repararTodos: function() {
        console.log('🔧 === REPARANDO TODOS LOS TESTIMONIOS ===');
        
        const testimonios = document.querySelectorAll('.testimonio-carta-wrapper');
        let reparados = 0;
        
        testimonios.forEach((testimonio, index) => {
            const contenidoDiv = testimonio.querySelector('foreignObject div');
            const foreignObject = testimonio.querySelector('foreignObject');
            const cartaContenido = testimonio.querySelector('.carta-contenido');
            
            if (contenidoDiv) {
                const texto = contenidoDiv.textContent.replace(/"/g, '') || '';
                this.aplicarAjusteCompleto(contenidoDiv, foreignObject, cartaContenido, texto);
                reparados++;
                console.log(`✅ Testimonio ${index + 1} reparado`);
            }
        });
        
        console.log(`✅ ${reparados} testimonios reparados`);
    }
};

// Inicialización
console.log('🔧 Script de prueba de texto cargado');
console.log('📝 Comandos disponibles:');
console.log('  testTexto.probarLongitudes() - Probar diferentes longitudes');
console.log('  testTexto.probarEnVivo("tu texto aquí") - Probar en el último testimonio');
console.log('  testTexto.diagnosticar() - Diagnosticar todos los testimonios');
console.log('  testTexto.repararTodos() - Reparar formato de todos los testimonios');
