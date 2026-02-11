# Maswada AI | مسودة

**AI-Powered Note-Taking Application**

A modern, full-stack note-taking application with AI-powered features built with React 19, TypeScript, and OpenAI. Create, edit, and enhance your notes with intelligent AI capabilities including summarization, rewriting, and translation.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Features

### 📝 Core Functionality

- **Note Management**: Create, read, update, and delete notes with a clean, intuitive interface
- **Secure Authentication**: User authentication and authorization powered by Clerk
- **Real-time Updates**: Live note editing with instant saving
- **Search**: Quickly find notes with built-in search functionality

### 🤖 AI-Powered Features

Powered by OpenAI GPT-4 to enhance your note-taking experience:

- **📊 Summarize**: Generate intelligent summaries of your notes
- **✍️ Rewrite**: Improve your text with 4 different modes:
  - **Clearer**: Make text more understandable
  - **Shorter**: Condense content while preserving meaning
  - **Formal**: Convert to professional tone
  - **Casual**: Make content more conversational
- **🌍 Translate**: Automatic language detection and translation between English and Arabic

### 🎨 Modern UI/UX

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Glass Morphism**: Beautiful modern UI with glass card components
- **Dark Theme**: Easy on the eyes with a sleek dark interface
- **Smooth Animations**: Polished user experience with subtle transitions

---

## 🏗️ Tech Stack

### **Backend**

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| **Node.js 18+** | JavaScript runtime               |
| **TypeScript**  | Type-safe development            |
| **Express.js**  | Web framework                    |
| **Sequelize**   | ORM for database management      |
| **SQLite**      | Lightweight database             |
| **Clerk**       | Authentication & user management |
| **OpenAI API**  | AI features integration          |
| **Zod**         | Request validation               |

### **Frontend**

| Technology          | Purpose                  |
| ------------------- | ------------------------ |
| **React 19**        | UI framework             |
| **TypeScript**      | Type-safe development    |
| **Vite 7**          | Build tool & dev server  |
| **React Router v7** | Client-side routing      |
| **Clerk React**     | Authentication UI        |
| **Tailwind CSS v4** | Utility-first styling    |
| **Radix UI**        | Accessible UI components |
| **Lucide React**    | Icon library             |
| **Sonner**          | Toast notifications      |

---

## 📁 Project Structure

```
maswada-ai-template/
│
├── backend/                      # Express.js Backend
│   ├── src/
│   │   ├── config/               # Environment & configuration
│   │   │   └── env.ts
│   │   ├── db/                   # Database setup
│   │   │   ├── sequelize.ts      # Sequelize instance
│   │   │   └── sync.ts           # Database sync script
│   │   ├── middlewares/          # Express middlewares
│   │   │   ├── auth.ts           # Clerk authentication
│   │   │   └── errorHandler.ts  # Global error handler
│   │   ├── models/               # Sequelize models
│   │   │   └── Note.ts           # Note model
│   │   ├── routes/               # API routes
│   │   │   ├── health.ts         # Health check endpoint
│   │   │   ├── auth-test.ts      # Auth testing endpoint
│   │   │   ├── notes.ts          # Notes CRUD endpoints
│   │   │   └── ai.ts             # AI features endpoints
│   │   ├── services/             # Business logic
│   │   │   ├── notes.service.ts  # Notes operations
│   │   │   ├── ai.service.ts     # AI features logic
│   │   │   └── openai.service.ts # OpenAI API integration
│   │   ├── validators/           # Zod validation schemas
│   │   │   ├── notes.schema.ts
│   │   │   └── ai.schema.ts
│   │   ├── types/                # TypeScript types
│   │   ├── app.ts                # Express app configuration
│   │   └── server.ts             # Server entry point
│   ├── data/                     # SQLite database files
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── app/                  # Application core
│   │   │   ├── layout/           # Layout components
│   │   │   │   ├── AppLayout.tsx # Main app layout
│   │   │   │   └── Header.tsx    # Header with navigation
│   │   │   ├── pages/            # Page components
│   │   │   │   ├── HomePage.tsx  # Notes list page
│   │   │   │   ├── NoteDetailPage.tsx # Note editor
│   │   │   │   ├── SignInPage.tsx
│   │   │   │   ├── SignUpPage.tsx
│   │   │   │   └── NotFoundPage.tsx
│   │   │   └── App.tsx           # App router
│   │   ├── components/           # Reusable components
│   │   │   ├── common/           # Common components
│   │   │   │   ├── GlassCard.tsx # Glass morphism card
│   │   │   │   └── ProtectedRoute.tsx # Auth guard
│   │   │   ├── note/             # Note-specific components
│   │   │   └── ui/               # UI library (buttons, inputs, etc.)
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useNotesApi.ts    # Notes API operations
│   │   │   └── useAiApi.ts       # AI API operations
│   │   ├── lib/                  # Utilities
│   │   ├── types/                # TypeScript types
│   │   ├── assets/               # Static assets
│   │   ├── index.css             # Global styles
│   │   └── main.tsx              # App entry point
│   ├── public/                   # Public assets
│   ├── .env                      # Environment variables
│   └── package.json
│
├── README.md                     # This file
└── SETUP.md                      # Detailed setup guide
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** and **npm** installed ([Download](https://nodejs.org/))
- A **Clerk** account ([Sign up free](https://clerk.com))
- An **OpenAI API** key ([Get key](https://platform.openai.com/api-keys))

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd maswada-ai-template-main
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your credentials:
# - CLERK_PUBLISHABLE_KEY=pk_test_...
# - CLERK_SECRET_KEY=sk_test_...
# - OPENAI_API_KEY=sk-...

# Initialize database
npm run db:sync

# Start development server
npm run dev
```

Backend will be running at **http://localhost:3001**

### 3️⃣ Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your Clerk publishable key:
# - VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Start development server
npm run dev
```

Frontend will be running at **http://localhost:5173**

### 4️⃣ Verify Installation

1. **Backend**: Visit http://localhost:3001/health - should return status "ok"
2. **Frontend**: Visit http://localhost:5173 - should see login page
3. **Sign in**: Create an account and start taking notes!

For detailed setup instructions, see [SETUP.md](./SETUP.md).

---

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint  | Description  |
| ------ | --------- | ------------ |
| `GET`  | `/health` | Health check |

### Protected Endpoints (Require Authentication)

#### Notes API

| Method   | Endpoint         | Description        | Request Body                           |
| -------- | ---------------- | ------------------ | -------------------------------------- |
| `GET`    | `/api/notes`     | Get all user notes | -                                      |
| `POST`   | `/api/notes`     | Create new note    | `{ title: string, content: string }`   |
| `GET`    | `/api/notes/:id` | Get note by ID     | -                                      |
| `PATCH`  | `/api/notes/:id` | Update note        | `{ title?: string, content?: string }` |
| `DELETE` | `/api/notes/:id` | Delete note        | -                                      |

#### AI Features API

| Method | Endpoint            | Description    | Request Body                                                         |
| ------ | ------------------- | -------------- | -------------------------------------------------------------------- |
| `POST` | `/api/ai/summarize` | Summarize note | `{ noteId: string }` or `{ text: string }`                           |
| `POST` | `/api/ai/rewrite`   | Rewrite note   | `{ noteId: string, mode: "clearer"\|"shorter"\|"formal"\|"casual" }` |
| `POST` | `/api/ai/translate` | Translate note | `{ noteId: string }` or `{ text: string }`                           |

### Example API Call

```javascript
// Get all notes
const response = await fetch("http://localhost:3001/api/notes", {
  headers: {
    Authorization: `Bearer ${clerkToken}`,
  },
});
const { notes } = await response.json();
```

---

## 💾 Database Schema

### Note Model

```typescript
{
  id: string; // UUID primary key
  userId: string; // Clerk user ID
  title: string; // Note title
  content: string; // Note content (markdown/text)
  summary: string | null; // AI-generated summary
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}
```

---

## 🔧 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
SQLITE_PATH=./data/maswada.db

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_ORGANIZATION_ID=org-...  # Optional
```

### Frontend (.env)

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# API Configuration
VITE_API_BASE_URL=http://localhost:3001
```

---

## 🧪 Development

### Available Scripts

#### Backend

```bash
npm run dev       # Start development server with hot reload
npm run build     # Compile TypeScript to JavaScript
npm start         # Run production build
npm run db:sync   # Initialize/sync database
```

#### Frontend

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Development Workflow

1. Start both backend and frontend servers in separate terminals
2. Make changes to the code
3. Changes will hot-reload automatically
4. Test your changes in the browser at http://localhost:5173

---

## 🏭 Production Deployment

### Backend Deployment

```bash
# Build TypeScript
npm run build

# Set production environment variables
export NODE_ENV=production
export CLERK_SECRET_KEY=sk_live_...
export OPENAI_API_KEY=sk-...

# Initialize database
npm run db:sync

# Start server
npm start
```

### Frontend Deployment

```bash
# Build for production
npm run build

# The dist/ directory contains the static files
# Deploy to any static hosting service (Vercel, Netlify, etc.)
```

**Note**: Make sure to set environment variables at build time for the frontend.

---

## 🔐 Security Features

- ✅ **JWT-based authentication** with Clerk
- ✅ **User-scoped data**: All queries filtered by userId
- ✅ **Request validation** with Zod schemas
- ✅ **Protected routes** on both frontend and backend
- ✅ **CORS configuration** for allowed origins
- ✅ **Environment variable security** (API keys never exposed to client)

---

## 🎨 UI Components

The app uses a custom design system with:

- **GlassCard**: Glass morphism effect containers
- **Button**: Multiple variants and sizes
- **Input**: Text input with consistent styling
- **Alert Dialog**: Confirmation modals (Radix UI)
- **User Button**: Clerk authentication widget
- **Toast Notifications**: Success/error messages (Sonner)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Framework
- [Clerk](https://clerk.com/) - Authentication
- [OpenAI](https://openai.com/) - AI Features
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vite.dev/) - Build Tool
- [Sequelize](https://sequelize.org/) - ORM

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [SETUP.md](./SETUP.md) for detailed setup instructions
2. Review backend testing guide in `backend/TESTING.md`
3. Open an issue on GitHub

---

**Built with ❤️ using React 19, TypeScript, and OpenAI**

_Maswada (مسودة) means "draft" in Arabic - your intelligent drafting companion._
