export function parseBoldText(text: string) {
  const parsedText = text.replace(/<b>(.*?)<\/b>/g, "**$1**");
  return parsedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}
