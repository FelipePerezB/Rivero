import { Editor } from "novel";
import styles from "../../../schemas/styles/reportTemplate.module.css";
import { useEffect } from "react";

export default function EditorP({
  addFormData,
  name,
  value,
}: {
  value: string;
  name: string;
  addFormData: (data: any) => void;
}) {
  const createFormData = (newValue: any) => {
    if (!newValue) return;
    const data: any = {};
    data[name] = newValue;
    addFormData(data);
  };


  return (
    <Editor
      className={styles.editor}
      onUpdate={(data) => {
        createFormData(data?.view.dom.innerHTML);
      }}
    />
  );
}
