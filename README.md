


# 🎬 IMDb AI Insight

A full-stack web application that fetches movie details using the OMDb API and generates AI-powered audience sentiment insights.


## 🚀 Features

- Fetch movie details using IMDb ID
- Display poster, cast, rating, and plot
- AI-generated audience sentiment summary
- Fallback sentiment system if AI quota is exceeded
- Modern animated UI (Framer Motion + TailwindCSS)

- Backend Setup

Navigate to backend folder:

cd server
npm install

Frontend Setup

Open new terminal:

cd client

Tech Stack Rationale
🔹 Frontend

React.js → Component-based architecture, fast development

Axios → Simple HTTP client

Framer Motion → Smooth UI animations

Tailwind CSS → Utility-first modern styling

Backend

Node.js → JavaScript runtime for server

Express.js → Lightweight REST API framework

Axios → External API communication

dotenv → Secure environment variable management.

APIs Used:-

OMDb API

Fetches movie data using IMDb ID

Free tier available (1000 requests/day)

OpenAI API:-

Generates AI-powered sentiment analysis

Fallback logic implemented if quota exceeded

Assumptions:-

User enters a valid IMDb ID (format: tt1234567)

OMDb free API key is activated

OpenAI API may require billing setup

If OpenAI fails (429 error), fallback sentiment logic is used

Application runs locally on default ports (3000 & 5000)

Error Handling:-

Invalid IMDb ID → 400 error

OMDb failure → Proper error message returned

OpenAI 429 → Fallback sentiment logic

Network issues → User-friendly frontend message

Example IMDb IDs for Testing:-
tt0111161  (The Shawshank Redemption)
tt0068646  (The Godfather)
tt0133093  (The Matrix)
tt3896198  (Guardians of the Galaxy Vol. 2)

Future Improvements:-

Search by movie name

Add user reviews from real API

Deploy to Vercel / Render

Add authentication

Improve AI prompt quality

Security Notes:-

Never commit .env file

Regenerate API keys if exposed

Add usage limits in OpenAI billing settings
npm install
npm start
