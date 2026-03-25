# PostIt

**[Repositorio en GitHub](https://github.com/JoyMoGas/postit)**  
**[Frontend (Netlify)](https://postitmogas.netlify.app/)**  
**[API Backend (Render)](https://postit-7920.onrender.com/)**  

---

## Sobre el Proyecto

**PostIt** es una aplicación web full-stack diseñada para la creación e interacción de publicaciones al estilo de una red social de microblogging. Los usuarios pueden crear sus propias cuentas, iniciar sesión de forma segura, publicar contenido (posts), dar "me gusta" a las publicaciones y comentarlas.

La plataforma está diseñada para ofrecer una experiencia interactiva y moderna, manteniendo un flujo de usuario ágil y con un esquema de colores estético y cálido inspirado en el estilo *paper*.

## Tecnologías Usadas

El proyecto está dividido en dos partes principales, comunicadas a través de una arquitectura API RESTful:

### Frontend (Interfaz de Usuario)
- **React 19** con **TypeScript**: Para la construcción robusta, estructurada y segura en tipos de la interfaz de usuario.
- **Vite**: Empleado como empaquetador ultrarrápido y manejador del entorno de desarrollo.
- **Tailwind CSS v4**: Utilizado para estructurar y diseñar componentes directamente desde las clases utilitarias, proveyendo un diseño 100% responsivo y minimalista.
- **React Router v6**: Para habilitar la navegación instantánea y proteger las rutas privadas (Single Page Application).
- **Axios**: Herramienta encargada de realizar las peticiones HTTP al servidor, configurada explícitamente para transmitir información segura de sesión cruzada (Cross-Site cookies de autenticación).

### Backend (Servidor y Base de Datos)
- **Python / Django**: El sólido y poderoso framework principal encargado de modelar los datos y exponer la lógica principal.
- **Django REST Framework (DRF)**: Construye y expone la API limpia mediante vistas estructuradas o serializadores, entregando la información en formato JSON.
- **Simple JWT**: Maneja la autenticación sin estado en la aplicación, expidiendo "Access Tokens" en formato JWT y utilizando configuraciones de cookies de nivel riguroso (`SameSite=None` y `Secure=True`).
- **Gunicorn** y **Whitenoise**: Servidor WSGI y herramienta recolectora de archivos estáticos que operan exclusivamente para el modo de producción.
- **SQLite**: Motor por defecto para operar de manera autónoma y nativa sin recurrir a instancias externas de base de datos.
- **django-cors-headers**: Facilita la recepción de peticiones desde el panel de Netlify, previniendo los bloqueos directos del navegador (CORS).

## Arquitectura de Despliegue

La solución está preparada para entornos de producción de bajo o cero costo, separados de la siguiente forma:

1. **El Frontend** se encuentra en un entorno de host estático a través de **Netlify**. Sus variables de entorno (como `VITE_API_URL`) apuntan dinámicamente al backend para solicitar datos.
2. **El Backend** procesa una instancia de Web Service bajo Linux en la plataforma global de nube **Render**, inyectando dinámicamente sus propias directivas de autorización y puertos mediante un script Bash propio.

---

**[Repositorio en GitHub](https://github.com/JoyMoGas/postit)** | **[Frontend (Netlify)](https://postitmogas.netlify.app/)** | **[API Backend (Render)](https://postit-7920.onrender.com/)**
