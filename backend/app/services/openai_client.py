import openai
import os
from fastapi import HTTPException

class OpenAIClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise RuntimeError("OPENAI_API_KEY is not set.")
        self.client = openai.AsyncOpenAI(api_key=self.api_key)

    async def get_spending_insight(self, prompt: str, model: str = "gpt-4o") -> str:
        try:
            response = await self.client.responses.create(
                model=model,
                input=prompt,
            )
            return response.output_text.strip()
        except openai.OpenAIError as e:
            raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
