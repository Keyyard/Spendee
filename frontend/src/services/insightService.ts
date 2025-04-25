import { apiRequest } from "@/src/utils/apiRequest";
import { aiUrl } from "./config";

export default async function askInsightAI(userId: string, question: string): Promise<string> {
  const res = await apiRequest(aiUrl, "POST", userId, { userId, question });
  if (res && res.summary) return res.summary;
  return "Sorry, I couldn't get an answer.";
}
