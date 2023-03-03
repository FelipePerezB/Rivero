import React from "react";
import styles from "@styles/Table.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function Table() {
  return (
    <article className={styles.table}>
      <h2>Mátematica</h2>
      <table className={styles.container}>
        <tbody>
          <tr className={styles.head}>
            <th>Actividad</th>
            <th>Correctas</th>
          </tr>
          <tr>
            <td>Porcentajes</td>
            <td>10 / 12</td>
          </tr>
          <tr>
            <td>Proporciones</td>
            <td>7 / 12</td>
          </tr>
          <tr>
            <td>Productos notables</td>
            <td>12 / 12</td>
          </tr>
        </tbody>
      </table>
      <span className={styles['see-more']}>Ver todas</span>
    </article>
  );
}
