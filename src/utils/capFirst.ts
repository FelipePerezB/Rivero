export const capFirst = (text: string) => {
  if(text.length <= 1) return text?.toUpperCase() || ""
  const [first, ...other] = text.split("");
  return first[0].toLocaleUpperCase() + other.join("");
};