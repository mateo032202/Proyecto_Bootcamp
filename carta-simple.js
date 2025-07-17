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
    
    // Guardar referencia al sobre original para la animación de regreso
    window.sobreOriginal = sobre;
    
    // Crear carta animada
    const cartaDiv = document.createElement('div');
    cartaDiv.className = 'carta-expandida';
    cartaDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.1);
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            max-height: 400px;
            overflow-y: auto;
            font-family: 'Quicksand', sans-serif;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
                    transition: background 0.2s ease;
                " onmouseover="this.style.background='#4a3f5c'" onmouseout="this.style.background='#5d4e6d'">Cerrar</button>
            </div>
        </div>
        <div onclick="cerrarCarta()" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0);
            z-index: 9999;
            cursor: pointer;
            transition: background 0.3s ease;
        "></div>
    `;
    
    document.body.appendChild(cartaDiv);
    
    // Animar la aparición
    setTimeout(() => {
        const cartaContent = cartaDiv.querySelector('div[style*="position: fixed"][style*="background: white"]');
        const background = cartaDiv.querySelector('div[style*="background: rgba(0,0,0,0)"]');
        
        if (cartaContent) {
            cartaContent.style.transform = 'translate(-50%, -50%) scale(1)';
            cartaContent.style.opacity = '1';
        }
        
        if (background) {
            background.style.background = 'rgba(0,0,0,0.5)';
        }
    }, 10);
    
    console.log('✅ Carta mostrada');
}

function cerrarCarta() {
    const carta = document.querySelector('.carta-expandida');
    if (carta) {
        console.log('🗑️ Iniciando animación de cierre estilo Windows 11 hacia el sobre');
        
        // Obtener el contenido de la carta para animar
        const cartaContent = carta.querySelector('div[style*="position: fixed"]');
        
        if (cartaContent && window.sobreOriginal) {
            // Obtener la posición del sobre original
            const sobreRect = window.sobreOriginal.getBoundingClientRect();
            const sobreCenterX = sobreRect.left + sobreRect.width / 2;
            const sobreCenterY = sobreRect.top + sobreRect.height / 2;
            
            // Calcular la posición relativa al centro de la ventana
            const windowCenterX = window.innerWidth / 2;
            const windowCenterY = window.innerHeight / 2;
            
            // Calcular el desplazamiento necesario
            const deltaX = sobreCenterX - windowCenterX;
            const deltaY = sobreCenterY - windowCenterY;
            
            console.log(`📍 Minimizando hacia: X=${deltaX}px, Y=${deltaY}px`);
            
            // Aplicar la animación de minimizar hacia el sobre original
            cartaContent.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cartaContent.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.05)`;
            cartaContent.style.opacity = '0';
            cartaContent.style.borderRadius = '50px'; // Efecto de contracción circular
            
            // Animar el fondo también
            const background = carta.querySelector('div[style*="background: rgba(0,0,0,0.5)"]');
            if (background) {
                background.style.transition = 'opacity 0.4s ease';
                background.style.opacity = '0';
            }
            
            // Remover después de la animación
            setTimeout(() => {
                carta.remove();
                window.sobreOriginal = null; // Limpiar referencia
                console.log('✅ Carta minimizada hacia el sobre original');
            }, 400);
            
        } else {
            // Fallback si no se encuentra el sobre original
            console.log('⚠️ No se encontró sobre original, usando animación por defecto');
            if (cartaContent) {
                cartaContent.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                cartaContent.style.transform = 'translate(-50%, -50%) scale(0.05)';
                cartaContent.style.opacity = '0';
            }
            
            setTimeout(() => {
                carta.remove();
                console.log('🗑️ Carta cerrada (fallback)');
            }, 300);
        }
    }
}

// Hacer la función global para el botón
window.cerrarCarta = cerrarCarta;
