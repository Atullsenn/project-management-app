# Project Management App  

A full-stack project management application built with React (Vite) & Node.js + MongoDB — allowing users to register, create/manage projects and tasks with filtering and search.

---

## 🛠️ Technologies  
- **Frontend**: React + Vite + TypeScript + TailwindCSS  
- **Backend**: Node.js + Express + TypeScript  
- **Database**: MongoDB  
- **Containerization**: Docker & Docker-Compose (optional)  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js & npm installed on your machine  
- MongoDB connection available (local or remote)  

### Project Setup  
```bash
git clone https://github.com/Atullsenn/project-management-app.git
cd project-management-app



# Frontend
cd client
npm install
npm run dev
The frontend will be served at: http://localhost:5173


# Backend
cd server
npm install
npm start

#The backend API will be running at: http://localhost:3000


# For Seeding the Database
cd server
npx ts-node -r tsconfig-paths/register src/scripts/seed.ts

# Test Credential
User Email : test@example.com  
Password   : Test@123



# Folder Structure
project-management-app/
├── client/   # Frontend (Typescript + Vite)
├── server/   # Backend (Node + Nestjs)
└── README.md

# Env
NODE_ENV=development  
PORT=3000  
MONGODB_URI=mongodb://mongo:27017/project_management  
JWT_SECRET=project_management_Fj84nK2qL8mZd9!tVxY4Rq  
JWT_EXPIRES_IN=24h



# Running with Docker
docker-compose up -d --build


# To Stop
docker-compose down

