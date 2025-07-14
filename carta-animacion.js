/**
 * Maneja las animaciones avanzadas de las cartas de testimonios
 * Implementa la expansión de la carta al centro de la pantalla usando GSAP
 */

console.log('🎭 Script de animación avanzada de cartas con GSAP cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM LISTO - Inicializando animaciones avanzadas de cartas con GSAP');
    
    // Limpieza inicial de posibles cartas o estados residuales de sesiones anteriores
    limpiarCartasPerdidas();
    
    // Inicializar las cartas
    inicializarAnimacionesCartas();
    
    // Re-ejecutar después de un segundo para asegurar que se aplique
    // y manejar casos donde el contenido se carga de forma dinámica
    setTimeout(inicializarAnimacionesCartas, 1000);
    
    // Verificar periódicamente si aparecen nuevos sobres después de cargar la página
    const observador = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                setTimeout(function() {
                    const nuevosSobres = document.querySelectorAll('.sobre-cerrado:not([data-inicializado])');
                    if (nuevosSobres.length > 0) {
                        console.log(`🔍 Detectados ${nuevosSobres.length} sobres nuevos`);
                        inicializarAnimacionesCartas();
                    }
                }, 100);
            }
        });
    });
    
    observador.observe(document.body, { childList: true, subtree: true });
    
    // Manejar cambios de sección para reinicializar sobres en la sección de testimonios
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#testimonios') {
            console.log('🔄 Cambio a sección testimonios detectado');
            setTimeout(inicializarAnimacionesCartas, 300);
        }
    });
    
    // También comprobar al cargar si estamos en la sección testimonios
    if (window.location.hash === '#testimonios') {
        console.log('📍 Carga inicial en sección testimonios');
        setTimeout(inicializarAnimacionesCartas, 300);
    }
});

function inicializarAnimacionesCartas() {
    const sobres = document.querySelectorAll('.sobre-cerrado');
    console.log(`📨 Configurando animaciones GSAP para ${sobres.length} cartas`);
    
    sobres.forEach((sobre, index) => {
        configurarSobreConGSAP(sobre, index);
    });
}

function configurarSobreConGSAP(sobre, index) {
    sobre.style.cursor = 'pointer';
    // Evitar múltiples listeners
    if (sobre.dataset.animacionGsap === 'true') return;
    sobre.dataset.animacionGsap = 'true';

    sobre.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🎯 Click en sobre #${index + 1}`);
        
        // Si ya hay una carta animándose, no hacer nada
        if (document.body.querySelector('.carta-animada')) return;

        // Obtener la carta original (elemento SVG)
        const carta = sobre.querySelector('.carta-contenido');
        if (!carta) {
            console.warn('❌ No se encontró carta-contenido en el sobre');
            return;
        }

        console.log('📄 Carta encontrada, preparando animación...');

        // Obtener el contenido del texto
        const foreignObject = carta.querySelector('foreignObject div');
        let textoTestimonio = '';
        let nombreFirma = '';

        if (foreignObject) {
            textoTestimonio = foreignObject.textContent.trim();
        }

        // Buscar la firma
        const firmaElement = sobre.querySelector('text');
        if (firmaElement) {
            nombreFirma = firmaElement.textContent.trim();
        }

        // Crear una carta HTML para la animación
        const cartaAnimada = document.createElement('div');
        cartaAnimada.classList.add('carta-animada');
        cartaAnimada.innerHTML = `
            <div style="
                font-family: 'Super Adorable', cursive;
                font-size: 24px;
                color: #5d4e6d;
                text-align: center;
                margin-bottom: 20px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
            ">${nombreFirma || 'Testimonio'}</div>
            <div style="
                border: 2px solid #d1c1e0;
                border-radius: 8px;
                padding: 20px;
                background-color: white;
                position: relative;
            ">
                <div style="
                    font-size: 40px;
                    color: #d1c1e0;
                    position: absolute;
                    top: 10px;
                    left: 15px;
                    opacity: 0.5;
                ">❝</div>
                <p style="
                    font-family: 'Quicksand', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #333;
                    text-align: center;
                    margin: 25px 0 15px 0;
                    padding: 10px;
                ">${textoTestimonio}</p>
                ${nombreFirma ? `<div style="
                    font-family: 'Great Vibes', 'Dancing Script', cursive;
                    font-size: 20px;
                    color: #5d4e6d;
                    text-align: right;
                    margin-top: 15px;
                ">— ${nombreFirma}</div>` : ''}
            </div>
        `;

        // Estilos de la carta
        cartaAnimada.style.cssText = `
            position: fixed !important;
            background: white !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
            padding: 30px !important;
            width: 250px !important;
            height: auto !important;
            min-height: 200px !important;
            z-index: 99999 !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            pointer-events: none !important;
            overflow: hidden !important;
        `;

        // Obtener posición del sobre
        const sobreRect = sobre.getBoundingClientRect();
        
        // Posición inicial (sobre la carta en el sobre)
        cartaAnimada.style.left = (sobreRect.left + sobreRect.width/2 - 125) + 'px';
        cartaAnimada.style.top = (sobreRect.top + sobreRect.height/2 - 100) + 'px';

        document.body.appendChild(cartaAnimada);
        console.log('✅ Carta HTML creada y añadida al DOM');

        // Calcular posiciones para la animación
        const centerX = window.innerWidth / 2 - 125;
        const centerY = window.innerHeight / 2 - 100;
        
        const squareSize = 400;
        const squareX = window.innerWidth / 2 - squareSize / 2;
        const squareY = window.innerHeight / 2 - squareSize / 2;

        // Animación secuencial con GSAP
        const tl = gsap.timeline({
            defaults: {ease: 'power2.inOut'},
            onComplete: function() {
                console.log('🎬 Animación completada');
                cartaAnimada.remove();
            }
        });

        // 1. La carta sale del sobre y va al centro
        tl.to(cartaAnimada, {
            duration: 0.8,
            left: centerX,
            top: centerY,
            boxShadow: '0 15px 50px rgba(0,0,0,0.2)',
            scale: 1.05
        });

        // 2. Expansión cuadrada
        tl.to(cartaAnimada, {
            duration: 0.8,
            left: squareX,
            top: squareY,
            width: squareSize + 'px',
            height: squareSize + 'px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            scale: 1,
            onStart: function() {
                cartaAnimada.style.overflow = 'auto';
            }
        });

        // 3. Mantener expandida
        tl.to(cartaAnimada, {
            duration: 1.5,
            scale: 1
        });

        // 4. Contraer de vuelta al centro
        tl.to(cartaAnimada, {
            duration: 0.8,
            left: centerX,
            top: centerY,
            width: '250px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            scale: 1.05
        });

        // 5. Regresar al sobre
        tl.to(cartaAnimada, {
            duration: 0.8,
            left: (sobreRect.left + sobreRect.width/2 - 125),
            top: (sobreRect.top + sobreRect.height/2 - 100),
            scale: 1,
            opacity: 0.8
        });

        // 6. Desaparecer
        tl.to(cartaAnimada, {
            duration: 0.3,
            opacity: 0,
            onComplete: function() {
                cartaAnimada.remove();
            }
        });
    });
}

function cerrarCartaExpandida() {
    const cartaAnimada = document.querySelector('.carta-animada');
    if (cartaAnimada) {
        cartaAnimada.remove();
    }
}

// Función para verificar y eliminar cartas perdidas de animaciones anteriores
function limpiarCartasPerdidas() {
    const cartasAnimadas = document.querySelectorAll('.carta-animada');
    if (cartasAnimadas.length > 0) {
        console.log(`🧹 Limpiando ${cartasAnimadas.length} cartas perdidas de sesiones anteriores`);
        cartasAnimadas.forEach(carta => carta.remove());
    }
}
