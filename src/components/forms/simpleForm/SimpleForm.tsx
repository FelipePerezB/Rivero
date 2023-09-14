import StandardInput from "@components/inputs/StandardInput/StandardInput";
import styles from "./SimpleForm.module.css";
import Button from "@components/Button";
import { ButtonAttrs, StandartInputAttrs } from "src/models/StandartInputAttr";
import Buttons from "@components/button/buttons/Buttons";
import Options from "@components/Options";
import { useEffect, useState } from "react";

export default function Form({
  data,
}: {
  data?: {
    title: string;
    inputs: StandartInputAttrs[];
    buttons: ButtonAttrs[];
  }[];
}) {
  const options = data?.map(({ title }) => title) ?? [];
  const [option, setOption] = useState(options[0] ?? "");
  const [values, setValues] = useState<{ [key: string]: string }>();
  const { inputs, buttons, title } =
    data?.find(({ title }) => title === option) ?? {};
  return (
    <form className={styles.form}>
      <Options {...{ option, setOption, options }} />
      {inputs?.map((input) => (
        <StandardInput
          onChange={(data) => setValues({ ...data })}
          key={input.name + "-input"}
          {...{ ...input }}
        />
      ))}
      <Buttons>
        {buttons?.map((button, i) => (
          <Button
            key={`${title}-btn-${i}`}
            {...{
              ...button,
              onClick: () => {
                button?.onClick(values);
              },
            }}
          ></Button>
        ))}
      </Buttons>
    </form>
  );
}
