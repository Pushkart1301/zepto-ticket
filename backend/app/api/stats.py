from fastapi import APIRouter

from app.models.schemas import StatsResponse

router = APIRouter()


@router.get("/", response_model=StatsResponse)
async def get_stats() -> StatsResponse:
    """Placeholder: dashboard statistics."""
    return StatsResponse(
        total_tickets=0,
        open_tickets=0,
        resolved_tickets=0,
        escalated_tickets=0,
    )
