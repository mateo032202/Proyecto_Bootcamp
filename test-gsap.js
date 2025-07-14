// Prueba simple de GSAP
console.log('🧪 Archivo de prueba GSAP cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Verificando GSAP:', typeof gsap);
    
    if (typeof gsap !== 'undefined') {
        console.log('✅ GSAP está disponible');
        
        // Verificar sobres
        const sobres = document.querySelectorAll('.sobre-cerrado');
        console.log('📨 Sobres encontrados:', sobres.length);
        
        sobres.forEach((sobre, index) => {
            console.log(`🔍 Sobre ${index + 1}:`, sobre);
            const carta = sobre.querySelector('.carta-contenido');
            console.log(`📄 Carta ${index + 1}:`, carta);
        });
    } else {
        console.error('❌ GSAP no está disponible');
    }
});
