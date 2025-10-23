# Customization Guide

This guide will help you customize and extend the Brain Parenthood application to fit your specific needs.

## Table of Contents

1. [Changing Colors and Branding](#changing-colors-and-branding)
2. [Adding New Modules](#adding-new-modules)
3. [Customizing Assessments](#customizing-assessments)
4. [Extending the Database](#extending-the-database)
5. [Adding New Features](#adding-new-features)
6. [Integrating with AI Services](#integrating-with-ai-services)

## Changing Colors and Branding

### Update Color Scheme

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Change these values to your brand colors
        50: '#your-color',
        100: '#your-color',
        // ... etc
      },
    },
  },
},
```

### Change Logo

Replace the brain emoji in `components/Navigation.tsx`:

```typescript
<span className="text-2xl">🧠</span> // Change to your logo
```

Or use an image:

```typescript
<Image src="/logo.png" alt="Logo" width={32} height={32} />
```

### Update Typography

Change fonts in `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({ subsets: ["latin"] });
```

## Adding New Modules

### Step 1: Create Module Page

Create `app/module/{number}/page.tsx`:

```typescript
"use client";

import { useState } from "react";

export default function ModuleXPage() {
  // Your module implementation
  return (
    <div>
      {/* Module content */}
    </div>
  );
}
```

### Step 2: Update Modules List

Edit `app/modules/page.tsx` and add your module to the `modules` array:

```typescript
{
  id: X,
  title: "Module X: Your Title",
  duration: "Week X",
  icon: "📚",
  description: "Your description",
  activities: ["Activity 1", "Activity 2"],
  outcomes: ["Outcome 1", "Outcome 2"],
  available: true,
  completed: false,
}
```

### Step 3: Add to Navigation (Optional)

Edit `components/Navigation.tsx` to add a direct link to your module.

## Customizing Assessments

### Add New Assessment Questions

Edit `app/module/1/page.tsx` in the `BaselineStep` component:

```typescript
// Add new state
const [formData, setFormData] = useState({
  // ... existing fields
  newField: 5,
});

// Add new UI element
<div>
  <label className="block text-lg font-semibold mb-3">
    Your New Question
  </label>
  <input
    type="range"
    min="1"
    max="10"
    value={formData.newField}
    onChange={(e) => setFormData({ ...formData, newField: parseInt(e.target.value) })}
    className="flex-1"
  />
</div>
```

### Update Backend Schema

1. Edit `backend/models.py`:
```python
class BaselineAssessment(Base):
    # ... existing fields
    new_field = Column(Integer)
```

2. Edit `backend/schemas.py`:
```python
class BaselineAssessmentBase(BaseModel):
    # ... existing fields
    new_field: int
```

3. Create migration:
```bash
cd backend
alembic revision --autogenerate -m "Add new assessment field"
alembic upgrade head
```

## Extending the Database

### Adding New Tables

1. Define model in `backend/models.py`:

```python
class NewTable(Base):
    __tablename__ = "new_table"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    # Add your fields
```

2. Create schema in `backend/schemas.py`:

```python
class NewTableBase(BaseModel):
    name: str

class NewTableCreate(NewTableBase):
    pass

class NewTable(NewTableBase):
    id: int

    class Config:
        from_attributes = True
```

3. Create API route in `backend/api/new_table.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import NewTable
from schemas import NewTable as NewTableSchema, NewTableCreate

router = APIRouter()

@router.post("/", response_model=NewTableSchema)
def create_item(item: NewTableCreate, db: Session = Depends(get_db)):
    db_item = NewTable(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
```

4. Register router in `backend/main.py`:

```python
from api import new_table

app.include_router(new_table.router, prefix="/api/new-table", tags=["new-table"])
```

## Adding New Features

### Example: Adding a Journaling Feature

1. **Create the database model**:

```python
# backend/models.py
class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text, nullable=False)
    mood = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
```

2. **Create API endpoints**:

```python
# backend/api/journal.py
@router.post("/entries/")
def create_entry(entry: JournalEntryCreate, db: Session = Depends(get_db)):
    # Implementation
    pass
```

3. **Create frontend component**:

```typescript
// components/Journal.tsx
export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    // API call to create entry
  };

  return (
    <div>
      {/* Journal UI */}
    </div>
  );
}
```

4. **Add to dashboard or module page**:

```typescript
import Journal from "@/components/Journal";

// In your page component
<Journal />
```

## Integrating with AI Services

### Option 1: OpenAI Integration

1. Install OpenAI SDK:
```bash
pip install openai
```

2. Update `backend/api/ai.py`:

```python
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

@router.post("/personalized-plan")
async def generate_personalized_plan(request: PersonalizedPlanRequest):
    prompt = f"""
    Based on the following assessment:
    - Team stress: {request.baseline_assessment.team_stress_level}
    - Productivity: {request.baseline_assessment.productivity}

    Goals:
    - {request.goals.stress_reduction}

    Create a personalized 12-week plan.
    """

    response = await openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"plan": response.choices[0].message.content}
```

3. Add environment variable:
```
OPENAI_API_KEY=your-api-key
```

### Option 2: Hugging Face Models

```python
from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis")

@router.post("/analyze-mood")
def analyze_mood(text: str):
    result = sentiment_analyzer(text)
    return {"sentiment": result[0]["label"], "score": result[0]["score"]}
```

### Option 3: Custom ML Model

```python
import joblib

# Load your trained model
model = joblib.load("your_model.pkl")

@router.post("/predict")
def predict(features: PredictionInput):
    prediction = model.predict([features.to_array()])
    return {"prediction": prediction[0]}
```

## Environment-Specific Customization

### Development vs Production

Use environment variables to customize behavior:

```typescript
// frontend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const isDevelopment = process.env.NODE_ENV === 'development';
```

```python
# backend
import os

DEBUG = os.getenv("ENVIRONMENT") == "development"
```

## Best Practices

1. **Always backup your database** before making schema changes
2. **Test locally first** before deploying changes
3. **Use feature flags** for gradual rollouts
4. **Document your changes** in comments and README
5. **Keep dependencies updated** regularly
6. **Use TypeScript types** for better code quality
7. **Write API documentation** using FastAPI's automatic docs

## Common Customization Scenarios

### Changing Assessment Scales

If you want to use a different scale (e.g., 1-5 instead of 1-10):

```typescript
// Update all instances of:
max="10" // Change to max="5"

// And update labels accordingly
```

### Adding Team Features

To make the app more team-focused:

1. Add team dashboard views
2. Create team comparison charts
3. Implement team chat or comments
4. Add team leader/admin roles

### White-Labeling

To rebrand for a specific organization:

1. Update all references to "Brain Parenthood"
2. Change color scheme to match brand
3. Replace logo and favicon
4. Customize email templates
5. Update domain and hosting

## Getting Help

If you need help customizing:

1. Check the README.md for basic setup
2. Review the code comments
3. Look at existing patterns in the codebase
4. Open an issue on GitHub

---

Happy customizing!
