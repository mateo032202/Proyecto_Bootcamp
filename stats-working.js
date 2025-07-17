// ======= SISTEMA DE ESTADÍSTICAS FUNCIONAL =======

// Función para obtener usuarios reales + datos falsos
function getAllUsers() {
    console.log('🔄 Obteniendo todos los usuarios...');
    
    // 1. Obtener usuarios reales del localStorage
    let realUsers = [];
    try {
        const userData = localStorage.getItem('empathy_users');
        if (userData) {
            const allUsers = JSON.parse(userData);
            // Filtrar solo usuarios reales (no falsos)
            realUsers = allUsers.filter(user => !user.id.startsWith('fake'));
            console.log('📊 Usuarios reales encontrados:', realUsers.length);
        }
    } catch (error) {
        console.error('Error al obtener usuarios reales:', error);
    }
    
    // 2. Si hay usuarios reales, usar solo esos
    if (realUsers.length > 0) {
        console.log('✅ Usando solo usuarios reales para estadísticas');
        return realUsers;
    }
    
    // 3. Si no hay usuarios reales, usar datos falsos
    console.log('🔧 No hay usuarios reales, usando datos falsos...');
    const fakeUsers = createFakeData();
    
    // Guardar datos falsos temporalmente para las estadísticas
    const currentData = localStorage.getItem('empathy_users');
    if (!currentData || JSON.parse(currentData).length === 0) {
        localStorage.setItem('empathy_users', JSON.stringify(fakeUsers));
    }
    
    return fakeUsers;
}

// Función para crear datos falsos SOLO si no hay usuarios reales
function createFakeData() {
    console.log('🔧 Creando datos falsos...');
    
    const fakeUsers = [
        { id: 'fake1', name: 'María González', email: 'maria@empathy.com', age: 25, gender: 'femenino', createdAt: '2024-01-15T10:30:00Z', isActive: true },
        { id: 'fake2', name: 'Carlos Rodríguez', email: 'carlos@empathy.com', age: 32, gender: 'masculino', createdAt: '2024-01-20T14:45:00Z', isActive: true },
        { id: 'fake3', name: 'Ana López', email: 'ana@empathy.com', age: 17, gender: 'femenino', createdAt: '2024-02-01T09:15:00Z', isActive: true },
        { id: 'fake4', name: 'Juan Pérez', email: 'juan@empathy.com', age: 45, gender: 'masculino', createdAt: '2024-02-10T16:20:00Z', isActive: true },
        { id: 'fake5', name: 'Alex Torres', email: 'alex@empathy.com', age: 22, gender: 'otro', createdAt: '2024-02-15T11:30:00Z', isActive: true },
        { id: 'fake6', name: 'Sofia Martínez', email: 'sofia@empathy.com', age: 16, gender: 'femenino', createdAt: '2024-02-20T13:45:00Z', isActive: true },
        { id: 'fake7', name: 'Diego Herrera', email: 'diego@empathy.com', age: 28, gender: 'masculino', createdAt: '2024-02-25T08:15:00Z', isActive: true },
        { id: 'fake8', name: 'Valentina Silva', email: 'valentina@empathy.com', age: 35, gender: 'femenino', createdAt: '2024-03-01T12:00:00Z', isActive: true },
        { id: 'fake9', name: 'Camilo Vargas', email: 'camilo@empathy.com', age: 19, gender: 'masculino', createdAt: '2024-03-05T15:30:00Z', isActive: true },
        { id: 'fake10', name: 'Riley Johnson', email: 'riley@empathy.com', age: 24, gender: 'otro', createdAt: '2024-03-10T10:45:00Z', isActive: true },
        { id: 'fake11', name: 'Isabella García', email: 'isabella@empathy.com', age: 15, gender: 'femenino', createdAt: '2024-03-15T14:20:00Z', isActive: true },
        { id: 'fake12', name: 'Sebastián Ruiz', email: 'sebastian@empathy.com', age: 41, gender: 'masculino', createdAt: '2024-03-20T09:30:00Z', isActive: true },
        { id: 'fake13', name: 'Lucía Morales', email: 'lucia@empathy.com', age: 29, gender: 'femenino', createdAt: '2024-03-25T11:15:00Z', isActive: true },
        { id: 'fake14', name: 'Andrés Castro', email: 'andres@empathy.com', age: 52, gender: 'masculino', createdAt: '2024-04-01T16:00:00Z', isActive: true },
        { id: 'fake15', name: 'Taylor Smith', email: 'taylor@empathy.com', age: 33, gender: 'otro', createdAt: '2024-04-05T13:30:00Z', isActive: true },
        { id: 'fake16', name: 'Camila Jiménez', email: 'camila@empathy.com', age: 21, gender: 'femenino', createdAt: '2024-04-10T16:45:00Z', isActive: true },
        { id: 'fake17', name: 'Roberto Mendoza', email: 'roberto@empathy.com', age: 38, gender: 'masculino', createdAt: '2024-04-15T12:30:00Z', isActive: true },
        { id: 'fake18', name: 'Gabriela Flores', email: 'gabriela@empathy.com', age: 27, gender: 'femenino', createdAt: '2024-04-20T14:15:00Z', isActive: true },
        { id: 'fake19', name: 'Mateo Suárez', email: 'mateo@empathy.com', age: 23, gender: 'masculino', createdAt: '2024-04-25T10:00:00Z', isActive: true },
        { id: 'fake20', name: 'Sam Wilson', email: 'sam@empathy.com', age: 26, gender: 'otro', createdAt: '2024-04-30T11:30:00Z', isActive: true }
    ];
    
    // No guardar automáticamente - solo retornar para usar temporalmente
    console.log('✅ Datos falsos creados (temporales):', fakeUsers.length, 'usuarios');
    return fakeUsers;
}

// Función principal para actualizar dashboard
function updateStats() {
    console.log('🔄 Actualizando estadísticas...');
    
    // 1. Obtener todos los usuarios (reales + falsos si es necesario)
    const users = getAllUsers();
    
    // 2. Verificar si hay usuarios reales
    const realUsers = users.filter(user => !user.id.startsWith('fake'));
    const usingRealData = realUsers.length > 0;
    
    console.log('📊 Estadísticas:', {
        totalUsers: users.length,
        realUsers: realUsers.length,
        usingRealData: usingRealData
    });
    
    // 3. Calcular estadísticas completas
    const stats = {
        total: users.length,
        femenino: users.filter(u => u.gender === 'femenino').length,
        masculino: users.filter(u => u.gender === 'masculino').length,
        otro: users.filter(u => u.gender === 'otro').length,
        adultos: users.filter(u => u.age >= 18).length,
        menores: users.filter(u => u.age < 18).length,
        // Agregar rangos de edad detallados
        ageRanges: {
            '13-17': users.filter(u => u.age >= 13 && u.age <= 17).length,
            '18-25': users.filter(u => u.age >= 18 && u.age <= 25).length,
            '26-35': users.filter(u => u.age >= 26 && u.age <= 35).length,
            '36-45': users.filter(u => u.age >= 36 && u.age <= 45).length,
            '46-55': users.filter(u => u.age >= 46 && u.age <= 55).length,
            '56+': users.filter(u => u.age >= 56).length
        },
        // Información adicional
        usingRealData: usingRealData,
        realUsersCount: realUsers.length
    };
    
    console.log('📊 Estadísticas calculadas:', stats);
    
    // 3. Actualizar elementos HTML
    updateElement('total-users', stats.total);
    updateElement('total-women', stats.femenino);
    updateElement('total-men', stats.masculino);
    updateElement('total-otros', stats.otro);
    updateElement('total-adults', stats.adultos);
    updateElement('total-minors', stats.menores);
    
    // 4. Actualizar porcentajes
    updateElement('women-percentage', `${((stats.femenino / stats.total) * 100).toFixed(1)}%`);
    updateElement('men-percentage', `${((stats.masculino / stats.total) * 100).toFixed(1)}%`);
    updateElement('otros-percentage', `${((stats.otro / stats.total) * 100).toFixed(1)}%`);
    updateElement('adults-percentage', `${((stats.adultos / stats.total) * 100).toFixed(1)}%`);
    updateElement('minors-percentage', `${((stats.menores / stats.total) * 100).toFixed(1)}%`);
    
    // 5. Actualizar contadores adicionales
    updateElement('fem-count', stats.femenino);
    updateElement('masc-count', stats.masculino);
    updateElement('otro-count', stats.otro);
    updateElement('adults-count', stats.adultos);
    updateElement('minors-count', stats.menores);
    
    // 6. Dibujar gráficos (incluyendo rangos de edad)
    drawCharts(stats);
    drawAgeRangeChart(stats);
    
    // 7. Generar tabla
    generateTable(users);
    
    console.log('✅ Estadísticas actualizadas completamente');
    
    // 8. Mostrar notificación con información sobre el tipo de datos
    const dataType = stats.usingRealData ? 'usuarios reales' : 'datos de prueba';
    const message = `✅ Dashboard actualizado con ${stats.total} ${dataType}`;
    if (stats.usingRealData && stats.realUsersCount > 0) {
        showNotification(`${message} (${stats.realUsersCount} usuarios registrados)`);
    } else {
        showNotification(message);
    }
}

// Función auxiliar para actualizar elementos
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
        console.log(`✅ Actualizado ${id}: ${value}`);
    } else {
        console.warn(`⚠️ Elemento ${id} no encontrado`);
    }
}

// Función para dibujar gráficos
function drawCharts(stats) {
    console.log('📊 Dibujando gráficos...');
    
    // Gráfico de géneros
    const genderCanvas = document.getElementById('genderChart');
    if (genderCanvas) {
        const ctx = genderCanvas.getContext('2d');
        ctx.clearRect(0, 0, genderCanvas.width, genderCanvas.height);
        
        const data = [
            { label: 'Femenino', value: stats.femenino, color: '#f093fb' },
            { label: 'Masculino', value: stats.masculino, color: '#4facfe' },
            { label: 'Otro', value: stats.otro, color: '#a8edea' }
        ];
        
        const centerX = genderCanvas.width / 2;
        const centerY = genderCanvas.height / 2;
        const radius = 100;
        
        let currentAngle = -Math.PI / 2;
        
        data.forEach(item => {
            if (item.value > 0) {
                const sliceAngle = (item.value / stats.total) * 2 * Math.PI;
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = item.color;
                ctx.fill();
                
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                currentAngle += sliceAngle;
            }
        });
        
        // Texto central
        ctx.fillStyle = '#5d4e6d';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Géneros', centerX, centerY - 5);
        ctx.font = '14px Arial';
        ctx.fillText(stats.total + ' usuarios', centerX, centerY + 15);
    }
    
    // Gráfico de edades
    const ageCanvas = document.getElementById('ageChart');
    if (ageCanvas) {
        const ctx = ageCanvas.getContext('2d');
        ctx.clearRect(0, 0, ageCanvas.width, ageCanvas.height);
        
        const data = [
            { label: 'Mayores', value: stats.adultos, color: '#ffecd2' },
            { label: 'Menores', value: stats.menores, color: '#ff9a9e' }
        ];
        
        const centerX = ageCanvas.width / 2;
        const centerY = ageCanvas.height / 2;
        const radius = 100;
        
        let currentAngle = -Math.PI / 2;
        
        data.forEach(item => {
            if (item.value > 0) {
                const sliceAngle = (item.value / stats.total) * 2 * Math.PI;
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = item.color;
                ctx.fill();
                
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                currentAngle += sliceAngle;
            }
        });
        
        // Texto central
        ctx.fillStyle = '#5d4e6d';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Edades', centerX, centerY - 5);
        ctx.font = '14px Arial';
        ctx.fillText(stats.total + ' usuarios', centerX, centerY + 15);
    }
    
    console.log('✅ Gráficos dibujados');
}

// Función para dibujar gráfico de barras de rangos de edad
function drawAgeRangeChart(stats) {
    const canvas = document.getElementById('ageRangeChart');
    if (!canvas) {
        console.warn('⚠️ Canvas ageRangeChart no encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    console.log('📊 Dibujando gráfico de rangos de edad...');
    console.log('📊 Datos de rangos:', stats.ageRanges);
    
    const ranges = [
        { label: '13-17', value: stats.ageRanges['13-17'], color: '#ff9a9e' },
        { label: '18-25', value: stats.ageRanges['18-25'], color: '#ffecd2' },
        { label: '26-35', value: stats.ageRanges['26-35'], color: '#a8edea' },
        { label: '36-45', value: stats.ageRanges['36-45'], color: '#4facfe' },
        { label: '46-55', value: stats.ageRanges['46-55'], color: '#f093fb' },
        { label: '56+', value: stats.ageRanges['56+'], color: '#667eea' }
    ];
    
    const barWidth = 100;
    const barSpacing = 30;
    const chartHeight = 200;
    const chartTop = 40;
    const chartLeft = 50;
    const maxValue = Math.max(...ranges.map(r => r.value)) || 1;
    
    // Dibujar título
    ctx.fillStyle = '#5d4e6d';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Rangos de Edad Detallados', canvas.width / 2, 25);
    
    // Dibujar ejes
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Eje Y (vertical)
    ctx.moveTo(chartLeft, chartTop);
    ctx.lineTo(chartLeft, chartTop + chartHeight);
    // Eje X (horizontal)
    ctx.moveTo(chartLeft, chartTop + chartHeight);
    ctx.lineTo(chartLeft + (ranges.length * (barWidth + barSpacing)), chartTop + chartHeight);
    ctx.stroke();
    
    ranges.forEach((range, index) => {
        const x = chartLeft + 20 + (index * (barWidth + barSpacing));
        const barHeight = maxValue > 0 ? (range.value / maxValue) * chartHeight : 0;
        const y = chartTop + chartHeight - barHeight;
        
        // Dibujar barra con gradiente
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, range.color);
        gradient.addColorStop(1, range.color + '80'); // Transparencia
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Dibujar borde de la barra
        ctx.strokeStyle = range.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Dibujar valor encima de la barra
        if (range.value > 0) {
            ctx.fillStyle = '#333';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(range.value.toString(), x + barWidth/2, y - 8);
            
            // Dibujar porcentaje dentro de la barra si es lo suficientemente alta
            if (barHeight > 40) {
                ctx.fillStyle = 'white';
                ctx.font = 'bold 12px Arial';
                ctx.fillText(((range.value / stats.total) * 100).toFixed(1) + '%', x + barWidth/2, y + barHeight/2 + 5);
            }
        }
        
        // Dibujar etiqueta debajo del eje X
        ctx.fillStyle = '#5d4e6d';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(range.label, x + barWidth/2, chartTop + chartHeight + 20);
        ctx.font = '10px Arial';
        ctx.fillText('años', x + barWidth/2, chartTop + chartHeight + 35);
    });
    
    // Dibujar etiquetas del eje Y
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
        const value = Math.round((maxValue / 5) * i);
        const y = chartTop + chartHeight - ((value / maxValue) * chartHeight);
        ctx.fillText(value.toString(), chartLeft - 10, y + 3);
        
        // Líneas de cuadrícula
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartLeft + (ranges.length * (barWidth + barSpacing)), y);
        ctx.stroke();
    }
    
    // Agregar estadísticas debajo del gráfico
    const statsContainer = document.getElementById('age-range-stats');
    if (statsContainer) {
        let statsHTML = '';
        ranges.forEach(range => {
            if (range.value > 0) {
                const percentage = ((range.value / stats.total) * 100).toFixed(1);
                statsHTML += `
                    <div style="background: ${range.color}; color: white; padding: 8px 15px; border-radius: 15px; font-size: 0.9rem; margin: 5px;">
                        <strong>${range.label} años: ${range.value} (${percentage}%)</strong>
                    </div>
                `;
            }
        });
        statsContainer.innerHTML = statsHTML;
    }
    
    console.log('✅ Gráfico de rangos de edad dibujado');
}

// Función para generar tabla
function generateTable(users) {
    const container = document.getElementById('users-table');
    if (!container) return;
    
    let html = `
        <table style="width: 100%; border-collapse: collapse; border-radius: 10px; overflow: hidden;">
            <thead>
                <tr style="background: #5d4e6d; color: white;">
                    <th style="padding: 12px; text-align: left;">Nombre</th>
                    <th style="padding: 12px; text-align: left;">Email</th>
                    <th style="padding: 12px; text-align: center;">Género</th>
                    <th style="padding: 12px; text-align: center;">Edad</th>
                    <th style="padding: 12px; text-align: center;">Categoría</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach((user, index) => {
        const categoria = user.age >= 18 ? 'Mayor' : 'Menor';
        const bgColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
        
        html += `
            <tr style="background: ${bgColor};">
                <td style="padding: 12px; border-bottom: 1px solid #ddd;">${user.name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd;">${user.email}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">${user.gender}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">${user.age}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">${categoria}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
    
    console.log('✅ Tabla generada');
}

// Función para mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white;
        padding: 15px 20px; border-radius: 10px; z-index: 10000;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    `;
    notification.innerHTML = `<strong>${message}</strong>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Función para descargar estadísticas como PDF
function downloadStats() {
    console.log('📄 Iniciando descarga de estadísticas en PDF...');
    
    try {
        // Verificar múltiples formas de acceder a jsPDF
        let jsPDF = null;
        
        if (typeof window.jsPDF !== 'undefined') {
            jsPDF = window.jsPDF;
        } else if (typeof window.jspdf !== 'undefined') {
            jsPDF = window.jspdf.jsPDF;
        } else if (typeof jspdf !== 'undefined') {
            jsPDF = jspdf.jsPDF;
        }
        
        if (!jsPDF) {
            console.error('❌ jsPDF no está disponible en ninguna forma');
            // Fallback: descargar como texto plano
            return downloadAsText();
        }
        
        console.log('✅ jsPDF encontrado, generando PDF...');
        
        // Obtener usuarios y calcular estadísticas
        const users = getAllUsers();
        const stats = calculateStatsForPDF(users);
        
        // Crear nuevo documento PDF
        const doc = new jsPDF();
        
        // Configurar documento
        setupPDFDocument(doc, stats, users);
        
        // Generar nombre del archivo
        const now = new Date();
        const timestamp = now.toISOString().slice(0, 10);
        const filename = `Empathy_Estadisticas_${timestamp}.pdf`;
        
        // Descargar el archivo
        doc.save(filename);
        
        console.log('✅ PDF generado exitosamente:', filename);
        showNotification(`✅ Estadísticas descargadas como ${filename}`);
        
    } catch (error) {
        console.error('❌ Error al generar PDF:', error);
        console.log('🔄 Intentando descarga alternativa...');
        downloadAsText();
    }
}

// Función para calcular estadísticas específicas para PDF
function calculateStatsForPDF(users) {
    return {
        total: users.length,
        femenino: users.filter(u => u.gender === 'femenino').length,
        masculino: users.filter(u => u.gender === 'masculino').length,
        otro: users.filter(u => u.gender === 'otro').length,
        adultos: users.filter(u => u.age >= 18).length,
        menores: users.filter(u => u.age < 18).length,
        ageRanges: {
            '13-17': users.filter(u => u.age >= 13 && u.age <= 17).length,
            '18-25': users.filter(u => u.age >= 18 && u.age <= 25).length,
            '26-35': users.filter(u => u.age >= 26 && u.age <= 35).length,
            '36-45': users.filter(u => u.age >= 36 && u.age <= 45).length,
            '46-55': users.filter(u => u.age >= 46 && u.age <= 55).length,
            '56+': users.filter(u => u.age >= 56).length
        },
        usingRealData: users.filter(user => !user.id.startsWith('fake')).length > 0,
        averageAge: users.length > 0 ? (users.reduce((sum, u) => sum + u.age, 0) / users.length).toFixed(1) : 0
    };
}

// Función para configurar el documento PDF
function setupPDFDocument(doc, stats, users) {
    // Colores
    const primaryColor = [93, 78, 109];
    const secondaryColor = [79, 172, 254];
    
    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('EMPATHY - REPORTE DE ESTADISTICAS', 105, 15, { align: 'center' });
    
    const now = new Date();
    const dateString = now.toLocaleDateString('es-ES');
    doc.setFontSize(12);
    doc.text(`Generado el: ${dateString}`, 105, 25, { align: 'center' });
    
    // Contenido principal
    let y = 50;
    
    // Resumen ejecutivo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('RESUMEN EJECUTIVO', 20, y);
    y += 15;
    
    doc.setFontSize(12);
    const dataType = stats.usingRealData ? 'usuarios registrados' : 'datos de demostracion';
    doc.text(`Total de usuarios: ${stats.total} (${dataType})`, 25, y);
    y += 10;
    doc.text(`Promedio de edad: ${stats.averageAge} años`, 25, y);
    y += 10;
    doc.text(`Mayores de edad: ${stats.adultos} | Menores de edad: ${stats.menores}`, 25, y);
    y += 20;
    
    // Distribución por género
    doc.setFontSize(14);
    doc.text('DISTRIBUCION POR GENERO', 20, y);
    y += 15;
    
    doc.setFontSize(11);
    doc.text(`Femenino: ${stats.femenino} usuarios (${((stats.femenino / stats.total) * 100).toFixed(1)}%)`, 25, y);
    y += 8;
    doc.text(`Masculino: ${stats.masculino} usuarios (${((stats.masculino / stats.total) * 100).toFixed(1)}%)`, 25, y);
    y += 8;
    doc.text(`Otro: ${stats.otro} usuarios (${((stats.otro / stats.total) * 100).toFixed(1)}%)`, 25, y);
    y += 20;
    
    // Distribución por rangos de edad
    doc.setFontSize(14);
    doc.text('DISTRIBUCION POR RANGOS DE EDAD', 20, y);
    y += 15;
    
    doc.setFontSize(11);
    Object.entries(stats.ageRanges).forEach(([range, count]) => {
        const percentage = ((count / stats.total) * 100).toFixed(1);
        doc.text(`${range} años: ${count} usuarios (${percentage}%)`, 25, y);
        y += 8;
    });
    
    // Nueva página para usuarios si hay muchos
    if (users.length > 0) {
        doc.addPage();
        y = 30;
        
        doc.setFontSize(16);
        doc.text('LISTA DE USUARIOS', 20, y);
        y += 15;
        
        // Mostrar hasta 30 usuarios
        const maxUsers = Math.min(users.length, 30);
        doc.setFontSize(10);
        
        for (let i = 0; i < maxUsers; i++) {
            const user = users[i];
            const userLine = `${i + 1}. ${user.name} - ${user.email} - ${user.age} años - ${user.gender}`;
            doc.text(userLine, 20, y);
            y += 6;
            
            // Nueva página si es necesario
            if (y > 270) {
                doc.addPage();
                y = 30;
            }
        }
        
        if (users.length > 30) {
            y += 10;
            doc.text(`... y ${users.length - 30} usuarios mas`, 20, y);
        }
    }
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Pagina ${i} de ${pageCount}`, 190, 285, { align: 'right' });
    }
}

// Función alternativa: descargar como archivo de texto
function downloadAsText() {
    console.log('📄 Generando archivo de texto alternativo...');
    
    try {
        const users = getAllUsers();
        const stats = calculateStatsForPDF(users);
        
        let content = '';
        content += '===========================================\n';
        content += '    EMPATHY - REPORTE DE ESTADISTICAS\n';
        content += '===========================================\n\n';
        
        const now = new Date();
        content += `Generado el: ${now.toLocaleDateString('es-ES')} a las ${now.toLocaleTimeString('es-ES')}\n\n`;
        
        content += 'RESUMEN EJECUTIVO:\n';
        content += '-' + '-'.repeat(50) + '\n';
        const dataType = stats.usingRealData ? 'usuarios registrados' : 'datos de demostracion';
        content += `• Total de usuarios: ${stats.total} (${dataType})\n`;
        content += `• Promedio de edad: ${stats.averageAge} años\n`;
        content += `• Mayores de edad: ${stats.adultos} usuarios\n`;
        content += `• Menores de edad: ${stats.menores} usuarios\n\n`;
        
        content += 'DISTRIBUCION POR GENERO:\n';
        content += '-' + '-'.repeat(50) + '\n';
        content += `• Femenino: ${stats.femenino} usuarios (${((stats.femenino / stats.total) * 100).toFixed(1)}%)\n`;
        content += `• Masculino: ${stats.masculino} usuarios (${((stats.masculino / stats.total) * 100).toFixed(1)}%)\n`;
        content += `• Otro: ${stats.otro} usuarios (${((stats.otro / stats.total) * 100).toFixed(1)}%)\n\n`;
        
        content += 'DISTRIBUCION POR RANGOS DE EDAD:\n';
        content += '-' + '-'.repeat(50) + '\n';
        Object.entries(stats.ageRanges).forEach(([range, count]) => {
            const percentage = ((count / stats.total) * 100).toFixed(1);
            content += `• ${range} años: ${count} usuarios (${percentage}%)\n`;
        });
        
        content += '\n\nLISTA DE USUARIOS:\n';
        content += '-' + '-'.repeat(50) + '\n';
        users.forEach((user, index) => {
            content += `${index + 1}. ${user.name} - ${user.email} - ${user.age} años - ${user.gender}\n`;
        });
        
        content += '\n\n===========================================\n';
        content += '       Fin del reporte - EMPATHY\n';
        content += '===========================================\n';
        
        // Crear y descargar archivo
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Empathy_Estadisticas_${now.toISOString().slice(0, 10)}.txt`;
        link.click();
        
        console.log('✅ Archivo de texto generado exitosamente');
        showNotification('✅ Estadísticas descargadas como archivo de texto');
        
    } catch (error) {
        console.error('❌ Error al generar archivo de texto:', error);
        showNotification('❌ Error al generar el archivo de estadísticas');
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Inicializando sistema de estadísticas...');
    
    // Actualizar inmediatamente
    updateStats();
    
    // Escuchar eventos de usuario registrado
    window.addEventListener('userRegistered', function(event) {
        console.log('🎉 Usuario registrado detectado:', event.detail);
        console.log('📊 Actualizando estadísticas con usuarios reales...');
        
        // Actualizar estadísticas inmediatamente
        setTimeout(() => {
            updateStats();
        }, 100);
        
        // Mostrar notificación especial
        setTimeout(() => {
            showNotification('🎉 ¡Nuevo usuario registrado! Estadísticas actualizadas');
        }, 500);
    });
    
    // Actualizar cuando se muestra la sección
    const statsSection = document.getElementById('estadisticas');
    if (statsSection) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (statsSection.style.display !== 'none') {
                        console.log('📊 Sección mostrada, actualizando...');
                        setTimeout(() => updateStats(), 300);
                    }
                }
            });
        });
        observer.observe(statsSection, { attributes: true });
    }
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', function(event) {
        if (event.key === 'empathy_users') {
            console.log('📊 Cambios detectados en localStorage, actualizando...');
            setTimeout(() => updateStats(), 300);
        }
    });
    
    // Hacer función global
    window.updateStats = updateStats;
    window.refreshDashboard = refreshDashboard;
    window.downloadStats = downloadStats;
    
    console.log('✅ Sistema de estadísticas inicializado');
});

// Función para refrescar dashboard (alias para compatibilidad)
function refreshDashboard() {
    updateStats();
}
