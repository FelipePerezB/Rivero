export default function decompressRichTextContent(text: string) {
  let JSONContent;
  try {
    JSONContent = JSON.parse(text) as {
      c?: string;
      f?: 0 | 1 | number;
      t?: 0 | 1 | string;
    }[][];
  } catch (error) {
    return '{"root":{"children":[{"children":[{"text":"Escribe tu parrafo...","direction":null,"format":0,"indent":0,"type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
  }
  if (!JSONContent) return;
  const initialState = {
    root: {
      children:
        JSONContent &&
        JSONContent?.map((children) => ({
          children: children.map(({ c, f, t }) => {
            const equation = t ? c : undefined;
            const text = !t ? c : undefined;
            return {
              text,
              equation,
              direction: null,
              format: f ? 1 : 0,
              indent: 0,
              type: t ? "equation" : "text",
              version: 1,
            };
          }),
          direction: null,
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        })),
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
  return JSON.stringify(initialState);
}
