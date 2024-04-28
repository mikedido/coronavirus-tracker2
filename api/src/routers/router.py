from fastapi import APIRouter
from src.routers import healthcheck, covid19

router = APIRouter()


router.include_router(healthcheck.router, tags=["healthcheck"])
router.include_router(
    covid19.router, tags=["COVID19: Johns Hopkins University - CSSE"], prefix="/v1/jhu"
)
