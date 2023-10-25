import StandardInput from "@components/inputs/StandardInput/StandardInput";
import toast from "react-hot-toast";
import create from "../create-btn/create";

export default function createAlert(
  endpoint: string,
  values: { [key: string]: unknown }
) {
  toast((t) => (
    <div className="flex flex-col gap-2">
      <StandardInput
        onBlur={(data) => {
          if (!data) return;
          console.log(data)
          create(endpoint, { name: data, ...values });
          toast.dismiss(t?.id);
        }}
        name="Nombre"
        dataKey="name"
      />
    </div>
  ));
}
