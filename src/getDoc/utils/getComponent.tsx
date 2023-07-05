import React from "react";
import styles from "../styles/reportTemplate.module.css";
import Title from "../nodes/Title";
import Columns from "../nodes/Columns";
import SLE from "../nodes/SLE";
import LineChart from "../nodes/LineChart";
import Div from "../nodes/Div";
import Exercises from "../nodes/Exercises";
import Equality from "../nodes/Equality";
import Fraction from "../nodes/Fraction";
import DocInfo from "../nodes/DocInfo";
import Question from "../nodes/Question";
import Page from "../nodes/Page";
import Document from "../nodes/Document";
import { generatePdf } from "./generatePDF";

export const components = {
  div: {
    schema: {
      childrens: "children",
    },
    node: (options: any) => <Div {...options} />,
  },
  title: {
    schema: {
      text: "text",
      size: {
        type: "options",
        options: ["h1", "h2", "h3"],
      },
    },
    node: (options: { text: string; size: string; id: string }) => (
      <Title {...options} />
    ),
  },
  paragraph: {
    schema: {
      text: "text",
    },
    node: (options: any) => (
      <p className={styles.paragrah} {...options}>
        {options.text}
      </p>
    ),
  },
  columns: {
    schema: {
      gap: { type: "options", options: ["16px", "32px"] },
      childrens: "children",
    },
    node: (options: any) => <Columns {...options}></Columns>,
  },
  SLE: {
    node: (options: { ec1: string; ec2: string; id: string }) => (
      <SLE {...options} />
    ),
    schema: {
      ec1: "text",
      ec2: "text",
    },
  },
  lineChart: {
    node: (options: any) => <LineChart {...options} />,
    schema: {
      size: { type: "options", options: ["medium", "small"] },
      ecuations: {
        type: "subInputsArray",
        n: "number",
        m: "number",
      },
      datasets: {
        type: "subInputsArray",
        coords: "text",
        label: "text",
      },
    },
  },
  exercises: {
    node: (options: any) => <Exercises {...options} />,
    schema: {
      childrens: "children",
      startsIn: "number",
      isAnEvaluation: "boolean",
    },
  },
  equality: {
    node: (options: any) => <Equality {...options} />,
    schema: {
      exception: {
        type: "subInputs",
        sign: "text",
        index: "number",
      },
      withBorder: "boolean",
      childrens: "children",
      sign: "text",
    },
  },
  fraction: {
    node: (options: any) => <Fraction {...options} />,
    schema: {
      numerator: "text",
      denominator: "text",
    },
  },
  docInfo: {
    node: (options: any) => <DocInfo {...options} />,
    schema: {
      title: "text",
      subtitle: "text",
    },
  },
  question: {
    node: (options: any) => <Question {...options} />,
    schema: {
      question: "text",
      alternatives: "text",
      child: "children",
    },
  },
  page: {
    node: (options: any) => <Page {...options} />,
    schema: {
      childrens: "children",
    },
  },
  doc: {
    node: (options: any) => <Document {...options} />,
    schema: {
      childrens: "children",
      resize: {
        type: "range",
        text: "Zoom",
        callback: generatePdf,
      },
      download: {
        type: "callback",
        text: "Descargar PDF",
        callback: generatePdf,
      },
    },
  },
} as any;

export default function getComponent(component: string, options: any) {
  return (
    components[component]?.node(options)
  );
}
