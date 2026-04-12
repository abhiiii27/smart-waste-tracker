from dataclasses import asdict, dataclass
from datetime import datetime


def now_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"


@dataclass
class Scan:
    id: int
    item: str
    waste_type: str
    recommendation: str
    action: str
    created_at: str

    @staticmethod
    def now_iso() -> str:
        return now_iso()

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class User:
    id: int
    full_name: str
    email: str
    phone: str
    created_at: str

    @staticmethod
    def now_iso() -> str:
        return now_iso()

    def to_dict(self) -> dict:
        return asdict(self)
