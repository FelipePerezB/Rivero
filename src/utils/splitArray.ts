export default function splitArray(array: any[], size: number) {
  var subarrays = [];
  
  for (var i = 0; i < array.length; i += size) {
    var subarray = array.slice(i, i + size);
    subarrays.push(subarray);
  }
  
  return subarrays;
}