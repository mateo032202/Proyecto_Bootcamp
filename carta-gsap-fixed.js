/**
 * Animación avanzada de cartas con GSAP - VERSIÓN CORREGIDA
 */

console.log('🎭 Animación GSAP CORREGIDA cargada');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando animaciones GSAP');
    
    // Limpiar cartas perdidas
    limpiarCartasPerdidas();
    
    // Inicializar después de que todo se cargue
    setTimeout(function() {
        inicializarAnimacionesCartas();
    }, 500);
});

function limpiarCartasPerdidas() {
    const cartasPerdidas = document.querySelectorAll('.carta-animada');
    cartasPerdidas.forEach(carta => carta.remove());
}

function inicializarAnimacionesCartas() {
    const sobres = document.querySelectorAll('.sobre-cerrado');
    console.log(`📨 Configurando ${sobres.length} sobres`);
    
    sobres.forEach((sobre, index) => {
        if (sobre.dataset.gsapConfigured) return;
        sobre.dataset.gsapConfigured = 'true';
        
        sobre.style.cursor = 'pointer';
        
        sobre.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`🎯 Click en sobre ${index + 1}`);
            
            // Evitar múltiples animaciones
            if (document.querySelector('.carta-animada')) {
                console.log('⏸️ Animación en curso, ignorando click');
                return;
            }
            
            // Primero animar la apertura del sobre (CSS puro)
            abrirSobre(sobre);
            
            // Después ejecutar la animación de la carta con GSAP
            setTimeout(function() {
                ejecutarAnimacionCompleta(sobre);
            }, 800);
        });
    });
}

function abrirSobre(sobre) {
    console.log('📬 Abriendo sobre con clase activo');
    
    // Añadir clase activo para activar la animación CSS existente
    sobre.classList.add('activo');
    
    console.log('✅ Solapa abierta hacia arriba');
}

function ejecutarAnimacionCompleta(sobre) {
    // Obtener contenido de la carta
    const carta = sobre.querySelector('.carta-contenido');
    if (!carta) {
        console.error('❌ No se encontró contenido de carta');
        return;
    }
    
    const foreignObject = carta.querySelector('foreignObject div');
    const firmaElement = sobre.querySelector('text');
    
    let textoTestimonio = foreignObject ? foreignObject.textContent.trim() : 'Sin contenido';
    let nombreFirma = firmaElement ? firmaElement.textContent.trim() : 'Anónimo';
    
    console.log('📝 Animando:', textoTestimonio.substring(0, 50) + '...');
    console.log('✍️ Firma:', nombreFirma);
    
    // Crear elemento de carta animada
    const cartaAnimada = document.createElement('div');
    cartaAnimada.className = 'carta-animada';
    cartaAnimada.innerHTML = `
        <!-- Botón X para cerrar - Fuera del contenido, en el cuadrado blanco principal -->
        <button class="btn-cerrar-carta" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
            transition: all 0.2s ease;
            z-index: 10;
            opacity: 0;
            transform: scale(0);
        " onmouseover="this.style.background='#ff5252'; this.style.transform='scale(1.1)'" 
           onmouseout="this.style.background='#ff6b6b'; this.style.transform='scale(1)'">×</button>
        <div style="
            font-family: 'Super Adorable', cursive;
            font-size: 24px;
            color: #5d4e6d;
            text-align: center;
            margin-bottom: 20px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        ">${nombreFirma}</div>
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
            <div style="
                font-family: 'Great Vibes', 'Dancing Script', cursive;
                font-size: 20px;
                color: #5d4e6d;
                text-align: right;
                margin-top: 15px;
            ">— ${nombreFirma}</div>
        </div>
    `;
    
    // Estilos iniciales - carta como cuadrado pequeño desde el inicio
    cartaAnimada.style.cssText = `
        position: fixed !important;
        background: white !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
        padding: 15px !important;
        width: 150px !important;
        height: 150px !important;
        z-index: 99999 !important;
        opacity: 0 !important;
        visibility: visible !important;
        display: block !important;
        pointer-events: none !important;
        overflow: hidden !important;
    `;
    
    // Posición inicial (centro del sobre) - ajustada para cuadrado pequeño
    const sobreRect = sobre.getBoundingClientRect();
    const startX = sobreRect.left + sobreRect.width/2 - 75; // 75 = 150/2
    const startY = sobreRect.top + sobreRect.height/2 - 75; // 75 = 150/2
    
    cartaAnimada.style.left = startX + 'px';
    cartaAnimada.style.top = startY + 'px';
    
    document.body.appendChild(cartaAnimada);
    
    // Calcular posiciones para cuadrado pequeño y grande
    const centerX = window.innerWidth / 2 - 75; // Para cuadrado pequeño 150x150
    const centerY = window.innerHeight / 2 - 75;
    const expandSize = 400;
    const expandX = window.innerWidth / 2 - expandSize / 2;
    const expandY = window.innerHeight / 2 - expandSize / 2;
    
    // Crear timeline de GSAP - Solo hasta expandir
    const tl = gsap.timeline({
        defaults: {ease: 'power2.inOut'}
    });
    
    // 1. Aparecer y moverse al centro (mantener cuadrado pequeño)
    tl.to(cartaAnimada, {
        duration: 0.3,
        opacity: 1,
        ease: "power2.out"
    })
    .to(cartaAnimada, {
        duration: 0.8,
        left: centerX + 'px',
        top: centerY + 'px',
        scale: 1.1,
        boxShadow: '0 15px 50px rgba(0,0,0,0.2)',
        ease: "power2.inOut"
    })
    // 2. Expandir de cuadrado pequeño a cuadrado grande
    .to(cartaAnimada, {
        duration: 0.8,
        left: expandX + 'px',
        top: expandY + 'px',
        width: expandSize + 'px',
        height: expandSize + 'px',
        padding: '30px',
        scale: 1,
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        ease: "power2.inOut",
        onStart: function() {
            cartaAnimada.style.overflow = 'auto';
        }
    })
    // 3. Mostrar el botón X cuando esté completamente expandida
    .to(cartaAnimada.querySelector('.btn-cerrar-carta'), {
        duration: 0.4,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.7)",
        onComplete: function() {
            // Habilitar pointer events cuando esté completamente expandida
            cartaAnimada.style.pointerEvents = 'auto';
            console.log('✅ Carta expandida - Esperando click en X para cerrar');
        }
    });

    // Configurar el evento click del botón X
    const btnCerrar = cartaAnimada.querySelector('.btn-cerrar-carta');
    btnCerrar.addEventListener('click', function() {
        console.log('❌ Click en X - Iniciando animación de regreso');
        
        // Deshabilitar pointer events
        cartaAnimada.style.pointerEvents = 'none';
        
        // Crear timeline para el regreso
        const tlRegreso = gsap.timeline({
            defaults: {ease: 'power2.inOut'},
            onComplete: function() {
                console.log('🎬 Animación de regreso completada');
                // Cerrar el sobre después de completar la animación
                setTimeout(function() {
                    cerrarSobre(sobre);
                }, 500);
            }
        });

        // Ocultar el botón X primero
        tlRegreso.to(btnCerrar, {
            duration: 0.2,
            opacity: 0,
            scale: 0,
            ease: "back.in(1.7)"
        });

        // 4. Contraer de cuadrado grande a cuadrado pequeño
        tlRegreso.to(cartaAnimada, {
            duration: 0.8,
            left: centerX + 'px',
            top: centerY + 'px',
            width: '150px',
            height: '150px',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            scale: 1.1,
            ease: "power2.inOut",
            onStart: function() {
                cartaAnimada.style.overflow = 'hidden';
            }
        })
        // 5. Regresar al sobre con animación realista de ingreso
        .to(cartaAnimada, {
            duration: 1.2,
            left: startX + 'px',
            top: startY + 'px',
            scale: 0.7, // Hacerla más pequeña para que quepa en el sobre
            opacity: 1,
            ease: "power2.inOut"
        })
        // 6. Simular el ingreso al sobre - deslizar hacia abajo y reducir escala
        .to(cartaAnimada, {
            duration: 0.8,
            y: "+=40", // Deslizar hacia abajo para simular que entra al sobre
            scaleX: 0.6, // Comprimir horizontalmente como si entrara por la abertura
            scaleY: 0.4, // Comprimir verticalmente
            opacity: 0.7,
            ease: "power2.in",
            transformOrigin: "center top" // El punto de referencia es la parte superior
        })
        // 7. Desaparecer completamente dentro del sobre
        .to(cartaAnimada, {
            duration: 0.4,
            y: "+=20", // Un poco más hacia abajo
            scale: 0.2,
            opacity: 0,
            ease: "power3.in",
            onComplete: function() {
                cartaAnimada.remove();
                console.log('🗑️ Carta ingresada al sobre y eliminada');
            }
        });
    });
}

function cerrarSobre(sobre) {
    console.log('📪 Cerrando sobre con clase activo');
    
    // Quitar clase activo para cerrar el sobre
    sobre.classList.remove('activo');
    
    console.log('✅ Sobre cerrado');
}
