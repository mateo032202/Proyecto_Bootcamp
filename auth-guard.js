/**
 * Protección de rutas y manejo de autenticación en la página principal
 */

console.log('🛡️ Protección de autenticación cargada');

// ===== CONFIGURACIÓN =====
const AUTH_CONFIG = {
    SESSION_KEY: 'empathy_session',
    USERS_KEY: 'empathy_users'
};

// ===== CLASE PARA VERIFICACIÓN DE SESIÓN =====
class AuthGuard {
    constructor() {
        this.sessionManager = new SessionManager();
        this.currentUser = null;
    }

    // Verificar autenticación
    checkAuthentication() {
        const session = this.sessionManager.checkSession();
        
        if (!session) {
            console.log('❌ No hay sesión activa, redirigiendo al login...');
            this.redirectToAuth();
            return false;
        }
        
        this.currentUser = this.sessionManager.getCurrentUser();
        if (!this.currentUser) {
            console.log('❌ Usuario no válido, redirigiendo al login...');
            this.redirectToAuth();
            return false;
        }
        
        console.log('✅ Usuario autenticado:', this.currentUser.name);
        this.setupUserInterface();
        return true;
    }

    // Redireccionar a autenticación
    redirectToAuth() {
        window.location.href = 'index.html?logout=true';
    }

    // Configurar interfaz de usuario autenticado
    setupUserInterface() {
        // Marcar el body como autenticado para mostrar el contenido
        document.body.classList.add('authenticated');
        
        // Remover pantalla de carga si existe
        const authLoading = document.getElementById('authLoading');
        if (authLoading) {
            authLoading.style.opacity = '0';
            setTimeout(() => authLoading.remove(), 300);
        }
        
        // Interfaz limpia sin elementos adicionales
        console.log('✅ Interfaz de usuario configurada - modo limpio');
    }

    // Agregar información del usuario
    addUserInfo() {
        // Buscar el header o crear uno si no existe
        let header = document.querySelector('header');
        if (!header) {
            header = document.createElement('header');
            document.body.insertBefore(header, document.body.firstChild);
        }

        // Crear barra de usuario si no existe
        if (!document.querySelector('.user-bar')) {
            const userBar = document.createElement('div');
            userBar.className = 'user-bar';
            
            // Obtener foto de perfil del localStorage o usar avatar por defecto
            const savedProfile = localStorage.getItem('userProfilePic');
            const profilePicSrc = savedProfile || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwKSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjE2IiByPSI2IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzIgMzJDMzIgMjYuNDc3MSAyNy41MjI5IDIyIDIyIDIySDE4QzEyLjQ3NzEgMjIgOCAyNi40NzcxIDggMzJWMzJIMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDAiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzcxZjM4ZiIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iIzg5Y2RlYiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlNmFkZWMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';
            
            userBar.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar-container">
                        <img src="${profilePicSrc}" alt="Foto de perfil" class="user-avatar-pic" id="userAvatarPic">
                        <input type="file" id="avatarUpload" accept="image/*" style="display: none;">
                        <div class="avatar-overlay" onclick="document.getElementById('avatarUpload').click()">
                            <span class="upload-icon">�</span>
                        </div>
                    </div>
                    <div class="user-details">
                        <span class="user-name">Bienvenido, ${this.currentUser.name}</span>
                        <span class="user-email">${this.currentUser.email}</span>
                    </div>
                </div>
                <button class="logout-btn" onclick="AuthGuard.instance.logout()">
                    <span class="logout-icon">🚪</span>
                    Cerrar Sesión
                </button>
            `;
            
            header.appendChild(userBar);
            
            // Agregar estilos
            this.addUserBarStyles();
            
            // Configurar la funcionalidad de subir foto
            this.setupProfilePictureUpload();
        }
    }

    // Configurar la funcionalidad de subir foto de perfil
    setupProfilePictureUpload() {
        const avatarUpload = document.getElementById('avatarUpload');
        const userAvatarPic = document.getElementById('userAvatarPic');
        
        if (avatarUpload) {
            avatarUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Validar tipo de archivo
                    if (!file.type.startsWith('image/')) {
                        alert('Por favor selecciona solo archivos de imagen.');
                        return;
                    }
                    
                    // Validar tamaño (máximo 5MB)
                    if (file.size > 5 * 1024 * 1024) {
                        alert('La imagen es demasiado grande. Por favor selecciona una imagen menor a 5MB.');
                        return;
                    }
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageData = event.target.result;
                        
                        // Actualizar la imagen en la interfaz
                        userAvatarPic.src = imageData;
                        
                        // Guardar en localStorage
                        localStorage.setItem('userProfilePic', imageData);
                        
                        // Mostrar mensaje de éxito
                        this.showProfileUpdateMessage();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // Mostrar mensaje de actualización de perfil
    showProfileUpdateMessage() {
        // Crear mensaje temporal
        const message = document.createElement('div');
        message.className = 'profile-update-message';
        message.textContent = '✅ Foto de perfil actualizada';
        message.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #71f38f, #89cdeb);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-family: 'Quicksand', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(message);
        
        // Remover el mensaje después de 3 segundos
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }

    // Agregar botón de logout a la navegación
    addLogoutButton() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.querySelector('.logout-nav-btn')) {
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.className = 'logout-nav-btn';
            logoutLink.onclick = (e) => {
                e.preventDefault();
                this.logout();
            };
            logoutLink.innerHTML = '<span>🚪</span> Salir';
            
            navLinks.appendChild(logoutLink);
        }
    }

    // Cerrar sesión
    logout() {
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            this.sessionManager.destroySession();
            console.log('👋 Sesión cerrada, redirigiendo...');
            this.redirectToAuth();
        }
    }

    // Agregar estilos para la barra de usuario
    addUserBarStyles() {
        if (!document.querySelector('#user-bar-styles')) {
            const styles = document.createElement('style');
            styles.id = 'user-bar-styles';
            styles.textContent = `
                .user-bar {
                    background: linear-gradient(135deg, #f6e5f5, #e8f0ff);
                    color: #5d4e6d;
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    position: relative;
                    z-index: 999;
                    border-bottom: 1px solid rgba(93, 78, 109, 0.1);
                    font-family: 'Quicksand', sans-serif;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .user-avatar-container {
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .user-avatar-container:hover {
                    transform: scale(1.05);
                }

                .user-avatar-pic {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid rgba(113, 243, 143, 0.3);
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }

                .user-avatar-container:hover .user-avatar-pic {
                    border-color: #71f38f;
                    box-shadow: 0 4px 15px rgba(113, 243, 143, 0.3);
                }

                .avatar-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(113, 243, 143, 0.8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .user-avatar-container:hover .avatar-overlay {
                    opacity: 1;
                }

                .upload-icon {
                    font-size: 18px;
                    color: white;
                }

                .user-details {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .user-name {
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: #5d4e6d;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                }

                .user-email {
                    font-size: 0.85rem;
                    color: #71a1c1;
                    font-weight: 500;
                }

                .logout-btn {
                    background: linear-gradient(135deg, #e6adec, #dab8f2);
                    border: 2px solid rgba(230, 173, 236, 0.3);
                    color: #5d4e6d;
                    padding: 10px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .logout-btn:hover {
                    background: linear-gradient(135deg, #dab8f2, #A48CA4);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(230, 173, 236, 0.4);
                    border-color: rgba(230, 173, 236, 0.6);
                }

                .logout-icon {
                    font-size: 16px;
                    transition: transform 0.3s ease;
                }

                .logout-btn:hover .logout-icon {
                    transform: scale(1.1);
                }

                .logout-nav-btn {
                    color: #5d4e6d !important;
                    text-decoration: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 500;
                    border: 2px solid transparent;
                }

                .logout-nav-btn:hover {
                    background: linear-gradient(135deg, #f6e5f5, #e8f0ff);
                    border-color: rgba(93, 78, 109, 0.2);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                /* Animaciones para mensajes */
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .user-bar {
                        padding: 12px 15px;
                        flex-direction: column;
                        gap: 10px;
                    }

                    .user-info {
                        gap: 12px;
                    }

                    .user-avatar-pic {
                        width: 45px;
                        height: 45px;
                    }

                    .user-name {
                        font-size: 1rem;
                    }

                    .user-email {
                        font-size: 0.8rem;
                    }

                    .logout-btn {
                        padding: 8px 16px;
                        font-size: 0.85rem;
                    }
                }

                @media (max-width: 480px) {
                    .user-bar {
                        padding: 10px;
                    }

                    .user-info {
                        gap: 10px;
                    }

                    .user-avatar-pic {
                        width: 40px;
                        height: 40px;
                    }

                    .user-details {
                        gap: 1px;
                    }

                    .user-name {
                        font-size: 0.9rem;
                    }

                    .user-email {
                        font-size: 0.75rem;
                    }

                    .logout-btn {
                        padding: 6px 12px;
                        font-size: 0.8rem;
                        gap: 6px;
                    }
                }
            `;
            
            document.head.appendChild(styles);
        }
    }
                    background: #ff6b6b;
                    color: white !important;
                    border-color: #ff6b6b;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
                }

                @media (max-width: 768px) {
                    .user-bar {
                        padding: 8px 15px;
                        flex-direction: column;
                        gap: 10px;
                        text-align: center;
                    }
                    
                    .user-info {
                        justify-content: center;
                    }
                    
                    .user-details {
                        align-items: center;
                    }
                    
                    .logout-btn {
                        font-size: 0.85rem;
                        padding: 6px 12px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// ===== CLASE SESSIONMANAGER (COPIA NECESARIA) =====
class SessionManager {
    checkSession() {
        const sessionData = localStorage.getItem(AUTH_CONFIG.SESSION_KEY);
        
        if (!sessionData) {
            return null;
        }

        try {
            const session = JSON.parse(sessionData);
            const now = new Date();
            const expiresAt = new Date(session.expiresAt);

            if (now > expiresAt) {
                this.destroySession();
                return null;
            }

            return session;
        } catch (error) {
            this.destroySession();
            return null;
        }
    }

    getCurrentUser() {
        const session = this.checkSession();
        if (!session) return null;
        
        const users = JSON.parse(localStorage.getItem(AUTH_CONFIG.USERS_KEY) || '[]');
        return users.find(user => user.id === session.userId);
    }

    destroySession() {
        localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Inicializando protección de autenticación...');
    
    // Crear instancia del guardian de autenticación
    AuthGuard.instance = new AuthGuard();
    
    // Verificar autenticación
    if (!AuthGuard.instance.checkAuthentication()) {
        return; // Ya se redirigió al login
    }
    
    console.log('✅ Acceso autorizado a la aplicación');
});

// Exportar para uso global
window.AuthGuard = AuthGuard;
