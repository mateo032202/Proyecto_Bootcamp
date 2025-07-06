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

// Ya no es necesario ningún JS para la animación de reflejo, todo es CSS.
