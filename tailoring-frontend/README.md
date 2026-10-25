# TailorPro — Tailoring Order Management System

A full-stack Tailoring Order Management System built with:
- **Backend**: Java + Spring Boot + Spring Data JPA + PostgreSQL + Maven
- **Frontend**: React + Vite + Bootstrap 5 + Axios + React Router DOM

---

## How to Run

### Step 1 — Start PostgreSQL
Ensure PostgreSQL is running with database: `exam_2400030320`, user: `postgres` (password configured via `.env` or `SPRING_DATASOURCE_PASSWORD`)

### Step 2 — Start the Spring Boot Backend

```powershell
cd CrudServiceProject
mvnw.cmd spring-boot:run
```

- Backend: http://localhost:8081
- Swagger UI: http://localhost:8081/swagger-ui/index.html

### Step 3 — Start the React Frontend

```powershell
cd tailoring-frontend
npm run dev
```

- Frontend: http://localhost:5173

---

## API Endpoints

| Method | Endpoint                        | Description     |
|--------|---------------------------------|-----------------|
| GET    | /tailoringorders/               | Health check    |
| POST   | /tailoringorders/add            | Add new order   |
| GET    | /tailoringorders/displayall     | Get all orders  |
| GET    | /tailoringorders/display/{id}   | Get by ID       |
| PUT    | /tailoringorders/update/{id}    | Update order    |
| DELETE | /tailoringorders/delete/{id}    | Delete order    |

---

## Frontend Routes

| Route       | Description                    |
|-------------|-------------------------------|
| /           | Dashboard with live stats     |
| /add        | Create new tailoring order    |
| /orders     | Orders table with actions     |
| /search     | Search order by ID            |
| /edit/:id   | Edit a specific order         |
