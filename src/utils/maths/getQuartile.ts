export default function getQuartile(array: number[],k: number) {
  const length = array?.length
  if (length === 1) return array[0];
  const P = (k * (length + 1)) / 4;
  const difference = P - Math.floor(P);
  return Number.isInteger(P)
    ? array[P - 1]
    : difference === 0.5
    ? (array[Math.floor(P) - 1] + array[Math.floor(P)]) / 2
    : array[Number(P.toFixed(0)) - 1];
}