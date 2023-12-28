import { IdLenght } from "src/models/document.model";
import generateRandomId from "src/utils/generateRandomId";
import fileTemplate from "./file";

export default function evaluationTemplate(id: string) {
  const content = {
    type: "evaluation",
    id: generateRandomId(IdLenght.sm),
    options: {
      children: [
        {
          type: "question",
          id: generateRandomId(IdLenght.sm),
          options: {
            question: "¿Cual es la respuesta dw la pregunta 1?",
            alternatives: "Alternativa 1, Alternativa 2, Alternativa 3",
            expectedAns: "B",
            number: 1,
          },
        },
        {
          type: "question",
          id: generateRandomId(IdLenght.sm),
          options: {
            question: "¿Cual es la respuesta dw la pregunta 2?",
            alternatives: "Alternativa 1, Alternativa 2, Alternativa 3",
            expectedAns: "A",
            number: 2,
          },
        },
      ],
    },
  };
  return fileTemplate({ id, content, name: "Evaluación" });
}
