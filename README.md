# 🌌 Soul Sync  
### *Where your feelings find a voice*

Soul Sync is an **AI-powered emotional wellness companion** built during **COSMO 1 HACK 1 (AI/ML Track)**.  
It helps users express emotions safely, track emotional state changes over time, and gently encourages real human support when emotional distress is detected.

> ⚠️ Soul Sync is **not a medical or therapeutic service**.  
> It provides **supportive, non-clinical guidance only**.



# AI-ML Cosmo

Mental health companion with a Gemini-powered backend and a Vite React frontend. The app presents a stylized landing page and a chat experience that offers supportive, non-clinical responses while detecting crisis phrases and surfacing hotline information.

## Features
- Empathetic responses generated via Gemini with clear non-clinical positioning
- Crisis phrase interception that routes users to helplines instead of the model
- Simple chat UI with loading and error handling
- Animated landing visuals built with Motion, GSAP, and custom light rays
- Express server with CORS and JSON handling

## Tech Stack
- Frontend: React 19, Vite, Motion, GSAP, Tailwind CSS 4
- Backend: Express 5, @google/generative-ai
- Tooling: ESLint 9, React Router 7

## Project Structure
```bash
AI-ML-cosmo/
├── Client/           # React app
│   ├── src/
│   │   ├── components/ (Nav, Hero, Button, etc.)
│   │   ├── Pages/Chat.jsx
│   │   ├── Light.jsx, Cursor.jsx, App.jsx
│   └── package.json
├── Server/           # Express + Gemini
│   ├── index.js
│   └── package.json
└── README.md
```

## Prerequisites
- Node.js 18+ (recommended)
- Google Generative AI API key with access to the gemini-2.5-flash model

## Setup
### 1) Backend (Server)
1. `cd Server`
2. `npm install`
3. Create a `.env` file:
	```
	KEY=your_google_api_key
	PORT=8000            # optional; defaults to 8000
	```
4. Start the server:
	- `npm run start` (uses nodemon; install it if missing: `npm install -g nodemon`), or
	- `node index.js`

### 2) Frontend (Client)
1. `cd Client`
2. `npm install`
3. `npm run dev`
4. Open the Vite dev URL (defaults to http://localhost:5173).

## Configuration Notes
- The chat page posts to `http://localhost:8000/ask`. If you change the backend port or host, update the axios URL in `Client/src/Pages/Chat.jsx`.
- Ensure the backend is running before opening the chat UI.

## API
- `POST /ask`
  - Body: `{ "question": "How can I stay calm before an exam?" }`
  - Success response: `{ "_status": true, "finalData": "...model reply..." }`
  - Crisis phrases (e.g., "suicide", "self harm") return hotline guidance instead of calling the model.

## Development
- Lint frontend: `cd Client && npm run lint`
- Build frontend: `cd Client && npm run build`

## Safety Disclaimer
This app is a supportive companion, not a therapist or medical professional. It does not provide diagnoses or emergency services. For urgent needs, contact local emergency numbers or crisis lines immediately.
