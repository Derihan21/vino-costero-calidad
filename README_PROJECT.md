# Vino Costero

Proyecto monorepo para la gestión de viñedos y logística de embarque.

Resumen breve
- Backend: Spring Boot 3, Java 17, JPA/Hibernate, PostgreSQL.
  - Entidades principales: TipoUva, Enfermedad, EstadoSanitario, Tratamiento, MedicionBrix, Embarque, Comprador, Alerta.
  - Endpoints REST CRUD y consultas especializadas (p. ej. búsqueda paginada de embarques, mediciones por parcela y rango, persistencia de alertas).
- Frontend: React 18 + Vite (páginas básicas para Tipos de Uva, Enfermedades, Mediciones, Estado Sanitario, Embarques, Compradores, Login).
- DevOps: Docker Compose para orquestar Postgres, backend y frontend. Jenkinsfile de ejemplo incluido.

Estado actual
- Implementado: entidades, repositorios, controladores REST, páginas React y Dockerfiles. Seed `data.sql` añadido con datos de ejemplo.
- Pendiente/Mejoras: gráficos en la UI para tendencias de Brix, job programado para detección automática de alertas, validaciones más estrictas y pruebas end-to-end.

Cómo ejecutar (local)
1. Levantar servicios con Docker Compose:
   docker compose up -d
2. Backend: http://localhost:8080
3. Frontend (Vite): http://localhost:5173

Notas
- Si subes este repo a GitHub, actualiza el remote `origin` y haz push desde la rama `main`.

Contacto
- Proyecto preparado por el equipo local. Para ayuda adicional, responde en este hilo.
