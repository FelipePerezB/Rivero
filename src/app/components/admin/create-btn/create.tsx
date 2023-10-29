import Alert from "@components/alert/alert";
import { createMessages } from "@components/alert/alert-message";
import toast from "react-hot-toast";
import api from "src/app/utils/api";

export default function create(
  endpoint: string,
  values: { [key: string]: unknown }
) {
  toast((t) => (
    <Alert
      name="Crear"
      message="¿Seguro que quieres crearlo?"
      t={t}
      callback={() => {
        toast.promise(
          api(endpoint, {
            method: "POST",
            body: JSON.stringify({ ...values }),
          }),
          createMessages
        );
      }}
    />
  ));
}
