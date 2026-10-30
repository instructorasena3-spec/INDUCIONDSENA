# Sincronización en Tiempo Real con Google Sheets y Google Drive para Inducción SENA

Sistema automatizado de persistencia en la nube que crea y actualiza en tiempo real una hoja de cálculo institucional en Google Drive vinculada a la cuenta del Instructor, reflejando el avance por módulos y las calificaciones de la evaluación de inducción de los aprendices conforme interactúan con el aplicativo.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas en la fase de clarificación interactiva:**
> - **Estructura centralizada**: Se creará una hoja de cálculo unificada titulada `SENA - Registro de Inducción de Aprendices (Ficha [Código])` en el Google Drive del Instructor, organizada con pestañas para "Consolidado de Aprendices" y "Bitácora de Respuestas y Evaluación".
> - **Sincronización en tiempo real**: Los registros se actualizarán instantáneamente cuando un aprendiz marque un módulo como completado y cuando finalice su evaluación de inducción.
> - **Autenticación con Google Workspace**: El Instructor autorizará la conexión con Google Drive y Google Sheets desde su panel mediante el flujo oficial de OAuth con el alcance mínimo requerido (`spreadsheets` y `drive.file`).

- **Decisión Confirmada 1**: Hoja de cálculo central en la cuenta del Instructor con enlace directo en el panel de control.
- **Decisión Confirmada 2**: Sincronización en vivo sin fricción para el aprendiz, respaldando en almacenamiento local si no hay conexión activa.
- **Decisión Abierta / Recomendada**: La hoja incluirá formato condicional institucional (verde SENA `#39A900` para estados "APROBADO", ámbar para "EN PROGRESO" y rojo para "REPROBADO").

---

## 1. Overview & Core Concept

- **Qué hace**: Permite al instructor conectar su cuenta de Google Workspace para generar automáticamente una hoja de cálculo oficial en su Google Drive. Cada vez que los aprendices interactúan con la plataforma (avanzan en los módulos 1 a 5 o presentan la evaluación interactiva), sus datos de progreso, respuestas y calificación se sincronizan de manera transparente en la hoja de cálculo.
- **Público Objetivo**: 
  - **Instructores y Gestores de Ficha**: Disponen de una base de datos en la nube siempre actualizada, auditable y compartible con la coordinación académica sin necesidad de exportaciones manuales continuas.
  - **Aprendices**: Su avance y certificación quedan respaldados con trazabilidad institucional formal.
- **Valor Principal**: Automatización total del seguimiento formativo, garantizando que el acta y el consolidado de inducción estén permanentemente sincronizados con las evidencias de los aprendices.

---

## 2. User Experience & Visual Design

### Flujos Clave de Usuario

1. **Flujo del Instructor (Conexión y Creación de la Hoja)**:
   - En el **Panel de Seguimiento y Fichas** (vista Instructor), se incorpora una tarjeta destacada con el estado de sincronización de Google Sheets.
   - El instructor hace clic en **"Conectar con Google Drive / Sheets"** (botón oficial con diseño institucional de Google).
   - Se ejecuta el proceso de vinculación; una vez autorizado, el sistema detecta si ya existe una hoja para la ficha activa o crea una nueva con encabezados institucionales (`Tipo Documento`, `Número`, `Nombre Completo`, `Correo`, `Ficha`, `Módulos Completados (1-5)`, `Progreso %`, `Puntaje Evaluación`, `Intentos`, `Estado`, `Folio Certificado`, `Fecha Última Actualización`).
   - Se muestra un enlace directo con icono: **"Abrir Hoja de Cálculo en Google Drive"** e indicador de pulso verde: **"Sincronización en Vivo Activa"**.

2. **Flujo del Aprendiz (Sincronización Transparente)**:
   - El aprendiz ingresa con su documento y desarrolla su proceso de inducción normalmente.
   - Al marcar un módulo como estudiado o al completar la evaluación de conocimientos, un indicador sutil en la esquina inferior ("Sincronizado con Google Sheets ✓") confirma que su registro fue actualizado en la nube.
   - Si no hay conexión o el token caduca, el registro se almacena en caché local y se sincroniza automáticamente en el siguiente ciclo.

### Identidad Visual y Componentes
- **Aesthetic Direction**: Limpio, corporativo y utilitario, alineado con las directrices visuales del SENA y el estilo oficial de Google Workspace.
- **Paleta de Colores**: 
  - Verde SENA (`#39A900` / `emerald-600`) para estados sincronizados y botones de éxito.
  - Azul Google (`#4285F4`) para el botón de autenticación con Google.
  - Indicadores en Modo Claro (`bg-white`, `border-slate-200`) y Modo Oscuro (`bg-slate-900`, `border-slate-800`).
- **Estados de Interacción**:
  - *Estado Desconectado*: Banner informativo invitando al instructor a conectar su Google Drive.
  - *Estado Sincronizando*: Animación de giro sutil con etiqueta "Actualizando hoja en Drive...".
  - *Estado Conectado*: Badge verde con ID de la hoja, hora de última sincronización y botón de acceso directo.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Alcance mínimo de permisos OAuth (`Least Privilege`)**:
  - *Enfoque Elegido*: Solicitar únicamente `https://www.googleapis.com/auth/spreadsheets` y `https://www.googleapis.com/auth/drive.file`.
  - *Por qué*: `drive.file` solo permite ver y editar los archivos creados específicamente por esta aplicación, sin acceder a otros documentos privados del instructor en su Drive.
  - *Alternativas Descartadas*: `drive` completo (demasiado invasivo e innecesario).

- **Decisión 2: Sincronización transparente y asíncrona (Optimistic UI)**:
  - *Enfoque Elegido*: Las acciones del aprendiz (completar módulo, enviar evaluación) actualizan inmediatamente la interfaz local y desencadenan la sincronización con Google Sheets en segundo plano.
  - *Por qué*: Evita bloqueos en la interfaz o lentitud si la API de Google tarda unos cientos de milisegundos en responder.

- **Decisión 3: Arquitectura de Almacenamiento Dual (Local + Cloud)**:
  - *Enfoque Elegido*: Mantener la persistencia en `localStorage` como base local y enviar réplicas a Google Sheets.
  - *Por qué*: Garantiza que la aplicación funcione incluso sin conexión a internet o antes de que el instructor vincule su cuenta.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Diagrama del Sistema y Flujo de Datos

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PORTAL INDUCCIÓN SENA                           │
└────────────────────────────────────────────────────────────────────────┘
          │                                              │
          ▼                                              ▼
┌───────────────────────────────┐              ┌───────────────────────────────┐
│        VISTA APRENDIZ         │              │        VISTA INSTRUCTOR       │
│  - Módulos 1-5                │              │  - Panel de Fichas            │
│  - Evaluación de Apropiación  │              │  - Conectar Google Workspace  │
│  - Certificado Digital        │              │  - Configuración & Métricas   │
└───────────────────────────────┘              └───────────────────────────────┘
          │                                              │
          │ (Evento: Módulo / Examen)                    │ (OAuth Google SignIn)
          ▼                                              ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     GESTOR DE SINCRONIZACIÓN                           │
│  - Verifica sesión OAuth activa y Token Bearer                         │
│  - Formatea filas para la API v4 de Google Sheets                      │
│  - Sincronización en segundo plano con reintentos                      │
└────────────────────────────────────────────────────────────────────────┘
          │                                              │
          ▼                                              ▼
┌───────────────────────────────┐              ┌───────────────────────────────┐
│     LOCAL STORAGE BACKUP      │              │   GOOGLE WORKSPACE APIS       │
│  - Persistencia de sesión     │              │   (sheets.googleapis.com)     │
│  - Cola de cambios pendientes │              │   - spreadsheets.create       │
│                               │              │   - values.append / update    │
└───────────────────────────────┘              └───────────────────────────────┘
                                                         │
                                                         ▼
                                               ┌───────────────────────────────┐
                                               │    GOOGLE DRIVE INSTRUCTOR    │
                                               │  [Hoja: Inducción Ficha ...]  │
                                               └───────────────────────────────┘
```

### Esquema de Columnas en Google Sheets
1. `Timestamp`: Fecha y hora exacta de sincronización (ISO / legible).
2. `Tipo Doc`: `CC`, `TI`, `CE`, etc.
3. `Documento`: Identificación del aprendiz.
4. `Nombre Completo`: Nombres y apellidos.
5. `Correo Electrónico`: Correo institucional o personal.
6. `Ficha`: Código de caracterización (ej. `2824901`).
7. `Programa`: Nombre del programa formativo.
8. `Módulos Completados`: Cantidad y lista (ej. `3/5 (Módulos 1, 2, 3)`).
9. `Progreso Inducción %`: Porcentaje de avance (0 a 100%).
10. `Puntaje Evaluación`: Calificación porcentual obtenida (ej. `90%`).
11. `Intentos`: Número de veces que presentó la prueba.
12. `Estado`: `APROBADO`, `EN PROGRESO`, `REPROBADO`, `SIN INICIAR`.
13. `Folio Certificado`: Código único de certificación institucional.

---

## Fases de Ejecución Tras Aprobación

1. **Fase 1: Configuración de Integración OAuth con Google Workspace**:
   - Activar las herramientas de aprovisionamiento de OAuth (`set_up_oauth`) con los permisos requeridos (`spreadsheets` y `drive.file`).
   - Crear el servicio cliente `src/services/googleSheetsService.ts` para autenticación, creación de la hoja y actualización de celdas por lote.
2. **Fase 2: Componente de Control en Vista de Instructor**:
   - Integrar tarjeta de estado de Google Sheets en `InstructorDashboard.tsx` con botón de inicio de sesión de Google, enlace al documento en Drive y botón de sincronización forzada.
3. **Fase 3: Disparadores de Sincronización en Tiempo Real**:
   - Conectar los despachadores en `handleToggleModuleCompletion` y `handleFinishAssessment` en `App.tsx` para sincronizar automáticamente cada respuesta y cambio de estado con Google Sheets.
4. **Fase 4: Verificación y Pruebas**:
   - Validar con `lint_applet` y `compile_applet`, verificando la creación de la hoja, actualización de filas y manejo de errores sin conexión.
