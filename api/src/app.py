from fastapi import FastAPI
from src.routers.router import router
from starlette.middleware.cors import CORSMiddleware


def get_application() -> FastAPI:
    app = FastAPI(
        title="Title of the API",
        description="",
        version="1.0.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(router)
    return app
