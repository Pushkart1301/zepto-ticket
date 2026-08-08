from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class TicketCreate(BaseModel):
    subject: str = Field(..., min_length=1, description="Short summary of the issue")
    description: str = Field(..., min_length=1, description="Full ticket details")
    customer_id: Optional[str] = Field(default=None, description="Customer identifier")


class TicketResponse(BaseModel):
    id: str
    subject: str
    description: str
    customer_id: Optional[str] = None
    status: str = Field(default="open", description="open | in_review | resolved | escalated")
    category: Optional[str] = None
    priority: Optional[str] = None
    decision: Optional[str] = Field(
        default=None,
        description="approve | reject | escalate — populated by decision engine",
    )
    confidence: Optional[float] = Field(
        default=None,
        ge=0.0,
        le=1.0,
        description="Decision confidence score",
    )
    created_at: Optional[datetime] = None


class StatsResponse(BaseModel):
    total_tickets: int = 0
    open_tickets: int = 0
    resolved_tickets: int = 0
    escalated_tickets: int = 0


class CopilotRequest(BaseModel):
    ticket_id: str
    question: Optional[str] = Field(
        default=None,
        description="Optional follow-up question for the copilot",
    )


class CopilotResponse(BaseModel):
    ticket_id: str
    explanation: str
    sources: list[str] = Field(default_factory=list)
