// === ANIMACIONES DE NAVEGACIÓN ===
document.querySelectorAll('.nav-links a:not(.chat-button)').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.animate([
            { filter: 'brightness(1.18) drop-shadow(0 0 10px #d1b3ff)', transform: 'scale(1.18) rotateY(32deg) skewX(-10deg) rotateX(10deg)' },
            { filter: 'brightness(1.28) drop-shadow(0 0 24px #d1b3ff)', transform: 'scale(1.22) rotateY(36deg) skewX(-12deg) rotateX(12deg)' },
            { filter: 'brightness(1.18) drop-shadow(0 0 10px #d1b3ff)', transform: 'scale(1.18) rotateY(32deg) skewX(-10deg) rotateX(10deg)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.4,0,0.2,1)'
        });
    });
});

// === ANIMACIÓN CHAT BUTTON ===
document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.querySelector('.chat-button span');
    if (!chatBtn) return;

    function animateGlow() {
        chatBtn.animate([
            { textShadow: '0 0 0px #b39ddb, 0 0 0px #4b2067', color: '#4b2067' },
            { textShadow: '0 0 18px #b39ddb, 0 0 28px #4b2067', color: '#4b2067' },
            { textShadow: '0 0 0px #b39ddb, 0 0 0px #4b2067', color: '#4b2067' }
        ], {
            duration: 600,
            easing: 'ease-in-out'
        });
    }

    const parent = chatBtn.parentElement;
    parent.addEventListener('mouseenter', animateGlow);
    parent.addEventListener('focus', animateGlow);
});

// === NAVEGACIÓN PRINCIPAL ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando navegación...');
    
    // Función principal de navegación
    window.navegarA = function(seccionId) {
        console.log('📍 Navegando a:', seccionId);
        
        // Lista de todas las secciones
        const secciones = ['inicio', 'nosotros', 'testimonios', 'recursos', 'contacto', 'chat'];
        
        // Remover clase activa de todos los enlaces de navegación
        document.querySelectorAll('.nav-links a').forEach(enlace => {
            enlace.classList.remove('active');
            // Resetear estilos del botón chat si no está activo
            if (enlace.classList.contains('chat-button')) {
                enlace.style.background = '#A48CA4';
                enlace.style.transform = '';
                enlace.style.boxShadow = '';
            }
        });
        
        // Agregar clase activa al enlace correspondiente
        const enlaceActivo = document.querySelector(`a[href="#${seccionId}"]`);
        if (enlaceActivo) {
            if (enlaceActivo.classList.contains('chat-button')) {
                // Caso especial para el botón de chat
                enlaceActivo.style.background = '#8e7aa0';
                enlaceActivo.style.transform = 'translateY(-2px)';
                enlaceActivo.style.boxShadow = '0 4px 15px rgba(164, 140, 164, 0.5)';
                console.log('🟣 Chat button activo');
            } else {
                // Caso normal para otros enlaces
                enlaceActivo.classList.add('active');
                console.log('🟣 Enlace activo:', seccionId);
            }
        }
        
        // Ocultar todas las secciones
        secciones.forEach(seccion => {
            const elemento = document.getElementById(seccion);
            if (elemento) {
                elemento.style.display = 'none';
                console.log('✅ ' + seccion + ' ocultado');
            }
        });
        
        // Mostrar la sección solicitada
        const seccionAMostrar = document.getElementById(seccionId);
        if (seccionAMostrar) {
            seccionAMostrar.style.display = 'block';
            console.log('🎯 Sección mostrada:', seccionId);
            
            // Scroll suave al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Si es la sección nosotros, asegurar visibilidad de las tarjetas
            if (seccionId === 'nosotros') {
                setTimeout(() => {
                    const tarjetas = document.querySelectorAll('.dev-card');
                    const contenedor = document.querySelector('.card-container');
                    
                    if (contenedor) {
                        contenedor.style.display = 'flex';
                        contenedor.style.visibility = 'visible';
                        contenedor.style.opacity = '1';
                        console.log('🎯 Contenedor de tarjetas forzado a visible');
                    }
                    
                    tarjetas.forEach((tarjeta, index) => {
                        tarjeta.style.display = 'flex';
                        tarjeta.style.visibility = 'visible';
                        tarjeta.style.opacity = '1';
                        console.log('🎯 Tarjeta ' + (index + 1) + ' forzada a visible');
                    });
                }, 100);
            }
        } else {
            console.error('❌ Sección no encontrada:', seccionId);
        }
    };
    
    // Event listeners para todos los enlaces de navegación
    const enlaces = document.querySelectorAll('a[href^="#"]');
    console.log('🔗 Enlaces encontrados:', enlaces.length);
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const seccionId = href.substring(1); // Quitar el #
            console.log('🔗 Clic en enlace:', href, '-> ID:', seccionId);
            navegarA(seccionId);
            return false;
        });
    });
    
    // Verificación de elementos
    console.log('=== 🔍 VERIFICACIÓN DE ELEMENTOS ===');
    console.log('Inicio:', document.getElementById('inicio') ? '✅' : '❌');
    console.log('Nosotros:', document.getElementById('nosotros') ? '✅' : '❌');
    console.log('Testimonios:', document.getElementById('testimonios') ? '✅' : '❌');
    console.log('Recursos:', document.getElementById('recursos') ? '✅' : '❌');
    console.log('Contacto:', document.getElementById('contacto') ? '✅' : '❌');
    console.log('Chat:', document.getElementById('chat') ? '✅' : '❌');
    console.log('================================');
    
    // Mostrar la sección de inicio por defecto
    navegarA('inicio');
});

// === FUNCIONALIDAD PARA CREAR TESTIMONIOS ===
document.addEventListener('DOMContentLoaded', function () {
    // Contador de testimonios únicos para IDs únicos
    let testimonioCounter = 4; // Empezamos en 4 porque ya hay 3 testimonios existentes
    
    const form = document.getElementById('testimonio-form');
    const testimonioTexto = document.getElementById('testimonio-texto');
    const charCounter = document.querySelector('.char-counter');
    
    // Contador de caracteres en tiempo real
    if (testimonioTexto && charCounter) {
        testimonioTexto.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.getAttribute('maxlength') || 250;
            charCounter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            // Cambiar color si se acerca al límite
            if (currentLength > maxLength * 0.9) {
                charCounter.style.color = '#e74c3c';
            } else if (currentLength > maxLength * 0.7) {
                charCounter.style.color = '#f39c12';
            } else {
                charCounter.style.color = '#7f8c8d';
            }
        });
    }
    
    // Funcionalidad del formulario
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('testimonio-nombre').value.trim();
            const texto = document.getElementById('testimonio-texto').value.trim();
            const color = document.getElementById('testimonio-color').value;
            
            if (!nombre || !texto) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            if (texto.length > 250) {
                alert('El testimonio no puede exceder los 250 caracteres.');
                return;
            }
            
            crearNuevoTestimonio(nombre, texto, color);
            
            // Limpiar formulario
            form.reset();
            if (charCounter) {
                charCounter.textContent = '0/250 caracteres';
                charCounter.style.color = '#7f8c8d';
            }
            
            // Mensaje de confirmación
            alert('¡Testimonio creado exitosamente!');
        });
    }
    
    function crearNuevoTestimonio(nombre, texto, colorFirma) {
        const template = document.getElementById('sobre-template');
        const container = document.querySelector('.testimonios-container');
        
        if (!template || !container) {
            console.error('Template o container no encontrado');
            return;
        }
        
        // Clonar el template
        const nuevoTestimonio = template.cloneNode(true);
        nuevoTestimonio.style.display = 'block';
        nuevoTestimonio.removeAttribute('id');
        
        // Crear IDs únicos para los filtros y gradientes
        const uniqueId = testimonioCounter++;
        const newSVG = nuevoTestimonio.querySelector('svg');
        
        // Actualizar IDs de filtros y gradientes para evitar conflictos
        const filters = newSVG.querySelectorAll('filter, linearGradient, radialGradient');
        filters.forEach(filter => {
            const oldId = filter.id;
            const newId = oldId + uniqueId;
            filter.id = newId;
            
            // Actualizar referencias a estos IDs
            const references = newSVG.querySelectorAll(`[filter="url(#${oldId})"], [fill="url(#${oldId})"]`);
            references.forEach(ref => {
                if (ref.getAttribute('filter')) {
                    ref.setAttribute('filter', `url(#${newId})`);
                }
                if (ref.getAttribute('fill')) {
                    ref.setAttribute('fill', `url(#${newId})`);
                }
            });
        });
        
        // Actualizar el contenido del testimonio
        const contenidoDiv = nuevoTestimonio.querySelector('.testimonio-contenido');
        if (contenidoDiv) {
            contenidoDiv.textContent = `"${texto}"`;
        }
        
        // Actualizar la firma con el nombre y color seleccionado
        const firmaText = nuevoTestimonio.querySelector('.firma-manuscrita');
        if (firmaText) {
            firmaText.textContent = nombre;
            firmaText.setAttribute('fill', colorFirma);
        }
        
        // Agregar el nuevo testimonio al container
        container.appendChild(nuevoTestimonio);
        
        console.log('Nuevo testimonio creado:', nombre);
    }
});


// EVENTOS PARA SECCIÓN DE CONTACTO
document.addEventListener("DOMContentLoaded", () => {
    const contactoBtn = document.querySelector('a[href="#contacto"]');
    const contactoSeccion = document.querySelector("#contacto");
    const form = document.querySelector(".contact-form");
  
  
    if (contactoBtn && contactoSeccion) {
      contactoBtn.addEventListener("click", (e) => {
        e.preventDefault();
        contactoSeccion.classList.remove("hidden");
        contactoSeccion.classList.add("fade-in");
        contactoSeccion.scrollIntoView({ behavior: "smooth" });
        if (destino !== "#contacto") {
            contactoSeccion.classList.add("hidden");
            contactoSeccion.classList.remove("fade-in");
          }
          form.reset();
          contactoSeccion.classList.add("hidden");
          contactoSeccion.classList.remove("fade-in");
          

      });
    }
  
  
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        const destino = e.target.getAttribute('href');
        if (destino !== "#contacto") {
          contactoSeccion.classList.add("hidden");
        }
      });
    });
  
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
          
            const nombre = form.querySelector("#nombre").value; 
            const edad = form.querySelector("#edad").value;
            const whatsapp = form.querySelector("#whatsapp").value;
            const email = form.querySelector("#email").value;
            const situacion = form.querySelector("#situacion").value;
          
          
            alert("Gracias por contactarnos 💜\nTe responderemos pronto.");
          
            form.reset();
            contactoSeccion.classList.add("hidden");
            contactoSeccion.classList.remove("fade-in");
          });
          
    }
  });
  
