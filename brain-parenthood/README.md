# Brain Parenthood

A 12-Week Resilience and Performance Toolkit for Early-Stage Startups

## Overview

Brain Parenthood is a comprehensive web application designed to help startup teams build resilience, reduce stress, and improve overall performance. Just like raising a child, the program trains your team's "collective brain" through structured psychological resilience training.

## Features

- **Module-Based Learning**: 12-week program divided into focused modules
- **Baseline Assessment**: Evaluate your team's current state
- **Goal Setting**: Set and track individual and team goals
- **Progress Dashboard**: Monitor improvements over time
- **AI-Powered Recommendations**: Personalized suggestions based on your data (placeholder for future enhancement)
- **Team Collaboration**: Support for both individual users and teams

## Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React** - UI components

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Production database (SQLite for development)
- **Pydantic** - Data validation

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** (for production) or SQLite (for development)

### Frontend Setup

1. Navigate to the project directory:
```bash
cd brain-parenthood
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create environment file:
```bash
cp .env.example .env
```

6. Run the backend server:
```bash
uvicorn main:app --reload
```

7. Access the API documentation at [http://localhost:8000/docs](http://localhost:8000/docs)

## Deployment

### Frontend Deployment on Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "New Project" and import your repository

4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

5. Deploy!

### Backend Deployment Options

#### Option 1: Vercel (Serverless)
- Add a `vercel.json` in the backend directory
- Deploy as a serverless function

#### Option 2: Railway
1. Go to [Railway](https://railway.app)
2. Create a new project from your repository
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

#### Option 3: Heroku
1. Install Heroku CLI
2. Create a new app: `heroku create`
3. Add PostgreSQL: `heroku addons:create heroku-postgresql:hobby-dev`
4. Deploy: `git push heroku main`

#### Option 4: AWS/GCP/Azure
- Deploy using Docker container or VM
- Configure PostgreSQL database
- Set up load balancer and auto-scaling

## Project Structure

```
brain-parenthood/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard page
│   ├── module/              # Module pages
│   │   └── 1/              # Module 1 implementation
│   ├── modules/             # All modules overview
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   └── Navigation.tsx       # Navigation bar
├── backend/                 # FastAPI backend
│   ├── api/                # API routes
│   │   ├── users.py        # User endpoints
│   │   ├── teams.py        # Team endpoints
│   │   ├── assessments.py  # Assessment endpoints
│   │   ├── goals.py        # Goals endpoints
│   │   └── ai.py           # AI recommendations
│   ├── models.py           # Database models
│   ├── schemas.py          # Pydantic schemas
│   ├── database.py         # Database configuration
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
├── public/                  # Static assets
├── .env.local.example      # Frontend env template
├── package.json            # Node dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
└── README.md               # This file
```

## Module 1: Kick Off

Module 1 is fully implemented and includes:

1. **Overview**: Introduction to Brain Parenthood concepts
2. **Baseline Assessment**: Evaluate team and individual metrics
3. **Goal Setting**: Define specific, measurable goals
4. **Completion**: Summary and next steps

### Baseline Metrics Tracked:
- Team stress level (1-10)
- Individual stress level (1-10)
- Team productivity (1-10)
- Communication quality (1-10)
- Work-life balance (1-10)
- Team size
- Primary challenges (text)

### Goals Defined:
- Stress reduction goals
- Productivity goals
- Communication goals
- Personal development goals
- Team development goals
- Success metrics

## API Endpoints

### Users
- `POST /api/users/` - Create user
- `GET /api/users/` - List users
- `GET /api/users/{user_id}` - Get user

### Teams
- `POST /api/teams/` - Create team
- `GET /api/teams/` - List teams
- `GET /api/teams/{team_id}` - Get team
- `POST /api/teams/{team_id}/members/{user_id}` - Add member

### Assessments
- `POST /api/assessments/` - Create assessment
- `GET /api/assessments/user/{user_id}` - Get user assessments
- `GET /api/assessments/{assessment_id}` - Get assessment
- `GET /api/assessments/user/{user_id}/latest` - Get latest assessment

### Goals
- `POST /api/goals/` - Create goals
- `GET /api/goals/user/{user_id}` - Get user goals
- `GET /api/goals/{goal_id}` - Get goal
- `PUT /api/goals/{goal_id}/progress` - Update progress

### AI (Placeholder)
- `POST /api/ai/personalized-plan` - Generate personalized plan
- `GET /api/ai/recommendations/{user_id}` - Get recommendations
- `POST /api/ai/analyze-progress` - Analyze progress

## Customization Guide

### Adding New Modules

1. Create a new module page in `app/module/{number}/page.tsx`
2. Update the modules data in `app/modules/page.tsx`
3. Add module content following the Module 1 pattern
4. Update the navigation if needed

### Customizing Styles

1. **Colors**: Edit `tailwind.config.ts` to change the color scheme
2. **Fonts**: Update `app/layout.tsx` to use different fonts
3. **Components**: Modify components in the `components/` directory

### Database Schema Changes

1. Update models in `backend/models.py`
2. Create a new Alembic migration:
```bash
cd backend
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

### Adding API Endpoints

1. Create/update files in `backend/api/`
2. Add router to `backend/main.py`
3. Update schemas in `backend/schemas.py` if needed

## Future Enhancements

- [ ] Implement remaining modules (2-12)
- [ ] Add authentication and authorization
- [ ] Integrate actual AI/ML models for personalization
- [ ] Add real-time team collaboration features
- [ ] Implement progress tracking charts and analytics
- [ ] Add email notifications and reminders
- [ ] Build mobile app version
- [ ] Add export functionality for reports

## AI Integration Roadmap

Currently, the app has placeholder endpoints for AI features. Future implementation will include:

1. **Personalized Plans**: Use ML to generate customized plans based on baseline data
2. **Stress Detection**: NLP analysis of user inputs to detect stress patterns
3. **Recommendation Engine**: Collaborative filtering for suggesting activities
4. **Progress Prediction**: Predict user success based on historical data
5. **Chatbot Coach**: AI meditation and mindfulness coach

## Contributing

This is a modular application designed for easy customization and extension. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC

## Support

For questions or issues, please open an issue on the GitHub repository.

---

Built with ❤️ for startup teams everywhere
