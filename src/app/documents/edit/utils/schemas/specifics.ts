const specifics = {
  document: [
    {
      type: "children",
      options: {
        types: ["section"],
        key: "children",
        label: "Hijos",
      },
    },
  ],
  question: [
    {
      type: "rich-text",
      options: {
        key: "question",
        label: "Pregunta",
      },
    },
    {
      type: "text",
      options: {
        key: "alternatives",
        label: "alternativas",
      },
    },
    {
      type: "text",
      options: {
        key: "expectedAns",
        label: "Alternativa correcta",
      },
    },
    {
      type: "children",
      options: {
        types: ["question"],
        key: "children",
        label: "preguntas",
      },
    },
  ],
  section: [
    {
      type: "children",
      options: {
        preview: false,
        key: "children",
        label: "hijos",
      },
    },
  ],
};

export default specifics;
