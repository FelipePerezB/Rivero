export const childrenchenas = {
  Question: {
    question: "description",
    alternatives: "text",
    expectedAns: "text",
    children: "child",
  },
  section: [
    {
      type: "children",
      options: {
        key: "children",
        label: "hijos",
      },
    },
  ],
};

// Fraction: {
//   numerator: "text",
//   denominator: "text",
// },
//     sign: "text",
//     exception: {
//       type: "subInputs",
//       sign: "text",
//       index: "number",
//     },

export const uiSchemas: any = {
  box: [
    {
      type: "options",
      options: {
        key: "direction",
        label: "Dirección",
        options: ["row", "column"],
      },
    },
    {
      type: "options",
      options: {
        key: "align",
        label: "Alinear",
        options: ["start", "center", "end"],
      },
    },
    {
      type: "text",
      options: {
        key: "separator",
        label: "separador",
      },
    },
    {
      type: "children",
      options: {
        key: "children",
        label: "hijos",
      },
    },
  ],
  question: [
    {
      type: "text",
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
  title: [
    {
      type: "options",
      options: {
        key: "size",
        label: "tamaño",
        options: ["h1", "h2", "h3"],
      },
    },
    {
      type: "text",
      options: {
        key: "text",
        label: "texto",
      },
    },
  ],
  paragraph: [
    {
      type: "rich-text",
      options: {
        key: "text",
        label: "texto",
      },
    },
  ],
  sle: [
    {
      type: "text",
      options: {
        key: "ec1",
        label: "Ecuación 1",
      },
    },
    {
      type: "text",
      options: {
        key: "ec2",
        label: "Ecuación 2",
      },
    },
  ],
  excercises: [
    {
      type: "children",
      options: {
        types: ["question"],
        key: "children",
        label: "preguntas",
      },
    },
    {
      type: "text",
      options: {
        key: "link",
        label: "link",
      },
    },
  ],
  linechart: [
    {
      type: "options",
      options: {
        key: "size",
        label: "tamaño",
        options: ["xs", "m", "l"],
      },
    },
    {
      type: "text",
      options: {
        key: "rangeX",
        label: "Rango en X",
      },
    },
    {
      type: "text",
      options: {
        key: "rangeY",
        label: "Rango en Y",
      },
    },
    {
      type: "text",
      options: {
        key: "ecuation",
        label: "ecuación",
      },
    },
  ],
};

export const schemas: any = {
  ...uiSchemas,
  ...childrenchenas,
  Doc: {
    privacity: { type: "options", options: ["public", "private"] },
    id: { type: "text", private: true },
    externalId: { type: "text", private: true },
    type: { type: "text", private: true },
    subtopic: { type: "text", private: true },
    title: "text",
    subtitle: "text",
    subject: { type: "text", private: true },
    children: {
      type: "children",
      child: "section",
    },
  },
  practice: [
    {
      type: "text",
      options: {
        key: "maxTime",
        label: "tiempo máximo",
      },
    },
    {
      type: "text",
      options: {
        key: "discount",
        label: "Descuento por fallar",
      },
    },
    {
      type: "text",
      options: {
        key: "increase",
        label: "Aumento por acertar",
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
};

export const componentsNames = Object.entries(uiSchemas).map(([name]) => name);
