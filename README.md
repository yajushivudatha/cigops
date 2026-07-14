# 🚭 CigOps – Context-Aware AI Smoking Cessation Coach

CigOps is an AI-powered smoking cessation platform designed to provide personalized guidance, emotional support, and actionable insights to help individuals quit smoking. By combining conversational AI, Retrieval-Augmented Generation (RAG), OCR, voice interaction, and personalized quit plans, CigOps delivers a comprehensive digital companion for users throughout their quitting journey.

Built during the IBM watsonx.ai Hackathon, CigOps was recognized as one of the Top 10 teams among thousands of participants.

---

## 🌟 Features

### 🤖 AI Smoking Cessation Coach
- Conversational AI assistant for smoking-related guidance
- Personalized responses using contextual retrieval
- Evidence-based recommendations for quitting

### 📚 RAG Knowledge Base
- Retrieves relevant medical and smoking cessation information
- Context-aware responses instead of generic AI outputs
- Semantic search over curated health resources

### 🧘 Calm Now
- Guided breathing exercises
- Stress and craving management techniques
- Countdown timer for breathing sessions

### 📄 Medical Report Analyzer
- Upload medical reports
- OCR-based text extraction
- AI-generated summaries and health insights
- Personalized recommendations based on uploaded reports

### 🗓 Personalized Quit Plan
- AI-generated quitting roadmap
- Daily milestones and progress tracking
- Personalized motivational guidance

### 🎙 Voice Support
- AI voice interactions
- Natural conversational experience
- Accessible guidance during cravings

### 📊 Progress Dashboard
- Track quitting progress
- Monitor milestones
- Personalized insights and recommendations

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend & Database
- Supabase
- PostgreSQL
- Authentication
- Storage

### AI
- IBM watsonx.ai
- RAG
- OCR
- NLP
- LLM-powered recommendations

---

## 🏗 Architecture

```
                User
                  │
                  ▼
         React + Vite Frontend
                  │
      ┌───────────┼────────────┐
      ▼           ▼            ▼
 AI Chat     Medical OCR   Quit Plan
      │           │            │
      └───────────┼────────────┘
                  ▼
          IBM watsonx.ai
                  │
          RAG Knowledge Base
                  │
              Supabase
                  │
        PostgreSQL + Storage
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yajushivudatha/cigops.git

cd cigops
```

### Install dependencies

```bash
npm install
```

or

```bash
bun install
```

### Start development server

```bash
npm run dev
```

or

```bash
bun run dev
```

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── integrations/
│   └── assets/
├── supabase/
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Use Cases

- Smoking cessation support
- Craving management
- Mental wellness assistance
- Medical report interpretation
- Personalized health guidance
- AI-powered behavioral coaching

---

## 🔮 Future Enhancements

- Wearable device integration
- Smartwatch notifications
- AI-powered relapse prediction
- Doctor and therapist dashboard
- Community support groups
- Gamified quitting experience
- Multilingual support
- Mobile application

---

## 🏆 Recognition

🏅 Top 20 Finalist — IBM watsonx.ai Hackathon

Recognized for building an AI-powered digital smoking cessation assistant leveraging conversational AI, RAG, OCR, and personalized health recommendations.

---

