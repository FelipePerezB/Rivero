'use client'
import Options from "@components/Options";
import React, { useState } from "react";

export default function ShareForm() {
  const options = ["Configuración"];
  const [option, setOption] = useState(options[0]);
  return (
    <>
      <Options {...{ setOption, option, options }}></Options>
      {option === "Configuración" && (
        <ConfigForm
          privacity={settings?.file?.privacity}
          setSettings={setSettings}
          document={settings?.file?.content}
        />
      )}
    </>
  );
}
