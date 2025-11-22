# AI Integration Guide for Brain Parenthood

## Overview

All modules (2-12) are designed with AI personalization integration points. This guide explains how to connect AI services to enhance the user experience.

---

## AI Integration Points by Module

### Module 2: Mindfulness Foundation
**AI Opportunities:**
- Recommend specific mindfulness technique based on user's stress profile
- Generate personalized practice schedules
- Provide adaptive coaching during practice sessions

**Integration Points:**
```typescript
// In OverviewStep component
useEffect(() => {
  const fetchPersonalizedTechnique = async () => {
    const response = await fetch('/api/ai/recommend-mindfulness', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        userId: user.id,
        baselineStress: user.baselineAssessment.stress_level,
        goals: user.goals
      })
    });
    const data = await response.json();
    setAiRecommendations(data.recommendations);
  };
  fetchPersonalizedTechnique();
}, [user]);
```

### Module 3: Cognitive Restructuring
**AI Opportunities:**
- Detect cognitive distortions in user's text input
- Suggest balanced alternative thoughts
- Pattern analysis across user's thought logs

**Integration Points:**
```typescript
// Automatic distortion detection
const detectDistortion = async (thought: string) => {
  const response = await fetch('/api/ai/analyze-thought', {
    method: 'POST',
    body: JSON.stringify({ thought })
  });
  return response.json(); // Returns: { distortion: 'catastrophizing', confidence: 0.85 }
};

// Generate alternative thought
const generateAlternative = async (thought: string, distortion: string) => {
  const response = await fetch('/api/ai/generate-alternative', {
    method: 'POST',
    body: JSON.stringify({ thought, distortion })
  });
  return response.json(); // Returns balanced alternative
};
```

---

## Common AI Integration Patterns

### 1. Personalized Recommendations

**Purpose:** Tailor content to user's specific needs

**Implementation:**
```typescript
// In any module component
const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

useEffect(() => {
  const loadPersonalizedContent = async () => {
    const token = getAuthToken();
    const response = await fetch(`/api/ai/personalized-content/${moduleNumber}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setAiRecommendations(data.recommendations);
  };

  loadPersonalizedContent();
}, [moduleNumber]);
```

**Display:**
```tsx
{aiRecommendations.length > 0 && (
  <div className="p-6 bg-purple-900/30 rounded-2xl border border-purple-500/50">
    <h3 className="font-bold text-lg mb-3 text-[#A78BFA] flex items-center gap-2">
      <span>🤖</span> Personalized for You
    </h3>
    <ul className="space-y-2 text-white">
      {aiRecommendations.map((rec, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-purple-400">•</span>
          <span>{rec}</span>
        </li>
      ))}
    </ul>
  </div>
)}
```

### 2. Real-Time Coaching

**Purpose:** Provide contextual guidance as user completes exercises

**Implementation:**
```typescript
// Watch user input and provide coaching
const [coachingTip, setCoachingTip] = useState<string>('');

const handleInputChange = debounce(async (value: string) => {
  if (value.length > 50) {
    const response = await fetch('/api/ai/coaching-tip', {
      method: 'POST',
      body: JSON.stringify({
        moduleId: 3,
        stepId: 'practice',
        userInput: value
      })
    });
    const data = await response.json();
    setCoachingTip(data.tip);
  }
}, 1000);
```

**Display:**
```tsx
{coachingTip && (
  <div className="mt-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
    <p className="text-sm text-purple-300">
      🤖 <strong>AI Coach:</strong> {coachingTip}
    </p>
  </div>
)}
```

### 3. Progress Analysis

**Purpose:** Analyze user's progress and suggest next steps

**Implementation:**
```typescript
// At module completion
const analyzeProgress = async () => {
  const response = await fetch('/api/ai/analyze-progress', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      userId: user.id,
      completedModules: [1, 2, 3],
      currentProgress: moduleData
    })
  });

  const analysis = await response.json();
  // Returns: { strengths: [], areasToFocus: [], nextSteps: [] }
  return analysis;
};
```

### 4. Adaptive Content

**Purpose:** Adjust module difficulty/focus based on user performance

**Implementation:**
```typescript
// Determine content complexity
const getAdaptiveContent = async () => {
  const response = await fetch('/api/ai/adaptive-content', {
    method: 'POST',
    body: JSON.stringify({
      userId: user.id,
      moduleId: currentModule,
      performanceMetrics: {
        completionRate: 0.85,
        engagementScore: 7.5,
        stressReduction: 0.30
      }
    })
  });

  return response.json(); // Returns adjusted content
};
```

---

## Backend AI API Endpoints

### Required Endpoints

```python
# backend/api/ai.py

from fastapi import APIRouter, Depends
from schemas import AIRecommendationRequest, AIAnalysisRequest
from auth import get_current_active_user

router = APIRouter()

@router.post("/personalized-content/{module_id}")
async def get_personalized_content(
    module_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Generate personalized recommendations for a module
    based on user's baseline assessment and progress
    """
    # Get user's baseline assessment
    baseline = get_latest_assessment(db, current_user.id)

    # Get user's goals
    goals = get_user_goals(db, current_user.id)

    # TODO: Call OpenAI/Anthropic API for personalization
    recommendations = generate_recommendations(
        module_id=module_id,
        stress_level=baseline.team_stress_level,
        goals=goals
    )

    return {"recommendations": recommendations}

@router.post("/analyze-thought")
async def analyze_thought(
    request: dict,
    current_user: User = Depends(get_current_active_user)
):
    """
    Analyze a thought for cognitive distortions using AI
    """
    thought = request.get("thought")

    # TODO: Call LLM to detect distortion type
    # Prompt: "Analyze this thought for cognitive distortions: {thought}"

    distortion_type = detect_distortion_with_ai(thought)

    return {
        "distortion": distortion_type,
        "confidence": 0.85
    }

@router.post("/generate-alternative")
async def generate_alternative_thought(
    request: dict,
    current_user: User = Depends(get_current_active_user)
):
    """
    Generate balanced alternative to a distorted thought
    """
    thought = request.get("thought")
    distortion = request.get("distortion")

    # TODO: Call LLM to generate alternative
    # Prompt: "This thought shows {distortion}. Generate a balanced alternative: {thought}"

    alternative = generate_with_ai(thought, distortion)

    return {"alternative": alternative}

@router.post("/coaching-tip")
async def get_coaching_tip(
    request: dict,
    current_user: User = Depends(get_current_active_user)
):
    """
    Provide contextual coaching tip based on user's current activity
    """
    module_id = request.get("moduleId")
    step_id = request.get("stepId")
    user_input = request.get("userInput")

    # TODO: Generate contextual tip
    tip = generate_coaching_tip(module_id, step_id, user_input)

    return {"tip": tip}
```

---

## AI Service Integration Examples

### Option 1: OpenAI GPT-4

```python
import openai

def generate_recommendations(module_id, stress_level, goals):
    prompt = f"""
    Generate 3 personalized recommendations for Module {module_id}.
    User context:
    - Stress level: {stress_level}/10
    - Goals: {goals}

    Focus on practical, actionable advice.
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a mental health and performance coach."},
            {"role": "user", "content": prompt}
        ]
    )

    return parse_recommendations(response.choices[0].message.content)
```

### Option 2: Anthropic Claude

```python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

def detect_distortion_with_ai(thought: str):
    message = client.messages.create(
        model="claude-3-sonnet-20240229",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"""
                Analyze this thought for cognitive distortions:
                "{thought}"

                Respond with one of: catastrophizing, all-or-nothing,
                overgeneralizing, mind-reading, should-statements,
                labeling, fortune-telling, or none.
                """
            }
        ]
    )

    return message.content[0].text.strip()
```

### Option 3: Local LLM (Llama, Mistral)

```python
from transformers import pipeline

generator = pipeline('text-generation', model='meta-llama/Llama-2-7b-chat-hf')

def generate_local_recommendations(context):
    prompt = f"<s>[INST] {context} [/INST]"
    output = generator(prompt, max_length=200)
    return output[0]['generated_text']
```

---

## Privacy & Security Considerations

### 1. Data Minimization
- Only send necessary data to AI services
- Anonymize user data when possible
- Don't include PII in prompts

### 2. User Consent
```typescript
// Show AI consent on first use
const [aiConsent, setAiConsent] = useState<boolean>(false);

useEffect(() => {
  const consent = localStorage.getItem('aiPersonalizationConsent');
  setAiConsent(consent === 'true');
}, []);

// Display consent UI
{!aiConsent && (
  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
    <p className="text-white mb-3">
      Enable AI personalization to get custom recommendations?
    </p>
    <button onClick={() => {
      localStorage.setItem('aiPersonalizationConsent', 'true');
      setAiConsent(true);
    }}>
      Enable AI Features
    </button>
  </div>
)}
```

### 3. Secure API Calls
- Always use authentication tokens
- Encrypt sensitive data in transit
- Implement rate limiting
- Log AI usage for audit

---

## Testing AI Features

### Unit Tests
```python
def test_distortion_detection():
    thought = "I'm going to fail this project"
    result = detect_distortion_with_ai(thought)
    assert result in ["catastrophizing", "fortune-telling"]

def test_personalized_recommendations():
    recs = generate_recommendations(
        module_id=3,
        stress_level=8,
        goals=["reduce anxiety"]
    )
    assert len(recs) == 3
    assert all(isinstance(r, str) for r in recs)
```

### Integration Tests
```python
def test_ai_endpoint_auth():
    response = client.post("/api/ai/personalized-content/3")
    assert response.status_code == 403  # No auth

    response = client.post(
        "/api/ai/personalized-content/3",
        headers={"Authorization": f"Bearer {valid_token}"}
    )
    assert response.status_code == 200
```

---

## Cost Management

### 1. Caching
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_cached_recommendations(user_id: int, module_id: int):
    # Cache recommendations for 24 hours
    return generate_recommendations(module_id, ...)
```

### 2. Rate Limiting
```python
from slowapi import Limiter

@app.post("/api/ai/generate-alternative")
@limiter.limit("10/minute")  # Limit AI calls
async def generate_alternative(...):
    ...
```

### 3. Batch Processing
```python
# Process multiple users in batch
def batch_generate_recommendations(user_ids: List[int]):
    # Single API call for multiple users
    prompts = [create_prompt(uid) for uid in user_ids]
    results = openai.ChatCompletion.create(...)
    return parse_batch_results(results)
```

---

## Fallback Strategies

Always provide graceful degradation:

```typescript
try {
  const aiRecs = await fetchAIRecommendations();
  setRecommendations(aiRecs);
} catch (error) {
  // Fallback to rule-based recommendations
  const fallbackRecs = getRuleBasedRecommendations(user);
  setRecommendations(fallbackRecs);
}
```

---

## Future AI Enhancements

1. **Voice Coaching** - AI voice guide during exercises
2. **Progress Prediction** - Predict user outcomes
3. **Team Insights** - Aggregate anonymous team patterns
4. **Adaptive Pacing** - Adjust module difficulty in real-time
5. **Emotional Analysis** - Detect sentiment in reflections
6. **Smart Reminders** - AI-optimized practice reminders

---

## Getting Started

1. Choose an AI provider (OpenAI, Anthropic, local LLM)
2. Add API credentials to `.env`:
   ```
   OPENAI_API_KEY=sk-...
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Implement backend AI endpoints in `backend/api/ai.py`
4. Update frontend modules to call AI endpoints
5. Test with sample users
6. Monitor costs and performance
7. Iterate based on user feedback

---

**Note:** All AI integration points are marked with 🤖 in the module code for easy identification.
