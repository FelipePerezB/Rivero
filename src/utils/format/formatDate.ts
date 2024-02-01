export default function formatDate(date?: Date | null) {
  if (!date) return;
  return (date as unknown as string).split("T")[0];
}
