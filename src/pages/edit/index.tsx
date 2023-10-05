/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "src/layout/Layout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Recomendations from "@components/Recomendations";
import useGetLocalDocs from "src/hooks/useGetLocalDocs";
import generateRandomId from "src/utils/generateRandomId";
import DocsCards from "@components/containers/docsCards/docs-cards";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GetFilesDocument,
  GetFilesQuery,
  Privacity,
  Role,
} from "src/gql/graphql";
import { useUser } from "@clerk/nextjs";
import { DocumentJSON } from "src/models/document.model";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { client } from "src/service/client";

export default function EditPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const savedDocs = useGetLocalDocs();
  const createDoc = () => {
    router.push(`/docs/edit/${generateRandomId(32)}`);
  };

  const [docs, setDocs] = useState<DocumentJSON[]>([]);
  useEffect(() => {
    !docs.length &&
      savedDocs.length &&
      setDocs([
        ...data.files.map((data) => ({
          file: {
            ...data,
            privacity: Privacity.Private,
            content: JSON.parse(data.content),
          },
        })),
        ...savedDocs,
      ]);
  }, [savedDocs]);

  const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;
  const [search, setSearch] = useState("");

  return (
    <Layout title="Crear documentos">
      {role === Role.Admin && (
        <button
          onClick={createDoc}
          className="fixed bottom-8 text-white right-8 flex items-center justify-center bg-slate-900 p-4 w-12 h-12 rounded-full hover:scale-95 transition-all duration-200 hover:bg-black hover:text-gray-300"
        >
          <FontAwesomeIcon size="xl" icon={faPlus} />
        </button>
      )}
      <div className="sticky top-16 z-20">
        <StandardInput
          placeholder="Buscar archivo..."
          dataKey="search"
          onChange={({ search }) => setSearch(search)}
        />
      </div>
      <Recomendations>
        <DocsCards {...{ search, docs }} />
      </Recomendations>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const redirect = {
    redirect: { destination: "/docs", permanent: false },
  };

  const { userId } = getAuth(context.req);
  if (!userId) return redirect;

  const { data } = await client.query({
    query: GetFilesDocument,
    variables: {
      where: {
        Author: {
          is: {
            externalId: {
              equals: userId,
            },
          },
        },
      },
    },
    fetchPolicy: "network-only",
  });

  if (!data.files) return redirect;
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: GetFilesQuery;
}>;
