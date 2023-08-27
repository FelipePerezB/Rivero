/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import StandardInput from "../StandardInput/StandardInput";
import styles from "./OptionsInput.module.css";
import { capFirst } from "src/utils/capFirst";

type props = {
  name: string;
  options: string[];
  onChange: (data: any) => void;
  value?: string;
};

export default function OptionsInput(props: props) {
  const createFormData = (data: string) => {
    const obj = {} as any;
    obj[props.name] = data;
    props.onChange(obj);
  };

  return props.options.length <= 3 ? (
    <SmallOptionsInput {...props} onChange={createFormData} />
  ) : (
    <LargeOptionsInput {...props} onChange={createFormData} />
  );
}

function LargeOptionsInput(props: props) {
  const id = `options-${props.options?.join()}`;
  return (
    <div>
      <StandardInput
        attrs={{ list: id }}
        name={id}
        onChange={(value) => props.onChange(value)}
        type="text"
      />
      <datalist id={""}>
        {props.options.map((value: string) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </datalist>
    </div>
  );
}

function SmallOptionsInput(props: props) {
  useEffect(() => {
    props.onChange(props.value ?? props.options[0]);
  }, []);
  return (
    <article className={styles["options"]}>
      <span className={styles.name}>{capFirst(props.name)}</span>
      <fieldset className={styles["small-options-input"]}>
        {props.options.map((option, i) => (
          <label key={option}>
            <input
              id={option}
              onClick={(event) => {
                const { value } = event.target as HTMLInputElement;
                if (!value) return;
                props.onChange(value);
              }}
              value={option}
              defaultChecked={(!props.value && i === 0) || (option?.toLowerCase() === props.value?.toLowerCase())}
              name={props.name}
              type="radio"
            />
            <span className={styles["small-options-input__text"]}>
              {capFirst(option)}
            </span>
          </label>
        ))}
      </fieldset>
    </article>
  );
}
