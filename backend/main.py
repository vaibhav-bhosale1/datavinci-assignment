from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv

# 1. Load environment variables (Get the Database URL)
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Database Setup
# We use SQLAlchemy to connect to the PostgreSQL database
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 3. Define the Campaign Model (Must match your SQL Table)
class Campaign(Base):
    __tablename__ = "campaigns"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(String)
    clicks = Column(Integer)
    cost = Column(DECIMAL(10, 2))
    impressions = Column(Integer)

# 4. Initialize FastAPI App
app = FastAPI()

# 5. Enable CORS (Cross-Origin Resource Sharing)
# This allows your Frontend (running on port 3000) to talk to this Backend (running on port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (Change this to specific domain in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# [cite_start]6. Create the API Endpoint [cite: 16]
@app.get("/campaigns")
def read_campaigns(db: Session = Depends(get_db)):
    """
    Fetches all campaigns from the database.
    """
    campaigns = db.query(Campaign).all()
    return campaigns

# 7. Root endpoint to check if API is running
@app.get("/")
def read_root():
    return {"message": "Grippi Campaign API is running!"}