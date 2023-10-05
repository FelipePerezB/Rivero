import Button from "@components/Button";
import Table from "@components/Table";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import Modal from "src/app/components/modal/modal";
import UpdateForm from "./components/forms/update";

export default function OrganizationDashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <>
      <div className="flex justify-between items-center pb-1.5">
        <h3 className="text-xl font-semibold">Grupos</h3>
        <span>
          <Button href="?modal=new-group">Crear grupo</Button>
        </span>
      </div>
      <section className="flex flex-col gap-5">
        <Table
          head={{
            keys: [
              { name: "Nombre", key: "name" },
              { name: "Correo", key: "email" },
            ],
            icons: [
              <Link href={"?modal="} key={'key={"AA"} '}>
                <FontAwesomeIcon className="h-4 w-4" icon={faPen} />
              </Link>,
              // <InvitationBtns
              //   key={"4medio-invitation-btn"}
              //   groupId={1}
              //   role={Role.Student}
              //   organizationId={1}
              // />,
            ],
            title: "4° Medio",
          }}
          data={[
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
          ]}
        />

        <Table
          head={{
            keys: [
              { name: "Nombre", key: "name" },
              { name: "Correo", key: "email" },
            ],
            title: "4° Medio",
          }}
          data={[
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
          ]}
        />

        <Table
          head={{
            keys: [
              { name: "Nombre", key: "name" },
              { name: "Correo", key: "email" },
            ],
            title: "4° Medio",
          }}
          data={[
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
            ["Felipe Pérez", "Felipeeperez3@gmail.com"],
          ]}
        />
      </section>
      <Modal title="Modificar grupo" id="new-group" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-groupo" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-grouqp" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-grouep" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-grtoup" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-grfoup" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-grodup" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-grotup" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
      <Modal title="Modificar grupo" id="new-grtoup" searchParams={searchParams}>
        <UpdateForm />
      </Modal>
    </>
  );
}
