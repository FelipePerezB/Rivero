export default function capFirst(text?: string) {
  if (!text || text?.length <= 1) return text?.toUpperCase() || "";
  const [first, ...other] = text?.split("");
  return first[0].toLocaleUpperCase() + other.join("");
}
