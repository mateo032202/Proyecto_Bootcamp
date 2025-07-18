/**
 * Maneja las animaciones avanzadas de las cartas de testimonios
 * Implementa la expansión de la carta al centro de la pantalla usando GSAP
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando animaciones de cartas flotantes con GSAP');
    
    // Crear el overlay para cuando la carta está expandida
    if (!document.querySelector('.carta-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'carta-overlay';
        document.body.appendChild(overlay);
        
        // Al hacer clic en el overlay, cerrar la carta
        overlay.addEventListener('click', cerrarCartaExpandida);
        console.log('💫 Overlay para cartas creado');
    }
    
    // Inicializar las cartas
    inicializarAnimacionesCartas();
    
    // Re-ejecutar después de un segundo para manejar cargas dinámicas
    setTimeout(inicializarAnimacionesCartas, 1000);
    
    // Verificar periódicamente si aparecen nuevos sobres
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
    
    // Manejar cambios de sección para reinicializar sobres
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#testimonios') {
            setTimeout(inicializarAnimacionesCartas, 300);
        }
    });
    
    // También comprobar al cargar si estamos en la sección testimonios
    if (window.location.hash === '#testimonios') {
        setTimeout(inicializarAnimacionesCartas, 300);
    }
    
    // Sobreescribir el comportamiento del script sobres-click.js
    window.inicializarSobres = function() {
        const sobres = document.querySelectorAll('.sobre-cerrado');
        console.log(`📨 Interceptando inicialización de ${sobres.length} sobres para animación GSAP`);
        
        sobres.forEach((sobre, index) => {
            // Clonar para eliminar listeners anteriores
            const nuevoSobre = sobre.cloneNode(true);
            sobre.parentNode.replaceChild(nuevoSobre, sobre);
            
            // Configurar el nuevo sobre con nuestro manejador
            configurarSobreConGSAP(nuevoSobre, index);
        });
        
        return true;
    };
});

function configurarSobreConGSAP(sobre, index) {
    sobre.style.cursor = 'pointer';
    
    // Verificar y eliminar cartas perdidas
    limpiarCartasPerdidas();
    
    // Agregar evento de clic
    sobre.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Si ya está activo, cerrar la carta
        if (sobre.classList.contains('activo')) {
            cerrarCartaExpandida();
            return;
        }
        
        // Activar el sobre
        sobre.classList.add('activo');
        
        // Animación de la solapa abriendo
        const solapa = sobre.querySelector('.solapa-sobre');
        if (solapa) {
            gsap.to(solapa, {
                rotationX: -180,
                duration: 0.8,
                ease: "power2.out",
                transformOrigin: "center bottom"
            });
        }
        
        // Obtener la carta contenido para animarla
        const carta = sobre.querySelector('.carta-contenido');
        if (carta) {
            console.log(`🎯 Animando carta #${index + 1} con GSAP`);
            
            // Crear una copia de la carta para la animación
            const cartaCopia = carta.cloneNode(true);
            cartaCopia.classList.add('carta-animada');
            
            // Detectar si es un elemento SVG
            const esSvg = carta.tagName.toLowerCase() === 'g' || carta.closest('svg');
            
            // Para elementos SVG, crear un contenedor HTML
            if (esSvg) {
                console.log("🎨 Creando contenedor HTML para carta SVG");
                
                // Crear un contenedor visible
                const contenedorCarta = document.createElement('div');
                contenedorCarta.className = 'carta-animada-contenedor carta-animada';
                contenedorCarta.style.position = 'fixed';
                contenedorCarta.style.zIndex = '99999';
                contenedorCarta.style.backgroundColor = 'white';
                contenedorCarta.style.borderRadius = '12px';
                contenedorCarta.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)';
                contenedorCarta.style.padding = '30px';
                contenedorCarta.style.width = '300px';
                contenedorCarta.style.opacity = '1';
                contenedorCarta.style.visibility = 'visible';
                contenedorCarta.style.display = 'block';
                
                // Extraer el texto del SVG
                let textoTestimonio = "";
                try {
                    const foreignObject = carta.querySelector('foreignObject div');
                    if (foreignObject && foreignObject.innerText) {
                        textoTestimonio = foreignObject.innerText.trim();
                    } else if (carta.textContent) {
                        textoTestimonio = carta.textContent.trim();
                    } else {
                        textoTestimonio = "Este es un testimonio de ejemplo.";
                    }
                } catch (e) {
                    textoTestimonio = "Testimonio de un cliente satisfecho.";
                }
                
                // Crear elementos para el contenido
                const titulo = document.createElement('h3');
                titulo.textContent = "Testimonio";
                titulo.style.fontFamily = "'Super Adorable', cursive";
                titulo.style.fontSize = '28px';
                titulo.style.color = '#5d4e6d';
                titulo.style.marginBottom = '20px';
                titulo.style.textAlign = 'center';
                
                const parrafo = document.createElement('p');
                parrafo.textContent = textoTestimonio;
                parrafo.style.fontFamily = 'Quicksand, sans-serif';
                parrafo.style.fontSize = '16px';
                parrafo.style.lineHeight = '1.8';
                parrafo.style.color = '#333';
                parrafo.style.textAlign = 'center';
                parrafo.style.padding = '10px';
                
                const bordeDecorativo = document.createElement('div');
                bordeDecorativo.style.border = '2px solid #d1c1e0';
                bordeDecorativo.style.borderRadius = '8px';
                bordeDecorativo.style.padding = '20px';
                bordeDecorativo.appendChild(parrafo);
                
                contenedorCarta.appendChild(titulo);
                contenedorCarta.appendChild(bordeDecorativo);
                
                document.body.appendChild(contenedorCarta);
                
                // Usar el contenedor para la animación
                cartaCopia = contenedorCarta;
            } else {
                // Para elementos HTML normales
                document.body.appendChild(cartaCopia);
                cartaCopia.style.opacity = "1";
                cartaCopia.style.visibility = "visible";
                cartaCopia.style.display = "block";
            }
            
            // Obtener posición del sobre
            const sobreRect = sobre.getBoundingClientRect();
            
            // Posicionar la carta directamente en el centro de la pantalla
            gsap.set(cartaCopia, {
                position: "fixed",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                width: "300px",
                opacity: 1,
                zIndex: 99999,
                visibility: "visible",
                display: "block"
            });
            
            // Activar el overlay
            const overlay = document.querySelector('.carta-overlay');
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0.85,
                    duration: 0.5,
                    onStart: function() {
                        overlay.style.pointerEvents = "auto";
                    }
                });
            }
            
            // Añadir botón de cerrar
            const cerrarBtn = document.createElement('div');
            cerrarBtn.className = 'cerrar-carta';
            cerrarBtn.innerHTML = '×';
            cerrarBtn.style.position = 'absolute';
            cerrarBtn.style.top = '10px';
            cerrarBtn.style.right = '10px';
            cerrarBtn.style.fontSize = '32px';
            cerrarBtn.style.cursor = 'pointer';
            cerrarBtn.style.color = '#5d4e6d';
            cerrarBtn.style.width = '40px';
            cerrarBtn.style.height = '40px';
            cerrarBtn.style.lineHeight = '36px';
            cerrarBtn.style.textAlign = 'center';
            cerrarBtn.style.background = 'white';
            cerrarBtn.style.borderRadius = '50%';
            cerrarBtn.style.boxShadow = '0 3px 12px rgba(0,0,0,0.3)';
            cerrarBtn.style.opacity = '0';
            
            cartaCopia.appendChild(cerrarBtn);
            
            cerrarBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                cerrarCartaExpandida();
            });
            
            // Animación simple de escala y aparición
            const timeline = gsap.timeline();
            
            timeline.from(cartaCopia, {
                opacity: 0,
                scale: 0.7,
                duration: 0.6,
                ease: "back.out(1.4)"
            });
            
            timeline.to(cerrarBtn, {
                opacity: 1,
                duration: 0.4
            });
            
            // Guardar referencia a la carta activa
            document.body.setAttribute('data-carta-activa', index);
        }
    });
    
    // Marcar como inicializado
    sobre.setAttribute('data-inicializado', 'true');
}

function inicializarAnimacionesCartas() {
    const sobres = document.querySelectorAll('.sobre-cerrado');
    
    sobres.forEach((sobre, index) => {
        if (!sobre.hasAttribute('data-inicializado')) {
            configurarSobreConGSAP(sobre, index);
        }
    });
}

function cerrarCartaExpandida() {
    // Ocultar overlay
    const overlay = document.querySelector('.carta-overlay');
    gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        onComplete: function() {
            overlay.style.pointerEvents = "none";
        }
    });
    
    // Animar las cartas animadas
    const cartasAnimadas = document.querySelectorAll('.carta-animada');
    cartasAnimadas.forEach(carta => {
        const timeline = gsap.timeline({
            onComplete: function() {
                carta.remove();
            }
        });
        
        timeline.to(carta, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4
        });
    });
    
    // Revertir sobres activos
    const cartasActivas = document.querySelectorAll('.sobre-cerrado.activo');
    cartasActivas.forEach(sobre => {
        sobre.classList.remove('activo');
        
        // Animar la solapa cerrándose
        const solapa = sobre.querySelector('.solapa-sobre');
        if (solapa) {
            gsap.to(solapa, {
                rotationX: 0,
                duration: 0.6,
                ease: "power3.out",
                transformOrigin: "center bottom"
            });
        }
    });
}

// Función para verificar y eliminar cartas perdidas
function limpiarCartasPerdidas() {
    const cartasAnimadas = document.querySelectorAll('.carta-animada');
    cartasAnimadas.forEach(carta => carta.remove());
}
