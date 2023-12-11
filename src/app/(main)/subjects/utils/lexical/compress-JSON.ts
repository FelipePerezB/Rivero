type RootChildren = {
  children?: RootChildren[];
  format?: 0 | 1 | 2 | string;
  type?: "paragraph" | "text" | "equation" | "root" | string;
  text?: string;
  equation?: string;
};
export default function compressJSON(json: RootChildren) {
  return JSON.stringify(
    json?.children?.map(({ children }) =>
      children?.map(({ format, text, type, equation }) => {
        let t;
        let f;
        if (format) f = format;
        if (type === "equation") t = 1;
        return { f, c: text ?? equation, t };
      })
    )
  );
}