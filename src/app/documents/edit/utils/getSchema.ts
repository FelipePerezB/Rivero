import { schemas } from "./schemas";

type schema = {
  type: string;
  options: any;
};

const getSchema = (type: string): schema[] | undefined => {
  const [name, schema] =
    Object.entries(schemas).find(
      ([name, data]) => name.toLowerCase() === type.toLowerCase()
    ) || [];
  return schema as schema[];
};

export default getSchema