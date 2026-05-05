<div align="center">

# 🗂️ TaskFlow

### Full-Stack Team Task Manager

**A calm, focused workspace for teams — with role-based access, smart task visibility, and a clean modern UI.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)](https://sqlite.org)
[![JWT](https://img.shields.io/badge/Auth-JWT-F60?style=flat-square&logo=jsonwebtokens)](https://jwt.io)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Features](#-features) · [Quick Start](#-quick-start) · [API Reference](#-api-reference) · [Deployment](#-deployment) · [Demo](#-demo-accounts)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Database Design](#-database-design)
- [API Reference](#-api-reference)
- [Role-Based Access](#-role-based-access)
- [Deployment](#-deployment)
- [Demo Accounts](#-demo-accounts)
- [Security](#-security)
- [Performance](#-performance)

---

## 🌟 Overview

TaskFlow is a production-ready, full-stack team task manager built for clarity and collaboration. It features a calm public landing page, secure JWT authentication, and role-based dashboards that keep the right work visible to the right people.

```
Admin creates project → Adds team members → Assigns tasks → Members update status
```

**Key differentiators:**
- 🎯 Smart task visibility — team tasks visible to all, personal tasks stay private
- 🛡️ Role enforcement at both API and UI level
- 📅 Calendar view with deadline tracking and overdue detection
- 📊 Analytics dashboard (Admin only)
- 📱 Fully responsive — mobile, tablet, desktop

---

## ✨ Features

### 🔐 Authentication
- Signup with Name, Email, Password
- Secure login with JWT tokens
- Token-based session restoration across refreshes

### 📁 Project Management
- Create projects (Admin only)
- Project creator automatically becomes Admin
- Add and remove team members
- Members see only their assigned projects

### ✅ Task Management
- Create tasks with Title, Description, Due Date, and Priority (Low / Medium / High)
- Assign to an individual user or the entire team
- Status workflow: `To Do` → `In Progress` → `Done`
- Overdue detection and tracking

### 📊 Dashboard & Reports
- Total task count and status breakdown
- Tasks-per-user overview
- Overdue task tracking
- Full analytics reports (Admin only)

### 🗓️ Calendar View
- Visual calendar with task deadlines
- Click any day to see due tasks

### 👥 Team View
- See all project members
- Admin can manage membership

### 📱 Responsive UI
- Adaptive layout for all screen sizes
- Dark theme with smooth transitions
- Touch-friendly interface

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Context API, Inline CSS |
| **Backend** | FastAPI (Python 3.9+) |
| **Database** | SQLite (upgrade-ready to PostgreSQL) |
| **Auth** | JWT (python-jose) + Bcrypt password hashing |
| **Validation** | Pydantic v2 |
| **Deploy** | Railway (backend) · Vercel (frontend) |

---

## 📁 Project Structure

```
TaskFlow/
│
├── backend/                        # FastAPI backend
│   ├── main.py                     # App entry point, CORS, router
│   ├── auth.py                     # JWT auth & password hashing
│   ├── database.py                 # SQLite schema & initialization
│   ├── routes.py                   # All API endpoints (15+)
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Container config for Railway
│   └── .env.example                # Environment variable template
│
├── frontend/                       # React + Vite frontend
│   ├── public/
│   │   └── favicon.svg             # Site icon
│   ├── src/
│   │   ├── App.jsx                 # Main app with all page components
│   │   ├── main.jsx                # React entry point
│   │   ├── index.css               # Global styles
│   │   ├── api/
│   │   │   └── index.js            # Centralized API client
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── theme.js        # Design tokens & color palette
│   │   │   └── layout/
│   │   │       ├── PublicHeader.jsx
│   │   │       └── PublicFooter.jsx
│   │   └── pages/
│   │       └── HomeLanding.jsx     # Public landing page
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json                 # Vercel SPA rewrite config
│   └── .env.example
│
├── Dockerfile                      # Backend container (root level)
├── railway.json                    # Railway deployment config
├── README.md
├── DEPLOYMENT_GUIDE.md
├── DEMO_ACCOUNTS.md
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the development server
python -m uvicorn main:app --reload --port 8000
```

**Backend URLs:**
| Endpoint | URL |
|---|---|
| API Base | `http://127.0.0.1:8000/api` |
| Interactive Docs | `http://127.0.0.1:8000/docs` |
| ReDoc | `http://127.0.0.1:8000/redoc` |

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Frontend URL:** `http://localhost:5173`

> The Vite dev server will automatically proxy `/api` calls to `http://127.0.0.1:8000`.

---

### 4. Open the App

Visit `http://localhost:5173` and sign up with:
- **Role: Admin** — to create projects and manage the team
- **Role: Member** — to be added to projects and update task status

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_BASE=http://127.0.0.1:8000/api
```

For production:
```env
VITE_API_BASE=https://your-railway-backend.up.railway.app/api
```

---

### Backend (`backend/.env`)

```env
SECRET_KEY=your-super-secret-jwt-key-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=*
ENVIRONMENT=production
```

> ⚠️ Always set a strong, random `SECRET_KEY` in production. You can generate one with:
> ```bash
> python -c "import secrets; print(secrets.token_hex(32))"
> ```

---

## 🗄️ Database Design

TaskFlow uses SQLite with four core tables and enforced foreign key constraints.

```
┌──────────┐       ┌──────────────────┐       ┌──────────┐
│  users   │───┐   │ project_members  │   ┌───│ projects │
│          │   └──▶│  user_id (FK)    │◀──┘   │          │
│ id       │       │  project_id (FK) │       │ id       │
│ name     │       └──────────────────┘       │ name     │
│ email    │                                   │ admin_id │
│ password │       ┌──────────┐                └──────────┘
│ role     │───┐   │  tasks   │
└──────────┘   └──▶│          │
                   │ id       │
                   │ title    │
                   │ desc     │
                   │ priority │◀── Low | Medium | High
                   │ due_date │
                   │ status   │◀── To Do | In Progress | Done
                   │ assigned_type │◀── 'team' | 'user'
                   │ assigned_to   │
                   │ project_id (FK)│
                   └──────────┘
```

### Visibility Rules

| `assigned_type` | Who can see the task |
|---|---|
| `team` | All members of the project |
| `user` | Only the specifically assigned user |

> Members can update task status if they are allowed by the backend visibility rule.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/signup` | Create a new user account | Public |
| `POST` | `/api/auth/login` | Login and receive JWT token | Public |
| `GET` | `/api/auth/me` | Get current authenticated user | Authenticated |

**Example — Signup:**
```json
POST /api/auth/signup
{
  "name": "Rahul Choudhary",
  "email": "rahul@example.com",
  "password": "securepassword",
  "role": "admin"
}
```

---

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/projects` | Create a new project | Admin |
| `GET` | `/api/projects` | List all accessible projects | Authenticated |
| `GET` | `/api/projects/{id}` | Get project details | Member of project |
| `POST` | `/api/projects/{id}/members` | Add a member to project | Admin |
| `GET` | `/api/projects/{id}/members` | List project members | Member of project |
| `DELETE` | `/api/projects/{id}/members/{uid}` | Remove a member | Admin |

---

### Tasks

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/tasks` | Create a new task | Admin |
| `GET` | `/api/tasks` | List visible tasks | Authenticated |
| `GET` | `/api/tasks/{id}` | Get task details | Permitted user |
| `PUT` | `/api/tasks/{id}` | Update task (status, etc.) | Permitted user |
| `DELETE` | `/api/tasks/{id}` | Delete a task | Admin |

**Example — Create Task:**
```json
POST /api/tasks
{
  "title": "Design landing page",
  "description": "Create mockups for the new landing page",
  "priority": "high",
  "due_date": "2026-06-01",
  "assigned_type": "user",
  "assigned_to": 3,
  "project_id": 1
}
```

---

### Reports

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/reports` | Analytics and stats | Admin only |

---

## 👥 Role-Based Access

| Feature | Admin | Member |
|---|:---:|:---:|
| Create project | ✅ | ❌ |
| Add / remove members | ✅ | ❌ |
| Create task | ✅ | ❌ |
| Delete task | ✅ | ❌ |
| View assigned projects | ✅ | ✅ |
| View assigned tasks | ✅ | ✅ |
| Update task status | ✅ | ✅ |
| View calendar | ✅ | ✅ |
| View team | ✅ | ✅ |
| View reports & analytics | ✅ | ❌ |

> Role enforcement is applied at both the **API level** (backend) and the **UI level** (frontend).

---

## 🚢 Deployment

### Backend → Railway

1. Push your code to GitHub.
2. Create a new Railway project and connect your repo.
3. Set the **root directory** to `backend`.
4. Railway auto-detects the `Dockerfile` and builds it.
5. Add the following environment variables in Railway's dashboard:

```env
SECRET_KEY=your-production-secret-key
CORS_ORIGINS=https://your-vercel-frontend.vercel.app
```

6. Railway will expose your app on a public URL like `https://taskflow-production.up.railway.app`.

---

### Frontend → Vercel

1. Import your GitHub repo into Vercel.
2. Set the **root directory** to `frontend`.
3. Add the environment variable:

```env
VITE_API_BASE=https://your-railway-backend.up.railway.app/api
```

4. Vercel uses `vercel.json` to handle SPA routing automatically.
5. Your frontend will be live at `https://your-project.vercel.app`.

---

### Docker (Self-hosted)

```bash
# Build backend image
docker build -t taskflow-backend ./backend

# Run backend container
docker run -p 8000:8000 \
  -e SECRET_KEY=your-secret \
  -e CORS_ORIGINS=http://localhost:5173 \
  taskflow-backend
```

---

### Production Checklist

- [ ] Set strong `SECRET_KEY` (never use default)
- [ ] Update `CORS_ORIGINS` to your frontend URL only
- [ ] Set `VITE_API_BASE` to your Railway backend URL
- [ ] Consider migrating SQLite → PostgreSQL for shared persistent storage
- [ ] Enable HTTPS (auto-enabled on Railway & Vercel)
- [ ] Test full auth flow after deployment

---

## 🔑 Demo Accounts

> Use these credentials for testing the app locally or on the live demo.

### Admin Account

```
Email:    admin@taskflow.dev
Password: admin123
Role:     Admin
```

**Admin can:** Create projects, add/remove members, create and delete tasks, view reports.

---

### Member Accounts

```
Email:    alice@taskflow.dev
Password: member123
Role:     Member

Email:    bob@taskflow.dev
Password: member123
Role:     Member
```

**Members can:** View assigned projects and tasks, update task status, view calendar.

---

### Demo Workflow

**Admin Flow:**
1. Login as `admin@taskflow.dev`
2. Create a project — e.g., *"Website Redesign"*
3. Add `alice@taskflow.dev` and `bob@taskflow.dev` as members
4. Create tasks with different priorities and assign them
5. View the dashboard and reports

**Member Flow:**
1. Login as `alice@taskflow.dev`
2. See only the projects you're assigned to
3. Open a task and update its status
4. View the calendar for upcoming deadlines
5. Notice you cannot access reports or create projects

---

## 🔐 Security

| Feature | Implementation |
|---|---|
| Password hashing | Bcrypt via `passlib` |
| Token auth | JWT (HS256) via `python-jose` |
| Role enforcement | Backend middleware + API guards |
| SQL injection | Prevented via parameterized queries |
| XSS protection | React DOM escaping |
| CORS | Configurable origins via env var |
| HTTPS | Auto-enabled on Railway & Vercel |

---

## ⚡ Performance

| Metric | Value |
|---|---|
| Frontend build time | ~5s |
| JS bundle (gzipped) | ~61 KB |
| API response time (local) | < 200ms |
| DB capacity | SQLite (millions of rows) |
| Auth model | Stateless JWT (horizontally scalable) |

---

## 🛣️ Roadmap

- [ ] PostgreSQL support for production deployments
- [ ] Real-time task updates via WebSockets
- [ ] Email notifications for assignments and deadlines
- [ ] File attachments on tasks
- [ ] Advanced filtering and search
- [ ] Activity log / audit trail
- [ ] Mobile app (React Native)

---

## 📚 Resources

| Resource | Link |
|---|---|
| FastAPI Docs | https://fastapi.tiangolo.com |
| React Docs | https://react.dev |
| Vite Docs | https://vitejs.dev |
| Railway Docs | https://docs.railway.app |
| Vercel Docs | https://vercel.com/docs |
| SQLite Docs | https://www.sqlite.org/docs.html |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **Rahul Choudhary** · v1.0.0 · May 2026

</div>