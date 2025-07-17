/**
 * Sistema de Estadísticas en Tiempo Real para Empathy
 * Se actualiza automáticamente cuando se registran nuevos usuarios
 */

// ===== EVENTO DE ACTUALIZACIÓN DE ESTADÍSTICAS =====
class StatisticsEventManager {
    constructor() {
        this.listeners = [];
        this.init();
    }

    init() {
        // Escuchar eventos de registro de usuarios
        window.addEventListener('userRegistered', this.handleUserRegistered.bind(this));
        
        // Escuchar eventos de localStorage (en caso de que se actualice desde otra pestaña)
        window.addEventListener('storage', this.handleStorageUpdate.bind(this));
        
        console.log('📊 Sistema de eventos de estadísticas inicializado');
    }

    handleUserRegistered(event) {
        const { user } = event.detail;
        console.log('🔄 Nuevo usuario registrado, actualizando estadísticas:', user.name);
        
        // Notificar a todos los listeners
        this.notifyListeners('userRegistered', user);
    }

    handleStorageUpdate(event) {
        // Solo actuar si se modificó la lista de usuarios
        if (event.key === 'empathy_users') {
            console.log('🔄 Lista de usuarios actualizada desde otra pestaña');
            this.notifyListeners('usersUpdated');
        }
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    notifyListeners(eventType, data = null) {
        this.listeners.forEach(listener => {
            try {
                listener(eventType, data);
            } catch (error) {
                console.error('Error en listener de estadísticas:', error);
            }
        });
    }
}

// ===== GESTOR DE ESTADÍSTICAS MEJORADO =====
class StatisticsManager {
    constructor() {
        this.users = [];
        this.eventManager = new StatisticsEventManager();
        this.init();
    }

    init() {
        this.loadUsers();
        
        // Registrar listener para actualizaciones automáticas
        this.eventManager.addListener(this.handleStatisticsEvent.bind(this));
        
        // Auto-actualizar estadísticas cuando se carga la sección
        document.addEventListener('DOMContentLoaded', () => {
            this.updateStatistics();
        });

        console.log('📊 StatisticsManager inicializado');
    }

    handleStatisticsEvent(eventType, data) {
        console.log('📊 Evento de estadísticas recibido:', eventType, data);
        
        if (eventType === 'userRegistered') {
            // Mostrar notificación de nuevo usuario
            this.showNewUserNotification(data);
        }
        
        // Actualizar estadísticas para cualquier evento
        this.updateStatistics();
    }

    showNewUserNotification(user) {
        // Crear notificación visual
        const notification = document.createElement('div');
        notification.className = 'stats-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="notification-icon">📊</i>
                <div class="notification-text">
                    <strong>¡Nuevo usuario registrado!</strong><br>
                    <span>${user.name} se ha unido a Empathy</span>
                </div>
            </div>
        `;
        
        // Agregar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            font-family: 'Quicksand', sans-serif;
            max-width: 300px;
        `;
        
        // Agregar animación CSS si no existe
        if (!document.querySelector('#stats-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'stats-notification-styles';
            style.textContent = `
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
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .notification-icon {
                    font-size: 24px;
                }
                
                .notification-text {
                    flex: 1;
                }
                
                .notification-text strong {
                    font-size: 14px;
                }
                
                .notification-text span {
                    font-size: 12px;
                    opacity: 0.9;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.5s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    loadUsers() {
        try {
            // Obtener datos directamente de localStorage
            const usersData = localStorage.getItem('empathy_users');
            
            if (!usersData) {
                console.warn('📊 No hay datos de usuarios en localStorage');
                this.users = [];
                return;
            }
            
            // Intentar parsear los datos
            const parsedUsers = JSON.parse(usersData);
            
            if (!Array.isArray(parsedUsers)) {
                console.warn('📊 Los datos de usuarios no son un array válido');
                this.users = [];
                return;
            }
            
            // Filtrar usuarios con datos válidos
            this.users = parsedUsers.filter(user => {
                const isValid = user && 
                    user.name && 
                    user.email && 
                    user.gender !== undefined && 
                    user.age !== undefined;
                
                if (!isValid) {
                    console.warn('📊 Usuario con datos incompletos:', user);
                }
                
                return isValid;
            });
            
            console.log('📊 Usuarios cargados para estadísticas:', this.users.length);
            
            // Log detallado de los usuarios (sin contraseñas)
            if (this.users.length > 0) {
                console.log('📊 Primer usuario cargado:', {
                    name: this.users[0].name,
                    email: this.users[0].email,
                    gender: this.users[0].gender,
                    age: this.users[0].age
                });
            }
        } catch (error) {
            console.error('📊 Error al cargar usuarios de localStorage:', error);
            this.users = [];
        }
    }

    calculateStats() {
        this.loadUsers(); // Recargar datos actuales siempre
        
        const stats = {
            total: this.users.length,
            genders: {
                masculino: 0,
                femenino: 0,
                otro: 0
            },
            ages: {
                adults: 0, // >= 18
                minors: 0  // < 18
            },
            recentUsers: []
        };

        this.users.forEach(user => {
            // Contar géneros
            if (user.gender && stats.genders.hasOwnProperty(user.gender)) {
                stats.genders[user.gender]++;
            }

            // Contar edades
            if (user.age !== undefined && user.age !== null) {
                if (user.age >= 18) {
                    stats.ages.adults++;
                } else {
                    stats.ages.minors++;
                }
            }
        });

        // Obtener usuarios más recientes (últimos 5)
        stats.recentUsers = this.users
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        return stats;
    }

    updateStatistics() {
        const stats = this.calculateStats();
        
        // Actualizar resumen
        this.updateSummary(stats);
        
        // Generar gráficas
        this.generateGenderChart(stats.genders);
        this.generateAgeChart(stats.ages);
        
        // Generar tabla detallada
        this.generateDetailedTable(stats);
        
        // Actualizar lista de usuarios recientes
        this.updateRecentUsers(stats.recentUsers);
        
        console.log('📊 Estadísticas actualizadas automáticamente:', stats);
    }

    updateSummary(stats) {
        const totalElement = document.getElementById('total-users');
        const womenElement = document.getElementById('total-women');
        const menElement = document.getElementById('total-men');
        const adultsElement = document.getElementById('total-adults');

        if (totalElement) {
            totalElement.textContent = stats.total;
            this.animateNumber(totalElement, stats.total);
        }
        if (womenElement) {
            womenElement.textContent = stats.genders.femenino;
            this.animateNumber(womenElement, stats.genders.femenino);
        }
        if (menElement) {
            menElement.textContent = stats.genders.masculino;
            this.animateNumber(menElement, stats.genders.masculino);
        }
        if (adultsElement) {
            adultsElement.textContent = stats.ages.adults;
            this.animateNumber(adultsElement, stats.ages.adults);
        }
    }

    animateNumber(element, newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#4CAF50';
        element.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 300);
    }

    updateRecentUsers(recentUsers) {
        const container = document.getElementById('recent-users-list');
        if (!container) return;

        container.innerHTML = recentUsers.map(user => `
            <div class="recent-user-item">
                <div class="user-info">
                    <strong>${user.name}</strong>
                    <span class="user-details">${user.gender}, ${user.age} años</span>
                </div>
                <div class="user-date">
                    ${new Date(user.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </div>
            </div>
        `).join('');
    }

    generateGenderChart(genderData) {
        const canvas = document.getElementById('genderChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;

        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const total = genderData.masculino + genderData.femenino + genderData.otro;
        if (total === 0) {
            ctx.fillStyle = '#ccc';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No hay datos', centerX, centerY);
            return;
        }

        const colors = {
            masculino: '#2196F3',
            femenino: '#E91E63',
            otro: '#FF9800'
        };

        const labels = {
            masculino: 'Hombres',
            femenino: 'Mujeres',
            otro: 'Otros'
        };

        let currentAngle = -Math.PI / 2; // Empezar desde arriba

        // Dibujar segmentos
        Object.keys(genderData).forEach(gender => {
            const count = genderData[gender];
            if (count > 0) {
                const sliceAngle = (count / total) * 2 * Math.PI;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fillStyle = colors[gender];
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 3;
                ctx.stroke();

                currentAngle += sliceAngle;
            }
        });

        // Generar leyenda
        this.generateLegend('gender-legend', genderData, colors, labels, total);
    }

    generateAgeChart(ageData) {
        const canvas = document.getElementById('ageChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;

        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const total = ageData.adults + ageData.minors;
        if (total === 0) {
            ctx.fillStyle = '#ccc';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No hay datos', centerX, centerY);
            return;
        }

        const colors = {
            adults: '#4CAF50',
            minors: '#FF5722'
        };

        const labels = {
            adults: 'Mayores de edad (18+)',
            minors: 'Menores de edad (<18)'
        };

        let currentAngle = -Math.PI / 2;

        Object.keys(ageData).forEach(ageGroup => {
            const count = ageData[ageGroup];
            if (count > 0) {
                const sliceAngle = (count / total) * 2 * Math.PI;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fillStyle = colors[ageGroup];
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 3;
                ctx.stroke();

                currentAngle += sliceAngle;
            }
        });

        // Generar leyenda
        this.generateLegend('age-legend', ageData, colors, labels, total);
    }

    generateLegend(containerId, data, colors, labels, total) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = Object.keys(data).map(key => {
            const count = data[key];
            const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
            
            return `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${colors[key]};"></div>
                    <span class="legend-label">${labels[key]}: ${count} (${percentage}%)</span>
                </div>
            `;
        }).join('');
    }

    generateDetailedTable(stats) {
        const container = document.getElementById('detailed-stats');
        if (!container) return;

        const table = `
            <table class="stats-table">
                <thead>
                    <tr>
                        <th>Métrica</th>
                        <th>Valor</th>
                        <th>Porcentaje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total de usuarios</td>
                        <td>${stats.total}</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>Usuarios masculinos</td>
                        <td>${stats.genders.masculino}</td>
                        <td>${stats.total > 0 ? ((stats.genders.masculino / stats.total) * 100).toFixed(1) : 0}%</td>
                    </tr>
                    <tr>
                        <td>Usuarios femeninos</td>
                        <td>${stats.genders.femenino}</td>
                        <td>${stats.total > 0 ? ((stats.genders.femenino / stats.total) * 100).toFixed(1) : 0}%</td>
                    </tr>
                    <tr>
                        <td>Otros géneros</td>
                        <td>${stats.genders.otro}</td>
                        <td>${stats.total > 0 ? ((stats.genders.otro / stats.total) * 100).toFixed(1) : 0}%</td>
                    </tr>
                    <tr>
                        <td>Mayores de edad (18+)</td>
                        <td>${stats.ages.adults}</td>
                        <td>${stats.total > 0 ? ((stats.ages.adults / stats.total) * 100).toFixed(1) : 0}%</td>
                    </tr>
                    <tr>
                        <td>Menores de edad (&lt;18)</td>
                        <td>${stats.ages.minors}</td>
                        <td>${stats.total > 0 ? ((stats.ages.minors / stats.total) * 100).toFixed(1) : 0}%</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        container.innerHTML = table;
    }

    // Método para forzar actualización manual
    forceUpdate() {
        console.log('🔄 Forzando actualización de estadísticas...');
        // Recargar datos desde localStorage antes de actualizar
        this.loadUsers();
        this.updateStatistics();
        
        // Mostrar los datos de usuarios en la consola para depuración
        console.log(`📊 Estadísticas actualizadas: ${this.users.length} usuarios encontrados`);
        
        // Registrar detalles para depuración
        if (this.users.length > 0) {
            const genderCount = {
                masculino: this.users.filter(u => u.gender === 'masculino').length,
                femenino: this.users.filter(u => u.gender === 'femenino').length,
                otro: this.users.filter(u => u.gender === 'otro').length
            };
            console.log('📊 Detalles de género:', genderCount);
        }
    }
}

// Función de inicialización global
function initializeStatisticsSystem() {
    console.log('📊 Inicializando sistema de estadísticas global...');
    
    // Crear una instancia global del gestor de estadísticas si no existe
    if (!window.statsManager) {
        window.statsManager = new StatisticsManager();
    } else {
        // Si ya existe, forzar recarga de datos
        window.statsManager.loadUsers();
        window.statsManager.updateStatistics();
    }
    
    return window.statsManager;
}

// Exportar para uso global
window.StatisticsManager = StatisticsManager;
window.StatisticsEventManager = StatisticsEventManager;
window.initializeStatisticsSystem = initializeStatisticsSystem;

// Auto-inicializar cuando se carga este script
document.addEventListener('DOMContentLoaded', function() {
    initializeStatisticsSystem();
});
