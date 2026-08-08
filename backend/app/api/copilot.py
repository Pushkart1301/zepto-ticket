from fastapi import APIRouter, HTTPException, status

from app.models.schemas import CopilotRequest, CopilotResponse

router = APIRouter()


@router.post("/explain", response_model=CopilotResponse)
async def explain_decision(request: CopilotRequest) -> CopilotResponse:
    """Placeholder: AI copilot explanation for a ticket decision."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Copilot explanations will be wired in a later hour",
    )
