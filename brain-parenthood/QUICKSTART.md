# Quick Start Guide

Get your Brain Parenthood app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Python 3.9+ installed (for backend)

## Frontend Setup (Next.js)

1. **Open terminal** in the project directory

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! The frontend is running.

## Backend Setup (FastAPI) - Optional for Module 1

Module 1 works without the backend (forms store data locally for now). But to set up the full backend:

1. **Install Python** if you haven't already:
   - Download from [python.org](https://python.org)
   - During installation, check "Add Python to PATH"

2. **Open a NEW terminal** in the `backend` directory:
```bash
cd backend
```

3. **Create virtual environment**:
```bash
python -m venv venv
```

4. **Activate virtual environment**:
   - Windows:
   ```bash
   venv\Scripts\activate
   ```
   - macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

5. **Install dependencies**:
```bash
pip install -r requirements.txt
```

6. **Create environment file**:
```bash
copy .env.example .env
```

7. **Run the backend**:
```bash
uvicorn main:app --reload
```

8. **Check it works**:
Open [http://localhost:8000/docs](http://localhost:8000/docs) to see the API documentation

## What You Can Do Now

### Without Backend:
- ✅ View the home page
- ✅ Complete Module 1 (data stored in browser)
- ✅ See the dashboard (with sample data)
- ✅ Navigate through all pages

### With Backend:
- ✅ Everything above, plus:
- ✅ Save assessments to database
- ✅ Save goals to database
- ✅ Team collaboration features
- ✅ AI recommendations (placeholder)

## Next Steps

1. **Try Module 1**: Click "Start Module 1" on the home page
2. **Complete the assessment**: Fill out the baseline assessment
3. **Set your goals**: Define what you want to achieve
4. **View your dashboard**: See your progress

## Troubleshooting

**Port already in use**:
```bash
# Change port for frontend
npm run dev -- -p 3001

# Change port for backend
uvicorn main:app --reload --port 8001
```

**Module not found errors**:
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

**Python not found**:
- Make sure Python is installed and in your PATH
- Try `python3` instead of `python`

## Development Tips

- Frontend auto-reloads on file changes
- Backend auto-reloads with `--reload` flag
- Check browser console for frontend errors
- Check terminal for backend errors

## Getting Help

- Check README.md for detailed documentation
- Check CUSTOMIZATION.md to customize the app
- Check DEPLOYMENT.md when ready to deploy

---

Enjoy building with Brain Parenthood!
