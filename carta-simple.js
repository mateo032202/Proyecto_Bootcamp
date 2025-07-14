/**
 * Animación simplificada y corregida de cartas
 */

console.log('🎭 Animación de cartas SIMPLIFICADA cargada');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando animaciones de cartas');
    
    // Esperar un poco para que todo se cargue
    setTimeout(function() {
        inicializarAnimaciones();
    }, 500);
});

function inicializarAnimaciones() {
    const sobres = document.querySelectorAll('.sobre-cerrado');
    console.log(`📨 Encontrados ${sobres.length} sobres`);
    
    sobres.forEach((sobre, index) => {
        // Limpiar listeners previos
        if (sobre.dataset.configured) return;
        sobre.dataset.configured = 'true';
        
        sobre.style.cursor = 'pointer';
        
        sobre.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`🎯 Click en sobre ${index + 1}`);
            
            // Evitar múltiples animaciones
            if (document.querySelector('.carta-expandida')) {
                console.log('⏸️ Ya hay una animación en curso');
                return;
            }
            
            animarCarta(sobre, index);
        });
    });
}

function animarCarta(sobre, index) {
    console.log(`🎬 Iniciando animación de carta ${index + 1}`);
    
    // Obtener contenido
    const carta = sobre.querySelector('.carta-contenido');
    if (!carta) {
        console.error('❌ No se encontró .carta-contenido');
        return;
    }
    
    const foreignObject = carta.querySelector('foreignObject div');
    const firmaText = sobre.querySelector('text');
    
    let contenido = '';
    let firma = '';
    
    if (foreignObject) {
        contenido = foreignObject.textContent.trim();
    }
    
    if (firmaText) {
        firma = firmaText.textContent.trim();
    }
    
    console.log('📝 Contenido:', contenido);
    console.log('✍️ Firma:', firma);
    
    // Crear carta animada
    const cartaDiv = document.createElement('div');
    cartaDiv.className = 'carta-expandida';
    cartaDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            max-height: 400px;
            overflow-y: auto;
            font-family: 'Quicksand', sans-serif;
        ">
            <h3 style="margin-top: 0; color: #5d4e6d; text-align: center;">${firma}</h3>
            <p style="line-height: 1.6; color: #333; text-align: center;">"${contenido}"</p>
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="cerrarCarta()" style="
                    background: #5d4e6d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                ">Cerrar</button>
            </div>
        </div>
        <div onclick="cerrarCarta()" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            cursor: pointer;
        "></div>
    `;
    
    document.body.appendChild(cartaDiv);
    console.log('✅ Carta mostrada');
}

function cerrarCarta() {
    const carta = document.querySelector('.carta-expandida');
    if (carta) {
        carta.remove();
        console.log('🗑️ Carta cerrada');
    }
}

// Hacer la función global para el botón
window.cerrarCarta = cerrarCarta;
