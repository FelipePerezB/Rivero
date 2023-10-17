import Button from "@components/Button";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import {
  faChartSimple,
  faCheck,
  faFilePdf,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChartCard from "src/app/components/charts/line/line-card";
import SearchModal from "src/app/components/modal/search-modal";
import Form from "./components/form";
import { auth } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import api from "src/app/utils/api";
import { File, Note, Types } from "@prisma/client";
import Card from "@components/Card";
import ItemsBox from "src/app/components/items-box/items-box";
import { NoteWithFile } from "../../models/note";



export default async function EvaluationsPage({
  params: { subject },
  searchParams,
}: {
  params: { subject: string };
  searchParams: { [key: string]: string };
}) {
  const datasets = [
    {
      label: "4° Medio A",
      values: [700, 750, 780, 800],
    },
    {
      label: "3° Medio A",
      values: [700, 700, 730, 740],
    },
    {
      label: "2° Medio A",
      values: [600, 670, 710, 740],
    },
  ];

  const { getToken } = auth();
  const token = await getToken();
  const { data } = (await api(
    `notes?subject=${subject}&type=${Types.EVALUATION}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )) as { data: NoteWithFile[] };

  return (
    <>
      <LineChartCard
        settings={{ data: datasets, showLegend: true }}
        title="Evolución de puntajes"
      />
      <div className="flex mt- justify-between items-center">
        <h2>Evaluaciones</h2>
        <Button href="?modal=create">
          Nuevo <FontAwesomeIcon className="w-3 h-3" icon={faPlus} />
        </Button>
      </div>
      <ItemsBox>
        {data.map(({ File: { title, externalId } }) => (
          <NavigationCard key={title} href={`evaluations/${externalId}`}>
            {title}
          </NavigationCard>
        ))}
      </ItemsBox>
      <SearchModal
        searchParams={searchParams}
        title="Crear evaluación"
        id="create"
      >
        <Form subject={subject} token={token} />
      </SearchModal>
      <Toaster />
    </>
  );
}
