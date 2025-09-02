# Task Manager

A simple and intuitive task management application built with React and Node.js. Organize your tasks in a hierarchical structure with folders, groups, and individual tasks.

## Features

- **Folder Organization**: Create folders to categorize your projects
- **Group Management**: Organize tasks within groups inside folders  
- **Task Tracking**: Add, complete, and delete individual tasks
- **Clean UI**: Modern design with folder icons and intuitive navigation
- **Responsive**: Works on desktop and mobile devices
- **Real-time Updates**: Instant UI updates when adding/removing items

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling framework
- **Lucide React** - Icon library
- **React Router DOM** - Client-side routing

### Backend  
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Example `.env` file:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=task_manager
   ```

## Project Structure

```
01_Task_Manager/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── database.sql
│   ├── db.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

