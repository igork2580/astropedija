"""Anthropic AI client wrapper for AstroPut."""

import anthropic
from app.config import settings

_client: anthropic.AsyncAnthropic | None = None


def get_client() -> anthropic.AsyncAnthropic:
    global _client
    if _client is None:
        _client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
    return _client


async def generate(
    prompt: str,
    system: str = "Ti si stručni astrolog koji piše na srpskom jeziku. Piši toplo, pristupačno i informativno.",
    max_tokens: int = 1024,
    model: str = "claude-sonnet-4-20250514",
) -> str:
    """Generate text from Claude."""
    client = get_client()
    message = await client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=system,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text
