// === SCRIPT DE DEBUG ESPECÍFICO PARA SOLAPA ===
window.debugSolapa = {
    
    // Función para diagnosticar todos los elementos de la solapa
    diagnosticar: function() {
        console.log('🔍 === DIAGNÓSTICO DE SOLAPA ===');
        
        const sobres = document.querySelectorAll('.testimonio-carta-wrapper svg');
        console.log(`📦 Total de sobres encontrados: ${sobres.length}`);
        
        sobres.forEach((svg, index) => {
            console.log(`\n🔍 --- SOBRE ${index + 1} ---`);
            
            // Buscar gradientes de tapa
            const gradientesTapa = svg.querySelectorAll('linearGradient[id*="gradienteTapa"]');
            console.log(`🎨 Gradientes de tapa: ${gradientesTapa.length}`);
            gradientesTapa.forEach((grad, i) => {
                const stops = grad.querySelectorAll('stop');
                console.log(`  Gradiente ${i + 1} (${grad.id}): ${stops.length} stops`);
                stops.forEach((stop, j) => {
                    console.log(`    Stop ${j + 1}: ${stop.getAttribute('stop-color')}`);
                });
            });
            
            // Buscar polígonos de solapa
            const poligonosSolapa = svg.querySelectorAll('polygon[points*="80,120 200,200 320,120"]');
            console.log(`📐 Polígonos de solapa: ${poligonosSolapa.length}`);
            poligonosSolapa.forEach((pol, i) => {
                console.log(`  Polígono ${i + 1}: fill="${pol.getAttribute('fill')}"`);
            });
            
            // Buscar clase solapa-sobre
            const solapaSobre = svg.querySelectorAll('.solapa-sobre');
            console.log(`🏷️ Elementos con clase 'solapa-sobre': ${solapaSobre.length}`);
        });
        
        console.log('\n✅ Diagnóstico de solapa completado');
    },
    
    // Función para aplicar color específico a todas las solapas
    aplicarColorSolapa: function(color) {
        console.log(`🎨 Aplicando color ${color} a todas las solapas...`);
        
        const sobres = document.querySelectorAll('.testimonio-carta-wrapper svg');
        let aplicaciones = 0;
        
        sobres.forEach((svg, index) => {
            // Método 1: Gradientes de tapa
            const gradientesTapa = svg.querySelectorAll('linearGradient[id*="gradienteTapa"]');
            gradientesTapa.forEach((gradiente) => {
                const stops = gradiente.querySelectorAll('stop');
                if (stops.length >= 2) {
                    const colorSolapa = this.adjustBrightness(color, -5);
                    const colorSolapaOscuro = this.adjustBrightness(color, -15);
                    stops[0].setAttribute('stop-color', colorSolapa);
                    stops[1].setAttribute('stop-color', colorSolapaOscuro);
                    aplicaciones++;
                    console.log(`✅ Sobre ${index + 1} - Gradiente tapa actualizado`);
                }
            });
            
            // Método 2: Polígonos directos
            const poligonosSolapa = svg.querySelectorAll('polygon[points*="80,120 200,200 320,120"]');
            poligonosSolapa.forEach((poligono) => {
                const colorSolapa = this.adjustBrightness(color, -5);
                poligono.setAttribute('fill', colorSolapa);
                poligono.style.setProperty('fill', colorSolapa, 'important');
                aplicaciones++;
                console.log(`✅ Sobre ${index + 1} - Polígono solapa actualizado`);
            });
        });
        
        console.log(`✅ Color aplicado a ${aplicaciones} elementos de solapa`);
    },
    
    // Función para aplicar color solo al último sobre creado
    aplicarColorUltimaSolapa: function(color) {
        console.log(`🎯 Aplicando color ${color} a la última solapa creada...`);
        
        const sobres = document.querySelectorAll('.testimonio-carta-wrapper');
        if (sobres.length === 0) {
            console.log('❌ No se encontraron sobres');
            return;
        }
        
        const ultimoSobre = sobres[sobres.length - 1];
        const svg = ultimoSobre.querySelector('svg');
        
        if (!svg) {
            console.log('❌ No se encontró SVG en el último sobre');
            return;
        }
        
        let aplicaciones = 0;
        
        // Aplicar a gradientes de tapa
        const gradientesTapa = svg.querySelectorAll('linearGradient[id*="gradienteTapa"]');
        gradientesTapa.forEach((gradiente) => {
            const stops = gradiente.querySelectorAll('stop');
            if (stops.length >= 2) {
                const colorSolapa = this.adjustBrightness(color, -5);
                const colorSolapaOscuro = this.adjustBrightness(color, -15);
                stops[0].setAttribute('stop-color', colorSolapa);
                stops[1].setAttribute('stop-color', colorSolapaOscuro);
                aplicaciones++;
            }
        });
        
        // Aplicar a polígonos
        const poligonosSolapa = svg.querySelectorAll('polygon[points*="80,120 200,200 320,120"]');
        poligonosSolapa.forEach((poligono) => {
            const colorSolapa = this.adjustBrightness(color, -5);
            poligono.setAttribute('fill', colorSolapa);
            poligono.style.setProperty('fill', colorSolapa, 'important');
            aplicaciones++;
        });
        
        console.log(`✅ Color aplicado a ${aplicaciones} elementos de la última solapa`);
    },
    
    // Función para probar diferentes colores en la solapa
    probarColores: function() {
        const colores = [
            '#E8F5E8', // Verde Pastel
            '#E8F0FF', // Azul Pastel
            '#FFE8F0', // Rosa Pastel
            '#FFF8E8', // Amarillo Pastel
            '#F0E8FF'  // Lavanda Pastel
        ];
        
        console.log('🧪 Probando diferentes colores en solapas...');
        
        let indice = 0;
        const intervalo = setInterval(() => {
            if (indice >= colores.length) {
                clearInterval(intervalo);
                console.log('✅ Prueba de colores completada');
                return;
            }
            
            const color = colores[indice];
            console.log(`🎨 Probando color: ${color}`);
            this.aplicarColorUltimaSolapa(color);
            indice++;
        }, 2000);
    },
    
    // Función auxiliar para ajustar brillo
    adjustBrightness: function(hex, percent) {
        if (!hex || hex.length !== 7 || !hex.startsWith('#')) {
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
    },
    
    // Función para resetear todas las solapas al color original
    resetear: function() {
        console.log('🔄 Reseteando todas las solapas al color original...');
        
        const sobres = document.querySelectorAll('.testimonio-carta-wrapper svg');
        
        sobres.forEach((svg, index) => {
            // Resetear gradientes
            const gradientesTapa = svg.querySelectorAll('linearGradient[id*="gradienteTapa"]');
            gradientesTapa.forEach((gradiente) => {
                const stops = gradiente.querySelectorAll('stop');
                if (stops.length >= 2) {
                    stops[0].setAttribute('stop-color', '#e8e8e8');
                    stops[1].setAttribute('stop-color', '#d5d5d5');
                }
            });
            
            // Resetear polígonos
            const poligonosSolapa = svg.querySelectorAll('polygon[points*="80,120 200,200 320,120"]');
            poligonosSolapa.forEach((poligono) => {
                poligono.removeAttribute('style');
                const gradiente = svg.querySelector('linearGradient[id*="gradienteTapa"]');
                if (gradiente) {
                    poligono.setAttribute('fill', `url(#${gradiente.id})`);
                }
            });
            
            console.log(`✅ Sobre ${index + 1} reseteado`);
        });
        
        console.log('✅ Reset completado');
    }
};

// Inicialización automática
console.log('🔧 Script de debug de solapa cargado');
console.log('📝 Comandos disponibles:');
console.log('  debugSolapa.diagnosticar() - Diagnosticar elementos de solapa');
console.log('  debugSolapa.aplicarColorSolapa("#FFE8F0") - Aplicar color a todas las solapas');
console.log('  debugSolapa.aplicarColorUltimaSolapa("#E8F5E8") - Aplicar color a la última solapa');
console.log('  debugSolapa.probarColores() - Probar diferentes colores automáticamente');
console.log('  debugSolapa.resetear() - Resetear todas las solapas al color original');
