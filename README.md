# Taska – Task Management Frontend

A modern task management web application built with React. Taska allows teams to create, assign, and track tasks with role-based access for admins and regular users.

## Features

- **Authentication** – Secure login and signup with JWT-based sessions stored in `localStorage`
- **Role-based Access**
  - **Admin** – Can create tasks, assign them to team members, and view all tasks
  - **User / Manager** – Can view and update the status of tasks assigned to them
- **Task Management**
  - Create tasks with a title, description, due date, priority, and status
  - Assign tasks to specific team members
  - Update task status (Pending, Started, On Progress, Completed, Not Complete)
  - View task details in a modal
- **Priority Levels** – Low, Normal, High (color-coded with flag icons)
- **Responsive UI** – Collapsible sidebar, works on mobile and desktop
- **Toast Notifications** – Real-time feedback for all user actions

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://reactjs.org/) | UI library |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [React Hook Form](https://react-hook-form.com/) | Form state management |
| [Yup](https://github.com/jquense/yup) | Schema-based form validation |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [React Select](https://react-select.com/) | Dropdown/select components |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Toast notifications |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

## Project Structure

```
src/
├── Component/
│   ├── Login.jsx          # Login page
│   ├── Signup.jsx         # Signup page
│   ├── Main.jsx           # Main layout with sidebar (post-login)
│   ├── AllTask.jsx        # Admin view – all tasks
│   ├── MyTask.jsx         # User view – assigned tasks
│   ├── CreateTask.jsx     # Admin form to create & assign tasks
│   ├── Model.jsx          # Task detail modal
│   └── Page_not_found.jsx # 404 page
├── Config/
│   ├── MainNavigation.js  # Route definitions & auth guard
│   └── Navigation.js      # Navigation helper
├── Image/                 # Static image assets
├── App.js                 # App root
└── index.js               # Entry point
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm v8 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/aeiyannn/Task_Management_forntend.git
cd Task_Management_forntend

# Install dependencies
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The optimized production build is output to the `build/` folder.

### Running Tests

```bash
npm test
```

## Backend

This frontend connects to a hosted REST API:

```
https://taskbackend-seven.vercel.app/api
```

Key endpoints used:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | User login |
| `POST` | `/auth/signup` | User registration |
| `GET` | `/getallusers` | Fetch all users (admin) |
| `POST` | `/addtask/:userId` | Create and assign a task |
| `GET` | `/mytask/:userId` | Get tasks assigned to a user |
| `PUT` | `/updatestatus/:taskId` | Update task status |

## User Roles

| Role | Permissions |
|---|---|
| `admin` | Create tasks, assign tasks, view all tasks |
| `manager` | View and update status of assigned tasks |
| `user` | View and update status of assigned tasks |

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Run the app in development mode |
| `npm test` | Launch the test runner in watch mode |
| `npm run build` | Build the app for production |
| `npm run eject` | Eject from Create React App (irreversible) |
