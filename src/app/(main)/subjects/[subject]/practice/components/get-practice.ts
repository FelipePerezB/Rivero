import { auth, currentUser } from "@clerk/nextjs";
import { Privacity, Types } from "@prisma/client";
import { NoteWithFile } from "src/app/(main)/subjects/models/note";
import generateRandomId from "src/app/(main)/subjects/utils/generateRandomId";
import api from "src/utils/api";
import { IdLenght } from "src/models/document.model";

export default async function getPractice({ subject }: { subject: string }) {
  const { getToken } = auth();
  const token = await getToken();
  const { data } = (await api("notes/practice/" + subject, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: NoteWithFile };
  if (data?.File?.name) return data;
  else {
    const newId = generateRandomId(IdLenght.lg);
    return {
      type: Types.PRACTICE,
      File: {
        externalId: newId,
        name: "Nueva prática",
        privacity: Privacity.PRIVATE,
        content: JSON.stringify({
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
            ],
          },
        }),
      },
    };
  }
}
