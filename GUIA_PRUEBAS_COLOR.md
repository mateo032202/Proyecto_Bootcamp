# 🎨 GUÍA DE PRUEBAS - COLOR DE SOBRES Y AJUSTE DE TEXTO

## ✅ PASOS PARA PROBAR LA FUNCIONALIDAD COMPLETA

### 1. Preparación
1. Abre `index.html` en el navegador
2. Ve a la sección "Testimonios" (click en el menú)
3. Desplázate hasta el formulario "Comparte tu experiencia"

### 2. Prueba de Selección de Color
1. Observa el selector de colores pasteles
2. El color por defecto debe ser "Blanco Clásico" (seleccionado)
3. Haz click en diferentes colores y verifica que:
   - Se marque visualmente la selección (borde morado)
   - El texto cambie a "Color seleccionado: [Nombre del Color]"

### 3. Prueba de Ajuste de Texto
Prueba estos casos específicos:

#### Caso A: Texto Corto (≤100 caracteres)
- **Nombre:** "Juan Pérez"
- **Testimonio:** "Empathy me ayudó mucho. Recomendado."
- **Resultado esperado:** Fuente 11px, bien espaciado

#### Caso B: Texto Medio (101-150 caracteres)
- **Nombre:** "María García"
- **Testimonio:** "Gracias a Empathy, aprendí a valorarme y a encontrar esperanza cuando todo parecía perdido. Su equipo es excepcional."
- **Resultado esperado:** Fuente 10px, ajustado

#### Caso C: Texto Largo (151-200 caracteres)
- **Nombre:** "Carlos Rodríguez"
- **Testimonio:** "Empathy transformó mi vida completamente. No solo me ayudó a superar mis problemas, sino que me enseñó herramientas valiosas para enfrentar futuros desafíos con confianza y esperanza."
- **Resultado esperado:** Fuente 9px, compacto

#### Caso D: Texto Muy Largo (>200 caracteres)
- **Nombre:** "Ana López"
- **Testimonio:** "Mi experiencia con Empathy ha sido extraordinaria. Llegué en un momento muy difícil de mi vida, sintiéndome perdida y sin esperanza. El equipo no solo me brindó apoyo emocional, sino que me ayudó a descubrir mis fortalezas internas y a desarrollar una nueva perspectiva de vida llena de posibilidades."
- **Resultado esperado:** Fuente 8px, texto truncado si es necesario

### 4. Verificación Visual COMPLETA
El nuevo testimonio debe mostrar:
1. **Texto completamente visible** dentro del área de la carta
2. **Sin desbordamiento** fuera del contenedor
3. **Cuerpo del sobre:** Color seleccionado
4. **Solapa del sobre:** Color ligeramente más oscuro
5. **Legibilidad perfecta** sin importar la longitud

### 5. Debugging de Texto
1. Abre la consola del navegador (F12)
2. Carga el script de debug de texto:
```javascript
// Cargar script de debugging de texto
const script = document.createElement('script');
script.src = 'debug-texto.js';
document.head.appendChild(script);
```

3. Comandos de debugging disponibles:
```javascript
// Diagnosticar formato de todos los testimonios
testTexto.diagnosticar();

// Probar diferentes longitudes de texto
testTexto.probarLongitudes();

// Probar texto específico en el último testimonio
testTexto.probarEnVivo("Tu texto de prueba aquí para verificar el ajuste automático");

// Reparar formato de todos los testimonios
testTexto.repararTodos();
```

### 6. Debugging Específico para Solapa (Previo)
```javascript
// Cargar script de debugging de solapa
const script2 = document.createElement('script');
script2.src = 'debug-solapa.js';
document.head.appendChild(script2);

// Aplicar color rosa pastel a la última solapa creada
debugSolapa.aplicarColorUltimaSolapa("#FFE8F0");
```

### 6. Colores Disponibles para Probar
- **Verde Pastel:** #E8F5E8 (Solapa: #cce0cc)
- **Azul Pastel:** #E8F0FF (Solapa: #ccdaff)
- **Rosa Pastel:** #FFE8F0 (Solapa: #ffccdd)
- **Amarillo Pastel:** #FFF8E8 (Solapa: #ffe8cc)
- **Lavanda Pastel:** #F0E8FF (Solapa: #ddccff)
- **Celeste Pastel:** #E8F8FF (Solapa: #cceeff)
- **Durazno Pastel:** #F8F0E8 (Solapa: #eeddcc)
- **Menta Pastel:** #F0F8E8 (Solapa: #ddeedd)
- **Blanco Clásico:** #FAFAFA (Solapa: gris original)

### 7. Qué Buscar en la Consola
Cuando crees un testimonio, deberías ver logs como:
```
🎭 Iniciando creación de nuevo testimonio
🎨 Color del sobre a aplicar: #FFE8F0
� Gradiente CUERPO encontrado: gradienteCuerpo14 con 2 stops
✅ GRADIENTE CUERPO - Color personalizado aplicado: #FFE8F0 -> #ffccdd
📍 Gradiente TAPA encontrado: gradienteTapa14 con 2 stops
✅ GRADIENTE TAPA - Color personalizado aplicado: #f2dde6 -> #e6c6d9
✅ POLÍGONO SOLAPA - Color directo aplicado: #f2dde6
🎯 FORZADO FINAL SOLAPA - Polígono 1: #f2dde6
✅ VERIFICACIÓN VISUAL COMPLETADA - Color forzado en CUERPO y SOLAPA: #FFE8F0
```

### 8. Verificación Manual Específica para Solapa
Si la solapa no muestra el color correcto:

1. **Diagnóstico:**
```javascript
debugSolapa.diagnosticar();
```

2. **Aplicación Manual:**
```javascript
// Forzar color rosa a la última solapa
debugSolapa.aplicarColorUltimaSolapa("#FFE8F0");
```

3. **Verificación Directa en DOM:**
```javascript
// Inspeccionar último sobre
const ultimoSobre = document.querySelector('.testimonio-carta-wrapper:last-child svg');
const poligonos = ultimoSobre.querySelectorAll('polygon[points*="80,120 200,200 320,120"]');
console.log('Polígonos de solapa encontrados:', poligonos.length);
poligonos.forEach((p, i) => console.log(`Polígono ${i+1} fill:`, p.getAttribute('fill')));
```

### 9. Resultado Esperado COMPLETO
✅ **ÉXITO TOTAL:** 
- Cuerpo del sobre: Color seleccionado
- Solapa del sobre: Tonalidad ligeramente más oscura del mismo color
- Coherencia visual perfecta entre ambos elementos

❌ **FALLO PARCIAL:** 
- Si solo el cuerpo tiene color pero la solapa sigue gris
- Usar `debugSolapa.aplicarColorUltimaSolapa()` para corregir

### 10. Casos de Prueba Específicos

#### Caso 1: Color Rosa Pastel
- **Seleccionar:** Rosa Pastel (#FFE8F0)
- **Resultado esperado:** 
  - Cuerpo: Rosa suave
  - Solapa: Rosa más intenso

#### Caso 2: Color Verde Pastel
- **Seleccionar:** Verde Pastel (#E8F5E8)
- **Resultado esperado:**
  - Cuerpo: Verde muy suave
  - Solapa: Verde ligeramente más intenso

#### Caso 3: Color Blanco Clásico
- **Seleccionar:** Blanco Clásico (#FAFAFA)
- **Resultado esperado:**
  - Cuerpo: Blanco/gris muy claro
  - Solapa: Gris clásico (sin cambio)

### 11. Información Técnica Adicional
- **Elementos afectados:**
  - `linearGradient[id*="gradienteCuerpo"]` - Gradiente del cuerpo
  - `linearGradient[id*="gradienteTapa"]` - Gradiente de la solapa
  - `polygon[points*="80,120 200,200 320,120"]` - Polígono de la solapa
  - `rect[width="240"][height="140"]` - Rectángulos del cuerpo

- **Lógica de color:**
  - Cuerpo: Color seleccionado exacto
  - Solapa: Color seleccionado con -5% de brillo
  - Degradado solapa: -5% a -15% de brillo

- **Prioridad de aplicación:**
  1. Gradientes SVG (método preferido)
  2. Atributos `fill` directos
  3. Estilos CSS inline con `!important`
