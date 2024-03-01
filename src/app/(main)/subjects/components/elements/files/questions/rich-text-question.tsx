import React from "react";
import Question, { QuestionType } from "./question";
import Paragraph from "../paragraph";

export default function RichTextQuestion(params: QuestionType) {
  return (
    <Question
      separator=",[{"
      {...{ ...params }}
      AlternativeElement={({ alternative }) => {
        const text = alternative.replaceAll("[[{", "").replaceAll('}]]', "").replaceAll('}]','').replaceAll('[{', '');
        return (
          <Paragraph
            options={{
              text: `[[{${text}}]]`,
              indent: false,
            }}
          />
        );
      }}
    />
  );
}
