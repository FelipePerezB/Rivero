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
      type: "boolean",
      options: {
        key: "isPilot",
        label: "Piloto",
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
  "irregular-shape": [
    {
      type: "array",
      options: {
        key: "coords",
        label: "Coordenadas",
      },
    },
    {
      type: "boolean",
      options: {
        key: "sizes",
        label: "Tamaño de lineas",
      },
    },
    {
      type: "text",
      options: {
        key: "strokeDash",
        label: "Espaciado del trazo",
      },
    },
  ],
  "regular-shape": [
    {
      type: "text",
      options: {
        key: "sides",
        label: "Lados",
      },
    },
    {
      type: "text",
      options: {
        key: "x",
        label: "Coordenada X",
      },
    },
    {
      type: "text",
      options: {
        key: "y",
        label: "Coordenada Y",
      },
    },
    {
      type: "text",
      options: {
        key: "radius",
        label: "Radio",
      },
    },
    {
      type: "text",
      options: {
        key: "strokeDash",
        label: "Espaciado del trazo",
      },
    },
  ],
  circle: [
    {
      type: "text",
      options: {
        key: "x",
        label: "Coordenada X",
      },
    },
    {
      type: "text",
      options: {
        key: "y",
        label: "Coordenada Y",
      },
    },
    {
      type: "text",
      options: {
        key: "radius",
        label: "Radio",
      },
    },
    {
      type: "text",
      options: {
        key: "strokeDash",
        label: "Espaciado del trazo",
      },
    },
  ],
  'shape-text': [
    {
      type: "text",
      options: {
        key: "coords",
        label: "Coordenadas",
      },
    },
    {
      type: "text",
      options: {
        key: "text",
        label: "Texto",
      },
    },
    {
      type: "text",
      options: {
        key: "degrees",
        label: "Rotación",
      },
    },
  ],
  'circular-segment': [
    {
      type: "text",
      options: {
        key: "coords",
        label: "Coordenadas",
      },
    },
    {
      type: "text",
      options: {
        key: "radius",
        label: "Radio",
      },
    },
    {
      type: "text",
      options: {
        key: "angles",
        label: "Angulos",
      },
    },
  ],
  "cartesian-plot": [
    {
      type: "text",
      options: {
        key: "equation",
        label: "Ecuación",
      },
    },
  ],
  "cartesian-vector": [
    {
      type: "text",
      options: {
        key: "tail",
        label: "Inicio",
      },
    },
    {
      type: "text",
      options: {
        key: "tip",
        label: "Final",
      },
    },
  ],
  "cartesian-text": [
    {
      type: "text",
      options: {
        key: "text",
        label: "Texto",
      },
    },
    {
      type: "text",
      options: {
        key: "coords",
        label: "Coordenadas",
      },
    },
  ],
  "cartesian-polygon": [
    {
      type: "array",
      options: {
        key: "coords",
        label: "Coordenadas",
      },
    },
    {
      type: "boolean",
      options: {
        key: "isPrime",
        label: "Figura prima",
      },
    },
  ],
};

export default specifics;
