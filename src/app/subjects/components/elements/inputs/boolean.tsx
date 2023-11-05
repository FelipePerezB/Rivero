import React, { useEffect, useState } from "react";
import Label from "src/app/documents/edit/components/label";
// import styles from "@styles/SwitchToogle.module.css";

export default function SwitchToogle({
  label,
  dataKey,
  onChange,
  value,
}: {
  value: boolean
  dataKey?: string;
  label: string;
  onChange: (data: any) => void;
}) {
  const [state, setState] = useState(value);
  const handleToogle = () => {
    onChange && onChange({ [dataKey ?? label]: !state });
    setState(!state);
  };

  return (
    <label className="flex gap-4 w-max">
      <span>{label}</span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={state}
          onChange={() => handleToogle()}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </div>
    </label>
  );
}
