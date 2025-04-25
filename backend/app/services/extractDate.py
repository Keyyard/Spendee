from openai import AsyncOpenAI
import os
from datetime import datetime
from typing import Optional, Tuple

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def extractDate(question: str) -> Optional[Tuple[datetime, datetime]]:
    if not question:
        return None
    prompt = (
        "Extract the most relevant date range (start and end date) for filtering financial transactions "
        "from the following user question. Respond ONLY with a JSON object: { 'start': 'YYYY-MM-DD', 'end': 'YYYY-MM-DD' }. "
        "If no specific period is mentioned, return the broadest possible range.\n"
        f"User question: {question}"
    )
    try:
        response = await client.responses.create(
            model="gpt-4o",
            input=prompt,
            response_format={"type": "json_object"},
        )
        import json
        content = response.output_text
        date_json = json.loads(content)
        start = datetime.strptime(date_json['start'], "%Y-%m-%d")
        end = datetime.strptime(date_json['end'], "%Y-%m-%d")
        return start, end
    except Exception:
        return None
