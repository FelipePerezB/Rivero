export default function getAvg(array: number[]) {
  return Number((array?.reduce((a, b) => a + b, 0) / array?.length)?.toFixed(0));
}
