import { useAuth, useUser } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import ShareBtn from "./share-btn";
import Link from "next/link";
import { NoteWithComponent } from "src/app/documents/edit/models/component";
import toast from "react-hot-toast";
import api from "src/app/utils/api";
import { removeIdFromObject } from "src/app/documents/edit/utils/removeId";

export default function Navar({
  name,
  settings,
  setSettings,
}: {
  name: string;
  settings: NoteWithComponent;
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent>>;
}) {
  // const { user } = useUser();
  const user = undefined;
  // const { getToken } = useAuth();
  const sync = async () => {
    const {
      file: { privacity, content, name, externalId },
    } = settings;
    // const token = await getToken();
    toast.promise(
       api("files/" + externalId, {
        // headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify({
          name,
          content: JSON.stringify(removeIdFromObject(content)),
          privacity,
        }),
      }),
      {
        error: "Error al sincronizar",
        loading: "Sincronizando",
        success: "¡Sincronizado correctamente!",
      }
    );
  };
  return (
    <nav className="fixed z-40 top-0 left-0 w-full h-max border-b shadow-sm bg-white print:hidden">
      <ul className="flex items-center justify-between h-full px-6 py-1.5">
        <li className="flex flex-col">
          <div
            contentEditable
            dangerouslySetInnerHTML={{ __html: `${name}` }}
            onBlur={({ target }) =>
              setSettings({
                ...settings,
                file: { ...settings.file, name: target.innerText },
              })
            }
            className="text-lg font-bold"
          ></div>
          <div className="flex gap-2">
            <span
              onClick={sync}
              className="text-xs cursor-pointer active:text-blue-500"
            >
              Sincronizar
            </span>
          </div>
        </li>
        <li className="flex items-center gap-2.5 md:gap-5">
          <ShareBtn setSettings={setSettings} settings={settings} />
          <div className="cursor-pointer flex items-center gap-1">
            <Link href={"?sidebar=nav"}>
              {/* {user?.imageUrl ? (
                <div className="rounded-full overflow-hidden">
                  <Image
                    width={25}
                    height={25}
                    alt="abrir menu"
                    src={user.imageUrl}
                  />
                </div> */}
              {/* ) : (
                <FontAwesomeIcon icon={faBars} />
              )} */}
            </Link>
            <span className="hidden md:inline-block">Menu</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

// const Navar = ({
//   settings,
//   setSettings,
//   setVisibility,
//   setModalState,
// }: {
//   setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
//   settings: DocumentJSON;
//   setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
//   setModalState: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const {
//     file: { externalId, name, content, privacity },
//     subject,
//     subtopic,
//     topic,
//   } = settings ?? { file: {} };
//   const { getToken } = useAuth();
//   const {user} = useUser()
//   // const router = useRouter();

//   const onRemove = async () => {
//     // toast.promise(
//     //   client
//     //     .mutate({
//     //       mutation: RemoveFileDocument,
//     //       variables: {
//     //         where: {
//     //           externalId,
//     //         },
//     //       },
//     //     })
//     //     .then(() => {
//     //       localStorage.removeItem("doc-" + externalId);
//     //       router.push("/edit");
//     //     }),
//     //   {
//     //     error: "No se ha logrado eliminar",
//     //     loading: "Eliminando...",
//     //     success: "¡Eliminado!",
//     //   }
//     // );
//   };

//   const remove = async () => {
//     // toast((t) => (
//     //   <div className="flex flex-col gap-2">
//     //     <span>¿Seguro que quiere eliminar el documento?</span>
//     //     <Button
//     //       onClick={() => {
//     //         // onRemove();
//     //         // toast.dismiss(t.id);
//     //       }}
//     //       color={"red"}
//     //     >
//     //       Eliminar
//     //     </Button>
//     //   </div>
//     // ));
//   };

//   const onSave = () => {
//     externalId &&
//       content?.type &&
//       localStorage.setItem(
//         "doc-" + externalId,
//         JSON.stringify({
//           subject,
//           subtopic,
//           topic,
//           file: {
//             content: removeIdFromObject(content),
//             externalId,
//             name,
//             privacity,
//           },
//         })
//       );
//     // toast.success("¡Guardado localmente!");
//   };

//   const upsert = async () => {
//     const token = await getToken();
//     toast.promise(
//       api("files/" + externalId, {
//         headers: { Authorization: `Bearer ${token}` },
//         method: "POST",
//         body: JSON.stringify({
//           name,
//           content: JSON.stringify(removeIdFromJson(JSON.stringify(content))),
//           privacity,
//           // id,
//         }),
//       }),
//       // client.mutate({
//       //   mutation: UpsertFileDocument,
//       //   variables: {
//       //     where: { externalId },
//       //     create: {
//       //       Author: {
//       //         connect: {
//       //           externalId: user?.id,
//       //         },
//       //       },
//       //       content: JSON.stringify(removeIdFromObject(content)),
//       //       privacity,
//       //       name,
//       //       externalId,
//       //     },
//       //     update: {
//       //       content: {
//       //         set: JSON.stringify(removeIdFromObject(content)),
//       //       },
//       //       privacity: {
//       //         set: privacity,
//       //       },
//       //       name: {
//       //         set: name,
//       //       },
//       //     },
//       //   },
//       // }),
//       {
//         error: "Error al sincronizar",
//         loading: "Sincronizando",
//         success: "¡Sincronizado correctamente!",
//       }
//     );
//   };

//   return (
//     <nav className="fixed z-40 top-0 left-0 w-full h-max border-b shadow-sm bg-white print:hidden">
//       <ul className="flex items-center justify-between h-full px-6 py-1.5">
//         <li className="flex flex-col">
//           <div
//             contentEditable
//             dangerouslySetInnerHTML={{ __html: `${name}` }}
//             onBlur={({ target }) =>
//               setSettings({
//                 ...settings,
//                 file: { ...settings.file, name: target.innerText },
//               })
//             }
//             className="text-lg font-bold"
//           ></div>
//           <div className="flex gap-2">
//             <span
//               onClick={onSave}
//               className="text-xs cursor-pointer active:text-blue-500"
//             >
//               Guardar
//             </span>
//             <span
//               onClick={upsert}
//               className="text-xs cursor-pointer active:text-blue-500"
//             >
//               Sincronizar
//             </span>
//           </div>
//         </li>
//         <li className="flex items-center gap-2.5 md:gap-5">
//           {/* <div
//             onClick={remove}
//             className=" cursor-pointer flex items-center gap-1"
//           >
//             <CircleButton>
//               <FontAwesomeIcon
//                 className="flex items-center"
//                 // size="1x"
//                 icon={faTrash}
//               />
//             </CircleButton>
//             <span className="hidden md:inline-block">Eliminar</span>
//           </div> */}
//           <div
//             onClick={() => setModalState(true)}
//             className=" cursor-pointer flex items-center gap-1"
//           >
//             <CircleButton>
//               <FontAwesomeIcon
//                 className="flex items-center"
//                 // size="lg"
//                 icon={faShare}
//               />
//             </CircleButton>
//             <span className="hidden md:inline-block">Share</span>
//           </div>
//           <div
//             onClick={() => setVisibility(true)}
//             className="cursor-pointer flex items-center gap-1"
//           >
//             <CircleButton>
//               {user?.imageUrl ? (
//                 <div className="rounded-full overflow-hidden">
//                   <Image
//                     width={25}
//                     height={25}
//                     alt="abrir menu"
//                     src={user?.imageUrl ?? ""}
//                   />
//                 </div>
//               ) : (
//                 <FontAwesomeIcon icon={faBars} />
//               )}
//             </CircleButton>
//             <span className="hidden md:inline-block">Menu</span>
//           </div>
//         </li>
//       </ul>
//     </nav>
//   );
// };
