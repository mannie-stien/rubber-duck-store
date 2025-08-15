# Rubber Duck Store - Full Stack Application

This project is a complete full-stack web application for managing a warehouse of rubber ducks. It features a React/TypeScript frontend, an Express.js backend, and a MongoDB database. The entire application is containerized with Docker, allowing for a simple, one-command setup.

This project was built to fulfill a detailed technical specification, demonstrating best practices in software architecture, responsive design, and modern development workflows.

## Live Demo & Screenshots

*(This is a placeholder for screenshots of the application. Create a folder named `readme-assets` in the root of your project and place your screenshots there for this to work.)*

**Desktop View:**
![Desktop Screenshot](./readme-assets/desktop-view.png)

**Mobile View:**
![Mobile Screenshot](./readme-assets/mobile-view.png)


---

## Features

-   **Warehouse Module (Frontend + Backend):** Full CRUD functionality (Create, List, Update, Delete) for managing rubber ducks.
-   **Store Module (Backend Only):** Complex business logic for processing orders, including calculating packaging types and dynamic costs based on a chain of rules.
-   **Professional Architecture:** Follows senior developer principles with a clear separation of concerns (Controllers, Services, Models), Object-Oriented design, and the use of advanced Design Patterns.
-   **Advanced Design Patterns:**
    -   **Strategy Pattern:** Used in the `PackagingService` to dynamically select the correct packaging algorithm based on the shipping mode (Land, Air, or Sea).
    -   **Chain of Responsibility Pattern:** Used in the `PricingService` to apply a sequence of modifiers (discounts, taxes, fees) to an order's base cost in a clean, extensible way.
-   **Type-Safe Code:** Built with TypeScript on the frontend for enhanced reliability and maintainability.
-   **Responsive Frontend:** The UI is fully responsive, providing a seamless user experience on desktop, tablet, and mobile devices by transforming the data table into a "card" view on smaller screens.
-   **Fully Containerized:** The entire application stack (React Frontend, Express Backend, MongoDB Database) is orchestrated with Docker Compose for easy setup, consistent environments, and simplified deployment.

---

## Tech Stack

| Category      | Technology                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------ |
| **Frontend**  | React, TypeScript, Axios                                                                                      |
| **Backend**   | Node.js, Express.js, MongoDB with Mongoose ODM                                                                |
| **DevOps**    | Docker, Docker Compose, Nginx (as a reverse proxy and for serving static frontend files)                        |
| **Styling**   | CSS3 with a responsive, mobile-first approach                                                                 |
| **Patterns**  | Strategy Pattern, Chain of Responsibility Pattern                                                             |

---

## 🚀 How to Run the Application (Recommended Method: Docker)

This project is designed to be run with a single command using Docker. No local installation of Node.js or MongoDB is required.

### Prerequisites

-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) must be installed and running.

### Instructions

**1. Clone the Repository:**
```bash
git clone <your-github-repository-url>
cd rubber-duck-store
2. Run Docker Compose:
From the root directory of the project, execute the following command:
code
Bash
docker-compose up --build
3. Access the Application:
Once the containers are running, open your web browser and navigate to:
http://localhost:3000
Alternative: Running Locally (Without Docker)
If you prefer to run the application on your local machine without Docker, follow these steps.
Prerequisites
Node.js (v18.x or later)
npm (comes with Node.js)
MongoDB Community Server must be installed and running as a service on its default port (27017).
Instructions
You will need two separate terminals for this process.
Terminal 1: Start the Backend Server
Navigate to the backend directory:
code
Bash
cd rubber-duck-store/backend
Create the environment file. Create a new file named .env and add the following line. This connects to your local MongoDB instance.
code
Env
MONGO_URI=mongodb://localhost:27017/duck-store
Install dependencies:
code
Bash
npm install
Start the server in development mode:
code
Bash
npm run dev
The backend API should now be running on http://localhost:5001. Keep this terminal open.
Terminal 2: Start the Frontend Application
Open a new terminal.
Navigate to the frontend directory:
code
Bash
cd rubber-duck-store/frontend
Install dependencies:
code
Bash
npm install
Start the React development server:
code
Bash
npm start
This will automatically open your browser.
3. Access the Application:
The application will be running at:
http://localhost:3000
The frontend's proxy will automatically redirect API calls to the backend server running on port 5001.