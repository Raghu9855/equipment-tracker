# Equipment Tracker Application

A streamlined web application designed for managing pharmaceutical manufacturing equipment. This project demonstrates a full-stack implementation using **React**, **Node.js**, and **SQLite**.

### 🚀 **Live Demo**: [https://equipment-tracker-omega.vercel.app](https://equipment-tracker-omega.vercel.app)


## Overview

I built this application to provide a clean, responsive interface for tracking equipment status in a manufacturing environment. The focus was on creating a user-friendly experience with immediate visual feedback (like status badges) and robust data handling.

## Key Features

-   **Dashboard View**: Get a quick overview of all equipment, their types, and current operational status.
-   **Lifecycle Management**: Easily add new machines, update their maintenance records, or decommission them.
-   **Smart Validation**: Prevents incomplete data entry to ensure record integrity.
-   **Responsive Design**: A modern, glassmorphism-inspired UI that looks great on any screen.

## Technology Stack

-   **Frontend**: React (Vite)
    -   *Why?* Fast development server, optimized builds, and excellent component reusability.
-   **Backend**: Node.js + Express
    -   *Why?* Non-blocking I/O ideal for API services; widely supported ecosystem.
-   **Database**: SQLite
    -   *Why?* Zero-configuration serverless database, perfect for standalone deployments and rapid prototyping.

## Getting Started

### Prerequisites

-   Node.js (v14+)
-   npm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd equipment-tracker
    ```

2.  **Setup the Backend**:
    ```bash
    cd server
    npm install
    npm start
    ```
    The API server will launch on `http://localhost:3001`.

3.  **Launch the Frontend**:
    Open a new terminal window:
    ```bash
    cd client
    npm install
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## Design Decisions

-   **CSS Variables**: I used vanilla CSS with variables for the design system. This avoids the overhead of a large CSS framework while keeping the styling consistent and easy to theme (e.g., for dark mode in the future).
-   **RESTful API**: The backend follows standard REST patterns, making it easy to consume or extend (e.g., adding a mobile app frontend later).
-   **Component Architecture**: The frontend is split into small, focused components (`EquipmentTable`, `Modal`, `EquipmentForm`) to keep the codebase clean and maintainable.

## Future Roadmap

With more time, I would look to implement:
-   **User Authentication**: JWT-based login for secure access.
-   **Audit Logs**: detailed history of who changed what and when.
-   **Real-time Updates**: WebSockets to reflect status changes immediately across multiple clients.

---
*Built with ❤️ by **Raghavendra K** - [GitHub](https://github.com/Raghu9855) - [LinkedIn](https://www.linkedin.com/in/raghk)*
