import TagsInput from "@components/form/tags/tags-input";
import React from "react";

const Category = ({
  text,
  defaultChecked,
}: {
  text: string;
  defaultChecked?: boolean;
}) => {
  const group = "select-category";
  return (
    <label className="relative">
      <input
        defaultChecked={defaultChecked}
        name={group}
        type="radio"
        className="cursor-pointer absolute h-full w-full opacity-0 peer"
      />
      <span className="px-1.5 py-1 rounded items-center justify-center p-1 cursor-pointer peer-hover:bg-gray-100 peer-checked:outline-gray-200 peer-checked:shadow peer-checked:outline peer-checked:outline-1 transition-all duration-150">
        {text}
      </span>
    </label>
  );
};

export default function SelectCategory() {
  const categories = ["Básicos", "Matemáticas", "Preguntas"];
  return (
    <TagsInput
      group="selected-category"
      onChange={(type) => console.log(type)}
      tags={categories.map((name) => ({ value: name }))}
    />
  );
}
