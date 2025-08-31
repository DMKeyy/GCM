# WebAppCM Project

This repository contains a full-stack web application for medical cabinet management, consisting of a React + Vite frontend and a Java Spring Boot backend.

## Project Structure

```
webappcm/
├── Frontend/   # React + Vite frontend (TypeScript, Tailwind CSS, shadcn-ui)
└── backend/    # Java Spring Boot backend (REST API, JPA, Maven)
```

---

## Frontend
- Located in the `Frontend/` directory
- Built with React, Vite, TypeScript, Tailwind CSS, and shadcn-ui
- Contains pages, components, hooks, and utility functions
- To run locally:
  ```sh
  cd Frontend
  npm install
  npm run dev
  ```

## Backend
- Located in the `backend/` directory
- Built with Java Spring Boot, Maven, Spring Data JPA
- Contains models, controllers, repositories, and services
- To run locally:
  ```sh
  cd backend
  ./mvnw spring-boot:run
  ```
  (Use `mvnw.cmd` on Windows)

---

## Development Workflow
1. Start the backend server (default: http://localhost:8080)
2. Start the frontend dev server (default: http://localhost:5173)
3. Update frontend API calls to communicate with the backend

## Deployment
- Frontend can be deployed to Vercel, Netlify, or similar platforms
- Backend can be deployed to any Java hosting (Heroku, AWS, etc.)

## Customization
- Update environment variables and configuration files as needed
- Add new features by creating new components (frontend) or controllers/services (backend)

## License
Specify your license here (e.g., MIT, Apache 2.0)

## Authors
- Add your name and contributors here
