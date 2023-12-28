/* eslint-disable react-hooks/exhaustive-deps */
import { auth} from "@clerk/nextjs";
import { File, Privacity, Types } from "@prisma/client";
import api from "src/utils/api";
import { IdLenght } from "src/models/document.model";
import { LessonWithComponent } from "../../edit/models/component";
import generateRandomId from "src/utils/generateRandomId";

export const getDefaultPractice = (id: string) => {
  return {
    type: Types.PRACTICE,
    file: {
      externalId: id,
      title: "Práctica",
      privacity: Privacity.PRIVATE,
      content: {
        type: "practice",
        id: generateRandomId(IdLenght.sm),
        options: {
          maxTime: String(60 * 3),
          children: [
            {
              type: "question",
              id: generateRandomId(IdLenght.sm),
              options: {
                question: "¿Cual es la respuesta dw la pregunta 1?",
                alternatives: "Alternativa 1, Alternativa 2, Alternativa 3",
                expectedAns: "Alternativa 2",
                number: 1,
              },
            },
            {
              type: "question",
              id: generateRandomId(IdLenght.sm),
              options: {
                question: "¿Cual es la respuesta dw la pregunta 2?",
                alternatives: "Alternativa 1, Alternativa 2, Alternativa 3",
                expectedAns: "Alternativa 2",
                number: 2,
              },
            },
            {
              type: "question",
              id: generateRandomId(IdLenght.sm),
              options: {
                question: "¿Cual es la respuesta dw la pregunta 3?",
                alternatives: "Alternativa 1, Alternativa 2, Alternativa 3",
                expectedAns: "Alternativa 2",
                number: 3,
              },
            },
          ],
        },
      },
    },
  } as LessonWithComponent;
};

export default async function getPractice(id: string) {
  let defaultFile = getDefaultPractice(id);
  try {
    const { getToken } = auth();
    const token = await getToken();
    const { data } = (await api("files/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })) as { data: File };
    if (data.externalId) {
      defaultFile.file = {
        ...data,
        content: JSON.parse(data.content),
      };
    }
  } catch (error) {
    console.log(error);
  }
  return defaultFile;
}
