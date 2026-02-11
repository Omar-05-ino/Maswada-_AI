# 🚀 Setup Guide | دليل التثبيت

Complete step-by-step guide to set up Maswada AI on your local machine.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed and ready:

### Required Software

- ✅ **Node.js 18+** - [Download here](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **Code Editor** (VS Code, Cursor, or your preferred editor)

### Required API Keys

You'll need accounts and API keys from these services:

#### 1. Clerk (Authentication)

Clerk provides user authentication and management for the application.

- **Sign up**: [clerk.com](https://clerk.com) (Free tier available)
- **Create application**: Go to [Clerk Dashboard](https://dashboard.clerk.com)
- **Get your keys**:
  - **Publishable Key** - Starts with `pk_test_...` (used in frontend)
  - **Secret Key** - Starts with `sk_test_...` (used in backend)

#### 2. OpenAI (AI Features)

OpenAI powers the AI features (summarize, rewrite, translate).

- **Sign up**: [OpenAI Platform](https://platform.openai.com/)
- **Get API key**: [API Keys Page](https://platform.openai.com/api-keys)
- **Your key**: Starts with `sk-...`
- **Organization ID** (Optional): If you have multiple orgs - [Organization Settings](https://platform.openai.com/account/organization)

---

## 🔧 Installation Steps

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd maswada-ai-template-main
```

---

### Step 2: Backend Setup

#### 2.1 Install Dependencies

```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit the `.env` file and add your credentials:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173

# Clerk Authentication Keys
CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Database
SQLITE_PATH=./data/maswada.db

# OpenAI Configuration
OPENAI_API_KEY=sk-YOUR_OPENAI_API_KEY_HERE
OPENAI_ORGANIZATION_ID=org-YOUR_ORG_ID_HERE  # Optional
```

> **⚠️ Important**: Replace the placeholder values with your actual API keys from Clerk and OpenAI.

#### 2.3 Initialize Database

Run the database sync script to create tables:

```bash
npm run db:sync
```

You should see output confirming the database tables were created.

#### 2.4 Start Backend Server

```bash
npm run dev
```

**Expected output:**

```
Server running on http://localhost:3001
Database connected successfully
```

✅ Backend is now running at **http://localhost:3001**

---

### Step 3: Frontend Setup

Open a **new terminal window** (keep backend running).

#### 3.1 Install Dependencies

```bash
cd frontend
npm install
```

#### 3.2 Configure Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE

# API Configuration
VITE_API_BASE_URL=http://localhost:3001
```

> **📝 Note**: Use the **same Clerk Publishable Key** from the backend setup.

#### 3.3 Start Frontend Server

```bash
npm run dev
```

**Expected output:**

```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ Frontend is now running at **http://localhost:5173**

---

## ✅ Verify Installation

### Test 1: Backend Health Check

Open your browser or use curl:

```bash
curl http://localhost:3001/health
```

**Expected response:**

```json
{
  "status": "ok",
  "timestamp": "2026-02-11T...",
  "service": "maswada-ai-backend"
}
```

### Test 2: Frontend Access

1. Open your browser and navigate to: **http://localhost:5173**
2. You should see the Maswada AI sign-in page
3. Click "Sign Up" to create a test account
4. Complete the Clerk sign-up flow
5. You should be redirected to the notes dashboard

### Test 3: Create a Note

1. After signing in, click the **"Create Note"** button
2. Edit the note title and content
3. Try the AI features:
   - Click **"Summarize"** to generate a summary
   - Click **"Rewrite"** and select a mode (Clearer, Shorter, Formal, Casual)
   - Click **"Translate"** to translate the note

If all tests pass, your installation is complete! 🎉

---

## 🛠️ Development Workflow

### Running Both Servers

You need **two terminal windows**:

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Making Changes

- **Backend changes**: The server will auto-restart when you save files
- **Frontend changes**: The browser will auto-refresh when you save files

---

## ❗ Troubleshooting

### Backend Won't Start

**Problem**: `Error: Invalid Clerk credentials`

**Solution**:

- Make sure `CLERK_SECRET_KEY` is set correctly in `backend/.env`
- Verify the key starts with `sk_test_` or `sk_live_`
- Check for extra spaces or quotes in the `.env` file

---

**Problem**: `Error: Port 3001 already in use`

**Solution**:

```bash
# Find the process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change the port in backend/.env
PORT=3002
```

---

**Problem**: `Database error`

**Solution**:

```bash
# Delete the database and reinitialize
cd backend
rm -rf data/maswada.db
npm run db:sync
```

---

### Frontend Won't Start

**Problem**: `Error: Missing Clerk publishable key`

**Solution**:

- Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set in `frontend/.env`
- Verify the key starts with `pk_test_` or `pk_live_`
- Restart the dev server after adding environment variables

---

**Problem**: `Error: Port 5173 already in use`

**Solution**:

```bash
# Kill the process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

**Problem**: Dependencies installation errors

**Solution**:

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

### Authentication Issues

**Problem**: Can't sign in or sign up

**Solution**:

- Check that both `CLERK_PUBLISHABLE_KEY` values match (frontend and backend)
- Verify your Clerk application is active in the dashboard
- Check browser console for specific error messages
- Try clearing browser cookies and cache

---

**Problem**: API requests return 401 Unauthorized

**Solution**:

- Sign out and sign in again to refresh the token
- Check that backend `CLERK_SECRET_KEY` is correct
- Verify CORS settings in `backend/src/app.ts`

---

### AI Features Not Working

**Problem**: AI endpoints return errors

**Solution**:

- Verify `OPENAI_API_KEY` is set correctly in `backend/.env`
- Check your OpenAI account has available credits
- Review OpenAI API usage limits
- Check backend console logs for specific OpenAI errors

---

## 📂 Project Status

After successful setup, you should have:

✅ **Backend Server** running on port 3001  
✅ **Frontend Server** running on port 5173  
✅ **SQLite Database** initialized with Notes table  
✅ **Clerk Authentication** configured and working  
✅ **OpenAI Integration** ready for AI features  
✅ **CORS** configured for local development

---

## 🎯 Next Steps

Now that your development environment is ready:

1. **Explore the Code**:
   - Review the project structure in [`README.md`](./README.md)
   - Understand the backend routes in `backend/src/routes/`
   - Explore React components in `frontend/src/`

2. **Customize the App**:
   - Modify the UI theme in `frontend/src/index.css`
   - Add new features or endpoints
   - Adjust AI prompts in `backend/src/services/openai.service.ts`

3. **Test Features**:
   - Create multiple notes
   - Try different AI modes
   - Test the search functionality

4. **Prepare for Production**:
   - Review deployment guide in [`README.md`](./README.md#-production-deployment)
   - Set up production environment variables
   - Configure production database

---

## 📚 Additional Resources

- **Backend API Testing**: See `backend/TESTING.md` for API testing examples
- **Backend AI Features**: See `backend/AI_FEATURES.md` for AI prompt details
- **Frontend README**: See `frontend/README.md` for frontend-specific docs
- **Backend README**: See `backend/README.md` for backend-specific docs

---

## 🆘 Need Help?

If you encounter issues not covered here:

1. Check the error messages in terminal/browser console
2. Review the main [README.md](./README.md) for detailed documentation
3. Verify all environment variables are set correctly
4. Try restarting both servers
5. Clear browser cache and node_modules if needed

---

**Happy Coding! 🚀**

_Maswada AI - Your intelligent note-taking companion_
