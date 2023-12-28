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
  evaluation: [
    {
      type: "children",
      options: {
        types: ["question"],
        key: "children",
        label: "Preguntas",
      },
    },
    {
      type: "text",
      options: {
        key: "function",
        label: "Función",
      },
    },
  ],
  practice: [
    {
      type: "children",
      options: {
        types: ["question"],
        key: "children",
        label: "Hijos",
      },
    },
    {
      type: "text",
      options: {
        key: "maxTime",
        label: "Tiempo máximo",
      },
    },
    {
      type: "text",
      options: {
        key: "discount",
        label: "Descuento",
      },
    },
    {
      type: "text",
      options: {
        key: "increase",
        label: "Aumento",
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
        label: "Preguntas",
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
