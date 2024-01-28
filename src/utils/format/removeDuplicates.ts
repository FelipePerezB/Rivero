export default function removeDuplicates<T>(array: T[]): T[] {
  // Use a Set to store unique values
  const uniqueSet = new Set(array);

  // Convert the Set back to an array
  const arrayWithoutDuplicates: T[] = Array.from(uniqueSet);

  return arrayWithoutDuplicates;
}