# 🌿 Gelly Skin Studio - Plataforma Web & Motor de Reservas

![Version](https://img.shields.io/badge/version-1.0.0-sagegreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

Bienvenido al repositorio oficial de **Gelly Skin Studio**. Esta plataforma no es una simple tarjeta de presentación digital; es un **motor de reservas automatizado y catálogo dinámico**, diseñado con una estética de lujo para potenciar conversiones, mejorar el posicionamiento de la marca y optimizar la gestión operativa del negocio.

## ✨ Características Principales

* **Booking Widget de 3 Pasos (Fricción Cero):** Un flujo de reserva interactivo donde el cliente elige servicio, fecha, hora y envía sus datos, reemplazando los aburridos formularios tradicionales.
* **Cierre Inmediato por WhatsApp:** El sistema genera un mensaje pre-formateado automáticamente con todos los detalles de la cita y lo envía directamente al WhatsApp del Studio.
* **Catálogo Dinámico (7 Categorías):** Interfaz de "Tabs" moderna que permite explorar más de 50 servicios (Faciales, Mirada, Masajes, Corporales, Manos, Pies, Cabello) al instante sin necesidad de recargar la página.
* **Posicionamiento Premium:** Paleta de colores _"Sage Green & Cream"_, tipografía elegante y animaciones fluidas al hacer scroll que transmiten higiene, tranquilidad y lujo.
* **Optimización Mobile-First:** Diseñada para una carga rápida y navegación impecable en dispositivos móviles, perfecta para recibir tráfico desde Instagram o TikTok.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5 Semántico, CSS3 (Estilos nativos y animaciones) y Vanilla JavaScript (Interacciones de DOM y Tabs).
- **Despliegue:** Contenedor optimizado basado en Nginx (`nginx:alpine`) para servir el contenido de manera rápida y segura.

## 🚀 Instalación y Despliegue

### Opción 1: Ejecución Local (Sin Docker)

Si solo deseas visualizar o modificar el código fuente rápidamente:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Jefferlol/gelly-studio.git
   cd gelly-studio
   ```
2. Puedes usar herramientas como `Live Server` en VS Code o cualquier servidor local rápido (ej. Python):
   ```bash
   # Usando Python 3
   python -m http.server 8000
   ```
3. Abre tu navegador en `http://localhost:8000`

### Opción 2: Despliegue con Docker (Recomendado)

Para ambientes de producción o un comportamiento idéntico al servidor en la nube, se recomienda usar Docker:

1. Construye la imagen de Docker:
   ```bash
   docker build -t gelly-studio-web .
   ```
2. Inicia el contenedor:
   ```bash
   docker run -d -p 8080:80 --name gelly-web gelly-studio-web
   ```
3. Visita `http://localhost:8080` en tu navegador para ver la página en vivo.

## 📂 Estructura del Proyecto

```text
📁 GellyStudio/
│
├── 📄 index.html          # Estructura principal y contenido
├── 📄 styles.css          # Diseño, variables de color y animaciones
├── 📄 app.js              # Lógica de las pestañas (Tabs), animaciones y reservas
├── 📁 img/                # Assets gráficos, fotografías e íconos
├── 📄 Dockerfile          # Configuración del contenedor Nginx
├── 📄 .dockerignore       # Exclusiones de construcción Docker
└── 📄 .gitignore          # Archivos ignorados por Git
```

## 📈 Impacto en el Negocio

Esta solución fue creada para solventar problemas críticos de la operativa del salón de belleza:
- **Automatización:** El "empleado digital" que responde las 24/7 sobre precios, horarios y ubicación.
- **Ahorro de Tiempo:** Reducción drástica de las conversaciones de ida y vuelta para cuadrar horarios, gracias al formato estandarizado que se envía por WhatsApp.
- **Cross-Selling Oculto:** El catálogo interactivo motiva la curiosidad y facilita reservas múltiples en una misma visita.

---
_Diseñado y desarrollado para transformar la experiencia digital en belleza._ ✨
