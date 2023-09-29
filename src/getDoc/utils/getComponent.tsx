export const childrenchenas = {
  Question: {
    question: "description",
    alternatives: "text",
    expectedAns: "text",
    children: "child",
  },
  page: [
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
      child: "page",
    },
  },
};

export const componentsNames = Object.entries(uiSchemas).map(([name]) => name);

// const comps: any = {};

// nodes.forEach((node) => {
//   const { name } = node;
//   const schema = schemas[name];
//   comps[name.toLowerCase()] = {
//     schema,
//     node: (options: any) => node(options),
//   };
// });

// export const components = {...comps}

// console.log(components)

// export const components = {
//   div: {
//     schema: {
//       children: "children",
//     },
//     node: (options: any) => <Div {...options} />,
//   },
//   title: {
//     schema: {
//       text: "text",
//       size: {
//         type: "options",
//         options: ["h1", "h2", "h3"],
//       },
//     },
//     node: (options: { text: string; size: string; id: string }) => (
//       <Title {...options} />
//     ),
//   },
//   paragraph: {
//     schema: {
//       text: "text",
//     },
//     node: (options: any) => (
//       <p className={styles.paragrah} {...options}>
//         {options.text}
//       </p>
//     ),
//   },
//   columns: {
//     schema: {
//       gap: { type: "options", options: ["16px", "32px"] },
//       children: "children",
//     },
//     node: (options: any) => <Columns {...options}></Columns>,
//   },
//   SLE: {
//     node: (options: { ec1: string; ec2: string; id: string }) => (
//       <SLE {...options} />
//     ),
//     schema: {
//       ec1: "text",
//       ec2: "text",
//     },
//   },
//   lineChart: {
//     node: (options: any) => <LineChart {...options} />,
//     schema: {
//       size: { type: "options", options: ["medium", "small"] },
//       ecuations: {
//         type: "subInputsArray",
//         n: "number",
//         m: "number",
//       },
//       datasets: {
//         type: "subInputsArray",
//         coords: "text",
//         label: "text",
//       },
//     },
//   },
//   exercises: {
//     node: (options: any) => <Exercises {...options} />,
//     schema: {
//       children: "children",
//       startsIn: "number",
//       isAnEvaluation: "boolean",
//     },
//   },
//   equality: {
//     node: (options: any) => <Equality {...options} />,
//     schema: {
//       exception: {
//         type: "subInputs",
//         sign: "text",
//         index: "number",
//       },
//       withBorder: "boolean",
//       children: "children",
//       sign: "text",
//     },
//   },
//   fraction: {
//     node: (options: any) => <Fraction {...options} />,
//     schema: {
//       numerator: "text",
//       denominator: "text",
//     },
//   },
//   docInfo: {
//     node: (options: any) => <DocInfo {...options} />,
//     schema: {
//       title: "text",
//       subtitle: "text",
//     },
//   },
//   question: {
//     node: (options: any) => <Question {...options} />,
//     schema: {
//       question: "text",
//       alternatives: "text",
//       child: "children",
//     },
//   },
//   page: {
//     node: (options: any) => <Page {...options} />,
//     schema: {
//       children: "children",
//     },
//   },
//   doc: {
//     node: (options: any) => <Document {...options} />,
//     schema: {
//       title: "text",
//       subtitle: "text",
//       children: "children",
//       resize: {
//         type: "range",
//         text: "Zoom",
//         callback: generatePdf,
//       },
//       download: {
//         type: "callback",
//         text: "Descargar PDF",
//         callback: generatePdf,
//       },
//     },
//   },
// } as any;

// export default function getComponent(component: string, options: any) {
//   return components[component.toLowerCase()]?.node(options);
// }
