import Alert from "@components/common/alert/alert";
import { updateMessages } from "@components/common/alert/alert-message";
import toast from "react-hot-toast";
import api from "src/utils/api";

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
