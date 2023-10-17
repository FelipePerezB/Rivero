/* eslint-disable react-hooks/exhaustive-deps */
import capFirst from "src/utils/capFirst";
import StandardInput from "../StandardInput/StandardInput";
import { useEffect, useState } from "react";

type props = {
  name: string;
  options: string[];
  onChange: (data: any) => void;
  value?: string;
  className?: string;
  dontDefaultCheck?: boolean;
  tabIndex?: number;
  dataKey?: string;
  isLarge?: boolean;
};

export default function OptionsInput(props: props) {
  const createFormData = (data: string) => {
    const obj = {} as any;
    obj[props.dataKey || props.name] = data;
    props.onChange(obj);
  };

  return props.options.join("").length <= 30 && !props.isLarge ? (
    <SmallOptionsInput {...props} onChange={createFormData} />
  ) : (
    // <></>
    <LargeOptionsInput {...props} onChange={createFormData} />
  );
}

function LargeOptionsInput(props: props) {
  const id = `options-${props.options?.map((op) => op[1]).join()}`;
  // useEffect(() => {
  //   if (!props.dontDefaultCheck) {
  //     props.onChange(props.value ?? props.options[0]);
  //   }
  // }, []);;
  return (
    <select onChange={({target})=>{props.onChange(target.value)}} className="card focus:outline-blue-500" id={id}>
      {props.options.map((op) => (
        <option key={`${props.name}-${op}`}>{op}</option>
      ))}
    </select>
  );
}

function SmallOptionsInput(props: props) {
  const [currentValue, setCurrentValue] = useState("");
  useEffect(() => {
    if (!props.dontDefaultCheck) {
      props.onChange(props.value ?? props.options[0]);
      setCurrentValue(props.value ?? props.options[0]);
    }
  }, []);;
  return (
    <article className={"flex flex-col gap-1 {props?.className"}>
      <span className={"w-full inline-block text-center"}>
        {capFirst(props.name)}
      </span>
      <fieldset className="w-max bg-white rounded flex justify-around my-0 mx-auto overflow-hidden relative border">
        {props.options.map((option, i) => (
          <label className="relative h-full flex group" key={option}>
            <input
              className="cursor-pointer absolute top-0 left-0 h-full w-full opacity-0 peer"
              tabIndex={i === 0 ? props.tabIndex : undefined}
              id={option}
              onChange={(event) => {
                const { value } = event.target as HTMLInputElement;
                if (!value) return;
                console.log(value);
                props.onChange(value);
                setCurrentValue(value);
              }}
              value={option}
              checked={currentValue === option}
              // defaultChecked={
              //   (!props.dontDefaultCheck && !props.value && i === 0) ||
              //   option?.toLowerCase() === props.value?.toLowerCase()
              // }
              name={props.name}
              type="radio"
            />
            <span
              className={
                "w-full h-ful py-1 px-3 transition-all duration-100 peer-checked:bg-blue-500 peer-checked:text-white group-hover:bg-gray-200/60 "
              }
            >
              {capFirst(option)}
            </span>
          </label>
        ))}
      </fieldset>
    </article>
  );
}
