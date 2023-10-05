import Button from "@components/Button";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import ProgressCard from "@components/cards/progressCard/ProgressCard";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinksAccordion from "src/app/components/accordion/links-accordion";
import FloatingBtn from "src/app/components/floating-btn/floating-btn";
import Options from "src/app/components/options/options";

export default function TopictPage({
  params,
}: {
  params: {
    topic: string;
  };
}) {
  const subtopics = [{ href: "", title: "AAAAAAAAAAAAAAAAAAAA" }];
  return (
    <>
      <h3 className="text-lg font-semibold">Asignatura</h3>
      <div className="flex gap-4">
        <NavigationCard href={`evaluations`}>Evaluaciones</NavigationCard>
        <NavigationCard href={`/evaluations/${1}`}>Prácticar</NavigationCard>
      </div>
      <Options
        option={params?.topic}
        options={[
          { title: "Números", key: 1 },
          { title: "Álgebra", key: 2 },
        ]}
      />
      <ProgressCard color="red" subject="Matemática" topic="Algebra">
        <div className="flex gap-2 items-center">
          <span>Álgebra</span>
        </div>
      </ProgressCard>
      <div className="flex flex-col gap-2.5 mt-2">
        <h3 className="text-lg font-semibold">Temas</h3>
        <LinksAccordion content={subtopics} summary="Funciones" />
        <LinksAccordion content={subtopics} summary="Funciones" />
        <LinksAccordion content={subtopics} summary="Funciones" />
      </div>
    </>
  );
}
