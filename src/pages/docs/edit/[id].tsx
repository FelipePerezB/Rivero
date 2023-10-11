// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { use, useEffect, useRef, useState } from "react";
// import Layout from "@components/create-components/edit-document/edit-document";
// import GetComponent from "@components/create-components/edit-document/get-component";
// import { hydrateJSON } from "src/utils/create-doc/hydrateJSON";
// import Menu from "@components/create-components/edit-document/menu";
// import useGetFile from "src/hooks/useGetFile";
// import { useRouter } from "next/router";
// import { DocumentJSON } from "src/models/document.model";
// import { Toaster } from "react-hot-toast";
// // import { Toaster } from "react-hot-toast";

// const getFile = async () => {

// }

// export interface ComponentOptions {
//   children?: Component[];
//   [key: string]: unknown;
// }

// export interface Component {
//   type: string;
//   id?: string;
//   options: ComponentOptions;
// }
// export default function EditDoc() {
//   const router = useRouter();
//   const id = router.query.id as string;
//   const document = useGetFile(id) as any;
//   const [settings, setSettings] = useState<any>(document);
//   // const { content, privacity, title } = file.document;
//   const divRef = useRef<HTMLDivElement>(null);
//   const resize = () => {
//     const $container = divRef.current;
//     if (!$container) return;
//     const pixels = 13;
//     const width = 450;
//     const containerWidth = $container.clientWidth;
//     const fontSize = (pixels / width) * Number(containerWidth);
//     $container.style.fontSize = fontSize + "px";
//   };

//   useEffect(() => {
//     // const file = 
//     console.log(id);
//     setSettings({
//       ...settings,
//       file: {
//         ...settings.file,
//         content: hydrateJSON(document.file.content),
//         externalId: id,
//       },
//     });
//     resize();
//     window.onresize = resize;
//   }, [id]);
//   // useEffect(() => {
//   //   setSettings({
//   //     ...settings,
//   //     file: {
//   //       ...settings.file,
//   //       content: hydrateJSON(document.file.content),
//   //       externalId: id,
//   //     },
//   //   });
//   //   resize();
//   //   window.onresize = resize;
//   // }, [id, document]);

//   console.log(document);

//   return (
//     <Layout
//       document={settings.file.content}
//       settings={settings}
//       setSettings={setSettings}
//     >
//       <div ref={divRef} className="w-full">
//         <div className="print:text-[calc(100vw*(13/450))]">
//           {!!settings?.file.externalId && (
//             <GetComponent
//               folder="documents"
//               name={"document"}
//               attrs={{ ...settings.file.content, title: settings?.file?.title }}
//             />
//           )}
//         </div>
//       </div>
//       {divRef.current && (
//         <Menu
//           divRef={divRef || undefined}
//           {...{
//             settings,
//             documentComponent: settings.file.content,
//             setSettings,
//           }}
//         />
//       )}
//       <Toaster />
//     </Layout>
//   );
// }

import React from 'react'

export default function A() {
  return (
    <div>A</div>
  )
}

