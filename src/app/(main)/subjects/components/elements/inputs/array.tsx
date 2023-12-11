/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { faLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function Array({
  label,
  // sets,
  dataKey,
  value,
  onChange,
}: {
  // sets: { key: string; label: string }[];
  dataKey: string;
  label: string;
  value: string[];
  onChange: (value: { [key: string]: unknown }) => void;
}) {
  const [data, setData] = useState<string[]>(value?.length ? value : []);

  useEffect(() => {
    onChange && onChange({ [dataKey ?? label]: data });
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-1">
        <StandardInput
          key={`${label}-input`}
          name={label}
          onBlur={(value) => setData([...data, value])}
        />
      </div>
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
            <span>{value}</span>
          </div>
        ))}
      </div>
    </>
  );
}
