import Title from "./pdf/title";
import Columns from "./pdf/Columns";
import SLE from "./pdf/SLE";
import Div from "./pdf/Div";
import Exercises from "./pdf/Exercises";
import Equality from "./pdf/Equality";
import Fraction from "./pdf/Fraction";
import DocInfo from "./pdf/DocInfo";
import Question from "./pdf/Question";
import Page from "./pdf/Page";
import Doc from "./pdf/Document";

import WebDoc from "./web/Document";
import WebPage from "./web/Page";
import WebDocInfo from "./web/DocInfo";
import WebDiv from "./web/Div";
import WebColumns from "./web/Columns";
import WebQuestion from "./web/Question";
import WebExercises from "./web/Exercises";
import WebTitle from "./web/Title";
import Paragraph from "./pdf/Paragraph";
import LineChart from "./pdf/Mafs";
import WebParagraph from "./web/Paragraph";
import Mafs from "./web/Mafs";

export const pdfNodes = {
  Div: Div,
  Title: Title,
  Columns: Columns,
  SLE: SLE,
  LineChart: LineChart,
  Equality: Equality,
  Fraction: Fraction,
  DocInfo: DocInfo,
  Page: Page,
  Question: Question,
  Exercises: Exercises,
  Doc: Doc,
  Paragraph: Paragraph,
};

export const webNodes = {
  Doc: WebDoc,
  Page: WebPage,
  DocInfo: WebDocInfo,
  Div: WebDiv,
  SLE: SLE,
  LineChart: Mafs,
  Columns: WebColumns,
  Equality: Equality,
  Fraction: Fraction,
  Question: WebQuestion,
  Exercises: WebExercises,
  Paragraph: WebParagraph,
  Title: WebTitle,
};
