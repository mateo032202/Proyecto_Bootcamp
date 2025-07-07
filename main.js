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

document.addEventListener('DOMContentLoaded', function () {
    const crearBtn = document.getElementById('crear-testimonio');
    if (crearBtn) {
        crearBtn.addEventListener('click', function () {
            mostrarModalTestimonio();
        });
    }
});

function mostrarModalTestimonio() {
    if (document.getElementById('modal-testimonio')) return;
    const modal = document.createElement('div');
    modal.id = 'modal-testimonio';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <h3>Comparte tu historia</h3>
            <textarea id="nueva-historia" placeholder="Escribe tu experiencia..." rows="5"></textarea>
            <input id="nuevo-autor" type="text" placeholder="Tu nombre o seudónimo" maxlength="30" />
            <div class="modal-actions">
                <button id="guardar-testimonio">Guardar</button>
                <button id="cancelar-testimonio">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('cancelar-testimonio').onclick = () => modal.remove();
    document.getElementById('guardar-testimonio').onclick = function () {
        const texto = document.getElementById('nueva-historia').value.trim();
        const autor = document.getElementById('nuevo-autor').value.trim() || 'Anónimo';
        if (texto.length > 0) {
            agregarTestimonio(texto, autor);
            modal.remove();
        } else {
            document.getElementById('nueva-historia').focus();
        }
    };
}

function agregarTestimonio(texto, autor) {
    const container = document.querySelector('.testimonios-container');
    if (!container) return;
    const card = document.createElement('div');
    card.className = 'testimonio-card';
    card.innerHTML = `<p class="testimonio-text">"${texto}"</p><span class="testimonio-author">- ${autor}</span>`;
    container.insertBefore(card, container.firstChild);
}

document.addEventListener('DOMContentLoaded', function () {
    const navTestimonios = document.querySelector('a[href="#testimonios"]');
    const testimoniosSection = document.querySelector('.testimonios-section');
    if (navTestimonios && testimoniosSection) {
        navTestimonios.addEventListener('click', function(e) {
            e.preventDefault();
            testimoniosSection.style.display = 'block';
            testimoniosSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainSections = [
        document.getElementById('inicio'),
        document.querySelector('.testimonios-section'),
        document.getElementById('nosotros'),
        document.getElementById('recursos'),
        document.getElementById('contacto'),
        // Agrega aquí otras secciones si las tienes
    ];
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && (href === '#testimonios' || href === 'testimonios.html')) {
                e.preventDefault();
                mainSections.forEach(sec => {
                    if (sec) sec.style.display = 'none';
                });
                const testimoniosSection = document.querySelector('.testimonios-section');
                if (testimoniosSection) {
                    testimoniosSection.style.display = 'block';
                    testimoniosSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (href && href === 'nostros.html') {
                e.preventDefault();
                mainSections.forEach(sec => {
                    if (sec) sec.style.display = 'none';
                });
                const nosotrosSection = document.getElementById('nosotros');
                if (nosotrosSection) {
                    nosotrosSection.style.display = 'block';
                    nosotrosSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (href && href.startsWith('#')) {
                e.preventDefault();
                mainSections.forEach(sec => {
                    if (sec) sec.style.display = 'none';
                });
                const target = document.querySelector(href);
                if (target) {
                    target.style.display = 'block';
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Personalización dinámica de color para testimonios
// Permite cambiar el color de la tarjeta de testimonio seleccionada

document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('testimonioColorPicker');
    const cardSelector = document.getElementById('testimonioSelector');
    const applyBtn = document.getElementById('applyTestimonioColor');
    if (colorPicker && cardSelector && applyBtn) {
        applyBtn.addEventListener('click', function () {
            const idx = parseInt(cardSelector.value, 10);
            const color = colorPicker.value;
            const cards = document.querySelectorAll('.testimonios-container .testimonio-card');
            if (cards[idx]) {
                cards[idx].style.background = `linear-gradient(135deg, ${color} 60%, #fff 100%)`;
            }
        });
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
  
