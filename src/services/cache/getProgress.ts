import api from "src/utils/api";

export default async function getProgress(subjectId: string | number) {
  const { data: lessonProgressStr } = (await api(
    `users/cache/progress/${subjectId}`,
    { cache: "no-store" }
  )) as {
    data: {
      [topic: number]: {
        [subtopic: number]: string[];
      };
    };
  };
  return lessonProgressStr;
}
