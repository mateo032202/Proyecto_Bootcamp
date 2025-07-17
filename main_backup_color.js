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
    console.log('🎭 Inicializando funcionalidad de creación de testimonios...');
    
    // Contador de testimonios únicos para IDs únicos
    let testimonioCounter = 4; // Empezamos en 4 porque ya hay 3 testimonios existentes
    
    const form = document.getElementById('testimonio-form');
    const testimonioTexto = document.getElementById('testimonio-texto');
    const charCounter = document.querySelector('.char-counter');
    
    console.log('📋 Elementos del formulario:');
    console.log('Formulario:', form ? '✅' : '❌');
    console.log('Textarea:', testimonioTexto ? '✅' : '❌');
    console.log('Contador:', charCounter ? '✅' : '❌');
    
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
    
    // Selector de colores pasteles para el sobre
    const colorOptions = document.querySelectorAll('.color-option');
    const colorSelectedText = document.querySelector('.color-selected-text');
    let sobreColorSeleccionado = '#FAFAFA'; // Color por defecto
    
    console.log('🎨 Configurando selector de colores pasteles...');
    console.log('Opciones de color encontradas:', colorOptions.length);
    
    // Mapeo de colores a nombres descriptivos
    const coloresNombres = {
        '#E8F5E8': 'Verde Pastel',
        '#E8F0FF': 'Azul Pastel', 
        '#FFE8F0': 'Rosa Pastel',
        '#FFF8E8': 'Amarillo Pastel',
        '#F0E8FF': 'Lavanda Pastel',
        '#E8F8FF': 'Celeste Pastel',
        '#F8F0E8': 'Durazno Pastel',
        '#F0F8E8': 'Menta Pastel',
        '#FAFAFA': 'Blanco Clásico'
    };
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            console.log('🎯 Click en opción de color:', this.dataset.color);
            
            // Remover selección anterior
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Seleccionar el color clickeado
            this.classList.add('selected');
            sobreColorSeleccionado = this.dataset.color;
            
            // Actualizar texto descriptivo
            const nombreColor = coloresNombres[sobreColorSeleccionado] || 'Color Personalizado';
            if (colorSelectedText) {
                colorSelectedText.textContent = `Color seleccionado: ${nombreColor}`;
            }
            
            console.log('🎨 Color de sobre seleccionado:', sobreColorSeleccionado, '-', nombreColor);
            console.log('🔍 Variable global sobreColorSeleccionado actualizada a:', sobreColorSeleccionado);
        });
    });
    
    // Funcionalidad del formulario
    if (form) {
        console.log('✅ Configurando event listener del formulario');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulario enviado');
            
            const nombre = document.getElementById('testimonio-nombre').value.trim();
            const texto = document.getElementById('testimonio-texto').value.trim();
            const colorFirma = document.getElementById('testimonio-color').value;
            
            console.log('📊 Datos del formulario:');
            console.log('Nombre:', nombre);
            console.log('Texto:', texto.substring(0, 50) + '...');
            console.log('Color firma:', colorFirma);
            console.log('Color sobre ANTES de enviar:', sobreColorSeleccionado);
            console.log('Elemento seleccionado:', document.querySelector('.color-option.selected'));
            
            // Verificar que el color seleccionado esté correcto
            const selectedElement = document.querySelector('.color-option.selected');
            if (selectedElement) {
                const colorFromElement = selectedElement.dataset.color;
                console.log('Color desde elemento seleccionado:', colorFromElement);
                if (colorFromElement !== sobreColorSeleccionado) {
                    console.warn('⚠️ Discrepancia en color! Corrigiendo...');
                    sobreColorSeleccionado = colorFromElement;
                }
            }
            
            console.log('Color sobre FINAL a usar:', sobreColorSeleccionado);
            
            if (!nombre || !texto) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            if (texto.length > 250) {
                alert('El testimonio no puede exceder los 250 caracteres.');
                return;
            }
            
            console.log('🚀 Creando nuevo testimonio...');
            crearNuevoTestimonio(nombre, texto, colorFirma, sobreColorSeleccionado);
            
            // Limpiar formulario
            form.reset();
            if (charCounter) {
                charCounter.textContent = '0/250 caracteres';
                charCounter.style.color = '#7f8c8d';
            }
            
            // Resetear selector de colores al blanco clásico
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            const defaultColor = document.querySelector('.color-option[data-color="#FAFAFA"]');
            if (defaultColor) {
                defaultColor.classList.add('selected');
                sobreColorSeleccionado = '#FAFAFA';
                if (colorSelectedText) {
                    colorSelectedText.textContent = 'Color seleccionado: Blanco Clásico';
                }
            }
            
            // Mensaje de confirmación
            alert('¡Testimonio creado exitosamente!');
        });
    } else {
        console.error('❌ No se encontró el formulario de testimonios');
    }
    
    function crearNuevoTestimonio(nombre, texto, colorFirma, colorSobre) {
        console.log('🎭 Iniciando creación de nuevo testimonio');
        console.log('🎨 Color del sobre a aplicar:', colorSobre);
        
        // En lugar de usar el template, vamos a clonar un sobre existente
        const sobreExistente = document.querySelector('.testimonio-carta-wrapper');
        const container = document.querySelector('.testimonios-container');
        
        console.log('📦 Elementos necesarios:');
        console.log('Sobre existente:', sobreExistente ? '✅' : '❌');
        console.log('Container:', container ? '✅' : '❌');
        
        if (!sobreExistente || !container) {
            console.error('❌ Sobre existente o container no encontrado');
            alert('Error: No se pueden encontrar los elementos necesarios para crear el testimonio');
            return;
        }
        
        // Clonar el primer sobre existente (que ya funciona correctamente)
        console.log('📋 Clonando sobre existente que funciona...');
        const nuevoTestimonio = sobreExistente.cloneNode(true);
        
        // Crear IDs únicos para los filtros y gradientes
        const uniqueId = testimonioCounter++;
        const newSVG = nuevoTestimonio.querySelector('svg');
        
        console.log('🔧 Preparando sobre con ID único:', uniqueId);
        
        // PASO 1: ACTUALIZAR IDs PRIMERO para evitar conflictos
        console.log('🔧 Actualizando IDs únicos con sufijo:', uniqueId);
        const filters = newSVG.querySelectorAll('filter, linearGradient, radialGradient');
        console.log('🎨 Filtros y gradientes encontrados:', filters.length);
        
        // Mapa para rastrear los cambios de ID
        const idMap = new Map();
        
        filters.forEach(filter => {
            const oldId = filter.id;
            const newId = oldId + uniqueId;
            idMap.set(oldId, newId);
            filter.id = newId;
            console.log(`🔄 ID actualizado: ${oldId} -> ${newId}`);
        });
        
        // Actualizar todas las referencias a los IDs antiguos
        idMap.forEach((newId, oldId) => {
            const references = newSVG.querySelectorAll(`[filter*="${oldId}"], [fill*="${oldId}"]`);
            references.forEach(ref => {
                if (ref.getAttribute('filter') && ref.getAttribute('filter').includes(oldId)) {
                    ref.setAttribute('filter', `url(#${newId})`);
                }
                if (ref.getAttribute('fill') && ref.getAttribute('fill').includes(oldId)) {
                    ref.setAttribute('fill', `url(#${newId})`);
                }
            });
        });
        
        // PASO 2: APLICAR COLOR DEL SOBRE DESPUÉS de cambiar IDs
        console.log('🎨 Aplicando color del sobre...');
        console.log('🎨 Color recibido:', colorSobre);
        
        // Buscar el gradiente del cuerpo con el nuevo ID
        const gradienteCuerpo = newSVG.querySelector('linearGradient[id*="gradienteCuerpo"]');
        console.log('🔍 Gradiente encontrado DESPUÉS de cambiar IDs:', gradienteCuerpo ? gradienteCuerpo.id : 'NO ENCONTRADO');
        
        if (gradienteCuerpo) {
            const stops = gradienteCuerpo.querySelectorAll('stop');
            console.log('📍 Stops encontrados en gradiente:', stops.length);
            
            if (stops.length >= 2) {
                if (colorSobre && colorSobre !== '#FAFAFA' && colorSobre !== '#fafafa') {
                    // Aplicar color personalizado
                    stops[0].setAttribute('stop-color', colorSobre);
                    const darkerColor = adjustBrightness(colorSobre, -10);
                    stops[1].setAttribute('stop-color', darkerColor);
                    console.log('✅ Color personalizado aplicado:', colorSobre, '->', darkerColor);
                } else {
                    // Aplicar color blanco por defecto
                    stops[0].setAttribute('stop-color', '#fafafa');
                    stops[1].setAttribute('stop-color', '#f0f0f0');
                    console.log('✅ Color blanco clásico aplicado');
                }
            } else {
                console.error('❌ No se encontraron suficientes stops en el gradiente');
            }
        } else {
            console.error('❌ No se pudo encontrar el gradiente del cuerpo del sobre');
            // Método alternativo: aplicar color directamente al rectángulo del cuerpo
            const rectanguloSobre = newSVG.querySelector('rect[x="80"][y="120"][width="240"][height="140"]');
            if (rectanguloSobre) {
                if (colorSobre && colorSobre !== '#FAFAFA' && colorSobre !== '#fafafa') {
                    rectanguloSobre.setAttribute('fill', colorSobre);
                    console.log('✅ Color aplicado directamente al rectángulo:', colorSobre);
                } else {
                    rectanguloSobre.setAttribute('fill', '#fafafa');
                    console.log('✅ Color blanco aplicado directamente al rectángulo');
                }
            }
        }
        
        // PASO 3: Método adicional - aplicar color a todos los rectángulos principales del sobre
        const rectangulosSobre = newSVG.querySelectorAll('rect[width="240"][height="140"]');
        console.log('🔍 Rectángulos del sobre encontrados:', rectangulosSobre.length);
        rectangulosSobre.forEach((rect, index) => {
            if (colorSobre && colorSobre !== '#FAFAFA' && colorSobre !== '#fafafa') {
                // Solo cambiar si no está usando un gradiente específico
                const fillAttr = rect.getAttribute('fill');
                if (fillAttr && fillAttr.includes('gradienteCuerpo')) {
                    console.log(`📦 Rectángulo ${index} usa gradiente, ya configurado`);
                } else {
                    rect.setAttribute('fill', colorSobre);
                    console.log(`📦 Rectángulo ${index} color aplicado directamente:`, colorSobre);
                }
            }
        });
        
        // Actualizar el contenido del testimonio
        console.log('📝 Actualizando contenido del testimonio...');
        const contenidoDiv = nuevoTestimonio.querySelector('foreignObject div');
        if (contenidoDiv) {
            contenidoDiv.textContent = `"${texto}"`;
            console.log('✅ Contenido actualizado');
        } else {
            console.error('❌ No se encontró foreignObject div');
        }
        
        // Actualizar la firma con el nombre y color seleccionado
        console.log('✍️ Actualizando firma...');
        const firmaText = nuevoTestimonio.querySelector('text:last-of-type');
        if (firmaText) {
            firmaText.textContent = nombre;
            firmaText.setAttribute('fill', colorFirma);
            
            // Variar ligeramente la rotación de la firma para que se vea más natural
            const rotacionAleatoria = Math.random() * 6 - 3; // Entre -3 y 3 grados
            const transform = `rotate(${rotacionAleatoria} 110 240)`;
            firmaText.setAttribute('transform', transform);
            
            console.log('✅ Firma actualizada:', nombre, 'Color:', colorFirma, 'Rotación:', rotacionAleatoria + '°');
        } else {
            console.error('❌ No se encontró elemento de firma');
        }
        
        // Limpiar cualquier estado activo del sobre clonado
        const nuevoSobre = nuevoTestimonio.querySelector('.sobre-cerrado');
        if (nuevoSobre) {
            nuevoSobre.classList.remove('activo');
            nuevoSobre.removeAttribute('data-gsap-configured');
            console.log('🧹 Estado anterior limpiado del sobre clonado');
        }
        
        // Agregar el nuevo testimonio al container
        console.log('➕ Agregando nuevo testimonio al container...');
        container.appendChild(nuevoTestimonio);
        console.log('✅ Testimonio agregado al DOM');
        
        // VERIFICACIÓN FINAL DEL COLOR - forzar aplicación del color
        setTimeout(() => {
            console.log('🔍 Verificación final del color del sobre...');
            verificarYAplicarColorFinal(newSVG, colorSobre);
        }, 50);
        
        // Aplicar las animaciones GSAP al nuevo sobre
        console.log('🎭 Aplicando animaciones...');
        if (nuevoSobre) {
            aplicarAnimacionesAlNuevoSobre(nuevoSobre);
        } else {
            console.error('❌ No se encontró .sobre-cerrado en el nuevo testimonio');
        }
        
        // También reinicializar todas las animaciones para incluir el nuevo elemento
        setTimeout(function() {
            console.log('🔄 Reinicializando sistema de animaciones...');
            if (typeof window.inicializarAnimacionesCartas === 'function') {
                window.inicializarAnimacionesCartas();
                console.log('✅ Sistema de animaciones reinicializado');
            } else {
                console.error('❌ Función inicializarAnimacionesCartas no disponible');
            }
        }, 100);
        
        console.log('🎉 Nuevo testimonio creado exitosamente:', nombre);
    }
    
    // Función para verificar y aplicar color final al sobre
    function verificarYAplicarColorFinal(svg, colorSobre) {
        console.log('🔍 Verificación final - Color a aplicar:', colorSobre);
        
        if (!colorSobre || colorSobre === '#FAFAFA' || colorSobre === '#fafafa') {
            console.log('✅ Color blanco - no se requiere cambio');
            return;
        }
        
        // Método 1: Buscar y actualizar el gradiente
        const gradiente = svg.querySelector('linearGradient[id*="gradienteCuerpo"]');
        if (gradiente) {
            const stops = gradiente.querySelectorAll('stop');
            if (stops.length >= 2) {
                stops[0].setAttribute('stop-color', colorSobre);
                const darkerColor = adjustBrightness(colorSobre, -10);
                stops[1].setAttribute('stop-color', darkerColor);
                console.log('✅ Verificación - Gradiente actualizado:', colorSobre, '->', darkerColor);
            }
        }
        
        // Método 2: Buscar todos los rectángulos del cuerpo del sobre y aplicar color
        const rectangulosSobre = svg.querySelectorAll('rect[width="240"][height="140"]');
        rectangulosSobre.forEach((rect, index) => {
            const fillAttr = rect.getAttribute('fill');
            if (fillAttr && fillAttr.includes('gradienteCuerpo')) {
                console.log(`📦 Verificación - Rectángulo ${index} usa gradiente correcto`);
            } else {
                rect.setAttribute('fill', colorSobre);
                console.log(`📦 Verificación - Color aplicado directamente al rectángulo ${index}:`, colorSobre);
            }
        });
        
        // Método 3: Buscar por coordenadas específicas del cuerpo del sobre
        const rectanguloEspecifico = svg.querySelector('rect[x="80"][y="120"][width="240"][height="140"]');
        if (rectanguloEspecifico) {
            const currentFill = rectanguloEspecifico.getAttribute('fill');
            if (!currentFill || (!currentFill.includes('gradienteCuerpo') && currentFill !== colorSobre)) {
                rectanguloEspecifico.setAttribute('fill', colorSobre);
                console.log('📦 Verificación - Color aplicado al rectángulo específico:', colorSobre);
            }
        }
        
        console.log('✅ Verificación final completada');
    }
    
    // Función para aplicar animaciones GSAP a un nuevo sobre
    function aplicarAnimacionesAlNuevoSobre(sobre) {
        console.log('🎭 Aplicando animaciones al nuevo sobre...');
        
        if (!sobre) {
            console.error('❌ No se proporcionó elemento sobre');
            return;
        }
        
        if (sobre.dataset.gsapConfigured) {
            console.log('⚠️ El sobre ya tiene animaciones configuradas');
            return;
        }
        
        sobre.dataset.gsapConfigured = 'true';
        sobre.style.cursor = 'pointer';
        
        console.log('✅ Configurando event listener para el nuevo sobre');
        
        sobre.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🎯 Click detectado en nuevo sobre');
            
            // Evitar múltiples animaciones
            if (document.querySelector('.carta-animada')) {
                console.log('⏸️ Animación en curso, ignorando click');
                return;
            }
            
            // Verificar que las funciones globales estén disponibles
            console.log('🔍 Verificando funciones globales:');
            console.log('abrirSobre:', typeof window.abrirSobre);
            console.log('ejecutarAnimacionCompleta:', typeof window.ejecutarAnimacionCompleta);
            
            // Usar las mismas funciones que usa carta-gsap-fixed.js
            if (typeof window.abrirSobre === 'function' && typeof window.ejecutarAnimacionCompleta === 'function') {
                console.log('🚀 Iniciando secuencia de animación...');
                
                // Primero animar la apertura del sobre (CSS puro)
                window.abrirSobre(sobre);
                
                // Después ejecutar la animación de la carta con GSAP
                setTimeout(function() {
                    console.log('📋 Ejecutando animación completa de la carta...');
                    window.ejecutarAnimacionCompleta(sobre);
                }, 800);
            } else {
                console.error('❌ Funciones de animación no disponibles');
                console.log('Intentando cargar funciones desde carta-gsap-fixed.js...');
                
                // Intentar usar las funciones directamente si están definidas
                if (typeof abrirSobre === 'function' && typeof ejecutarAnimacionCompleta === 'function') {
                    console.log('✅ Usando funciones locales');
                    abrirSobre(sobre);
                    setTimeout(function() {
                        ejecutarAnimacionCompleta(sobre);
                    }, 800);
                } else {
                    alert('Error: Las animaciones no están disponibles. Por favor, recarga la página.');
                }
            }
        });
        
        console.log('✅ Animaciones configuradas para el nuevo sobre');
    }
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

// Función auxiliar para aplicar color al sobre como respaldo
function aplicarColorSobreRespaldo(svg, color) {
    console.log('🔧 Aplicando color de respaldo al sobre:', color);
    
    // Método 1: Buscar todos los elementos que tengan fill con gradiente del cuerpo
    const elementosConGradiente = svg.querySelectorAll('[fill*="gradienteCuerpo"]');
    console.log('🎯 Elementos con gradiente del cuerpo encontrados:', elementosConGradiente.length);
    
    elementosConGradiente.forEach((elemento, index) => {
        if (color && color !== '#FAFAFA') {
            elemento.setAttribute('fill', color);
            console.log(`✅ Color ${color} aplicado al elemento ${index + 1}`);
        }
    });
    
    // Método 2: Buscar rectángulo principal por posición y tamaño
    const rectPrincipal = svg.querySelector('rect[x="80"][y="120"][width="240"][height="140"]');
    if (rectPrincipal && color && color !== '#FAFAFA') {
        rectPrincipal.setAttribute('fill', color);
        console.log('✅ Color aplicado al rectángulo principal por coordenadas');
    }
    
    return elementosConGradiente.length > 0 || rectPrincipal;
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
  
