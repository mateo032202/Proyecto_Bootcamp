# 🤖 Sistema de Chatbot Violet Flotante - Empathy

## ✨ Implementación de Ventana Flotante

### 🎯 **Funcionalidad Principal**
- **Ventana flotante**: El chatbot aparece en una ventana flotante, no embebido en la página
- **Activación por botón**: Se activa al hacer clic en "Iniciar Chat con Violet"
- **Integración con n8n**: Conectado al webhook configurado
- **Interfaz independiente**: Funciona como una ventana separada que se puede mover

### 🔧 **Características Técnicas**

#### 1. **Configuración del Chatbot**
```javascript
createChat({
    webhookUrl: 'https://karenospi.app.n8n.cloud/webhook/d922a1f4-8307-4ca7-9f6e-1a600c7f0a64/chat',
    target: '#n8n-chat-container',
    mode: 'embedded',
    defaultLanguage: 'es',
    initialMessages: [
        'Hola! 👋',
        'Soy 𝑽𝒊𝒐𝒍𝒆𝒕. ¿Quieres contarme cómo te sientes hoy?'
    ]
});
```

#### 2. **Flujo de Usuario**
1. **Usuario hace clic en "Chat en Vivo"** → Navega a la sección chat
2. **Hace clic en "Iniciar Chat con Violet"** → Se abre ventana flotante
3. **Chatbot se carga** → Aparece la interfaz de chat en la ventana flotante
4. **Conversación disponible** → Usuario puede chatear con Violet
5. **Controles disponibles** → Minimizar, cerrar, arrastrar ventana

#### 3. **Estados de la Ventana**
- **Cerrada**: No visible, esperando activación
- **Abierta**: Ventana flotante visible con chat funcional
- **Minimizada**: Solo header visible, chat oculto
- **Arrastrable**: Usuario puede mover la ventana por la pantalla

### 🎨 **Interfaz de la Ventana Flotante**

#### **Estructura HTML**
```html
<div id="chat-flotante" class="chat-flotante">
    <div class="chat-flotante-header">
        <div class="chat-flotante-titulo">
            <span class="chat-status-indicator"></span>
            <h4>💜 Violet - Apoyo Emocional</h4>
        </div>
        <div class="chat-flotante-controles">
            <button id="minimizar-chat">−</button>
            <button id="cerrar-chat-flotante">×</button>
        </div>
    </div>
    <div class="chat-flotante-body">
        <div id="n8n-chat-container"></div>
    </div>
</div>
```

#### **Controles de la Ventana**
- **Indicador de estado**: Punto verde pulsante que indica conexión
- **Botón minimizar**: Reduce la ventana solo al header
- **Botón cerrar**: Cierra completamente la ventana
- **Header arrastrable**: Permite mover la ventana por la pantalla

---

## ✅ **Estado: Chatbot Flotante Implementado**

El chatbot Violet ahora funciona como una **ventana flotante independiente** que se abre cuando el usuario hace clic en "Iniciar Chat con Violet". La ventana incluye controles para minimizar, cerrar y arrastrar, proporcionando una experiencia de chat moderna y funcional.

### 🎊 **Funcionalidades Completadas**

- ✅ **Ventana flotante**: Aparece en esquina inferior derecha
- ✅ **Controles interactivos**: Minimizar, cerrar, arrastrar
- ✅ **Integración n8n**: Conectado al webhook configurado
- ✅ **Responsive**: Adaptado para móviles
- ✅ **Persistencia**: Mantiene conversación entre sesiones
- ✅ **Personalización**: Mensajes y estilos de Empathy

**¡El chatbot flotante está completamente operativo y listo para brindar apoyo emocional!** 🌟

## ✨ Implementación Completada

### 🎯 **Funcionalidad Principal**
- **Integración con n8n**: Chatbot Violet conectado al webhook de n8n
- **Activación por botón**: Se activa al hacer clic en "Chat en Vivo"
- **Modo embebido**: El chat aparece dentro de la sección, no como ventana flotante
- **Interfaz intuitiva**: Botones para iniciar, cerrar y reiniciar conversaciones

### 🔧 **Características Técnicas**

#### 1. **Configuración del Chatbot**
```javascript
createChat({
    webhookUrl: 'https://karenospi.app.n8n.cloud/webhook/d922a1f4-8307-4ca7-9f6e-1a600c7f0a64/chat',
    target: '#n8n-chat',
    mode: 'embedded',
    defaultLanguage: 'es',
    initialMessages: [
        'Hola! 👋',
        'Soy 𝑽𝒊𝒐𝒍𝒆𝒕. ¿Quieres contarme cómo te sientes hoy?'
    ]
});
```

#### 2. **Flujo de Usuario**
1. **Usuario hace clic en "Chat en Vivo"** → Navega a la sección chat
2. **Hace clic en "Iniciar Chat con Violet"** → Se inicializa el chatbot
3. **Chatbot se carga** → Aparece la interfaz de chat embebida
4. **Conversación disponible** → Usuario puede chatear con Violet
5. **Opciones adicionales** → Cerrar chat o nueva conversación

#### 3. **Estados del Chat**
- **Estado inicial**: Botón "Iniciar Chat con Violet"
- **Estado cargando**: "⏳ Conectando con Violet..."
- **Estado activo**: Chat embebido funcional
- **Estado error**: Mensaje de error con opción de reintentar

### 🎨 **Interfaz de Usuario**

#### **Sección Chat en Vivo**
```html
<section id="chat">
    <h2>Chat en Vivo</h2>
    <div class="chat-info">
        <h3>💬 Apoyo Emocional con Violet</h3>
        <p>Tu espacio seguro para desahogarte</p>
    </div>
    <div id="n8n-chat"></div>
    <button id="iniciar-chat">💬 Iniciar Chat con Violet</button>
</section>
```

#### **Botones de Control**
- **Iniciar Chat**: Activa el chatbot por primera vez
- **Cerrar Chat**: Oculta el chatbot y regresa al estado inicial
- **Nueva Conversación**: Reinicia la sesión del chat
- **Reintentar**: En caso de error, reinicia la conexión

### 🔄 **Funciones Principales**

#### **initializeChatbot()**
- Carga el módulo de n8n dinámicamente
- Configura el chatbot con parámetros personalizados
- Maneja errores de conexión
- Establece mensajes iniciales en español

#### **showChatError()**
- Muestra mensajes de error amigables
- Proporciona opción de reintentar
- Mantiene la experiencia de usuario fluida

#### **reiniciarChat()**
- Limpia la instancia actual del chatbot
- Reinicia la conexión con el servidor
- Útil para resolver problemas de conexión

#### **nuevaConversacion()**
- Borra la sesión actual del chat
- Inicia una nueva conversación limpia
- Mantiene la configuración del chatbot

### 🎯 **Personalización Implementada**

#### **Mensajes en Español**
```javascript
i18n: {
    es: {
        title: 'Empathy - Chat de Apoyo',
        subtitle: 'Bienvenid@ a tu espacio seguro 💜',
        inputPlaceholder: 'Mensaje...',
        getStarted: 'Nueva conversación'
    }
}
```

#### **Mensajes Iniciales**
- "Hola! 👋"
- "Soy 𝑽𝒊𝒐𝒍𝒆𝒕. ¿Quieres contarme cómo te sientes hoy?"

#### **Metadatos de Usuario**
- UserID desde sessionStorage
- Plataforma identificada como 'empathy_app'
- Sesión persistente entre recargas

### 🎨 **Estilos CSS Implementados**

#### **Contenedor del Chat**
```css
#n8n-chat {
    height: 500px;
    border: 2px solid #e9ecef;
    border-radius: 15px;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

#### **Animaciones**
- **slideInUp**: Para la aparición del chatbot
- **fadeIn**: Para transiciones suaves
- **Hover effects**: En botones y elementos interactivos

#### **Botones Estilizados**
- Gradientes morados para el tema Empathy
- Efectos de hover y click
- Estados disabled para carga

### 📱 **Responsive Design**
- **Contenedor adaptable**: Max-width: 1000px
- **Chat responsive**: Se ajusta a diferentes tamaños de pantalla
- **Botones móviles**: Tamaño adecuado para touch

### 🔐 **Seguridad y Privacidad**
- **Conexión HTTPS**: Webhook seguro de n8n
- **Sesiones locales**: Datos almacenados localmente
- **Sin almacenamiento permanente**: Conversaciones no persisten en servidor

### 🎯 **Beneficios de la Implementación**

1. **Integración perfecta**: No es un widget flotante, sino parte de la interfaz
2. **Control total**: Usuarios deciden cuándo iniciar el chat
3. **Experiencia fluida**: Transiciones suaves entre estados
4. **Manejo de errores**: Recuperación automática de fallos
5. **Personalización completa**: Mensajes y estilos adaptados a Empathy
6. **Responsive**: Funciona en desktop y móvil

### 🚀 **Cómo Usar**

1. **Navegar a Chat en Vivo**: Click en el botón del menú
2. **Iniciar conversación**: Click en "Iniciar Chat con Violet"
3. **Esperar conexión**: El sistema carga automáticamente
4. **Conversar**: Chatear normalmente con Violet
5. **Gestionar sesión**: Usar botones de control según necesidad

### 🔧 **Configuración Técnica**

#### **Webhook URL**
```
https://karenospi.app.n8n.cloud/webhook/d922a1f4-8307-4ca7-9f6e-1a600c7f0a64/chat
```

#### **Parámetros del Chat**
- **Mode**: embedded (embebido)
- **Language**: es (español)
- **Session**: Persistente con localStorage
- **Metadata**: UserID y plataforma

---

## ✅ **Estado: Implementación Completada**

El chatbot Violet está completamente integrado en la sección "Chat en Vivo" de Empathy, funcionando como un sistema embebido que se activa cuando el usuario lo solicita, proporcionando una experiencia de apoyo emocional personalizada y segura.
