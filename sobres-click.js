/**
 * Maneja la interacción de click en los sobres de testimonios
 * Reemplaza la funcionalidad hover por un sistema de click/toggle
 */

// Log inicial para confirmar que el script se carga correctamente
console.log('🔥 SCRIPT DE CLICKS PARA SOBRES CARGADO');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM LISTO - Inicializando manejo de clicks para sobres');
    
    // Ejecutar inmediatamente
    inicializarSobres();
    
    // Re-ejecutar después de un segundo para asegurar que se aplique después de otros scripts
    setTimeout(inicializarSobres, 1000);

    // Manejar navegación para reinicializar sobres al cambiar de sección
    const enlaceTestimonios = document.querySelector('a[href="#testimonios"]');
    if (enlaceTestimonios) {
        console.log('🔗 Enlace a testimonios encontrado, configurando listener');
        enlaceTestimonios.addEventListener('click', function() {
            console.log('👆 Click en enlace de testimonios detectado');
            setTimeout(inicializarSobres, 300);
            setTimeout(inicializarSobres, 1000);
        });
    }

    // Escuchar cambios de hash en la URL
    window.addEventListener('hashchange', function() {
        console.log('📌 URL hash cambió a: ' + window.location.hash);
        if (window.location.hash === '#testimonios') {
            setTimeout(inicializarSobres, 300);
            setTimeout(inicializarSobres, 1000);
        }
    });

    // Función para inicializar los sobres con click
    function inicializarSobres() {
        const sobres = document.querySelectorAll('.sobre-cerrado');
        console.log(`📨 Encontrados ${sobres.length} sobres para inicializar`);
        
        // Asegurar que no haya sobres activos inicialmente
        sobres.forEach(sobre => {
            sobre.classList.remove('activo');
        });
        
        sobres.forEach((sobre, index) => {
            // Asegurar que tenga el estilo de cursor correcto
            sobre.style.cursor = 'pointer';
            
            // Eliminar listeners anteriores (clonar y reemplazar)
            const clone = sobre.cloneNode(true);
            sobre.parentNode.replaceChild(clone, sobre);
            
            // Añadir nuevo listener con función inline para máxima compatibilidad
            clone.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`🎯 CLICK DETECTADO en sobre #${index + 1}`);
                
                // Toggle entre activo e inactivo
                if (this.classList.contains('activo')) {
                    this.classList.remove('activo');
                    console.log('🔒 Sobre cerrado');
                } else {
                    this.classList.add('activo');
                    console.log('📬 Sobre abierto');
                }
                
                // Debug visual para verificar clases aplicadas
                console.log('🔍 Clases del sobre:', this.classList.toString());
            };
            
            console.log(`✅ Sobre #${index + 1} inicializado correctamente`);
        });
        
        console.log('✨ Todos los sobres inicializados y listos para click');
    }
});
