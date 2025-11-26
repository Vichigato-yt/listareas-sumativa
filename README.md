# 📝 Lista de Tareas - App Sumativa

Una aplicación móvil moderna de gestión de tareas desarrollada con React Native, Expo y TypeScript. Incluye temas personalizables, validación de formularios con Zod, gestos táctiles intuitivos y alertas personalizadas.

## ✨ Características Principales

### 🎨 **Sistema de Temas**
- 5 temas personalizables: Claro, Oscuro, Halloween, Navidad, Team Fortress 2
- Colores dinámicos que se aplican a toda la aplicación
- Persistencia del tema seleccionado con AsyncStorage

### 📋 **Gestión de Tareas**
- ✅ Crear tareas con título y descripción opcional
- ✏️ Editar tareas mediante modal inline
- 🗑️ Eliminar tareas con confirmación
- ☑️ Marcar como completadas/pendientes
- 🔄 Actualización en tiempo real

### 🎯 **Gestos Táctiles**
- **Deslizar derecha (→)** → Editar
- **Deslizar izquierda (←)** → Eliminar
- Feedback visual con colores e íconos
- Animaciones suaves

### 🔔 **Alertas Personalizadas**
- Alertas adaptadas al tema activo
- 4 tipos: Éxito, Error, Advertencia, Info
- Diseño moderno con íconos y animaciones

### ✅ **Validación con Zod v4**
- Validación en tiempo real
- Títulos obligatorios (alfanuméricos)
- Descripciones opcionales
- Mensajes de error con íconos

## 🛠️ Tecnologías

- **React Native 0.81.5** + **Expo ~54.0.25**
- **TypeScript 5.9.2**
- **Expo Router v6**
- **NativeWind v4** (Tailwind CSS)
- **Zod v4.1.13**
- **Axios v1.13.2**
- **json-server v1.0.0-beta.3**
- **React Context API**

## 📦 Instalación

### **Prerrequisitos**
- Node.js v18+
- npm o yarn
- Expo Go app (móvil)

### **Pasos**

1. **Clonar repositorio**
```bash
git clone https://github.com/Vichigato-yt/listareas-sumativa.git
cd listareas-sumativa
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor JSON (IMPORTANTE)**
```bash
npm run api
```
**Déjalo corriendo** en `http://localhost:3000`

4. **Iniciar Expo (otra terminal)**
```bash
npm start
```

5. **Abrir app**
- Presiona `w` → Web
- Presiona `a` → Android
- Presiona `i` → iOS
- Escanea QR con Expo Go

## 🚀 Scripts Disponibles

```bash
npm start          # Iniciar Expo
npm run api        # Iniciar json-server (REQUERIDO)
npm run web        # Web
npm run android    # Android
npm run ios        # iOS
npm run lint       # ESLint
```

## 🗂️ Estructura del Proyecto

```
listareas-sumativa/
├── app/                    # Rutas (Expo Router)
│   ├── _layout.tsx        # Layout con providers
│   ├── index.tsx          # Lista de tareas
│   ├── add.tsx            # Crear tarea
│   ├── settings.tsx       # Configuración de temas
│   └── edit/[id].tsx      # Editar (deprecated)
├── components/            # Componentes reutilizables
│   ├── CustomAlert.tsx    # Alertas personalizadas
│   ├── EditTaskModal.tsx  # Modal de edición
│   ├── EmptyState.tsx     # Estado vacío
│   ├── ErrorBanner.tsx    # Banner de errores
│   ├── FormInput.tsx      # Input con validación
│   ├── IconButton.tsx     # Botón con ícono
│   ├── LoadingState.tsx   # Indicador de carga
│   ├── TaskForm.tsx       # Formulario de tareas
│   └── TaskItem.tsx       # Tarjeta con gestos
├── lib/
│   ├── context/           # TaskContext, ThemeContext
│   ├── hooks/             # useTaskForm
│   ├── services/          # taskService (Axios)
│   ├── types/             # task.ts, theme.ts
│   └── utils/             # validation.ts, zodSchemas.ts
└── db.json                # Base de datos
```

## 🐛 Solución de Problemas

### **Error: Network Error / Cannot connect**
1. Verifica que json-server esté corriendo: `npm run api`
2. Debe aparecer: `JSON Server started on PORT: 3000`
3. Recarga la app: presiona `r` en terminal Expo

### **Dispositivo físico**
Edita `lib/services/taskService.ts` con tu IP local:
```typescript
return 'http://192.168.1.X:3000/tasks';
```

### **Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Uso

1. **Ver tareas**: Pantalla principal
2. **Agregar**: Botón "+" flotante
3. **Editar**: Desliza derecha → o botón "Editar"
4. **Eliminar**: Desliza izquierda ← o botón "Eliminar"
5. **Completar**: Presiona el círculo
6. **Cambiar tema**: Configuración → Selecciona tema

## 📝 Changelog

### **v1.0.0** - 2025-11-26

#### Añadido
- ✨ Sistema de 5 temas personalizables
- ✨ Validación Zod v4
- ✨ Gestos de deslizamiento
- ✨ Alertas personalizadas
- ✨ Modal de edición inline
- ✨ Componentes reutilizables
- ✨ Persistencia con AsyncStorage

#### Mejorado
- 💄 Diseño con bordes redondeados y sombras
- 💄 Espaciado y tipografía
- 🎨 Colores dinámicos en header
- 🚀 Animaciones suaves

#### Corregido
- 🐛 IDs mixtos (string|number)
- 🐛 Descripción opcional
- 🐛 URL dinámica Codespaces

## 🎓 Requisitos Cumplidos

- [x] Formularios con validaciones (Zod)
- [x] API REST (json-server)
- [x] Context API
- [x] Expo Router
- [x] TypeScript
- [x] NativeWind (Tailwind)
- [x] Arquitectura limpia
- [x] Sistema de temas
- [x] Gestos táctiles
- [x] Custom hooks
- [x] Alertas personalizadas

## 👨‍💻 Autor

**Vichigato-yt**
- GitHub: [@Vichigato-yt](https://github.com/Vichigato-yt)

## 📄 Licencia

Proyecto privado - Evaluación sumativa

---

**¿Bug?** Abre un issue | **¿Sugerencias?** ¡Bienvenidas!
