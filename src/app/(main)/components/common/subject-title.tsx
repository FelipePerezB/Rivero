import SectionTitle from "@components/common/titles/section-title/section-title";
import SectionTitleSkeleton from "@components/common/titles/section-title/section-title-skeleton";
import { Subject } from "@prisma/client";
import { Suspense } from "react";
import api from "src/utils/api";
import capFirst from "src/utils/capFirst";

export async function SubjectTitle({
  subjectId,
  subtitle = "Refuerza y expande tus conocimientos",
}: {
  subjectId: string;
  subtitle?: string;
}) {
  const { data: subject } = (await api(`subjects/${subjectId}`, {}, [
    "subjects",
  ])) as {
    data: Subject;
  };
  return <SectionTitle title={capFirst(subject?.name)} subTitle={subtitle} />;
}
export async function SubjectTitleWithSkeleton({
  subjectId,
  subtitle = "Refuerza y expande tus conocimientos",
}: {
  subjectId: string;
  subtitle?: string;
}) {
  return (
    <Suspense fallback={<SectionTitleSkeleton/>}>
      <SubjectTitle subjectId={subjectId} subtitle={subtitle} />
    </Suspense>
  );
}
