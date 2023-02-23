/* 
Purpose: shortening a long text by returning 4 chars from the beginning & 4 from the last connected with three dots
Responsibility: Bassam hager
*/

export const substringText = (text: string) => {
  const trimmed = text.trim();
  if (!text || trimmed === "" || trimmed.length < 9) return;

  const charsArr = text.trim().split("");
  const firstPart = charsArr.slice(0, 4).join("");
  const lastPart = charsArr.slice(-4).join("");
  const dots = trimmed.length < 11 ? (trimmed.length < 10 ? "." : "..") : "...";

  return firstPart + dots + lastPart;
};
