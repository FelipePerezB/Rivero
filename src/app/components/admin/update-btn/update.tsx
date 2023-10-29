import Alert from "@components/alert/alert";
import { updateMessages } from "@components/alert/alert-message";
import toast from "react-hot-toast";
import api from "src/app/utils/api";

export default function update(
  endpoint: string,
  values: { [key: string]: unknown }
) {
  toast((t) => (
    <Alert
      t={t}
      callback={() => {
        toast.promise(
          api(endpoint, {
            method: "PATCH",
            body: JSON.stringify({ ...values }),
          }),
          updateMessages
        );
      }}
    />
  ));
}
