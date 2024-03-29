"use client";
import capFirst from "src/utils/capFirst";
/* eslint-disable react-hooks/exhaustive-deps */
import TextInput from "./text";

type props = {
  name: string;
  options: string[];
  onChange?: (data: any) => void;
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
    props?.onChange && props.onChange(obj);
  };

  return props.options.join("").length <= 30 && !props.isLarge ? (
    <SmallOptionsInput {...props} onChange={createFormData} />
  ) : (
    <LargeOptionsInput {...props} onChange={props?.onChange} />
  );
}

function LargeOptionsInput(props: props) {
  const id = `options-${props.options?.join()}`;
  return (
    <div>
      <TextInput key={props?.dataKey} onChange={()=>{}} />
      <datalist id={id}>
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
  // useEffect(() => {
  //   if (!props.dontDefaultCheck) {
  //     props.onChange(props.value ?? props.options[0]);
  //   }
  return (
    <article className={`flex flex-col gap-1 ${props?.className}`}>
      <span className={"inline-block w-full text-center"}>{capFirst(props.name)}</span>
      <fieldset  className={"w-max bg-white rounded flex justify-around my-0 mx-auto overflow-hidden relative border"}>
        {props.options.map((option, i) => (
          <label className="relative h-full flex group" key={option}>
            <input
            
              className="cursor-pointer absolute top-0 left-0 h-full w-full opacity-0 peer"
              tabIndex={i === 0 ? props.tabIndex : undefined}
              id={option}
              onClick={(event) => {
                const { value } = event.target as HTMLInputElement;
                if (!value) return;
                props.onChange && props.onChange(value);
              }}
              value={option}
              defaultChecked={
                (!props.dontDefaultCheck && !props.value && i === 0) ||
                option?.toLowerCase() === props.value?.toLowerCase()
              }
              name={props.dataKey}
              type="radio"
            />
            <span className={"w-full h-ful py-1 px-3 transition-all duration-100 peer-checked:bg-blue-500 peer-checked:text-white group-hover:bg-gray-200/60 group-hover:checked:bg-blue-500"}>
              {capFirst(option)}
            </span>
          </label>
        ))}
      </fieldset>
    </article>
  );
}
