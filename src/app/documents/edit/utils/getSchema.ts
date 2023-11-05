// import { schemas } from "./schemas";

import globals from "./schemas/global";
import specifics from "./schemas/specifics";

type schema = {
  type: string;
  options: any;
};

const getSchema = (type: string): schema[] | undefined => {
  const schemas = { ...specifics } as any; // sorry
  Object.values(globals).map((schema) =>
    Object.assign(schemas, { ...schemas, ...schema })
  );
  const schema = schemas[type.toLowerCase()];
  return schema as schema[];
};

export default getSchema;
