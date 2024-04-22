from fastapi import APIRouter
from src.schemas.message import MessageResponse

router = APIRouter()


@router.get("/healthcheck", response_model=MessageResponse)
def healthcheck() -> MessageResponse:
    return MessageResponse(message="API UP!")
