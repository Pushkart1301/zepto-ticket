from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import copilot, health, stats, tickets

app = FastAPI(
    title="Zepto Support Ticket Manager",
    version="0.1.0",
    description="FastAPI backend for Q4: Zepto Support Ticket Manager",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(tickets.router, prefix="/api/tickets", tags=["tickets"])
app.include_router(stats.router, prefix="/api/stats", tags=["stats"])
app.include_router(copilot.router, prefix="/api/copilot", tags=["copilot"])
