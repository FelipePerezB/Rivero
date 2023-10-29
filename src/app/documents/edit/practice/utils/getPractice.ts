/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { auth, currentUser, useUser } from "@clerk/nextjs";
import Button from "@components/Button";
import { File, Types } from "@prisma/client";
import React, { useEffect, useState } from "react";
// import { NoteWithComponent } from "src/app/subjects/edit/models/component";
import api from "src/app/utils/api";
// import toast from "react-hot-toast";
import { GetFileDocument, Privacity } from "src/gql/graphql";
import { DocumentJSON, IdLenght } from "src/models/document.model";
import generateRandomId from "src/utils/generateRandomId";
import { NoteWithComponent } from "../../models/component";

export const getDefaultPractice = (id: string) => {
  return {
    type: Types.PRACTICE,
    file: {
      externalId: id,
      title: "Práctica",
      privacity: Privacity.Private,
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
  } as NoteWithComponent;
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
