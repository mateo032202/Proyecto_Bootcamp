// Script para crear usuarios de prueba y verificar que las estadísticas funcionen
console.log('🧪 Creando usuarios de prueba para las estadísticas...');

// Función para crear usuarios de prueba
function crearUsuariosPrueba() {
    const usuariosPrueba = [
        {
            id: '1',
            name: 'María González',
            email: 'maria@test.com',
            password: 'hashedPassword123',
            age: 25,
            gender: 'femenino',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        },
        {
            id: '2',
            name: 'Carlos Rodríguez',
            email: 'carlos@test.com',
            password: 'hashedPassword456',
            age: 30,
            gender: 'masculino',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        },
        {
            id: '3',
            name: 'Ana López',
            email: 'ana@test.com',
            password: 'hashedPassword789',
            age: 17,
            gender: 'femenino',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        },
        {
            id: '4',
            name: 'Juan Pérez',
            email: 'juan@test.com',
            password: 'hashedPassword101',
            age: 45,
            gender: 'masculino',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        },
        {
            id: '5',
            name: 'Alex Torres',
            email: 'alex@test.com',
            password: 'hashedPassword202',
            age: 22,
            gender: 'otro',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        },
        {
            id: '6',
            name: 'Sofia Martínez',
            email: 'sofia@test.com',
            password: 'hashedPassword303',
            age: 16,
            gender: 'femenino',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        }
    ];

    // Guardar en localStorage
    localStorage.setItem('empathy_users', JSON.stringify(usuariosPrueba));
    
    console.log('✅ Usuarios de prueba creados:', usuariosPrueba.length);
    
    // Disparar evento para actualizar estadísticas
    window.dispatchEvent(new CustomEvent('userRegistered', { 
        detail: { user: usuariosPrueba[usuariosPrueba.length - 1] } 
    }));
    
    return usuariosPrueba;
}

// Función para verificar datos en localStorage
function verificarDatosUsuarios() {
    const datos = localStorage.getItem('empathy_users');
    if (datos) {
        const usuarios = JSON.parse(datos);
        console.log('📊 Usuarios en localStorage:', usuarios.length);
        console.log('📋 Lista de usuarios:', usuarios.map(u => `${u.name} (${u.gender}, ${u.age} años)`));
        
        // Estadísticas rápidas
        const femenino = usuarios.filter(u => u.gender === 'femenino').length;
        const masculino = usuarios.filter(u => u.gender === 'masculino').length;
        const otro = usuarios.filter(u => u.gender === 'otro').length;
        const mayores = usuarios.filter(u => u.age >= 18).length;
        const menores = usuarios.filter(u => u.age <= 17).length;
        
        console.log('📊 Estadísticas:');
        console.log(`- Femenino: ${femenino}`);
        console.log(`- Masculino: ${masculino}`);
        console.log(`- Otro: ${otro}`);
        console.log(`- Mayores de edad: ${mayores}`);
        console.log(`- Menores de edad: ${menores}`);
        
        return usuarios;
    } else {
        console.log('❌ No hay usuarios en localStorage');
        return [];
    }
}

// Función para limpiar datos
function limpiarDatosUsuarios() {
    localStorage.removeItem('empathy_users');
    console.log('🧹 Datos de usuarios eliminados');
}

// Exponer funciones globalmente para uso en consola
window.crearUsuariosPrueba = crearUsuariosPrueba;
window.verificarDatosUsuarios = verificarDatosUsuarios;
window.limpiarDatosUsuarios = limpiarDatosUsuarios;

// Ejecutar automáticamente si no hay usuarios
if (!localStorage.getItem('empathy_users')) {
    console.log('🔧 No hay usuarios, creando datos de prueba...');
    crearUsuariosPrueba();
} else {
    console.log('📊 Verificando usuarios existentes...');
    verificarDatosUsuarios();
}
