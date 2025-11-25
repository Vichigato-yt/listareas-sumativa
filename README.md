# 📱 Lista de Tareas - App Móvil con React Native + Expo

Aplicación móvil para gestión de tareas con React Native, Expo Router, TypeScript, NativeWind y json-server.

## 🚀 Inicio Rápido

### 1️⃣ Iniciar el servidor API (json-server)

**IMPORTANTE:** Abre una terminal y ejecuta:

```bash
npm run api
```

Esto iniciará json-server en `http://localhost:3000`. **Déjalo corriendo**.

### 2️⃣ Iniciar la aplicación Expo

En **otra terminal nueva**, ejecuta:

```bash
npm start
```

Luego selecciona:
- Presiona `w` para abrir en navegador web
- Presiona `a` para Android
- Presiona `i` para iOS

## ⚠️ Solución al Error "Network Error"

Si ves el error `AxiosError: Network Error`, significa que el servidor json-server **NO está corriendo**.

**Solución:**
1. Abre una terminal
2. Ejecuta: `npm run api`
3. Verifica que veas: `JSON Server started on PORT: 3000`
4. Recarga la aplicación (presiona `r` en la terminal de Expo)

## 🎯 Características Implementadas

✅ CRUD completo de tareas (Crear, Leer, Actualizar, Eliminar)
✅ Validaciones de formulario (solo alfanuméricos)
✅ API REST con json-server
✅ Context API para estado global
✅ Expo Router con rutas dinámicas
✅ TypeScript con tipado completo
✅ Estilos con NativeWind (Tailwind CSS)

## 📁 Estructura del Proyecto

```
listareas-sumativa/
├── app/                    # Pantallas (Expo Router)
│   ├── _layout.tsx        # Layout raíz con TaskProvider
│   ├── index.tsx          # Lista de tareas
│   ├── add.tsx            # Nueva tarea
│   └── edit/[id].tsx      # Editar tarea
├── components/            # Componentes reutilizables
│   ├── TaskForm.tsx       # Formulario con validaciones
│   └── TaskItem.tsx       # Tarjeta de tarea
├── lib/                   # Lógica y servicios
│   ├── context/           # Context API
│   ├── services/          # API REST
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Validaciones
└── db.json                # Base de datos json-server
```

## 🛠️ Scripts Disponibles

```bash
npm start          # Iniciar Expo
npm run api        # Iniciar json-server (API)
npm run web        # Iniciar en navegador
npm run android    # Iniciar en Android
npm run ios        # Iniciar en iOS
```

## 🔧 Configuración de URL de API

La app detecta automáticamente el entorno:

- **Web**: `http://localhost:3000`
- **Android Emulator**: `http://10.0.2.2:3000`
- **iOS/Dispositivo físico**: Necesitas tu IP local

Si usas un dispositivo físico, edita `lib/services/taskService.ts` y reemplaza con tu IP:

```typescript
return 'http://TU_IP_LOCAL:3000/tasks'; // ej: http://192.168.1.100:3000/tasks
```

## 📝 Uso de la Aplicación

1. **Ver tareas**: La pantalla principal muestra todas las tareas
2. **Agregar**: Presiona el botón "+" flotante
3. **Editar**: Presiona "Editar" en cualquier tarea
4. **Eliminar**: Presiona "Eliminar" y confirma
5. **Completar**: Presiona el círculo para marcar como completada

## ✅ Validaciones del Formulario

- ✅ Campos no pueden estar vacíos
- ✅ Solo caracteres alfanuméricos: letras, números, espacios
- ✅ Se permiten acentos y ñ
- ❌ No se permiten caracteres especiales: @#$%&*

## 🎓 Requisitos Cumplidos

- [x] Formularios con validaciones
- [x] Conexión a API REST (json-server)
- [x] Context API para estado global
- [x] Expo Router con rutas dinámicas
- [x] TypeScript con tipado completo
- [x] Estilos con NativeWind (Tailwind CSS)
- [x] Arquitectura limpia (app/, lib/, components/)

## 📄 Tecnologías

- React Native + Expo
- TypeScript
- Expo Router (file system routing)
- Context API
- NativeWind (Tailwind CSS)
- json-server
- Axios
