import DocsCards from "@components/containers/docsCards/docs-cards";
import Input from "@components/inputs/StandardInput/StandardInput";
import StandardInput from "src/app/components/inputs/standard";
import ItemsBox from "src/app/components/items-box/items-box";
import Options from "src/app/components/options/options";

export default function EditFilesPage() {
  return (
    <>
      <StandardInput className="sticky z-30 top-16" />
      <Options
        options={[
          {
            key: "all",
            title: "Todos",
          },
          {
            key: "notes",
            title: "Apuntes",
          },
          {
            key: "evaluations",
            title: "Evaluaciones",
          },
          {
            key: "practice",
            title: "Ejercitacion",
          },
        ]}
      />
      {/* <hr></hr> */}
      <ItemsBox size="sm">
        <DocsCards />
      </ItemsBox>
    </>
  );
}
