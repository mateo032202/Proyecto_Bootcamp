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
        
        // Lista de todas las secciones (sin chat)
        const secciones = ['inicio', 'nosotros', 'testimonios', 'recursos', 'contacto', 'estadisticas'];
        
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
            enlaceActivo.classList.add('active');
            console.log('🟣 Enlace activo:', seccionId);
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
            
            // Si es la sección de estadísticas, actualizar los datos
            if (seccionId === 'estadisticas') {
                setTimeout(() => {
                    if (window.updateStatistics) {
                        window.updateStatistics();
                        console.log('📊 Estadísticas actualizadas');
                    }
                }, 200);
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
            
            // Caso especial: si es el botón de chat, solo abrir el chatbot
            if (enlace.classList.contains('chat-button')) {
                console.log('🤖 Botón de chat clickeado - Abriendo chatbot');
                if (window.abrirChatFlotante) {
                    window.abrirChatFlotante();
                } else {
                    console.error('❌ Función abrirChatFlotante no disponible');
                }
                return false;
            }
            
            // Para otros enlaces, navegar normalmente
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
    console.log('Estadísticas:', document.getElementById('estadisticas') ? '✅' : '❌');
    console.log('================================');
    
    // Mostrar la sección de inicio por defecto
    navegarA('inicio');
});

// Función auxiliar para ajustar el brillo de un color hexadecimal
function adjustBrightness(hex, percent) {
    // Validar que sea un color hexadecimal válido
    if (!hex || hex.length !== 7 || !hex.startsWith('#')) {
        console.warn('Color hexadecimal inválido:', hex);
        return hex; // Devolver el original si es inválido
    }
    
    // Convertir hex a RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Ajustar brillo
    const newR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const newG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const newB = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    // Convertir de vuelta a hex
    const toHex = (n) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}


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

// === FUNCIONALIDAD MODAL CREAR TESTIMONIO ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Inicializando modal crear testimonio...');
    
    // Elementos del DOM
    const btnCrearTestimonio = document.getElementById('btn-crear-testimonio');
    const modalOverlay = document.getElementById('modal-crear-testimonio');
    const btnCerrarModal = document.getElementById('cerrar-modal');
    const formCrearTestimonio = document.getElementById('form-crear-testimonio');
    const testimoniosContainer = document.querySelector('.testimonios-container');
    
    // Campos del formulario
    const nombreInput = document.getElementById('nombre-testimonio');
    const mensajeTextarea = document.getElementById('mensaje-testimonio');
    const colorInput = document.getElementById('color-testimonio');
    const colorSobreInput = document.getElementById('color-sobre-testimonio');
    const colorCartaInput = document.getElementById('color-carta-testimonio');
    const avatarSelect = document.getElementById('avatar-testimonio');
    const colorPreview = document.querySelector('.color-preview');
    
    // Elementos del preview del sobre
    const cuerpoSobre = document.querySelector('.cuerpo-sobre');
    const solapaSobre = document.querySelector('.solapa-sobre');
    const colorSobreText = document.querySelector('.color-sobre-text');
    
    // Elementos del preview de la carta
    const fondoCarta = document.querySelector('.fondo-carta');
    const bordeCarta = document.querySelector('.borde-carta');
    const colorCartaText = document.querySelector('.color-carta-text');
    
    // Contadores de caracteres
    const nombreCounter = nombreInput.parentElement.querySelector('.char-counter');
    const mensajeCounter = mensajeTextarea.parentElement.querySelector('.char-counter');
    
    // Verificar que todos los elementos existen
    if (!btnCrearTestimonio || !modalOverlay || !formCrearTestimonio) {
        console.error('❌ Error: No se encontraron los elementos del modal');
        return;
    }
    
    console.log('✅ Elementos del modal encontrados correctamente');
    
    // === ABRIR MODAL ===
    btnCrearTestimonio.addEventListener('click', function() {
        console.log('📝 Abriendo modal crear testimonio...');
        modalOverlay.classList.add('activo');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        // Focus en el primer campo
        setTimeout(() => {
            nombreInput.focus();
        }, 300);
    });
    
    // === CERRAR MODAL ===
    function cerrarModal() {
        console.log('🚪 Cerrando modal...');
        modalOverlay.classList.remove('activo');
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
        
        // Limpiar formulario
        formCrearTestimonio.reset();
        actualizarContadores();
        actualizarColorPreview();
        
        // Limpiar avatar personalizado
        limpiarAvatarPersonalizado();
    }
    
    // Cerrar con botón X
    btnCerrarModal.addEventListener('click', cerrarModal);
    
    // Cerrar clickeando fuera del modal
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            cerrarModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('activo')) {
            cerrarModal();
        }
    });
    
    // === CONTADORES DE CARACTERES ===
    function actualizarContadores() {
        // Contador nombre
        const nombreLength = nombreInput.value.length;
        const nombreMax = nombreInput.getAttribute('maxlength');
        nombreCounter.textContent = `${nombreLength}/${nombreMax}`;
        
        // Aplicar clases de warning
        nombreCounter.classList.remove('warning', 'danger');
        if (nombreLength > nombreMax * 0.8) {
            nombreCounter.classList.add('warning');
        }
        if (nombreLength > nombreMax * 0.95) {
            nombreCounter.classList.add('danger');
        }
        
        // Contador mensaje
        const mensajeLength = mensajeTextarea.value.length;
        const mensajeMax = mensajeTextarea.getAttribute('maxlength');
        mensajeCounter.textContent = `${mensajeLength}/${mensajeMax}`;
        
        // Aplicar clases de warning
        mensajeCounter.classList.remove('warning', 'danger');
        if (mensajeLength > mensajeMax * 0.8) {
            mensajeCounter.classList.add('warning');
        }
        if (mensajeLength > mensajeMax * 0.95) {
            mensajeCounter.classList.add('danger');
        }
    }
    
    // === PREVIEW DE COLOR ===
    function actualizarColorPreview() {
        const colorValue = colorInput.value;
        colorPreview.textContent = `Color seleccionado: ${colorValue}`;
        colorPreview.style.color = colorValue;
    }
    
    // === CONVERSION A COLOR PASTEL ===
    function convertirAPastel(hexColor) {
        // Convertir hex a RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        // Algoritmo para convertir a pastel: mezclar con blanco (más suave)
        // Factor de mezcla: 0.6 significa 60% color original + 40% blanco
        const factor = 0.6;
        const white = 255;
        
        const rPastel = Math.round(r * factor + white * (1 - factor));
        const gPastel = Math.round(g * factor + white * (1 - factor));
        const bPastel = Math.round(b * factor + white * (1 - factor));
        
        // Convertir de vuelta a hex
        const toHex = (n) => n.toString(16).padStart(2, '0');
        
        return `#${toHex(rPastel)}${toHex(gPastel)}${toHex(bPastel)}`;
    }
    
    function generarVariacionesPastel(colorBase) {
        const r = parseInt(colorBase.slice(1, 3), 16);
        const g = parseInt(colorBase.slice(3, 5), 16);
        const b = parseInt(colorBase.slice(5, 7), 16);
        
        // Generar cuerpo del sobre (más claro)
        const factorCuerpo = 0.7;
        const white = 255;
        const rCuerpo = Math.round(r * factorCuerpo + white * (1 - factorCuerpo));
        const gCuerpo = Math.round(g * factorCuerpo + white * (1 - factorCuerpo));
        const bCuerpo = Math.round(b * factorCuerpo + white * (1 - factorCuerpo));
        
        // Generar solapa del sobre (un poco más oscura que el cuerpo)
        const factorSolapa = 0.6;
        const rSolapa = Math.round(r * factorSolapa + white * (1 - factorSolapa));
        const gSolapa = Math.round(g * factorSolapa + white * (1 - factorSolapa));
        const bSolapa = Math.round(b * factorSolapa + white * (1 - factorSolapa));
        
        const toHex = (n) => n.toString(16).padStart(2, '0');
        
        return {
            cuerpo: `#${toHex(rCuerpo)}${toHex(gCuerpo)}${toHex(bCuerpo)}`,
            solapa: `#${toHex(rSolapa)}${toHex(gSolapa)}${toHex(bSolapa)}`
        };
    }
    
    // === PREVIEW DEL COLOR DEL SOBRE ===
    function actualizarPreviewSobre() {
        if (!colorSobreInput || !cuerpoSobre || !solapaSobre || !colorSobreText) {
            console.warn('⚠️ Elementos del preview del sobre no encontrados');
            return;
        }
        
        const colorOriginal = colorSobreInput.value;
        const coloresPastel = generarVariacionesPastel(colorOriginal);
        
        // Aplicar colores al preview
        cuerpoSobre.style.backgroundColor = coloresPastel.cuerpo;
        cuerpoSobre.style.borderColor = coloresPastel.solapa;
        
        solapaSobre.style.backgroundColor = coloresPastel.solapa;
        solapaSobre.style.borderColor = convertirAPastel(colorOriginal);
        
        // Actualizar texto informativo
        colorSobreText.textContent = `Cuerpo: ${coloresPastel.cuerpo} | Solapa: ${coloresPastel.solapa}`;
        
        console.log('🎨 Preview del sobre actualizado:', {
            original: colorOriginal,
            cuerpo: coloresPastel.cuerpo,
            solapa: coloresPastel.solapa
        });
    }
    
    // === PREVIEW DEL COLOR DE LA CARTA ===
    function actualizarPreviewCarta() {
        if (!colorCartaInput || !fondoCarta || !bordeCarta || !colorCartaText) {
            console.warn('⚠️ Elementos del preview de la carta no encontrados');
            return;
        }
        
        const colorOriginal = colorCartaInput.value;
        const colorPastelCarta = convertirAPastel(colorOriginal);
        
        // Generar color más oscuro para el borde (85% del color pastel)
        const r = parseInt(colorPastelCarta.slice(1, 3), 16);
        const g = parseInt(colorPastelCarta.slice(3, 5), 16);
        const b = parseInt(colorPastelCarta.slice(5, 7), 16);
        
        const rBorde = Math.round(r * 0.85);
        const gBorde = Math.round(g * 0.85);
        const bBorde = Math.round(b * 0.85);
        
        const toHex = (n) => n.toString(16).padStart(2, '0');
        const colorBorde = `#${toHex(rBorde)}${toHex(gBorde)}${toHex(bBorde)}`;
        
        // Aplicar colores al preview
        fondoCarta.style.backgroundColor = colorPastelCarta;
        bordeCarta.style.borderColor = colorBorde;
        
        // Actualizar texto informativo
        colorCartaText.textContent = `Fondo: ${colorPastelCarta} | Borde: ${colorBorde}`;
        
        console.log('🎨 Preview de la carta actualizado:', {
            original: colorOriginal,
            pastel: colorPastelCarta,
            borde: colorBorde
        });
    }
    
    // === LIMPIAR AVATAR PERSONALIZADO ===
    function limpiarAvatarPersonalizado() {
        // Limpiar la variable global
        window.avatarPersonalizadoPNG = null;
        
        // Restaurar imagen por defecto en el preview
        const avatarPreviewImg = document.getElementById('avatar-preview-img');
        if (avatarPreviewImg) {
            avatarPreviewImg.src = 'images/logo.png';
        }
        
        // Limpiar el input de archivo
        const avatarInput = document.getElementById('avatar-testimonio');
        if (avatarInput) {
            avatarInput.value = '';
        }
        
        // Restaurar color del sobre por defecto
        if (colorSobreInput) {
            colorSobreInput.value = '#e8e8e8';
            actualizarPreviewSobre();
        }
        
        // Restaurar color de la carta por defecto
        if (colorCartaInput) {
            colorCartaInput.value = '#d1c1e0';
            actualizarPreviewCarta();
        }
        
        console.log('🧹 Avatar personalizado y configuraciones limpiadas');
    }
    
    // Event listeners para contadores y preview
    nombreInput.addEventListener('input', actualizarContadores);
    mensajeTextarea.addEventListener('input', actualizarContadores);
    colorInput.addEventListener('change', actualizarColorPreview);
    
    // Event listener para color del sobre
    if (colorSobreInput) {
        colorSobreInput.addEventListener('change', actualizarPreviewSobre);
        colorSobreInput.addEventListener('input', actualizarPreviewSobre); // Para actualización en tiempo real
    }
    
    // Event listener para color de la carta
    if (colorCartaInput) {
        colorCartaInput.addEventListener('change', actualizarPreviewCarta);
        colorCartaInput.addEventListener('input', actualizarPreviewCarta); // Para actualización en tiempo real
    }
    
    // Inicializar contadores y preview
    actualizarContadores();
    actualizarColorPreview();
    actualizarPreviewSobre(); // Inicializar preview del sobre
    actualizarPreviewCarta(); // Inicializar preview de la carta
    
    // === CREAR TESTIMONIO ===
    formCrearTestimonio.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('🚀 Creando nuevo testimonio...');
        
        // Obtener datos del formulario
        const nombre = nombreInput.value.trim();
        const mensaje = mensajeTextarea.value.trim();
        const color = colorInput.value;
        const colorSobre = colorSobreInput ? colorSobreInput.value : '#e8e8e8';
        const colorCarta = colorCartaInput ? colorCartaInput.value : '#d1c1e0';
        
        // Usar avatar personalizado si está disponible, sino usar avatar por defecto
        const avatar = window.avatarPersonalizadoPNG || 'images/logo.png';
        
        console.log('🎨 Tipo de avatar:', window.avatarPersonalizadoPNG ? 'Personalizado (PNG)' : 'Por defecto');
        console.log('📊 Datos del testimonio:', { 
            nombre, 
            mensaje: mensaje.substring(0, 30) + '...', 
            color, 
            colorSobre,
            colorCarta,
            avatarTipo: avatar.substring(0, 20) + '...' 
        });
        
        // Validaciones
        if (!nombre || !mensaje) {
            alert('⚠️ Por favor completa todos los campos obligatorios.');
            return;
        }
        
        if (nombre.length < 2) {
            alert('⚠️ El nombre debe tener al menos 2 caracteres.');
            return;
        }
        
        if (mensaje.length < 10) {
            alert('⚠️ El testimonio debe tener al menos 10 caracteres.');
            return;
        }
        
        // Mostrar estado de carga
        const btnSubmit = formCrearTestimonio.querySelector('.btn-crear-testimonio');
        const textoOriginal = btnSubmit.textContent;
        btnSubmit.textContent = 'Creando...';
        btnSubmit.classList.add('enviando');
        
        // Simular delay de creación
        setTimeout(() => {
            try {
                console.log('🎯 Iniciando creación de testimonio...');
                crearNuevoTestimonio(nombre, mensaje, color, avatar, colorSobre, colorCarta);
                
                // Restaurar botón
                btnSubmit.textContent = textoOriginal;
                btnSubmit.classList.remove('enviando');
                
                // Cerrar modal
                cerrarModal();
                
                // Mostrar mensaje de éxito
                alert('🎉 ¡Tu testimonio ha sido creado exitosamente!\n¡Gracias por compartir tu experiencia!');
                
                console.log('✅ Testimonio creado con éxito');
            } catch (error) {
                console.error('❌ Error al crear testimonio:', error);
                
                // Restaurar botón en caso de error
                btnSubmit.textContent = textoOriginal;
                btnSubmit.classList.remove('enviando');
                
                // Mostrar error al usuario
                alert('❌ Error al crear el testimonio. Por favor, inténtalo de nuevo.\n\nDetalle: ' + error.message);
            }
        }, 1500);
    });
    
    // === FUNCIÓN PARA CREAR NUEVO TESTIMONIO ===
    function crearNuevoTestimonio(nombre, mensaje, color, avatar, colorSobre = '#e8e8e8', colorCarta = '#d1c1e0') {
        try {
            console.log('📋 Datos del testimonio:', { nombre, mensaje, color, avatar });
            
            // Validar que todos los elementos necesarios existen
            if (!testimoniosContainer) {
                throw new Error('No se encontró el contenedor de testimonios');
            }
            
            // Generar ID único
            const testimonioId = Date.now();
            console.log('🔢 ID generado:', testimonioId);
            
            // Generar colores pastel para el sobre
            const coloresSobre = generarVariacionesPastel(colorSobre);
            console.log('🎨 Colores del sobre generados:', coloresSobre);
            
            // Generar color pastel para la carta
            const colorCartaPastel = convertirAPastel(colorCarta);
            console.log('🎨 Color pastel de la carta generado:', colorCartaPastel);
            
            // Crear el HTML del nuevo testimonio completo con TODOS los elementos
            const nuevoTestimonioHTML = `
                <div class="testimonio-carta-wrapper">
                    <svg class="sobre-cerrado" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" data-color-carta="${colorCarta}">
                        <!-- Definiciones para sombras y gradientes -->
                        <defs>
                            <filter id="sombraSobre${testimonioId}" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                                <feOffset dx="2" dy="5" result="offset"/>
                                <feFlood flood-color="#000" flood-opacity="0.2"/>
                                <feComposite in2="offset" operator="in"/>
                                <feMerge>
                                    <feMergeNode/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            <filter id="sombraHoja${testimonioId}" x="-10%" y="-10%" width="120%" height="120%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                                <feOffset dx="0" dy="1" result="offset"/>
                                <feFlood flood-color="#000" flood-opacity="0.15"/>
                                <feComposite in2="offset" operator="in"/>
                                <feMerge>
                                    <feMergeNode/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            <filter id="sombraSello${testimonioId}" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                                <feOffset dx="1" dy="3" result="offset"/>
                                <feFlood flood-color="#000" flood-opacity="0.4"/>
                                <feComposite in2="offset" operator="in"/>
                                <feMerge>
                                    <feMergeNode/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            <radialGradient id="gradienteSello${testimonioId}" cx="0.3" cy="0.3" r="0.8">
                                <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                                <stop offset="60%" style="stop-color:${color};stop-opacity:0.8" />
                                <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
                            </radialGradient>
                            <linearGradient id="gradienteCuerpo${testimonioId}" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${coloresSobre.cuerpo};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${coloresSobre.cuerpo};stop-opacity:0.9" />
                            </linearGradient>
                            <linearGradient id="gradienteTapa${testimonioId}" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:${coloresSobre.solapa};stop-opacity:1" />
                                <stop offset="100%" style="stop-color:${coloresSobre.solapa};stop-opacity:0.9" />
                            </linearGradient>
                        </defs>
                        
                        <!-- Cuerpo principal del sobre -->
                        <rect x="80" y="120" width="240" height="140" fill="url(#gradienteCuerpo${testimonioId})" stroke="${coloresSobre.solapa}" stroke-width="2" rx="3" filter="url(#sombraSobre${testimonioId})"/>
                        
                        <!-- Forma en X (parte trasera del sobre cerrado) -->
                        <polygon points="80,120 200,200 320,120 320,260 200,200 80,260" fill="${coloresSobre.cuerpo}" stroke="${coloresSobre.solapa}" stroke-width="1" opacity="0.4"/>
                        
                        <!-- Hoja/carta que se desliza hacia arriba en hover - OCULTA INICIALMENTE -->
                        <g class="carta-contenido" transform="translate(0,0)">
                            <!-- Papel de la carta -->
                            <rect x="90" y="130" width="220" height="120" fill="${colorCartaPastel}" stroke="#e0e0e0" stroke-width="1" rx="2" filter="url(#sombraHoja${testimonioId})" opacity="0.95"/>
                            
                            <!-- Contenido del testimonio -->
                            <foreignObject x="100" y="140" width="200" height="100">
                                <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Quicksand', sans-serif; font-size: 11px; line-height: 1.4; color: #333; padding: 8px; text-align: justify;">
                                    "${mensaje}"
                                </div>
                            </foreignObject>
                        </g>
                        
                        <!-- Bordes tricolores del sobre aéreo -->
                        <!-- Borde izquierdo -->
                        <rect x="80" y="120" width="6" height="12" fill="#dc3545"/>
                        <rect x="80" y="132" width="6" height="12" fill="#ffffff"/>
                        <rect x="80" y="144" width="6" height="12" fill="#007bff"/>
                        <rect x="80" y="156" width="6" height="12" fill="#dc3545"/>
                        <rect x="80" y="168" width="6" height="12" fill="#ffffff"/>
                        <rect x="80" y="180" width="6" height="12" fill="#007bff"/>
                        <rect x="80" y="192" width="6" height="12" fill="#dc3545"/>
                        <rect x="80" y="204" width="6" height="12" fill="#ffffff"/>
                        <rect x="80" y="216" width="6" height="12" fill="#007bff"/>
                        <rect x="80" y="228" width="6" height="12" fill="#dc3545"/>
                        <rect x="80" y="240" width="6" height="12" fill="#ffffff"/>
                        <rect x="80" y="252" width="6" height="8" fill="#007bff"/>
                        
                        <!-- Borde derecho -->
                        <rect x="314" y="120" width="6" height="12" fill="#dc3545"/>
                        <rect x="314" y="132" width="6" height="12" fill="#ffffff"/>
                        <rect x="314" y="144" width="6" height="12" fill="#007bff"/>
                        <rect x="314" y="156" width="6" height="12" fill="#dc3545"/>
                        <rect x="314" y="168" width="6" height="12" fill="#ffffff"/>
                        <rect x="314" y="180" width="6" height="12" fill="#007bff"/>
                        <rect x="314" y="192" width="6" height="12" fill="#dc3545"/>
                        <rect x="314" y="204" width="6" height="12" fill="#ffffff"/>
                        <rect x="314" y="216" width="6" height="12" fill="#007bff"/>
                        <rect x="314" y="228" width="6" height="12" fill="#dc3545"/>
                        <rect x="314" y="240" width="6" height="12" fill="#ffffff"/>
                        <rect x="314" y="252" width="6" height="8" fill="#007bff"/>
                        
                        <!-- Borde inferior -->
                        <rect x="86" y="254" width="12" height="6" fill="#dc3545"/>
                        <rect x="98" y="254" width="12" height="6" fill="#ffffff"/>
                        <rect x="110" y="254" width="12" height="6" fill="#007bff"/>
                        <rect x="122" y="254" width="12" height="6" fill="#dc3545"/>
                        <rect x="134" y="254" width="12" height="6" fill="#ffffff"/>
                        <rect x="146" y="254" width="12" height="6" fill="#007bff"/>
                        <rect x="158" y="254" width="12" height="6" fill="#dc3545"/>
                        <rect x="170" y="254" width="12" height="6" fill="#ffffff"/>
                        <rect x="182" y="254" width="12" height="6" fill="#007bff"/>
                        <rect x="194" y="254" width="12" height="6" fill="#dc3545"/>
                        <rect x="206" y="254" width="12" height="6" fill="#ffffff"/>
                        <rect x="218" y="254" width="12" height="6" fill="#007bff"/>
                        <rect x="230" y="254" width="12" height="6" fill="#dc3545"/>
                        <rect x="242" y="254" width="12" height="6" fill="#ffffff"/>
                        <rect x="254" y="254" width="12" height="6" fill="#007bff"/>
                        <rect x="266" y="254" width="12" height="6" fill="#dc3545"/>
                        <rect x="278" y="254" width="12" height="6" fill="#ffffff"/>
                        <rect x="290" y="254" width="12" height="6" fill="#007bff"/>
                        <rect x="302" y="254" width="12" height="6" fill="#dc3545"/>
                        <rect x="314" y="254" width="6" height="6" fill="#ffffff"/>
                        
                        <!-- Solapa del sobre que se abre en hover -->
                        <g class="solapa-sobre" transform-origin="200 120">
                            <!-- Tapa cerrada del sobre -->
                            <polygon points="80,120 200,200 320,120" fill="url(#gradienteTapa${testimonioId})" stroke="${coloresSobre.solapa}" stroke-width="2" filter="url(#sombraSobre${testimonioId})"/>
                            
                            <!-- Línea de sellado -->
                            <line x1="80" y1="120" x2="320" y2="120" stroke="${coloresSobre.solapa}" stroke-width="1.5" opacity="0.9"/>
                            
                            <!-- Sombra interior de sellado -->
                            <polygon points="80,120 200,200 320,120 300,130 200,185 100,130" fill="${coloresSobre.cuerpo}" opacity="0.7"/>
                            
                            <!-- Sello redondo con avatar en el centro del sobre (sobre la solapa) -->
                            <circle cx="200" cy="160" r="22" fill="#ffffff" stroke="#ddd" stroke-width="2" filter="url(#sombraSello${testimonioId})" opacity="0.95"/>
                            <circle cx="200" cy="160" r="20" fill="none" stroke="#ccc" stroke-width="1" opacity="0.8"/>
                            <image x="182" y="142" width="36" height="36" href="${avatar}" opacity="0.9"/>
                        </g>
                        
                        <!-- Firma manuscrita en la parte inferior izquierda del sobre -->
                        <text x="110" y="240" font-family="'Great Vibes', 'Dancing Script', cursive" font-size="16" font-weight="400" fill="${color}" transform="rotate(3 110 240)">
                            ${nombre}
                        </text>
                    </svg>
                </div>
            `;
            
            console.log('📝 HTML generado, creando elemento...');
            
            // Crear elemento temporal para convertir HTML en elemento DOM
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = nuevoTestimonioHTML;
            const nuevoTestimonio = tempDiv.firstElementChild;
            
            if (!nuevoTestimonio) {
                throw new Error('No se pudo crear el elemento del testimonio');
            }
            
            console.log('🎨 Elemento creado, aplicando estilos...');
            
            // Añadir animación de entrada
            nuevoTestimonio.style.opacity = '0';
            nuevoTestimonio.style.transform = 'translateY(30px) scale(0.9)';
            nuevoTestimonio.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // Insertar el nuevo testimonio de forma segura
            console.log('🔍 Buscando dónde insertar el testimonio...');
            
            // Verificar la estructura del testimonios-container
            console.log('📊 Contenedor de testimonios:', testimoniosContainer);
            console.log('� Hijos del contenedor:', testimoniosContainer.children.length);
            
            // Simplemente añadir al final del contenedor de testimonios
            console.log('📍 Insertando al final del contenedor de testimonios...');
            testimoniosContainer.appendChild(nuevoTestimonio);
            
            console.log('🏗️ Elemento insertado en el DOM');
            
            // Animar entrada
            setTimeout(() => {
                nuevoTestimonio.style.opacity = '1';
                nuevoTestimonio.style.transform = 'translateY(0) scale(1)';
                console.log('✨ Animación de entrada aplicada');
            }, 100);
            
            // Configurar funcionalidad GSAP completa después de que se añada al DOM
            setTimeout(() => {
                const nuevoSobre = nuevoTestimonio.querySelector('.sobre-cerrado');
                if (nuevoSobre) {
                    console.log('🎯 Configurando animaciones GSAP completas para el nuevo testimonio...');
                    
                    // Usar la función global de configuración GSAP
                    if (window.configurarAnimacionSobre) {
                        window.configurarAnimacionSobre(nuevoSobre);
                        console.log('✅ Animaciones GSAP configuradas exitosamente');
                    } else {
                        console.warn('⚠️ Función configurarAnimacionSobre no disponible, usando fallback');
                        // Fallback básico si GSAP no está disponible
                        nuevoSobre.style.cursor = 'pointer';
                        nuevoSobre.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('👆 Click en nuevo testimonio (modo básico)');
                            
                            // Animación básica de apertura
                            nuevoSobre.classList.toggle('activo');
                            
                            // Mostrar mensaje simple
                            if (nuevoSobre.classList.contains('activo')) {
                                alert(`📖 Testimonio de ${nombre}:\n\n"${mensaje}"`);
                            }
                        });
                    }
                } else {
                    console.warn('⚠️ No se encontró el sobre en el nuevo testimonio');
                }
            }, 300);
            
            console.log('✨ Nuevo testimonio creado exitosamente');
            
        } catch (error) {
            console.error('❌ Error en crearNuevoTestimonio:', error);
            throw error; // Re-lanzar el error para que lo capture el try-catch superior
        }
    }
    
    console.log('🎉 Modal crear testimonio inicializado correctamente');
});

// Funcionalidad de Avatar Personalizado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Inicializando sistema de avatar personalizado...');
    
    const avatarInput = document.getElementById('avatar-testimonio');
    const avatarPreviewImg = document.getElementById('avatar-preview-img');
    const avatarPreview = document.getElementById('avatar-preview');
    
    // Variable global para almacenar la imagen procesada
    window.avatarPersonalizadoPNG = null;
    
    if (avatarInput && avatarPreviewImg && avatarPreview) {
        
        // Agregar evento de click al contenedor de preview
        avatarPreview.addEventListener('click', function() {
            avatarInput.click();
        });
        
        // Manejar la selección de archivo
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                console.log('📁 Archivo seleccionado:', file.name, 'Tipo:', file.type, 'Tamaño:', (file.size / 1024).toFixed(2) + 'KB');
                
                // Validar que sea una imagen
                if (!file.type.startsWith('image/')) {
                    alert('❌ Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF, etc.)');
                    return;
                }
                
                // Validar tamaño (máximo 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('❌ La imagen es demasiado grande. Por favor selecciona una imagen menor a 5MB.');
                    return;
                }
                
                // Procesar la imagen
                procesarImagenAvatar(file);
            }
        });
        
        console.log('✅ Sistema de avatar personalizado configurado');
    } else {
        console.warn('⚠️ No se encontraron elementos del avatar personalizado');
    }
    
    function procesarImagenAvatar(file) {
        console.log('🔄 Procesando imagen...');
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                console.log('📐 Imagen cargada - Dimensiones:', img.width, 'x', img.height);
                
                // Crear canvas para procesar la imagen
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Establecer tamaño del canvas (cuadrado para círculo perfecto)
                const size = 200; // Tamaño fijo para mejor calidad
                canvas.width = size;
                canvas.height = size;
                
                // Calcular dimensiones para crop centrado
                const sourceSize = Math.min(img.width, img.height);
                const sourceX = (img.width - sourceSize) / 2;
                const sourceY = (img.height - sourceSize) / 2;
                
                // Limpiar canvas con fondo transparente
                ctx.clearRect(0, 0, size, size);
                
                // Crear máscara circular
                ctx.save();
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.clip();
                
                // Dibujar imagen recortada y redimensionada
                ctx.drawImage(
                    img,
                    sourceX, sourceY, sourceSize, sourceSize, // Fuente (crop cuadrado centrado)
                    0, 0, size, size // Destino (canvas completo)
                );
                
                ctx.restore();
                
                // Convertir a PNG y actualizar preview
                const pngDataURL = canvas.toDataURL('image/png', 1.0);
                
                // Almacenar globalmente para uso posterior
                window.avatarPersonalizadoPNG = pngDataURL;
                
                // Actualizar preview
                avatarPreviewImg.src = pngDataURL;
                
                console.log('✅ Imagen procesada y convertida a PNG circular');
                console.log('💾 Tamaño del PNG:', (pngDataURL.length * 0.75 / 1024).toFixed(2) + 'KB');
                
                // Mostrar mensaje de éxito
                mostrarMensajeExito('🎨 Avatar personalizado cargado correctamente');
                
            };
            img.onerror = function() {
                console.error('❌ Error al cargar la imagen');
                alert('❌ Error al procesar la imagen. Por favor intenta con otra imagen.');
            };
            img.src = e.target.result;
        };
        
        reader.onerror = function() {
            console.error('❌ Error al leer el archivo');
            alert('❌ Error al leer el archivo. Por favor intenta nuevamente.');
        };
        
        reader.readAsDataURL(file);
    }
    
    function mostrarMensajeExito(mensaje) {
        // Crear elemento de notificación temporal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 100000;
            font-family: 'Quicksand', sans-serif;
            font-weight: 600;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        notification.textContent = mensaje;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
});
  
