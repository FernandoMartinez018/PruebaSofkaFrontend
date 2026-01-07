# Sistema de Liquidación de Comisiones - Frontend

Aplicación web frontend para la gestión y visualización de transacciones financieras con cálculo automático de comisiones.

## Información del Proyecto

- **Nombre**: Sofka-Fintech Frontend
- **Versión**: 1.0.0
- **Fecha**: Enero 2025
- **Repositorio**: https://github.com/FernandoMartinez018/PruebaSofkaFrontend

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Tecnologías](#tecnologías)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Configuración](#configuración)
6. [Ejecución](#ejecución)
7. [Arquitectura](#arquitectura)
8. [Componentes](#componentes)
9. [Servicios](#servicios)
10. [Características](#características)
11. [Validaciones](#validaciones)
12. [Diseño Responsive](#diseño-responsive)
13. [Build y Despliegue](#build-y-despliegue)

## Descripción

Dashboard web interactivo que permite a los usuarios crear, visualizar y gestionar transacciones financieras. La aplicación se comunica con el backend mediante API REST y proporciona actualizaciones en tiempo real del estado de las transacciones.

### Características Principales

- Formulario reactivo para crear transacciones
- Lista de transacciones con actualización automática
- Validaciones en tiempo real
- Interfaz responsive y moderna
- Manejo de errores robusto
- Formateo automático de moneda y fechas

## Tecnologías

- **Angular**: 17
- **TypeScript**: 5.0
- **RxJS**: 7.8
- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con efectos visuales
- **HttpClient**: Cliente HTTP de Angular
- **Reactive Forms**: Formularios reactivos con validaciones

## Requisitos Previos

- Node.js 18 o superior
- npm 9 o superior
- Angular CLI 17 o superior
- Backend en ejecución (puerto 8080)

## Instalación

### Clonar el Repositorio

```bash
git clone https://github.com/FernandoMartinez018/PruebaSofkaFrontend.git
cd PruebaSofkaFrontend
```

### Instalar Angular CLI (si no está instalado)

```bash
npm install -g @angular/cli
```

### Instalar Dependencias

```bash
npm install
```

## Configuración

### Variables de Entorno

La URL del backend se configura en el servicio `TransactionService`:

```typescript
private readonly API_URL = 'http://localhost:8080/api/transactions';
```

Para entornos diferentes, se pueden crear archivos de configuración:

**src/environments/environment.ts** (desarrollo):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

**src/environments/environment.prod.ts** (producción):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.produccion.com/api'
};
```

## Ejecución

### Servidor de Desarrollo

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Servidor con Puerto Personalizado

```bash
ng serve --port 4201
```

### Abrir Automáticamente en el Navegador

```bash
ng serve --open
```

## Arquitectura

### Estructura del Proyecto

```
src/app/
├── components/                    # Componentes de UI
│   ├── transaction-form/         # Formulario de transacciones
│   │   ├── transaction-form.component.ts
│   │   ├── transaction-form.component.html
│   │   ├── transaction-form.component.css
│   │   └── transaction-form.component.spec.ts
│   └── transaction-list/         # Lista de transacciones
│       ├── transaction-list.component.ts
│       ├── transaction-list.component.html
│       ├── transaction-list.component.css
│       └── transaction-list.component.spec.ts
├── models/                        # Interfaces y modelos
│   └── transaction.model.ts
├── services/                      # Servicios HTTP
│   └── transaction.service.ts
├── app.component.ts              # Componente raíz
├── app.component.html
├── app.component.css
└── app.module.ts                 # Módulo principal
```

### Patrón de Arquitectura

La aplicación sigue una arquitectura en capas:

1. **Capa de Presentación**: Componentes (UI)
2. **Capa de Lógica**: Servicios (Business Logic)
3. **Capa de Datos**: Modelos (Data Structures)

## Componentes

### TransactionFormComponent

Componente responsable de la creación de nuevas transacciones.

**Selector**: `app-transaction-form`

**Funcionalidades**:
- Captura de datos mediante formulario reactivo
- Validaciones en tiempo real
- Mensajes de éxito y error
- Emisión de eventos al crear transacciones

**Inputs**: Ninguno

**Outputs**: 
- `transactionCreated`: EventEmitter que notifica la creación exitosa

**Métodos principales**:
- `onSubmit()`: Envía la transacción al backend
- `onReset()`: Limpia el formulario
- `hasError(fieldName, errorType)`: Verifica errores de validación

### TransactionListComponent

Componente responsable de mostrar el listado de transacciones.

**Selector**: `app-transaction-list`

**Funcionalidades**:
- Listado de transacciones
- Actualización automática cada 5 segundos
- Formateo de moneda y fechas
- Indicadores visuales por tipo de transacción

**Inputs**: Ninguno

**Outputs**: Ninguno

**Métodos principales**:
- `loadTransactions()`: Carga transacciones con polling
- `refresh()`: Recarga manual de transacciones
- `formatCurrency(value)`: Formatea números como moneda
- `formatDate(dateString)`: Formatea fechas
- `getAmountClass(monto)`: Determina clase CSS según monto

### AppComponent

Componente raíz de la aplicación.

**Funcionalidades**:
- Contenedor principal
- Coordinación entre componentes
- Manejo de eventos globales

## Servicios

### TransactionService

Servicio central para la comunicación con el backend.

**Métodos**:

#### createTransaction(request: TransactionRequest): Observable<TransactionResponse>
Crea una nueva transacción.

**Parámetros**:
- `request`: Objeto con el monto de la transacción

**Retorna**: Observable con la respuesta de la transacción creada

#### getAllTransactions(): Observable<TransactionResponse[]>
Obtiene todas las transacciones.

**Retorna**: Observable con array de transacciones

#### getTransactionsPolling(intervalMs: number): Observable<TransactionResponse[]>
Obtiene transacciones con actualización periódica.

**Parámetros**:
- `intervalMs`: Intervalo de actualización en milisegundos (por defecto: 5000)

**Retorna**: Observable que emite periódicamente el listado de transacciones

#### getTransactionById(id: number): Observable<TransactionResponse>
Obtiene una transacción específica por ID.

**Parámetros**:
- `id`: Identificador de la transacción

**Retorna**: Observable con la transacción solicitada

## Características

### Formularios Reactivos

La aplicación utiliza Angular Reactive Forms para:

- Validaciones síncronas y asíncronas
- Estado del formulario en tiempo real
- Validadores personalizados
- Manejo elegante de errores

**Ejemplo de validaciones**:
```typescript
this.transactionForm = this.fb.group({
  monto: [
    '', 
    [
      Validators.required, 
      Validators.min(0.01),
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]
  ]
});
```

### Actualización en Tiempo Real

Implementación de polling para actualizar la lista de transacciones cada 5 segundos:

```typescript
this.transactionService
  .getTransactionsPolling(5000)
  .subscribe(data => {
    this.transactions = data;
  });
```

### Formateo de Datos

#### Moneda
```typescript
formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2
  }).format(value);
}
```

#### Fechas
```typescript
formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
```

## Validaciones

### Validaciones de Campo

| Campo | Validación | Mensaje de Error |
|-------|-----------|------------------|
| Monto | Requerido | "El monto es obligatorio" |
| Monto | Min(0.01) | "El monto debe ser mayor a 0" |
| Monto | Pattern | "Formato inválido. Use máximo 2 decimales" |

### Validación Visual

Los campos muestran estados visuales:
- **Normal**: Borde gris
- **Focus**: Borde azul con sombra
- **Válido**: Borde normal
- **Inválido**: Borde rojo con mensaje de error

## Diseño Responsive

La aplicación está optimizada para diferentes tamaños de pantalla:

### Desktop (> 968px)
- Layout completo con todos los elementos visibles
- Tabla con todas las columnas
- Botones en línea

### Tablet (768px - 968px)
- Layout adaptado con espaciado reducido
- Tabla con scroll horizontal si es necesario
- Botones ajustados

### Mobile (< 768px)
- Layout en columna
- Botones full-width
- Tabla simplificada con scroll
- Header y footer compactos

## Build y Despliegue

### Build para Desarrollo

```bash
ng build
```

Los archivos se generan en `dist/`

### Build para Producción

```bash
ng build --configuration production
```

**Optimizaciones aplicadas**:
- Minificación de código
- Tree shaking
- AOT compilation
- Compresión de assets
- Source maps deshabilitados

### Análisis de Bundle

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### Despliegue

#### Servidor Estático

Los archivos del directorio `dist/` pueden servirse desde cualquier servidor web estático:

- Nginx
- Apache
- Firebase Hosting
- Netlify
- Vercel

#### Ejemplo de configuración Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Pruebas

### Ejecutar Pruebas Unitarias

```bash
ng test
```

### Ejecutar Pruebas con Cobertura

```bash
ng test --code-coverage
```

El reporte se genera en `coverage/`

### Ejecutar Pruebas E2E

```bash
ng e2e
```

## Manejo de Errores

El servicio implementa manejo robusto de errores:

```typescript
private handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Ocurrió un error desconocido';
  
  if (error.error instanceof ErrorEvent) {
    // Error del lado del cliente
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Error del lado del servidor
    errorMessage = error.error?.mensaje || 
                   `Error ${error.status}: ${error.message}`;
  }
  
  console.error('Error en TransactionService:', errorMessage);
  return throwError(() => new Error(errorMessage));
}
```

## Estilo y Diseño

### Sistema de Diseño

**Paleta de Colores**:
- Primary: Gradiente de #667eea a #764ba2
- Success: Gradiente de #28a745 a #20c997
- Danger: #dc3545
- Info: Gradiente de #17a2b8 a #138496

**Tipografía**:
- Font Family: Inter, sans-serif
- Tamaños: 0.85rem - 2.5rem
- Pesos: 300, 400, 500, 600, 700, 800

**Espaciado**:
- Sistema basado en múltiplos de 0.5rem

### Efectos Visuales

- Glassmorphism en cards
- Animaciones suaves de entrada
- Hover effects con elevación
- Transiciones fluidas
- Gradientes modernos

## CORS

La aplicación requiere que el backend tenga CORS habilitado para:

```
Origin: http://localhost:4200
```

El backend debe incluir:
```java
@CrossOrigin(origins = "http://localhost:4200")
```

## Scripts npm

| Script | Comando | Descripción |
|--------|---------|-------------|
| start | ng serve | Inicia servidor de desarrollo |
| build | ng build | Compila la aplicación |
| test | ng test | Ejecuta pruebas unitarias |
| lint | ng lint | Ejecuta linter de código |

## Estructura de Datos

### TransactionRequest

```typescript
interface TransactionRequest {
  monto: number;
}
```

### TransactionResponse

```typescript
interface TransactionResponse {
  id: number;
  monto: number;
  comision: number;
  fecha: string;
  mensaje: string;
}
```

### ErrorResponse

```typescript
interface ErrorResponse {
  error: string;
  mensaje: string;
  timestamp: string;
  path: string;
}
```

## Buenas Prácticas Implementadas

- Componentes con responsabilidad única
- Servicios inyectables centralizados
- Uso de Observables para programación reactiva
- Unsubscribe en ngOnDestroy para evitar memory leaks
- Validaciones tanto en frontend como backend
- Manejo centralizado de errores
- Código autodocumentado
- Separación de concerns

## Solución de Problemas

### El backend no responde

Verificar que el backend esté ejecutándose en `http://localhost:8080`

### Error de CORS

Verificar configuración de CORS en el backend

### Puerto 4200 en uso

Ejecutar en puerto diferente:
```bash
ng serve --port 4201
```

### Errores de compilación

Limpiar caché y reinstalar:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Cree una rama para su funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit sus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Cree un Pull Request

### Estándares de Código

- Seguir Angular Style Guide
- Usar TypeScript estricto
- Mantener cobertura de pruebas
- Documentar componentes públicos
- Usar nombres descriptivos
- Seguir convenciones de nomenclatura de Angular
