Full-Stack Personal Profile & Guestbook
A high-performance personal profile featuring a Glassmorphism UI and a persistent Guestbook. This project leverages a monorepo architecture, bridging a React frontend with a NestJS backend, all powered by Supabase and deployed via Vercel Serverless Functions.

🏗️ Architecture
The system is built using a BFF (Backend-for-Frontend) pattern to ensure secure communication with the database.Frontend: React + Vite (Custom CSS & Glassmorphism)Backend: NestJS (Express Adapter for Serverless)Database: Supabase (PostgreSQL)Deployment: Vercel (Monorepo Configuration)🛠️ Installation & Setup
1. Repository Structure
Ensure your project is organized as follows:Plaintextproject/
├── backend/     # NestJS API
├── frontend/    # React (Vite) UI
└── vercel.json  # Deployment & Routing Rules

2. Backend SetupNavigate to the backend folder to install the NestJS framework and Supabase client.Bashcd backend
npm install
npm install @supabase/supabase-js @nestjs/platform-express express

3. Frontend SetupNavigate to the frontend folder to install React dependencies and Axios for API handling.Bashcd ../frontend
npm install
npm install axios

🚀 Deployment Process
1. Vercel Configuration (vercel.json)
The project uses a root-level configuration to route traffic.
JSON{
  "version": 2,
  "builds": [
    { "src": "backend/src/main.ts", "use": "@vercel/node" },
    { "src": "frontend/package.json", "use": "@vercel/static-build" }
  ],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "backend/src/main.ts" },
    { "source": "/((?!api/|.*\\.).*)", "destination": "frontend/index.html" }
  ]
}
2. Vercel Dashboard Settings
To avoid 404: NOT_FOUND errors, apply these settings in the Vercel Dashboard:
Framework Preset: Other
Root Directory: project
Build Command: cd frontend && npm install && npm run build
Output Directory: frontend/dist
Install Command: npm install

📝 Implementation Logic
Phase 1: Persistence
We established a PostgreSQL table in Supabase named guestbook. This allows user messages to be stored permanently and retrieved via the API.
Phase 2: The API (NestJS)We adapted the standard NestJS bootstrap to work in a serverless environment. By exporting an express instance, the backend "wakes up" only when /api is called, saving resources and ensuring scalability.
Phase 3: The UI (React)The frontend was designed with Glassmorphism.Background: A fixed animated GIF with a dark overlay.Components: Glass cards utilizing backdrop-filter: blur(8px) for a modern aesthetic.CRUD: Integrated Axios to fetch, post, and delete messages in real-time.
📡 API Endpoints
Method  Route                           Description
GET     /api/guestbook             Returns all messages.
POST    /api/guestbook             Saves a new message.
PUT     /api/guestbook/:id         Edits an existing message.
DELETE  /api/guestbook/:id         Removes a message.


🔧 Troubleshooting CommandsIf you encounter build errors or MIME type mismatches, use these commands to reset:Bash# Clear build artifacts
rm -rf frontend/dist
rm -rf backend/dist

# Force reinstall
npm cache clean --force
npm install
© 2026 NBAcraft. Built with React, NestJS, and Supabase.