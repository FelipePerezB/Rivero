const basics = {
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
        options: ["start", "center", "end", "around"],
      },
    },
    {
      type: "boolean",
      options: {
        key: "highlight",
        label: "Destacar",
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
      type: "options",
      options: {
        key: "fontSize",
        label: "font size",
        options: ["md", "lg", "sm"],
      },
    },
    {
      type: "options",
      options: {
        key: "align",
        label: "alinear",
        options: ["justify", "center", "left"],
      },
    },
    {
      type: "rich-text",
      options: {
        key: "text",
        label: "texto",
      },
    },
    {
      type: "boolean",
      options: {
        key: "indent",
        label: "Indentar",
      },
    },
  ],
  header: [
    {
      type: "text",
      options: {
        key: "title",
        label: "Título",
      },
    },
    {
      type: "text",
      options: {
        key: "subtitle",
        label: "Subtítulo",
      },
    },
  ],
  svg: [
    {
      type: "options",
      options: {
        key: "size",
        label: "tamaño",
        options: ["sm", "md", "lg"],
      },
    },
    {
      type: "text",
      options: {
        key: "svg",
        label: "svg",
      },
    },
  ],
  table: [
    {
      type: "text",
      options: {
        key: "title",
        label: "título",
      },
    },
    {
      type: "array",
      options: {
        key: "cols",
        label: "columnas",
      },
    },
    {
      type: "array",
      options: {
        key: "rows",
        label: "filas",
      },
    },
  ],
};

const math = {
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
  shape: [
    {
      type: "options",
      options: {
        key: "size",
        label: "Tamaño del lienzo",
        options: ["xs", "sm", "md", "lg"],
      },
    },
    {
      type: "children",
      options: {
        types: ["regular-shape", "irregular-shape", "circle", "shape-text", "circular-segment"],
        key: "children",
        label: "Figuras",
      },
    },
  ],
  "cartesian-plane": [
    {
      type: "options",
      options: {
        key: "size",
        label: "tamaño",
        options: ["xs", "sm", "m", "l"],
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
      type: "children",
      options: {
        types: ["cartesian-plot", "cartesian-polygon", "cartesian-vector", "cartesian-text"],
        key: "children",
        label: "Figuras",
      },
    },
  ],
  set: [
    {
      type: "text",
      options: {
        key: "name",
        label: "Nombre",
      },
    },
    {
      type: "text",
      options: {
        key: "set",
        label: "Conjunto",
      },
    },
    {
      type: "children",
      options: {
        types: ["set"],
        key: "children",
        label: "Subconjuntos",
      },
    },
  ],
  plot: [
    {
      type: "text",
      options: {
        key: "data",
        label: "Datos",
      },
    },
  ],
  venn: [
    {
      type: "sub-inputs",
      options: {
        key: "data",
        label: "Datos",
        sets: [
          {
            key: "sets",
            label: "sets",
          },
          {
            key: "value",
            label: "valor",
          },
        ],
      },
    },
  ],
  linechart: [
    {
      type: "options",
      options: {
        key: "size",
        label: "tamaño",
        options: ["xs", "sm", "m", "l"],
      },
    },
    {
      type: "array",
      options: {
        key: "equations",
        label: "ecuaciones",
        sets: [
          {
            key: "equation",
            label: "ecuacion",
          },
        ],
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
  ],
};

const excercises = {
  excercises: [
    {
      type: "boolean",
      options: {
        types: ["question"],
        key: "isAnEvaluation",
        label: "Evaluación?",
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
    {
      type: "text",
      options: {
        key: "link",
        label: "link",
      },
    },
  ],
};

const globals = { basics, math, excercises };

export default globals;
