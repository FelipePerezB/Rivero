import React, { useState } from "react";
import Layout from "src/layout/Layout";
import Options from "@components/Options";
import styles from "@styles/Calendar.module.css";

export default function Calendar() {
  const [state, setState] = useState("Calendario");
  return (
    <Layout>
      <Options
        state={state}
        setState={setState}
        options={["Calendario", "Actividades"]}
      ></Options>
      <table className={styles.calendar}>
        <tbody>
          <tr>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mié</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sáb</th>
            <th>Dom</th>
          </tr>
          <tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
          </tr>
          <tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
          </tr>
          <tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
          </tr>
          <tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}
