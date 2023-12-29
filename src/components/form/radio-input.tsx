/* eslint-disable react-hooks/exhaustive-deps */
import { Privacity } from "@prisma/client";
import { useEffect, useState } from "react";
import capFirst from "src/utils/capFirst";

type props = {
  name: string;
  label: string;
  options: string[];
  onChange?: (data: any) => void;
  value?: string;
  className?: string;
};

export default function RadioInput({ name, onChange, options, label, value }: props) {

  return (
    <article className={"flex flex-col gap-1 {props?.className"}>
      <span className={"w-full inline-block text-center"}>
        {capFirst(label ?? name)}
      </span>
      <fieldset className="w-max bg-white rounded flex justify-around my-0 mx-auto overflow-hidden relative border">
        {options.map((option, i) => (
          <label className="relative h-full flex group" key={option}>
            <input
              className="cursor-pointer absolute top-0 left-0 h-full w-full opacity-0 peer"
              id={option}
              onChange={
                onChange
                  ? (event) => {
                      const { value } = event.target as HTMLInputElement;
                      if (!value) return;
                      onChange(value);
                    }
                  : undefined
              }
              value={option}
              defaultChecked={value ? option === value : i === 0}
              name={name ?? label}
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
