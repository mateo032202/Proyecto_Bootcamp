# 🤖 Chatbot Violet - Empathy

## Descripción
Violet es el chatbot de apoyo emocional integrado en la plataforma Empathy. Está diseñado para brindar contención emocional comprensiva y respetuosa a adolescentes y jóvenes.

## 🎯 Características Principales

### Personalidad de Violet
- **Tono**: Comprensivo, cercano y respetuoso
- **Objetivo**: Proporcionar apoyo emocional como lo haría un ser humano sensible
- **Horario**: Disponible de lunes a domingo, 08:00 AM - 08:00 PM
- **Idioma**: Español (configurado como predeterminado)

### Funcionalidades Implementadas

#### 1. Integración con n8n
- **Webhook URL**: `https://karenospi.app.n8n.cloud/webhook/d922a1f4-8307-4ca7-9f6e-1a600c7f0a64/chat`
- **Modo**: Embebido (embedded)
- **Persistencia**: Mantiene sesiones previas
- **Carga de historial**: Activada

#### 2. Mensajes Iniciales
```
"Hola! 👋"
"Soy 𝑽𝒊𝒐𝒍𝒆𝒕. ¿Quieres contarme cómo te sientes hoy?"
```

#### 3. Localización (i18n)
- **Título**: "Empathy - Apoyo Emocional"
- **Subtítulo**: "Bienvenid@ a tu espacio seguro 💜"
- **Footer**: "Horario: Lunes a domingo, 08:00 AM - 08:00 PM"
- **Placeholder**: "Cuéntame cómo te sientes..."

#### 4. Indicador de Estado
- 🟢 **Verde**: Violet está disponible (08:00 AM - 08:00 PM)
- 🟡 **Amarillo**: Violet responderá pronto (fuera de horario)
- **Actualización**: Cada minuto

#### 5. Manejo de Errores
- Mensajes de error personalizados con el branding de Empathy
- Información de contacto de emergencia: WhatsApp 35081676**
- Instrucciones claras para el usuario

## 🛠️ Implementación Técnica

### Archivos Modificados

#### 1. `app.html`
- **Línea 169**: Botón de navegación "Chat en Vivo"
- **Líneas 911-930**: Estructura del chat flotante
- **Líneas 1401-1490**: Lógica de inicialización del chatbot

#### 2. `main.js`
- **Líneas 130-138**: Manejador de eventos para botón de chat
- **Cambio**: `window.openChatWindow()` → `window.abrirChatFlotante()`

#### 3. `test-chatbot-empathy.html` (Nuevo)
- Página de pruebas dedicada para el chatbot
- Interfaz completa con estado y controles
- Implementación de referencia

### Funciones Clave

#### `inicializarChatbotFlotante()`
```javascript
function inicializarChatbotFlotante() {
    if (chatbotInicializado) return;
    
    // Configuración completa del chatbot con n8n
    createChat({
        webhookUrl: 'https://karenospi.app.n8n.cloud/webhook/...',
        // ... configuración completa
    });
}
```

#### `abrirChatFlotante()`
```javascript
function abrirChatFlotante() {
    const chatFlotante = document.getElementById('chat-flotante');
    chatFlotante.style.display = 'block';
    
    if (!chatbotInicializado) {
        inicializarChatbotFlotante();
    }
}
```

#### `actualizarEstadoHorario()`
```javascript
function actualizarEstadoHorario() {
    const ahora = new Date();
    const hora = ahora.getHours();
    const enHorario = hora >= 8 && hora < 20;
    
    // Actualizar indicador visual
}
```

## 🎨 Diseño y UX

### Elementos Visuales
- **Colores**: Paleta violeta (#5D3FD3, #667eea, #764ba2)
- **Íconos**: Corazón morado 💜 como identidad visual
- **Animaciones**: Pulsaciones sutiles para indicadores de estado
- **Tipografía**: Arial, sans-serif para legibilidad

### Mensajes de Estado
- **Carga**: "Violet se está preparando para ti..."
- **Error**: "Violet no pudo conectarse. Por favor, intenta más tarde."
- **Reinicio**: "Reiniciando conversación con Violet..."

## 📱 Contacto de Emergencia

En caso de que Violet no esté disponible o se necesite ayuda inmediata:
- **WhatsApp**: 35081676**
- **Correo**: empathy@apoyoemocional.org

## 🔗 Conexión con el Botón "Chat en Vivo"

### Flujo de Interacción
1. Usuario hace clic en "Chat en Vivo" en la navegación
2. Se ejecuta `window.abrirChatFlotante()`
3. Se muestra la ventana flotante del chat
4. Si no está inicializado, se carga el chatbot de n8n
5. El usuario puede interactuar con Violet

### Eventos Conectados
- **Click en navegación**: `href="#chat"` → `abrirChatFlotante()`
- **Botón flotante**: `onclick="window.abrirChatFlotante()"`
- **Cerrar**: `cerrarChatFlotante()`
- **Minimizar**: Toggle clase `minimizado`

## 🚀 Uso

### Para Desarrolladores
1. El chatbot se inicializa automáticamente al hacer clic
2. La configuración está centralizada en `app.html`
3. Los estilos están integrados con el diseño principal
4. El estado se actualiza automáticamente cada minuto

### Para Usuarios
1. Hacer clic en "Chat en Vivo" en la navegación
2. Esperar a que Violet se inicialice
3. Comenzar la conversación
4. Usar los controles para minimizar/cerrar según necesidad

## 📊 Métricas y Monitoreo

- **Sesiones**: Mantenidas por n8n
- **Horario**: Monitoreado en tiempo real
- **Errores**: Registrados en consola
- **Estado**: Visible para el usuario

## 🔧 Configuración Técnica

### Dependencias
- n8n Chat Widget: `@n8n/chat/dist/chat.bundle.es.js`
- CSS: `@n8n/chat/dist/style.css`
- Modo: ES6 Modules

### Variables de Configuración
```javascript
const CONFIG = {
    webhookUrl: 'https://karenospi.app.n8n.cloud/webhook/...',
    horarioInicio: 8,
    horarioFin: 20,
    idioma: 'es',
    contactoEmergencia: '35081676**'
};
```

---

**Empathy Project** - Reduciendo el porcentaje de suicidios en el siglo XXI 💜
