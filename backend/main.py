from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv

# 1. Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Database Setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Campaign(Base):
    __tablename__ = "campaigns"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(String)
    clicks = Column(Integer)
    cost = Column(DECIMAL(10, 2))
    impressions = Column(Integer)

# 3. Initialize FastAPI App
app = FastAPI()

# --- THE FIX IS HERE ---
# We explicitly list the origins we want to allow.
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # Use the explicit list
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/campaigns")
def read_campaigns(db: Session = Depends(get_db)):
    return db.query(Campaign).all()

@app.get("/")
def read_root():
    return {"message": "Grippi Campaign API is running!"}