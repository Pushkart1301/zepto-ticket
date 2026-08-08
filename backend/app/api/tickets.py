from fastapi import APIRouter, HTTPException, status

from app.models.schemas import TicketCreate, TicketResponse

router = APIRouter()


@router.get("/", response_model=list[TicketResponse])
async def list_tickets() -> list[TicketResponse]:
    """Placeholder: list support tickets."""
    return []


@router.get("/{ticket_id}", response_model=TicketResponse)
async def get_ticket(ticket_id: str) -> TicketResponse:
    """Placeholder: fetch a single ticket by ID."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Ticket lookup will be wired in Hour 2",
    )


@router.post("/", response_model=TicketResponse, status_code=201)
async def create_ticket(ticket: TicketCreate) -> TicketResponse:
    """Placeholder: create a new support ticket."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Ticket creation will be wired in Hour 2",
    )
