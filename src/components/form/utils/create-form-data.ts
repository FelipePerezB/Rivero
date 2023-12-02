export default function createFormData(
  name: string,
  data: any,
  callback: (data: any) => void
) {
  const obj = {} as any;
  obj[name] = data;
  callback(obj);
}
