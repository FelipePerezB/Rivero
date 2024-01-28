/* eslint-disable react-hooks/exhaustive-deps */
import { Privacity } from "@prisma/client";
import { useEffect, useState } from "react";
import capFirst from "src/utils/capFirst";

const SubmitRadioInput = ({
  option,
  value,
  label,
  name,
}: {
  option: string;
  value: string;
  name?: string;
  label?: string;
}) => {
  <input
    className="cursor-pointer absolute top-0 left-0 h-full w-full opacity-0 peer"
    id={option}
    value={option}
    defaultChecked={value === option}
    name={name ?? label}
    type="radio"
  />;
};
const OnChangeRadioInput = ({
  option,
  value,
  label,
  name,
  onChange,
}: {
  option: string;
  value: string;
  name?: string;
  label?: string;
  onChange: (value: string) => void;
}) => {
  <input
    className="cursor-pointer absolute top-0 left-0 h-full w-full opacity-0 peer"
    id={option}
    value={option}
    onChange={
      onChange
        ? (event) => {
            const { value } = event.target as HTMLInputElement;
            if (!value) return;
            onChange(value);
          }
        : undefined
    }
    checked={value === option}
    name={name ?? label}
    type="radio"
  />;
};

type props = {
  name: string;
  label: string;
  options: string[];
  onChange?: (data: any) => void;
  value?: string;
  className?: string;
};

export default function RadioInput({
  name,
  onChange,
  options,
  label,
  value,
}: props) {
  const defaultValue = value ?? options[0];
  return (
    <article className={"flex flex-col gap-1 {props?.className"}>
      <span className={"w-full inline-block text-center"}>
        {capFirst(label ?? name)}
      </span>
      <fieldset className="w-max bg-white rounded flex justify-around my-0 mx-auto overflow-hidden relative border">
        {options.map((option, i) => {
          const inputOptions = {
            checked: onChange ? defaultValue === option : undefined,
            defaultChecked: !onChange ? defaultValue === option : undefined,
            onChange: onChange
              ? (event: { target: HTMLInputElement }) => {
                  const { value } = event.target;
                  if (!value) return;
                  onChange(value);
                }
              : undefined,
          };

          return (
            <label className="relative h-full flex group" key={option}>
              <input
                {...inputOptions}
                className="cursor-pointer absolute top-0 left-0 h-full w-full opacity-0 peer"
                id={option}
                value={option}
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
          );
        })}
      </fieldset>
    </article>
  );
}
