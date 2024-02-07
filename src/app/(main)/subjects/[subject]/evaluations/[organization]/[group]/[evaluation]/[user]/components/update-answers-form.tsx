import { currentUser } from "@clerk/nextjs";
import Button from "@components/common/buttons/button/button";
import RadioInput from "@components/form/radio-input";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import {
  faArrowsRotate,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role, Score } from "@prisma/client";
import React, { ReactNode, Suspense } from "react";
import api from "src/utils/api";
import { chunkArray } from "src/utils/format/formatArray";

const updateAnswers = async (
  metadata: {
    questionsLength: number;
    fileId: string;
    userId: string;
  },
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

async function UpdateAnswersForm({
  evaluation,
  group,
  user: userId,
}: {
  group: string;
  evaluation: string;
  user: string;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const {
    data: { answers: expectedAnswers, id },
  } = (await api(`lessons/evaluations/questions/${evaluation}`, {}, [
    `files/${evaluation}`,
  ])) as {
    data: { answers: { expectedAns: string; isPilot: boolean }[]; id: number };
  };

  const { data: score } = (await api(
    `scores/user/${userId}/${evaluation}`,
    {},
    [`scores/groups/${group}`]
  )) as { data: Score };

  const answersStr = score?.alternatives ?? "";
  const answers = answersStr.split(",")?.map((ans) => ans?.toUpperCase());

  const questions = expectedAnswers;

  const data = questions.map(({ expectedAns, isPilot }, i) => ({
    value: answers[i],
    expectedAnswer: expectedAns,
    isPilot,
  }));

  const array = chunkArray(data);

  const updateUserWithId = updateAnswers.bind(null, {
    questionsLength: questions.length,
    fileId: evaluation,
    userId,
  });

  const Wrapper = ({ children }: { children: ReactNode }) => {
    const className = "flex flex-col justify-center gap-md mt-4 md:mt-8";
    return role && role !== Role.STUDENT ? (
      <form className={className} action={updateUserWithId}>
        {children}
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
    ) : (
      <div className={className}>{children}</div>
    );
  };

  return (
    <Wrapper>
      <article className="flex flex-col items-center md:gap-x-md sm:items-start sm:grid sm:grid-rows-4 lg:grid-rows-3 xl:grid-rows-2 gap-y-lg gap-x-sm grid-flow-col-dense justify-around">
        {array?.map((ansSubArray, i) => (
          <div key={"ans-column-" + i} className="flex gap-sm flex-col">
            {ansSubArray?.map(
              ({ value, expectedAnswer, isPilot }, subIndex) => {
                const number = i * 10 + 1 + subIndex;
                return (
                  <div
                    key={`ans-${number}`}
                    className="grid gap-3 grid-cols-[1fr,1rem] justify-center items-center"
                  >
                    <RadioInput
                      disabled={!role || role !== Role.STUDENT}
                      checkedColor="peer-checked:bg-blue-500/70"
                      defaultCheck={false}
                      labelPosition="left"
                      value={value}
                      label={`${number}`}
                      name={`answer-${number}`}
                      options={["A", "B", "C", "D", "E"]}
                    />
                    {!isPilot ? (
                      <span
                        className={`${
                          value === expectedAnswer
                            ? "text-emerald-500"
                            : "text-violet-500"
                        }`}
                      >
                        {expectedAnswer}
                      </span>
                    ) : (
                      <span>P</span>
                    )}
                  </div>
                );
              }
            )}
          </div>
        ))}
      </article>
    </Wrapper>
  );
}

export default async function UpdateAnswersFormWithSuspense({
  evaluation,
  group,
  user,
}: {
  evaluation: string;
  group: string;
  user: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center md:gap-x-md sm:items-start sm:grid sm:grid-rows-4 lg:grid-rows-3 xl:grid-rows-2 gap-y-lg gap-x-sm grid-flow-col-dense justify-around mt-4 md:mt-8 ">
          <LargeSkeletonGroup />
          <LargeSkeletonGroup />
          <LargeSkeletonGroup />
          <LargeSkeletonGroup />
          <LargeSkeletonGroup />
          <LargeSkeletonGroup />
          <LargeSkeletonGroup />
        </div>
      }
    >
      <UpdateAnswersForm {...{ evaluation, user, group }} />
    </Suspense>
  );
}

const LargeSkeletonGroup = () => {
  return (
    <div className="flex gap-sm flex-col">
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
      <LargeSkeleton />
    </div>
  );
};
