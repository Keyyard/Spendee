def build_spending_insight_prompt(question: str, tx_data: list) -> str:
    """
    Build the prompt for the spending insight AI model.
    Args:
        question (str): The user's question.
        tx_data (list): List of transaction dicts.
    Returns:
        str: The constructed prompt.
    """
    prompt = (
        "You are a smart financial assistant. Analyze the user's transactions and provide a concise, insightful summary. "
        "Highlight spending patterns, trends, anomalies, and offer actionable suggestions for better budgeting. "
        "If the user asked about a specific period (e.g., last month), use that context. "
        "If no period is specified, infer the most relevant period from the user's question and the transaction dates. "
        "You may filter the transactions as needed to answer the user's intent. "
        "Extract any relevant date or period from the user's question and filter the transactions accordingly. "
        "If the user's question is ambiguous, use your best judgment to select a relevant period. "
        f"User's question (if any): {question}\n"
        f"Transactions: {tx_data}"
    )
    return prompt
