#  Campaign Analytics Dashboard

A full-stack marketing analytics dashboard that fetches and displays campaign data from a REST API. Built as part of the Grippi Junior Full-Stack Developer Intern Assignment.

## 🚀 Live Demo & Submission
- **Frontend (Vercel):** [https://datavinci-assignment-mauve.vercel.app/]
- **Backend (Railway):** [https://datavinci-assignment.onrender.com/campaigns]
- **Video Walkthrough (Loom):** [INSERT YOUR LOOM VIDEO LINK HERE]

## 🛠 Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, Axios
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** PostgreSQL (Neon Tech), Psycopg2

## 📂 Project Structure
- `/frontend` - Next.js application (UI)
- `/backend` - FastAPI application (API)
- `/database` - SQL scripts for schema setup

---

## ⚙️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/vaibhav-bhosale1/datavinci-assignment
cd datavinci-assignment
````

### 2\. Database Setup

1.  Ensure you have a PostgreSQL database running (local or cloud like Neon).
2.  Run the initialization script to create the table and mock data:
      - Execute the SQL found in `database/init_db.sql` inside your SQL query tool (pgAdmin, Neon Console, or DBeaver).

### 3\. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

**Configure Environment Variables:**
Create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

**Run the Server:**

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.
*Docs available at: `http://127.0.0.1:8000/docs`*

### 4\. Frontend Setup

Open a new terminal, navigate to the frontend folder:

```bash
cd frontend
npm install
```

**Configure Environment Variables:**
Create a `.env.local` file inside the `frontend/` folder (optional for local, but good practice):

```env
NEXT_PUBLIC_API_URL="[http://127.0.0.1:8000](http://127.0.0.1:8000)"
```

**Run the Client:**

```bash
npm run dev
```

The app will run at `http://localhost:3000`.

-----

## 📡 API Endpoints

### `GET /campaigns`

Fetches a list of all marketing campaigns.

  - **Response:** JSON array of campaign objects.
  - **Fields:** `id`, `name`, `status`, `clicks`, `cost`, `impressions`.

## 🧪 Features Implemented

  - **Data Table:** Displays marketing campaigns with key metrics.
  - **Filtering:** Filter campaigns by Status (Active/Paused).
  - **Responsive UI:** Styled with Tailwind CSS for mobile and desktop.
  - **CORS Configuration:** Backend configured to allow frontend requests.

