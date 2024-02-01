import Alert from "@components/common/alert/alert";
import { deleteMessages } from "@components/common/alert/alert-message";
import toast from "react-hot-toast";
import api from "src/utils/api";

export default function removeAlert({endpoint, message}:{endpoint: string, message: string}) {

  toast((t) => (
    <Alert
      t={t}
      callback={() =>
        toast.promise(api(endpoint), deleteMessages)
      }
      color="red"
      message={message}
      name="Eliminar"
    />
  ));
}
