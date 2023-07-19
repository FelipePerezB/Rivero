import Title from "./pdf/Title";
import Columns from "./pdf/Columns";
import SLE from "./pdf/SLE";
import LineChart from "./pdf/LineChart";
import Div from "./pdf/Div";
import Exercises from "./pdf/Exercises";
import Equality from "./pdf/Equality";
import Fraction from "./pdf/Fraction";
import DocInfo from "./pdf/DocInfo";
import Question from "./pdf/Question";
import Page from "./pdf/Page";
import Doc from "./pdf/Document";

import WebDoc from './web/Document'
import WebPage from './web/Page'
import WebDocInfo from './web/DocInfo'
import WebDiv from './web/Div'
import WebColumns from './web/Columns'
import WebQuestion from './web/Question'
import WebExercises from './web/Exercises'
import WebTitle from './web/Title'
import Paragraph from "./pdf/Paragraph";

export const pdfNodes = [
  Div,
  Title,
  Columns,
  SLE,
  LineChart,
  Equality,
  Fraction,
  DocInfo,
  Page,
  Question,
  Exercises,
  Doc,
  Paragraph
];

export const webNodes = [
  WebDoc,
  WebPage,
  WebDocInfo,
  WebDiv,
  SLE,
  WebColumns,
  Equality,
  Fraction,
  LineChart,
  WebQuestion,
  WebExercises,
  Paragraph,
  WebTitle
]