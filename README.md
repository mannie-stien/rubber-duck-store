# Rubber Duck Store - Full Stack Application

A complete **full-stack web application** for managing a warehouse of rubber ducks.  
It features a **React/TypeScript frontend**, an **Express.js backend**, and a **MongoDB database**.  
The entire application is containerized with **Docker**, enabling a simple one-command setup.  

This project was built to fulfill a detailed technical specification, showcasing **best practices** in software architecture, responsive design, and modern development workflows.

---

## Features

- **Warehouse Module (Frontend + Backend)**  
  Full CRUD functionality (Create, List, Update, Delete) for managing rubber ducks.
  
- **Store Module (Backend Only)**  
  Complex business logic for processing orders, including:
  - Packaging type calculation  
  - Dynamic cost computation using chained rules
  
- **Professional Architecture**  
  - Clear separation of concerns (Controllers, Services, Models)  
  - Object-Oriented design principles  
  - Advanced Design Patterns  

- **Advanced Design Patterns**  
  - **Strategy Pattern**: Used in `PackagingService` to select packaging algorithms (Land, Air, Sea).  
  - **Chain of Responsibility Pattern**: Used in `PricingService` to apply modifiers (discounts, taxes, fees).  

- **Type-Safe Code**  
  TypeScript-powered frontend ensures reliability and maintainability.  

- **Responsive Frontend**  
  Fully responsive UI, switching from data table to “card view” on smaller screens.  

- **Fully Containerized**  
  Complete stack (Frontend, Backend, MongoDB) orchestrated with **Docker Compose** for:
  - Easy setup  
  - Consistent environments  
  - Simplified deployment  

---

## Tech Stack

| Category       | Technology                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Frontend**   | React, TypeScript, Axios                                                   |
| **Backend**    | Node.js, Express.js, MongoDB (Mongoose ODM)                                |
| **DevOps**     | Docker, Docker Compose, Nginx (reverse proxy + static file serving)        |
| **Styling**    | CSS3 with responsive, mobile-first approach                                |
| **Patterns**   | Strategy Pattern, Chain of Responsibility Pattern                          |

---

## Getting Started

### Running with Docker

This project is designed to run with a **single command** using Docker.  
No need to install Node.js or MongoDB locally.

#### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

#### Instructions

**1. Clone the Repository:**

git clone <https://github.com/mannie-stien/rubber-duck-store.git>
```bash
# 1. Clone the Repository
git clone <https://github.com/mannie-stien/rubber-duck-store.git>
cd rubber-duck-store

# 2. Run Docker Compose
docker-compose up --build
Once running, visit:
 http://localhost:3000

Alternative: Run Locally (Without Docker)
If you prefer a manual setup:

Prerequisites
Node.js (v18.x or later)

npm (comes with Node.js)

MongoDB Community Server (running on default port 27017)

Instructions
You’ll need two terminals:

Terminal 1: Backend

cd rubber-duck-store/backend

# Create environment file
echo "MONGO_URI=mongodb://localhost:27017/duck-store" > .env

# Install dependencies
npm install

# Start server
npm run dev
Backend runs on  http://localhost:5001

Terminal 2: Frontend
cd rubber-duck-store/frontend

# Install dependencies
npm install

# Start React app
npm start
3. Access the Application:
The application will be running at:
http://localhost:3000
The frontend's proxy will automatically redirect API calls to the backend server running on port 5001.

Frontend runs on  http://localhost:3000
API calls will proxy to the backend automatically.
