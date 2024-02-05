import Button from "@components/common/buttons/button/button";
import Section from "@components/containers/section";
import React, { Suspense } from "react";
import api from "src/utils/api";
import RadioInput from "@components/form/radio-input";
import SectionTitle from "@components/common/titles/section-title/section-title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import RecognizeFileForm from "./components/recognize-file-form";
import { Score } from "@prisma/client";

const updateAnswers = async (
  metadata: {
    questionsLength: number;
    fileId: string;
    userId: string;
  },
  // prevState: any,
  formData: FormData
) => {
  "use server";
  const values = [];
  for (let index = 0; index < metadata?.questionsLength; index++) {
    const value = formData.get(`answer-${index + 1}`) ?? "";
    console.log(value);
    values.push(value);
  }
  const { score } = await api("scores/check", {
    body: JSON.stringify({
      evaluationId: metadata.fileId,
      answers: values,
    }),
    method: "POST",
  });
  if (!score) return;
  await api("scores", {
    method: "POST",
    body: JSON.stringify({
      fileId: metadata.fileId,
      score,
      alternatives: values.join(),
      userId: metadata.userId,
    }),
  });
};

const chunkArray = (array: any[]) => {
  const chunkSize = 10;
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export default async function UserScore({
  params: { evaluation, group, organization, subject, user },
}: {
  params: { [key: string]: string };
}) {
  const a = new Promise((resolve) => setTimeout(resolve, 5 * 60));
  const {
    data: { answers: expectedAnswers, id },
  } = (await api(`lessons/evaluations/questions/${evaluation}`, {}, [
    `files/${evaluation}`,
  ])) as { data: { answers: string[]; id: number } };

  const { data: score } = (await api(`scores/user/${user}/${evaluation}`, {
    cache: "no-store",
  })) as { data: Score };

  const answersStr = score?.alternatives ?? "";
  const answers = answersStr.split(",")?.map((ans) => ans?.toUpperCase());

  const questions = expectedAnswers;
  const mark = score?.score ?? "";

  const data = questions.map((expectedAnswer, i) => ({
    value: answers[i],
    expectedAnswer,
  }));

  const array = chunkArray(data);

  const updateUserWithId = updateAnswers.bind(null, {
    questionsLength: questions.length,
    fileId: evaluation,
    userId: user,
  });
  // const [state, formAction] = useFormState(updateUserWithId, {});

  return (
    <>
      <Section>
        <article className="flex justify-between items-center">
          <SectionTitle
            title="Felipe Pérez"
            subTitle="felipeeperez3@gmail.com"
          />
          <div className="flex gap-1 items-end justify-center sm:p-4 p-0 ">
            {mark && (
              <>
                <span className="text-3xl sm:text-5xl text-blue-500 font-semibold">
                  {mark}
                </span>
                <span className="text-sm sm:text-base font-light text-blue-500">
                  ptje.
                </span>
              </>
            )}
          </div>
        </article>
        <Suspense>
          <RecognizeFileForm userId={user} evaluationId={evaluation}>
            <p>Sube una foto o escaneo de la hoja de respuesta:</p>
            <div className="flex gap-md">
              <div className="relative w-28 h-10 inline-block before:bg-blue-500 before:text-white before:flex before:items-start before:justify-center before:[content:'Seleccionar'] before:absolute before:top-0 before:left-0 before:p-sm  before:rounded-sm before:w-full before:h-full">
                <input
                  type="file"
                  name="image"
                  accept="png"
                  className="opacity-0 w-full h-full inline-block"
                />
              </div>
              <Button className="h-10" color="white" type="submit">
                Enviar imagen
                <FontAwesomeIcon icon={faPaperPlane} className="h-3 w-3" />
              </Button>
            </div>
          </RecognizeFileForm>
        </Suspense>
      </Section>
      {/* <p className="text-center">o</p> */}
      <Section>
        <form
          action={updateUserWithId}
          className="flex flex-col justify-center gap-md md:mt-8 mt-4"
        >
          <article className="flex flex-col items-center md:gap-x-md sm:items-start sm:grid sm:grid-rows-4 lg:grid-rows-3 xl:grid-rows-2 gap-y-lg gap-x-sm grid-flow-col-dense justify-around">
            {array?.map((ansSubArray, i) => (
              <div key={"ans-column-" + i} className="flex gap-sm flex-col">
                {ansSubArray?.map(({ value, expectedAnswer }, subIndex) => {
                  const number = i * 10 + 1 + subIndex;
                  return (
                    <div
                      key={`ans-${number}`}
                      className="grid gap-3 grid-cols-[1fr,1rem] justify-center items-center"
                    >
                      <RadioInput
                        defaultCheck={false}
                        labelPosition="left"
                        value={value}
                        label={`${number}`}
                        name={`answer-${number}`}
                        options={["A", "B", "C", "D", "E"]}
                      />
                      <span
                        className={`${
                          value === expectedAnswer
                            ? "text-emerald-500"
                            : "text-violet-500"
                        }`}
                      >
                        {expectedAnswer}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </article>
          <div className="w-full flex justify-end">
            <Button type="submit">
              {answers[0] ? (
                <>
                  Actualizar
                  <FontAwesomeIcon className="w-3" icon={faArrowsRotate} />
                </>
              ) : (
                <>
                  Publicar
                  <FontAwesomeIcon className="w-3" icon={faPaperPlane} />
                </>
              )}
            </Button>
          </div>
        </form>
      </Section>
    </>
  );
}
