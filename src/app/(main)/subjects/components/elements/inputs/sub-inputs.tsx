/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { faLeftLong, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import TableBtn from "@components/dashboard/table/table-btn/table-btn";
import capFirst from "src/utils/capFirst";

export default function SubInputs({
  label,
  sets,
  dataKey,
  value,
  onChange,
}: {
  sets: { key: string; label: string }[];
  dataKey: string;
  label: string;
  value?: { [key: string]: string }[];
  onChange: (value: { [key: string]: unknown }) => void;
}) {
  const [data, setData] = useState<{ [key: string]: string }[]>(
    value?.length ? value : []
  );

  useEffect(() => {
    onChange && onChange({ [dataKey ?? label]: data });
  }, [data]);
  const [newValue, setNewValue] = useState<{ [key: string]: string }>({});

  // const changeChild = (component: Component) => {
  //   const newChild = component as { id?: string; options: {}; type: string };
  //   if (!children?.length || !newChild?.id) return;
  //   const newChildIndex = children?.findIndex(
  //     (child) => child.id === newChild.id
  //   );
  //   if (!newChildIndex && newChildIndex === -1) return;
  //   children[newChildIndex] = newChild;
  //   onChange && onChange({ children });
  //   setModalState(false);
  // };

  return (
    <>
      <span>{label}</span>
      <div className="flex gap-2.5 overflow-x-auto text-sm">
        {data.map((value, i) => (
          <div
            className="flex flex-col border shadow-sm rounded p-1 relative group"
            key={"item-" + i}
          >
            <div className="absolute flex gap-1 w-full top-0 left-0 p-1 justify-center opacity-0 group-hover:opacity-100">
              <Button
                color="white"
                onClick={() => {
                  const element = value;
                  data[i] = data[i - 1];
                  data[i - 1] = element;
                  setData([...data]);
                }}
              >
                <FontAwesomeIcon className="h-3 w-3" icon={faLeftLong} />
              </Button>
              <Button
                color="white"
                onClick={() => {
                  data.splice(i, 1);
                  setData([...data]);
                }}
              >
                <FontAwesomeIcon className="h-3 w-3" icon={faXmark} />
              </Button>
            </div>
            {Object.entries(value).map(([key, value]) => (
              <span key={`item-${key}-${value}`}>{`${capFirst(
                key
              )}: ${value}`}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="pl-3 flex flex-col gap-1">
        {sets?.map(({ key, label }) => (
          <StandardInput
            key={`${key}-input`}
            name={label}
            onBlur={(data) => setNewValue({ ...newValue, ...{ [key]: data } })}
          />
        ))}
        <TableBtn
          onClick={() => {
            setData([...data, newValue]);
            setNewValue({});
          }}
        >
          Agregar <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
        </TableBtn>
      </div>
    </>
  );
}
