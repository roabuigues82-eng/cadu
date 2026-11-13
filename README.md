[README — Caducidades.md](https://github.com/user-attachments/files/34798589/README.Caducidades.md)
# README — Caducidades

Nov 13, 2026 · @romina

App PWA para controlar fechas de caducidad, registrar pérdidas y reducciones de precio, y exportar datos. Funciona sin conexión a internet y se instala en el móvil como una app.

## Páginas principales

| Página | Qué muestra |
| --- | --- |
| **Inicio** | Accesos rápidos a todas las secciones |
| **Caducan hoy** | Productos caducados o que caducan hoy |
| **15 días** | Productos que caducan en los próximos 15 días |
| **25 días** | Productos que caducan en los próximos 25 días |
| **Productos** | Listado completo con buscador y filtro por categoría |
| **Buscar** | Búsqueda por nombre o código de barras |
| **Añadir producto** | Formulario + escáner de código de barras |
| **Reducciones** | Historial de precios reducidos |
| **Análisis** | Estadísticas de pérdidas, reducciones y tasa de rescate |
| **Exportar** | Descarga en Excel o PDF |
| **Ajustes** | Configuración de la cuenta y notificaciones |

## Gestión de productos

**Añadir un producto**

1. Ir a **Añadir producto** desde el menú inferior o desde Inicio.
2. Escanear el código de barras con la cámara o escribirlo a mano.
3. Rellenar nombre, fecha de caducidad, categoría y precio (opcional).
4. Pulsar **Guardar producto**.

**Estados automáticos según los días restantes**

| Estado | Criterio |
| --- | --- |
| 🟢 OK | Más de 25 días |
| 🟡 Reducir pronto | Entre 1 y 25 días |
| 🔴 Caduca hoy / caducado | 0 días o menos |

Desde el listado se puede editar o eliminar cualquier producto. También se puede purgar automáticamente los productos caducados desde Ajustes.

## Reducciones y pérdidas

**Registrar una reducción**

Desde la ficha de un producto, pulsar **Reducir precio**. Se guarda el precio original y el nuevo precio reducido. El historial de reducciones se consulta y descarga desde la página **Reducciones**.

**Registrar una pérdida (merma)**

Desde la ficha de un producto, pulsar **Registrar como pérdida**. El producto se elimina del inventario activo y queda registrado como merma.

**Análisis disponible en la página Análisis**

| Métrica | Qué mide |
| --- | --- |
| Total pérdidas (€) | Valor económico de las mermas registradas |
| Número de pérdidas | Cantidad de productos perdidos |
| Total descuento aplicado | Diferencia entre precio original y reducido |
| Reducciones registradas | Cantidad de productos reducidos |
| Productos rescatados | Productos reducidos que se vendieron antes de caducar |
| Tasa de rescate | % de reducciones que terminaron en venta |

## Exportar datos

Desde la página **Exportar** se pueden descargar los datos en dos formatos.

| Formato | Contenido | Cómo |
| --- | --- | --- |
| **Excel (.xlsx)** | Todos los productos con nombre, código, fecha, estado, categoría y precio | Exportar → Descargar Excel |
| **PDF** | Listado de productos agrupado por categoría: código, nombre y estado | Exportar → Descargar PDF |
| **Excel de reducciones** | Historial completo de reducciones con precios originales y reducidos | Reducciones → Descargar Excel |
| **Excel de análisis** | Métricas de pérdidas, reducciones y tasa de rescate | Análisis → Descargar Excel |

El filtro de la página Exportar permite escoger entre exportar todos los productos o solo los de una categoría concreta.

## Despliegue y datos

**URL de la app** https://roabuigues82-eng.github.io/cadu

**Tecnología**

- Archivo único `index.html` publicado en GitHub Pages
- PWA instalable en móvil (Android e iPhone): aparece en el inicio del teléfono como una app
- Sin servidor: todos los datos se guardan en el propio dispositivo (localStorage)
- Funciona sin conexión a internet una vez instalada

**Archivos del repositorio**

| Archivo | Función |
| --- | --- |
| `index.html` | App completa |
| `sw.js` | Service worker (notificaciones y modo offline) |
| `icon-192.png` | Icono para pantalla de inicio |
| `manifest.json` | Configuración de la PWA |

**Notificaciones**

La app puede enviar avisos diarios sobre productos próximos a caducar. Se activan desde Ajustes → Notificaciones y requieren conceder permiso al navegador. En iPhone solo funcionan si la app está instalada en el inicio.
