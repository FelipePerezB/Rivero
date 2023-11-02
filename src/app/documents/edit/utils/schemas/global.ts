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

const excercises = {
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
};

const globals = { basics, math, excercises };

export default globals;
