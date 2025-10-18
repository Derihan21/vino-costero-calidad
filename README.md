# Vino Costero - Fase 2

Proyecto monorepo para la Fase 1 del sistema de control de producción y calidad de Vino Costero.

Estructura:
- backend/ : Spring Boot 3.x (Maven)
- frontend/ : React 18 (Vite)
- docker-compose.yml : Postgres + backend + frontend

Requisitos mínimos:
- Java 17
- Maven
- Node 18+
- Docker & Docker Compose

Primeros pasos (PowerShell):

```powershell
# Ir al directorio del proyecto
cd c:\Users\Derian\Desktop\calidad\vino-costero

# Levantar servicios con Docker Compose
docker compose up --build

# Backend disponible en http://localhost:8080
# Frontend disponible en http://localhost:5173
```

Arquitectura y notas:
- Backend: entidades JPA para TipoUva, Enfermedad, EstadoSanitario, MedicionBrix, Embarque, Comprador.
- Frontend: formularios CRUD básicos que consumen la API REST del backend.
- Jenkinsfile: pipeline ejemplo con stages para build, test, docker build y push (placeholder para credenciales).

Sigue las instrucciones en cada subcarpeta para comandos específicos.

