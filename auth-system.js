/**
 * Sistema de Autenticación con localStorage para Empathy
 * Adaptado al nuevo diseño de interfaz deslizante
 */

console.log('🔐 Sistema de autenticación Empathy cargado');

// ===== CONFIGURACIÓN GLOBAL =====
const AUTH_CONFIG = {
    SESSION_KEY: 'empathy_session',
    USERS_KEY: 'empathy_users',
    SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas
    MIN_PASSWORD_LENGTH: 6
};

// ===== CLASE PARA MANEJO DE USUARIOS =====
class UserManager {
    constructor() {
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(AUTH_CONFIG.USERS_KEY)) {
            localStorage.setItem(AUTH_CONFIG.USERS_KEY, JSON.stringify([]));
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(AUTH_CONFIG.USERS_KEY) || '[]');
    }

    saveUsers(users) {
        localStorage.setItem(AUTH_CONFIG.USERS_KEY, JSON.stringify(users));
    }

    registerUser(userData) {
        const users = this.getUsers();
        
        if (users.find(user => user.email === userData.email)) {
            throw new Error('Este correo electrónico ya está registrado');
        }

        const newUser = {
            id: Date.now().toString(),
            name: userData.name.trim(),
            email: userData.email.toLowerCase().trim(),
            password: this.hashPassword(userData.password),
            age: userData.age,
            gender: userData.gender,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        };

        users.push(newUser);
        this.saveUsers(users);
        
        console.log('✅ Usuario registrado:', newUser.email);
        return newUser;
    }

    authenticateUser(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email.toLowerCase().trim() && u.isActive);
        
        if (!user) {
            throw new Error('Correo electrónico no encontrado');
        }

        if (!this.verifyPassword(password, user.password)) {
            throw new Error('Contraseña incorrecta');
        }

        user.lastLogin = new Date().toISOString();
        this.saveUsers(users);
        
        console.log('✅ Usuario autenticado:', user.email);
        return user;
    }

    hashPassword(password) {
        return btoa(password + 'empathy_salt_2025');
    }

    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }

    getUserById(userId) {
        const users = this.getUsers();
        return users.find(user => user.id === userId);
    }
}

// ===== CLASE PARA MANEJO DE SESIONES =====
class SessionManager {
    constructor() {
        this.userManager = new UserManager();
    }

    createSession(user, rememberMe = false) {
        const sessionData = {
            userId: user.id,
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString(),
            expiresAt: rememberMe ? 
                new Date(Date.now() + (7 * AUTH_CONFIG.SESSION_DURATION)).toISOString() : 
                new Date(Date.now() + AUTH_CONFIG.SESSION_DURATION).toISOString(),
            rememberMe: rememberMe
        };

        localStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify(sessionData));
        console.log('✅ Sesión creada para:', user.email);
        return sessionData;
    }

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

            const user = this.userManager.getUserById(session.userId);
            if (!user || !user.isActive) {
                this.destroySession();
                return null;
            }

            return session;
        } catch (error) {
            this.destroySession();
            return null;
        }
    }

    destroySession() {
        localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
        console.log('🚪 Sesión cerrada');
    }

    getCurrentUser() {
        const session = this.checkSession();
        if (!session) return null;
        return this.userManager.getUserById(session.userId);
    }
}

// ===== INICIALIZACIÓN =====
const userManager = new UserManager();
const sessionManager = new SessionManager();

// ===== FUNCIONES DE UI =====

// Mostrar mensaje
function showMessage(message, type = 'error') {
    // Eliminar mensajes anteriores
    document.querySelectorAll('.message').forEach(msg => {
        msg.classList.remove('show');
        setTimeout(() => msg.remove(), 300);
    });

    // Crear nuevo mensaje
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type} show`;
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    // Auto-ocultar después de 4 segundos
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => messageElement.remove(), 300);
    }, 4000);
}

// Validar email
function isValidEmail(email) {
    return email.includes('@gmail.com');
}

// Validar contraseña
function isValidPassword(password) {
    return password.length >= AUTH_CONFIG.MIN_PASSWORD_LENGTH;
}

// Establecer estado de carga en botón
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Validar campo individual
function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Limpiar errores previos
    input.classList.remove('error');
    hideErrorMessage(input);

    // Validaciones específicas
    if (input.type === 'email') {
        if (!value) {
            errorMessage = 'El correo electrónico es obligatorio';
            isValid = false;
        } else if (!isValidEmail(value)) {
            errorMessage = 'El correo debe ser @gmail.com';
            isValid = false;
        }
    } else if (input.type === 'password') {
        if (!value) {
            errorMessage = 'La contraseña es obligatoria';
            isValid = false;
        } else if (!isValidPassword(value)) {
            errorMessage = `La contraseña debe tener al menos ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} caracteres`;
            isValid = false;
        }
    } else if (input.type === 'number') {
        if (!value || parseInt(value) < 0) {
            errorMessage = 'Por favor, ingresa una edad válida';
            isValid = false;
        }
    } else if (input.tagName === 'SELECT') {
        if (!value) {
            errorMessage = 'Por favor, selecciona una opción';
            isValid = false;
        }
    } else if (input.type === 'text') {
        if (!value) {
            errorMessage = 'Este campo es obligatorio';
            isValid = false;
        } else if (value.length < 2) {
            errorMessage = 'Debe tener al menos 2 caracteres';
            isValid = false;
        }
    }

    // Validación especial para confirmación de contraseña
    if (input.id === 'register-confirm-password') {
        const passwordInput = document.getElementById('register-password');
        if (value && passwordInput.value !== value) {
            errorMessage = 'Las contraseñas no coinciden';
            isValid = false;
        }
    }

    if (!isValid) {
        input.classList.add('error');
        showErrorMessage(input, errorMessage);
    }

    return isValid;
}

function showErrorMessage(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('small');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideErrorMessage(input) {
    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
}

// ===== MANEJADORES DE EVENTOS =====

// Alternar entre formularios
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema de autenticación...');
    
    // Solo verificar sesión si venimos de un lugar específico (no desde index.html)
    const referrer = document.referrer;
    const isFromIndex = referrer.includes('index.html') || referrer === '';
    
    if (!isFromIndex) {
        // Verificar si ya hay una sesión activa solo si NO venimos del index
        const currentSession = sessionManager.checkSession();
        if (currentSession) {
            console.log('✅ Sesión activa encontrada, redirigiendo...');
            window.location.href = 'app.html';
            return;
        }
    } else {
        console.log('🔐 Acceso desde index.html - Mostrando formularios de autenticación...');
    }

    // Configurar botones de alternancia
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // Configurar validación en tiempo real
    setupRealTimeValidation();
    
    // Configurar formularios
    setupForms();
    
    console.log('🔐 Sistema de autenticación listo');
});

function setupRealTimeValidation() {
    // Validación en tiempo real para todos los inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function setupForms() {
    // Formulario de registro
    const registerForm = document.getElementById('register-form-element');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Formulario de login
    const loginForm = document.getElementById('login-form-element');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const button = e.target.querySelector('button[type="submit"]');
    setButtonLoading(button, true);
    
    try {
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const age = formData.get('age') || document.getElementById('register-age').value;
        const gender = document.getElementById('register-gender').value;
        const acceptTerms = document.getElementById('accept-terms').checked;

        // Validar todos los campos
        const inputs = e.target.querySelectorAll('input, select');
        let allValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            throw new Error('Por favor corrige los errores en el formulario');
        }

        if (password !== confirmPassword) {
            throw new Error('Las contraseñas no coinciden');
        }

        if (!acceptTerms) {
            throw new Error('Debes aceptar los términos y condiciones');
        }

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Registrar usuario
        const newUser = userManager.registerUser({
            name, email, password, age: parseInt(age), gender
        });

        // Crear sesión automáticamente
        sessionManager.createSession(newUser, false);

        // 🔄 Disparar evento para actualizar estadísticas
        window.dispatchEvent(new CustomEvent('userRegistered', { 
            detail: { user: newUser } 
        }));
        
        // Si existe el gestor de estadísticas, forzar actualización inmediata
        if (window.statsManager) {
            console.log('📊 Actualizando estadísticas después del registro');
            // Asegurar que los usuarios se recarguen desde localStorage
            window.statsManager.loadUsers();
            window.statsManager.forceUpdate();
        } else {
            console.log('📊 Creando instancia de StatisticsManager para nuevo registro');
            window.statsManager = new StatisticsManager();
            window.statsManager.forceUpdate();
        }
        
        // Guardar información adicional en localStorage para depuración
        try {
            localStorage.setItem('empathy_last_registration', JSON.stringify({
                timestamp: new Date().toISOString(),
                userName: newUser.name,
                userCount: userManager.getUsers().length
            }));
        } catch (e) {
            console.warn('No se pudo guardar información de depuración', e);
        }

        // Mostrar éxito
        showMessage('¡Cuenta creada exitosamente! Redirigiendo...', 'success');

        // Redireccionar
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 1500);

    } catch (error) {
        console.error('❌ Error en registro:', error);
        showMessage(error.message, 'error');
    } finally {
        setButtonLoading(button, false);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const button = e.target.querySelector('button[type="submit"]');
    setButtonLoading(button, true);
    
    try {
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = document.getElementById('remember-me').checked;

        // Validar campos
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        
        let allValid = true;
        
        if (!validateField(emailInput)) allValid = false;
        if (!validateField(passwordInput)) allValid = false;

        if (!allValid) {
            throw new Error('Por favor corrige los errores en el formulario');
        }

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Autenticar usuario
        const user = userManager.authenticateUser(email, password);

        // Crear sesión
        sessionManager.createSession(user, rememberMe);

        // Mostrar éxito
        showMessage('¡Bienvenido! Redirigiendo...', 'success');

        // Redireccionar
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 1500);

    } catch (error) {
        console.error('❌ Error en login:', error);
        showMessage(error.message, 'error');
    } finally {
        setButtonLoading(button, false);
    }
}

// Exportar para uso global
window.AuthSystem = {
    sessionManager,
    userManager
};
